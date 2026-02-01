import { ensureDataFile, readJsonFile, writeJsonFile } from './storeHelpers';

const file = ensureDataFile('favorites.json', {});

type FavoritesMap = Record<string, string[]>; // phone -> [listingId]

export function getFavorites(): FavoritesMap { return readJsonFile<FavoritesMap>(file) || {}; }
export function saveFavorites(m: FavoritesMap){ writeJsonFile(file, m); }

export function addFavorite(phone: string, listingId: string){
  const m = getFavorites();
  const arr = m[phone] || [];
  if(!arr.includes(listingId)) arr.push(listingId);
  m[phone] = arr;
  saveFavorites(m);
  return arr;
}

export function removeFavorite(phone: string, listingId: string){
  const m = getFavorites();
  const arr = (m[phone] || []).filter(x=>x!==listingId);
  m[phone] = arr;
  saveFavorites(m);
  return arr;
}
