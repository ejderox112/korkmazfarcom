import { ensureDataFile, readJsonFile, writeJsonFile } from './storeHelpers';

const file = ensureDataFile('subscriptions.json', []);

export type Subscription = { id: string; phone: string; brand?: string; model?: string; partType?: string; createdAt: string };

export function listSubscriptions(): Subscription[]{ return readJsonFile<Subscription[]>(file) || []; }
export function saveSubscriptions(s: Subscription[]){ writeJsonFile(file, s); }

export function addSubscription(sub: Subscription){
  const s = listSubscriptions();
  s.push(sub);
  saveSubscriptions(s);
  return sub;
}

export function removeSubscription(id: string){
  const s = listSubscriptions().filter(x=>x.id!==id);
  saveSubscriptions(s);
  return s;
}
