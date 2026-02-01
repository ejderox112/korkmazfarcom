This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Deployment to cPanel (static)

Build & export then upload to cPanel (public_html)

1. Build and export static site:

```powershell
npm run build
npx next export
Compress-Archive -Path out\* -DestinationPath korkmazfar-full.zip -Force
```

2. Upload zip to your `public_html` using provided helper. Example (PowerShell):

```powershell
# run from project root
scripts\deploy_and_upload.ps1
# The script will prompt for FTP host/user/pass and the remote_unzip.php URL to call.
```

3. Server-side extraction

After upload call `remote_unzip.php` (already included) to extract and apply permissions. Check `unzip_log.txt` at your site root for status.

4. Subscriptions API (optional)

If you want server-side subscription saving + SMS via Twilio, upload `public/api/subscriptions.php` to your server under `public_html/api/subscriptions.php`. Configure Twilio env vars in cPanel if available: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM`.
