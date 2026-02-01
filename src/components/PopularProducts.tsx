"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const popularItems = [
  { id: 1, title: "Volkswagen Golf 7 Far Camı", price: 3500, image: "/new-headlight.svg", badge: "Çok Satan" },
  { id: 2, title: "BMW F30 Led Modül", price: 4800, image: "/new-headlight.svg", badge: "Yeni" },
  { id: 3, title: "Mercedes C180 Far Kasası", price: 2200, image: "/used-headlight.svg", badge: "Fırsat" },
  { id: 4, title: "Audi A4 B8 Xenon Beyni", price: 1500, image: "/new-headlight.svg", badge: "İndirimli" },
];

export default function PopularProducts() {
  const priceFormatter = new Intl.NumberFormat("tr-TR");

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Öne Çıkanlar</span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
            Popüler Ürünler
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-xl mx-auto">
            En çok tercih edilen ve beğenilen far ürünlerimiz
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="bg-white dark:bg-zinc-900 rounded-2xl shadow-lg overflow-hidden group cursor-pointer"
            >
              <div className="relative h-48 bg-zinc-100 dark:bg-zinc-800">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full">
                  {item.badge}
                </span>
                {/* Favorilere Ekle */}
                <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-zinc-800/90 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 dark:hover:bg-red-900/30">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2 line-clamp-2">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-blue-600">
                    {priceFormatter.format(item.price)} ₺
                  </span>
                  <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
