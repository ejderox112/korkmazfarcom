import fs from 'fs';
import path from 'path';

export function ensureDataFile(name: string, initial: any){
  const dataDir = path.join(process.cwd(), 'data');
  if(!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
  const p = path.join(dataDir, name);
  if(!fs.existsSync(p)) fs.writeFileSync(p, JSON.stringify(initial, null, 2));
  return p;
}

export function readJsonFile<T>(p: string): T{
  try{ return JSON.parse(fs.readFileSync(p,'utf8') || 'null'); }catch(e){ return null as any; }
}

export function writeJsonFile(p: string, data: any){
  fs.writeFileSync(p, JSON.stringify(data, null, 2));
}
