import fs from 'fs';
import path from 'path';

const dataDir = path.join(process.cwd(), 'data');
const usersFile = path.join(dataDir, 'users.json');
const otpsFile = path.join(dataDir, 'otps.json');

function ensureFiles(){
  if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  if(!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, JSON.stringify([]));
  if(!fs.existsSync(otpsFile)) fs.writeFileSync(otpsFile, JSON.stringify({}));
}

ensureFiles();

export type User = { id: string; name?: string; phone: string; verified: boolean; createdAt: string };

export function readUsers(): User[]{
  ensureFiles();
  try{ return JSON.parse(fs.readFileSync(usersFile, 'utf8') || '[]'); }catch(e){ return []; }
}

export function writeUsers(users: User[]){
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

export function findUserByPhone(phone: string): User | undefined{
  return readUsers().find(u=>u.phone===phone);
}

export function createOrUpdateUser(user: User){
  const users = readUsers();
  const idx = users.findIndex(u=>u.phone===user.phone);
  if(idx>=0) users[idx] = {...users[idx], ...user};
  else users.push(user);
  writeUsers(users);
  return user;
}

// OTP store
type OTPEntry = { code: string; expiresAt: number; attempts: number };

export function readOtps(): Record<string, OTPEntry>{
  ensureFiles();
  try{ return JSON.parse(fs.readFileSync(otpsFile,'utf8')||'{}'); }catch(e){ return {}; }
}

export function writeOtps(map: Record<string, OTPEntry>){ fs.writeFileSync(otpsFile, JSON.stringify(map, null, 2)); }

export function setOtp(phone: string, code: string, ttlSec = 300){
  const map = readOtps();
  map[phone] = { code, expiresAt: Date.now() + ttlSec*1000, attempts: 0 };
  writeOtps(map);
}

export function verifyOtp(phone: string, code: string){
  const map = readOtps();
  const e = map[phone];
  if(!e) return { ok:false, reason:'no_otp' };
  if(Date.now() > e.expiresAt) return { ok:false, reason:'expired' };
  if(e.attempts >= 5) return { ok:false, reason:'too_many_attempts' };
  e.attempts += 1;
  writeOtps(map);
  if(e.code === code) { delete map[phone]; writeOtps(map); return { ok:true }; }
  return { ok:false, reason:'invalid' };
}
