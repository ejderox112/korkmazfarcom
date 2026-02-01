"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (user: any) => void;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!phone || !name) {
      setError("Telefon ve isim gerekli");
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, name }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setShowOTP(true);
        setError("");
      } else {
        setError(data.error || "Kayıt başarısız");
      }
    } catch (err) {
      setError("Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length < 6) {
      setError("6 haneli kodu girin");
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, code: otp }),
      });
      
      const data = await res.json();
      
      if (res.ok && data.user) {
        onAuthSuccess(data.user);
        onClose();
      } else {
        setError(data.error || "Doğrulama başarısız");
      }
    } catch (err) {
      setError("Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async () => {
    if (!phone) {
      setError("Telefon numarası gerekli");
      return;
    }
    setLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setShowOTP(true);
        setError("");
      } else {
        setError(data.error || "Giriş başarısız");
      }
    } catch (err) {
      setError("Bağlantı hatası");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl max-w-md w-full p-8"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
              {showOTP ? "SMS Doğrulama" : mode === "login" ? "Giriş Yap" : "Üye Ol"}
            </h2>
            <button
              onClick={onClose}
              className="text-zinc-500 hover:text-zinc-800 dark:hover:text-white text-2xl"
            >
              ✕
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {!showOTP ? (
            <>
              {mode === "register" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                    Ad Soyad
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
                    placeholder="Adınız Soyadınız"
                  />
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
                  Telefon Numarası
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
                  placeholder="0532 XXX XX XX"
                />
              </div>

              <button
                onClick={mode === "login" ? handleLogin : handleRegister}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "İşleniyor..." : mode === "login" ? "SMS Gönder" : "Kayıt Ol"}
              </button>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setMode(mode === "login" ? "register" : "login");
                    setError("");
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {mode === "login" ? "Üye değil misiniz? Kayıt olun" : "Zaten üye misiniz? Giriş yapın"}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                <strong>{phone}</strong> numarasına gönderilen 6 haneli kodu girin:
              </p>

              <div className="mb-6">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  maxLength={6}
                  className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg text-center text-2xl font-mono tracking-widest focus:ring-2 focus:ring-blue-500 dark:bg-zinc-800 dark:text-white"
                  placeholder="000000"
                />
              </div>

              <button
                onClick={handleVerifyOTP}
                disabled={loading || otp.length < 6}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors disabled:opacity-50"
              >
                {loading ? "Doğrulanıyor..." : "Doğrula"}
              </button>

              <div className="mt-4 text-center">
                <button
                  onClick={() => {
                    setShowOTP(false);
                    setOtp("");
                    setError("");
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ← Geri Dön
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
