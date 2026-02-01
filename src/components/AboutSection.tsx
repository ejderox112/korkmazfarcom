"use client";
import { motion } from "framer-motion";

const stats = [
  { value: "20+", label: "Yıllık Tecrübe" },
  { value: "5000+", label: "Mutlu Müşteri" },
  { value: "10.000+", label: "Satılan Ürün" },
  { value: "500+", label: "Araç Modeli" },
];

export default function AboutSection() {
  return (
    <section id="hakkimizda" className="py-20 bg-white dark:bg-zinc-900">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Sol Taraf - İçerik */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Hakkımızda
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-2 mb-6">
              20+ Yıllık Tecrübe ile Yanınızdayız
            </h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
              <p>
                <strong className="text-zinc-900 dark:text-white">Korkmaz Far</strong> olarak 
                2004 yılından bu yana İzmir Bornova'da hizmet vermekteyiz. Tüm marka ve model 
                araçlar için orijinal, çıkma ve yan sanayi far parçaları sunuyoruz.
              </p>
              <p>
                Müşteri memnuniyetini ön planda tutarak, kaliteli ürünleri uygun fiyatlarla 
                sizlere ulaştırıyoruz. Her ürünümüz kontrol edilmiş ve garantili olarak 
                gönderilmektedir.
              </p>
              <p>
                Türkiye'nin her yerine güvenli kargo ile teslimat yapıyoruz. Teknik 
                sorularınız için WhatsApp üzerinden 7/24 destek alabilirsiniz.
              </p>
            </div>

            {/* İletişim Bilgileri */}
            <div className="mt-8 p-6 bg-zinc-50 dark:bg-zinc-800 rounded-2xl">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-white mb-4">
                Halil Korkmaz
              </h3>
              <div className="space-y-3">
                <a href="tel:+905326669351" className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  +90 532 666 93 51
                </a>
                <a href="mailto:korkmazfar@gmail.com" className="flex items-center gap-3 text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  korkmazfar@gmail.com
                </a>
                <div className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Kazımdirik, 357/3. Sk. No:3, 35100 Bornova/İzmir
                </div>
              </div>
            </div>
          </motion.div>

          {/* Sağ Taraf - İstatistikler */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-blue-50 to-white dark:from-zinc-800 dark:to-zinc-900 rounded-2xl p-8 text-center shadow-lg border border-blue-100 dark:border-zinc-700"
              >
                <div className="text-4xl md:text-5xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-zinc-600 dark:text-zinc-400 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
