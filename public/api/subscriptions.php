<?php
// Basit subscriptions endpoint (cPanel friendly)
// POST JSON: { phone, brand, model, partType }
header('Content-Type: application/json');
try {
    $raw = file_get_contents('php://input');
    $data = json_decode($raw, true);
    if (!$data) throw new Exception('invalid_json');
    $phone = preg_replace('/\D+/', '', ($data['phone'] ?? ''));
    $brand = trim($data['brand'] ?? '');
    $model = trim($data['model'] ?? '');
    $partType = trim($data['partType'] ?? '');
    if (!$phone || strlen($phone) < 10) throw new Exception('invalid_phone');
    if (!$brand) throw new Exception('missing_brand');
    if (!$partType) throw new Exception('missing_partType');

    $dataDir = __DIR__ . '/../../data';
    if (!is_dir($dataDir)) mkdir($dataDir, 0755, true);
    $file = $dataDir . '/subscriptions.json';
    $list = [];
    if (file_exists($file)) {
        $list = json_decode(file_get_contents($file), true) ?? [];
    }
    $entry = [
        'id' => bin2hex(random_bytes(8)),
        'phone' => $phone,
        'brand' => $brand,
        'model' => $model,
        'partType' => $partType,
        'createdAt' => date('c')
    ];
    $list[] = $entry;
    file_put_contents($file, json_encode($list, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));

    // Optional: if TWILIO env configured, call Twilio API via curl
    $sid = getenv('TWILIO_ACCOUNT_SID');
    $token = getenv('TWILIO_AUTH_TOKEN');
    $from = getenv('TWILIO_FROM');
    if ($sid && $token && $from) {
        $msg = "Bildirim kaydınız başarılı: {$brand} - {$partType}."
            . " Cevap: " . substr($entry['id'],0,6);
        $post = http_build_query(['To' => $phone, 'From' => $from, 'Body' => $msg]);
        $ch = curl_init("https://api.twilio.com/2010-04-01/Accounts/{$sid}/Messages.json");
        curl_setopt($ch, CURLOPT_USERPWD, "{$sid}:{$token}");
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $post);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $res = curl_exec($ch);
        curl_close($ch);
    }

    echo json_encode(['ok' => true, 'subscription' => $entry]);
} catch (Throwable $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}

?>
