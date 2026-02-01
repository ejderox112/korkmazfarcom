# Sahibinden.com Scraping POC'ları

Bu dizinde iki farklı POC örneği yer alıyor:

## 1. Node.js + Playwright
- `poc-sahibinden-playwright.js`
- Çalıştırmak için:
  1. Gerekli bağımlılıkları yükle: `npm install`
  2. Playwright kurulumunu tamamla: `npx playwright install`
  3. Komutu çalıştır: `node poc-sahibinden-playwright.js`
- Korkmaz Oto Çıkma sahibinden.com profilindeki ilanları çeker ve konsola yazdırır.

## 2. Basit PHP Scraper
- `poc-sahibinden-php.php`
- Çalıştırmak için:
  1. PHP yüklü olmalı.
  2. Komutu çalıştır: `php poc-sahibinden-php.php`
- Korkmaz Oto Çıkma sahibinden.com profilindeki ilanları çeker ve JSON olarak çıktı verir.

> Not: Her iki yöntem de sadece https://korkmazotocikma.sahibinden.com/ kullanıcısı için örneklenmiştir. Farklı kullanıcılar için kullanılmamalıdır.
