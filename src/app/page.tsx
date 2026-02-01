
"use client";

import dynamic from "next/dynamic";

// Lazy load components for better performance
const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const HeroSlider = dynamic(() => import("@/components/HeroSlider"), { ssr: false });
const Features = dynamic(() => import("@/components/Features"), { ssr: false });
const PopularProducts = dynamic(() => import("@/components/PopularProducts"), { ssr: false });
const CategoryGrid = dynamic(() => import("@/components/CategoryGrid"), { ssr: false });
const ProductList = dynamic(() => import("@/components/ProductList"), { ssr: false });
const NotifySubscribe = dynamic(() => import("@/components/NotifySubscribe"), { ssr: false });
const AboutSection = dynamic(() => import("@/components/AboutSection"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });
const WhatsAppButton = dynamic(() => import("@/components/WhatsAppButton"), { ssr: false });

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      {/* Navbar */}
      <Navbar />

      {/* Hero Slider */}
      <HeroSlider />

      {/* Özellikler */}
      <Features />

      {/* Popüler Ürünler */}
      <PopularProducts />

      {/* Kategoriler */}
      <CategoryGrid />

      {/* Tüm Ürünler */}
      <ProductList />

      {/* Bildirim Aboneliği */}
      <NotifySubscribe />

      {/* Hakkımızda & İletişim */}
      <AboutSection />

      {/* Footer */}
      <Footer />

      {/* WhatsApp Floating Button */}
      <WhatsAppButton />
    </div>
  );
}
