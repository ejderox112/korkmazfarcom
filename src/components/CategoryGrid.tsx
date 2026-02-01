"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const categories = [
  {
    id: 1,
    title: "Far Camı",
    description: "Kırık veya çizik far camlarınız için orijinal ve yan sanayi seçenekleri",
    icon: "🔍",
    count: 150,
    color: "from-blue-500 to-blue-600",
  },
  {
    id: 2,
    title: "Far Kasası",
    description: "Hasarlı far kasaları için uygun fiyatlı yedek parçalar",
    icon: "🏠",
    count: 85,
    color: "from-emerald-500 to-emerald-600",
  },
  {
    id: 3,
    title: "Led Modül",
    description: "Modern araçlar için led modül ve sürücü üniteleri",
    icon: "💡",
    count: 60,
    color: "from-amber-500 to-orange-500",
  },
  {
    id: 4,
    title: "Xenon Beyni",
    description: "Xenon far sistemleri için elektronik kontrol üniteleri",
    icon: "⚡",
    count: 45,
    color: "from-purple-500 to-purple-600",
  },
  {
    id: 5,
    title: "Sinyal Lambası",
    description: "Ön ve arka sinyal lambaları, dönüş sinyalleri",
    icon: "🚗",
    count: 120,
    color: "from-rose-500 to-red-500",
  },
  {
    id: 6,
    title: "Komple Far",
    description: "Tüm markalara uygun komple far setleri",
    icon: "✨",
    count: 75,
    color: "from-cyan-500 to-teal-500",
  },
];

export default function CategoryGrid() {
  return (
    <section id="kategoriler" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Kategoriler
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
            Ürün Kategorilerimiz
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-xl mx-auto">
            Aradığınız far parçasını kolayca bulun
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <motion.a
              key={cat.id}
              href={`#urunler?category=${encodeURIComponent(cat.title)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className="group relative bg-zinc-50 dark:bg-zinc-800 rounded-2xl p-6 overflow-hidden cursor-pointer"
            >
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{cat.icon}</div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-white transition-colors">
                  {cat.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 group-hover:text-white/80 mt-2 text-sm transition-colors">
                  {cat.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-blue-600 group-hover:text-white transition-colors">
                    {cat.count} ürün
                  </span>
                  <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-zinc-700 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                    <svg className="w-4 h-4 text-blue-600 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
