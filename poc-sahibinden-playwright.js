// Node.js + Playwright POC: sahibinden.com'dan korkmazotocikma kullanıcısının ilanlarını çeker
// Çalıştırmak için: node poc-sahibinden-playwright.js

const { chromium } = require('playwright');

async function scrapeSahibinden() {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://korkmazotocikma.sahibinden.com/');

  // İlan kartlarını seç
  const listings = await page.$$eval('.searchResultsItem', (cards) =>
    cards.map((el) => ({
      title: el.querySelector('.classifiedTitle')?.innerText.trim() || '',
      price: el.querySelector('.searchResultsPriceValue')?.innerText.trim() || '',
      link: el.querySelector('a.classifiedTitle')?.href || '',
      image: el.querySelector('img')?.src || '',
      date: el.querySelector('.searchResultsDateValue')?.innerText.trim() || '',
    }))
  );

  console.log(listings);
  await browser.close();
}

scrapeSahibinden();
