<?php
// Basit PHP scraper: sahibinden.com'dan korkmazotocikma kullanıcısının ilanlarını çeker
// Çalıştırmak için: php poc-sahibinden-php.php

$html = file_get_contents('https://korkmazotocikma.sahibinden.com/');

preg_match_all('/<tr class="searchResultsItem.*?<a class="classifiedTitle" href="(.*?)">(.*?)<\/a>.*?<td class="searchResultsPriceValue">(.*?)<\/td>.*?<img.*?src="(.*?)"/si', $html, $matches, PREG_SET_ORDER);

$listings = [];
foreach ($matches as $m) {
    $listings[] = [
        'link' => 'https://sahibinden.com' . trim($m[1]),
        'title' => trim(strip_tags($m[2])),
        'price' => trim(strip_tags($m[3])),
        'image' => trim($m[4]),
    ];
}

header('Content-Type: application/json');
echo json_encode($listings, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
