<?php
/**
 * fetch_and_deploy.php
 * GitHub'daki zip'i indirir, açar ve dosyaları public_html'e kopyalar.
 * KULLANIM: https://korkmazfar.com/fetch_and_deploy.php?token=GİZLİ_TOKEN
 * Güvenlik için TOKEN değiştirin!
 */
set_time_limit(300);
error_reporting(E_ALL);
ini_set('display_errors', '1');
header('Content-Type: application/json; charset=utf-8');

$SECRET_TOKEN = 'korkmaz2026'; // Bunu değiştirin!
$GITHUB_ZIP_URL = 'https://github.com/ejderox112/korkmazfarcom/archive/refs/heads/master.zip';
$EXTRACT_TO = __DIR__ . '/..'; // public_html
$LOG_FILE = __DIR__ . '/../deploy_log.txt';

function logmsg($m) {
    global $LOG_FILE;
    file_put_contents($LOG_FILE, date('c') . " - " . $m . "\n", FILE_APPEND);
}

// Token kontrolü
if (!isset($_GET['token']) || $_GET['token'] !== $SECRET_TOKEN) {
    http_response_code(403);
    echo json_encode(['error' => 'invalid_token']);
    exit;
}

try {
    logmsg('Fetch started');
    
    // 1. GitHub'dan zip indir
    $zipPath = sys_get_temp_dir() . '/korkmazfar_deploy.zip';
    $ch = curl_init($GITHUB_ZIP_URL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch, CURLOPT_TIMEOUT, 120);
    $data = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200 || empty($data)) {
        throw new Exception('GitHub zip indirilemedi, HTTP: ' . $httpCode);
    }
    file_put_contents($zipPath, $data);
    logmsg('Downloaded zip: ' . strlen($data) . ' bytes');
    
    // 2. Zip aç
    $zip = new ZipArchive();
    if ($zip->open($zipPath) !== TRUE) {
        throw new Exception('Zip acilamadi');
    }
    
    $tmpDir = sys_get_temp_dir() . '/korkmazfar_extract_' . time();
    $zip->extractTo($tmpDir);
    $zip->close();
    logmsg('Extracted to temp: ' . $tmpDir);
    
    // 3. out/ klasörünü bul (GitHub'dan kaynak kod gelir, build edilmiş değil)
    // Not: Bu script kaynak kodu indirir, build edilmiş siteyi değil.
    // Build edilmiş zip için farklı bir URL kullanın.
    
    // GitHub archive yapısı: korkmazfarcom-master/...
    $innerDir = glob($tmpDir . '/korkmazfarcom-*')[0] ?? $tmpDir;
    
    // public/ içeriğini kopyala (statik dosyalar)
    $publicDir = $innerDir . '/public';
    if (is_dir($publicDir)) {
        recurse_copy($publicDir, $EXTRACT_TO);
        logmsg('Copied public/ to webroot');
    }
    
    // Temizlik
    @unlink($zipPath);
    
    echo json_encode([
        'status' => 'ok',
        'message' => 'public/ dosyalari kopyalandi. Not: Tam deploy icin build edilmis zip yukleyin.',
        'source' => $innerDir
    ]);
    logmsg('Deploy completed');
    
} catch (Throwable $e) {
    $msg = 'ERROR: ' . $e->getMessage();
    logmsg($msg);
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}

function recurse_copy($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst, 0755, true);
    while (($file = readdir($dir)) !== false) {
        if ($file === '.' || $file === '..') continue;
        $srcPath = $src . '/' . $file;
        $dstPath = $dst . '/' . $file;
        if (is_dir($srcPath)) {
            recurse_copy($srcPath, $dstPath);
        } else {
            copy($srcPath, $dstPath);
            @chmod($dstPath, 0644);
        }
    }
    closedir($dir);
}
?>
