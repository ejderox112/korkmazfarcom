import { ensureDataFile, readJsonFile, writeJsonFile } from './storeHelpers';

const file = ensureDataFile('carts.json', {});

type CartMap = Record<string, { listingId: string; qty: number }[]>;

export function getCarts(): CartMap { return readJsonFile<CartMap>(file) || {}; }
export function saveCarts(m: CartMap){ writeJsonFile(file, m); }

export function addToCart(phone: string, listingId: string, qty = 1){
  const m = getCarts();
  const arr = m[phone] || [];
  const idx = arr.findIndex(x=>x.listingId===listingId);
  if(idx>=0) arr[idx].qty += qty; else arr.push({ listingId, qty });
  m[phone] = arr;
  saveCarts(m);
  return arr;
}

export function removeFromCart(phone: string, listingId: string){
  const m = getCarts();
  const arr = (m[phone] || []).filter(x=>x.listingId!==listingId);
  m[phone] = arr;
  saveCarts(m);
  return arr;
}
