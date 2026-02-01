"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const brands = ["Volkswagen", "BMW", "Mercedes", "Audi", "Ford", "Renault", "Toyota", "Opel"];
const partTypes = ["Far Camı", "Far Kasası", "Led Modül", "Xenon Beyni", "Sinyal Lambası"];

export default function NotifySubscribe() {
  const [phone, setPhone] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [partType, setPartType] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!phone || phone.length < 10) {
      setError("Geçerli bir telefon numarası girin.");
      return;
    }
    if (!brand || !partType) {
      setError("Marka ve parça tipi seçin.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/subscriptions.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, brand, model, partType }),
      });
      if (res.ok) {
        setSuccess(true);
        setPhone('');
        setBrand('');
        setModel('');
        setPartType('');
      } else {
        // fallback to WhatsApp if endpoint missing or blocked
        const message = `Merhaba, aşağıdaki parça için bildirim almak istiyorum:%0A%0A📱 Telefon: ${phone}%0A🚗 Marka: ${brand}%0A📋 Model: ${model || 'Belirtilmedi'}%0A🔧 Parça: ${partType}`;
        window.open(`https://wa.me/905326669351?text=${message}`, '_blank');
        setSuccess(true);
      }
    } catch (err) {
      const message = `Merhaba, aşağıdaki parça için bildirim almak istiyorum:%0A%0A📱 Telefon: ${phone}%0A🚗 Marka: ${brand}%0A📋 Model: ${model || 'Belirtilmedi'}%0A🔧 Parça: ${partType}`;
      window.open(`https://wa.me/905326669351?text=${message}`, '_blank');
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-blue-800 relative overflow-hidden">
      {/* Dekoratif Şekiller */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 text-white text-sm font-medium mb-4">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            SMS Bildirim Servisi
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Aradığınız Parçayı Biz Bulalım
          </h2>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Aradığınız marka ve parça tipini belirtin, stoka girdiğinde size hemen SMS ile haber verelim!
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl p-8 text-center"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Kayıt Başarılı!</h3>
              <p className="text-zinc-600 mb-6">
                Aradığınız parça stoka girdiğinde size SMS ile haber vereceğiz.
              </p>
              <button
                onClick={() => setSuccess(false)}
                className="px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition"
              >
                Başka Parça Ekle
              </button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Telefon Numarası *</label>
                  <input
                    type="tel"
                    placeholder="05XX XXX XX XX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    maxLength={11}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Marka *</label>
                  <select
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">Marka Seçin</option>
                    {brands.map((b) => (
                      <option key={b} value={b}>{b}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Model (Opsiyonel)</label>
                  <input
                    type="text"
                    placeholder="Örn: Golf 7, Focus 3"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-2">Parça Tipi *</label>
                  <select
                    value={partType}
                    onChange={(e) => setPartType(e.target.value)}
                    className="w-full px-4 py-3 border border-zinc-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white"
                  >
                    <option value="">Parça Tipi Seçin</option>
                    {partTypes.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold text-lg shadow-lg disabled:opacity-50 transition-all"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Kaydediliyor...
                  </span>
                ) : (
                  "Bana Haber Ver"
                )}
              </button>

              <p className="text-center text-zinc-500 text-sm mt-4">
                Bilgileriniz gizli tutulur, sadece stok bildirimi için kullanılır.
              </p>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
