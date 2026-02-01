import fs from 'fs';
import path from 'path';

const logFile = path.join(process.cwd(), 'data', 'sms_log.txt');

async function logSms(phone: string, message: string){
  fs.appendFileSync(logFile, new Date().toISOString() + ' | ' + phone + ' | ' + message + '\n');
}

// If TWILIO_* env vars set, attempt to send via Twilio, otherwise fallback to log only.
export async function sendSms(phone: string, message: string){
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM; // e.g. +1234567890
  if(accountSid && authToken && from){
    try{
      // lazy require to avoid hard dependency errors in environments without the package
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const Twilio = require('twilio');
      const client = Twilio(accountSid, authToken);
      const res = await client.messages.create({ body: message, from, to: phone });
      await logSms(phone, '[twilio] ' + message + ' => SID:' + (res.sid || ''));
      return { ok:true, sid: res.sid };
    }catch(e){
      await logSms(phone, '[twilio-fail] ' + String(e));
      return { ok:false, error: String(e) };
    }
  }
  // fallback: local log
  await logSms(phone, message);
  return { ok:true, fallback:'log' };
}

export async function sendSmsPlaceholder(phone: string, message: string){
  return sendSms(phone, message);
}
