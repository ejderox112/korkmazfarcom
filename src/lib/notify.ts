import { Subscription } from './subscriptionStore';
import { listSubscriptions } from './subscriptionStore';
import { sendSms } from './sms';

// listing is expected to have at least: id, title, brand?, model?, partType?
export async function checkAndNotify(listing: any){
  const subs = listSubscriptions();
  const matches: { sub: Subscription; phone: string }[] = [];
  for(const s of subs){
    // match logic: subscription fields if present must equal (case-insensitive)
    let ok = true;
    if(s.brand && listing.brand && s.brand.toLowerCase() !== listing.brand.toLowerCase()) ok = false;
    if(s.model && listing.model && s.model.toLowerCase() !== listing.model.toLowerCase()) ok = false;
    if(s.partType && listing.partType && s.partType.toLowerCase() !== listing.partType.toLowerCase()) ok = false;
    if(ok) matches.push({ sub: s, phone: s.phone });
  }
  for(const m of matches){
    const msg = `Yeni ilan: ${listing.title || listing.id} - ${listing.brand||''} ${listing.model||''} (${listing.partType||''}) - ${listing.link||''}`;
    try{ await sendSms(m.phone, msg); }catch(e){ /* ignore */ }
  }
  return matches.length;
}
