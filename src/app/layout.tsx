import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Korkmaz Far - Yeni ve İkinci El Araba Farı Satışı",
  description: "Tüm marka ve model araçlar için orijinal ve uygun fiyatlı yeni & ikinci el araba farı çözümleri.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* BAKIM UYARISI - KALDIRILABİLİR */}
        <div style={{
          background: 'linear-gradient(90deg,#fbbf24,#f87171)',
          color: '#222',
          fontWeight: 600,
          fontSize: '1.1rem',
          textAlign: 'center',
          padding: '14px 8px',
          borderBottom: '2px solid #f87171',
          zIndex: 9999,
          position: 'relative',
        }}>
          Sitemiz <b>02.02.2026</b> tarihinden itibaren <b>bakım sürecindedir</b>.<br/>
          <span style={{fontWeight:400}}>Hiçbir ürün ve aksesuar bu uyarı kaldırılmadan aktif fiyatta sunulamayacaktır.</span><br/>
          <span style={{fontSize:'0.95em',fontWeight:400}}>Saygılarımız ile, <b>oxreklam</b></span>
        </div>
        {children}
      </body>
    </html>
  );
}
