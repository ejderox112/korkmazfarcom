<?php
set_time_limit(0);
error_reporting(E_ALL);
ini_set('display_errors', '1');
header('Content-Type: application/json');
$logfile = __DIR__ . DIRECTORY_SEPARATOR . 'unzip_log.txt';
function logmsg($m){ global $logfile; file_put_contents($logfile, date('c') . " - " . $m . "\n", FILE_APPEND); }
try {
    $zipName = __DIR__ . DIRECTORY_SEPARATOR . 'korkmazfar-full.zip';
    if (!file_exists($zipName)) {
        throw new Exception('zip_not_found: ' . $zipName);
    }
    $zip = new ZipArchive();
    $res = $zip->open($zipName);
    if ($res !== TRUE) {
        throw new Exception('zip_open_failed code=' . $res);
    }
    $extractTo = __DIR__;
    if (!$zip->extractTo($extractTo)) {
        throw new Exception('extract_failed');
    }
    $zip->close();
    function recurse_chmod($path) {
        $it = new DirectoryIterator($path);
        foreach ($it as $f) {
            $name = $f->getFilename();
            if ($name === '.' || $name === '..') continue;
            $p = $f->getPathname();
            if ($f->isDir()) {
                @chmod($p, 0755);
                recurse_chmod($p);
            } else {
                @chmod($p, 0644);
            }
        }
    }
    @chmod($extractTo, 0755);
    recurse_chmod($extractTo);
    function count_files_dirs($path) {
        $files = $dirs = 0;
        $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($path));
        foreach ($it as $f) {
            $name = $f->getFilename();
            if ($name === '.' || $name === '..') continue;
            if ($f->isDir()) $dirs++; else $files++;
        }
        return ['files' => $files, 'dirs' => $dirs];
    }
    $stats = count_files_dirs($extractTo);
    echo json_encode(['status' => 'ok', 'extracted_to' => $extractTo, 'stats' => $stats]);
    logmsg('OK extracted, files='.$stats['files'].', dirs='.$stats['dirs']);
} catch (Throwable $e) {
    $msg = 'EXC: ' . $e->getMessage() . '\n' . $e->getTraceAsString();
    logmsg($msg);
    echo json_encode(['error' => $e->getMessage()]);
}
?>