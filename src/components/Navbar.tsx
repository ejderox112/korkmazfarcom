"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";

const AuthModal = dynamic(() => import("./AuthModal"), { ssr: false });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // LocalStorage'dan sepet ve favori sayısını al + kullanıcı durumu
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const savedUser = localStorage.getItem("user");
    setCartCount(cart.length);
    setFavCount(favs.length);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 dark:bg-zinc-900/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo - BÜYÜTÜLDÜ */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">KF</span>
          </div>
          <span className="text-2xl font-bold text-blue-900 dark:text-white hidden sm:block">
            Korkmaz Far
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#urunler" className="text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition font-medium">
            Ürünler
          </Link>
          <Link href="#kategoriler" className="text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition font-medium">
            Kategoriler
          </Link>
          <Link href="#hakkimizda" className="text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition font-medium">
            Hakkımızda
          </Link>
          <Link href="#iletisim" className="text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition font-medium">
            İletişim
          </Link>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-4">
          {/* Giriş/Kullanıcı */}
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-200 hidden md:block">
                {user.name}
              </span>
              <button
                onClick={() => {
                  localStorage.removeItem("user");
                  setUser(null);
                }}
                className="text-xs text-red-600 hover:underline"
              >
                Çıkış
              </button>
            </div>
          ) : (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition hidden md:block"
            >
              Giriş / Üye Ol
            </button>
          )}

          {/* Favoriler */}
          <Link href="/favoriler" className="relative p-2 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-800 transition">
            <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            {favCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {favCount}
              </span>
            )}
          </Link>

          {/* Sepet */}
          <Link href="/sepet" className="relative p-2 rounded-full hover:bg-blue-100 dark:hover:bg-zinc-800 transition">
            <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6 text-zinc-700 dark:text-zinc-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-zinc-900 border-t dark:border-zinc-800"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <Link href="#urunler" className="text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition font-medium py-2">
                Ürünler
              </Link>
              <Link href="#kategoriler" className="text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition font-medium py-2">
                Kategoriler
              </Link>
              <Link href="#hakkimizda" className="text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition font-medium py-2">
                Hakkımızda
              </Link>
              <Link href="#iletisim" className="text-zinc-700 dark:text-zinc-200 hover:text-blue-600 transition font-medium py-2">
                İletişim
              </Link>
              {!user && (
                <button
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileOpen(false);
                  }}
                  className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                >
                  Giriş / Üye Ol
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onAuthSuccess={(userData) => {
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData);
          setAuthModalOpen(false);
        }}
      />
    </motion.nav>
  );
}
