"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface Headlight {
  id: number;
  title: string;
  category: string; // ürün grubu
  model: string;
  brand: string;
  year: number;
  price: number;
  image: string;
  geriAlan: string; // Orijinal, Çıkma, Yan Sanayi
  durum: string; // Yeni, İkinci El
}

const DUMMY_HEADLIGHTS: Headlight[] = [
  {
    id: 1,
    title: "Volkswagen Golf 7 Sol Far Camı",
    category: "Far Camı",
    model: "Golf 7",
    brand: "Volkswagen",
    year: 2017,
    price: 3500,
    image: "/new-headlight.svg",
    geriAlan: "Orijinal",
    durum: "Yeni",
  },
  {
    id: 2,
    title: "Renault Clio 4 Sağ Far Kasası",
    category: "Far Kasası",
    model: "Clio 4",
    brand: "Renault",
    year: 2015,
    price: 1200,
    image: "/used-headlight.svg",
    geriAlan: "Çıkma",
    durum: "İkinci El",
  },
  {
    id: 3,
    title: "Ford Focus 3 Led Modül Takımı",
    category: "Led Modül",
    model: "Focus 3",
    brand: "Ford",
    year: 2018,
    price: 4200,
    image: "/new-headlight.svg",
    geriAlan: "Yan Sanayi",
    durum: "Yeni",
  },
];

export default function HeadlightList() {
  const [data] = useState<Headlight[]>(DUMMY_HEADLIGHTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [geriAlan, setGeriAlan] = useState("");
  const [durum, setDurum] = useState("");

  const priceFormatter = new Intl.NumberFormat("tr-TR");

  const filtered = data.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category ? item.category === category : true) &&
      (geriAlan ? item.geriAlan === geriAlan : true) &&
      (durum ? item.durum === durum : true)
  );

  const activeFilters = [
    category && `Grup: ${category}`,
    geriAlan && `Geri Alan: ${geriAlan}`,
    durum && `Durum: ${durum}`,
  ].filter(Boolean);

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <motion.h2
        className="text-3xl font-bold text-blue-900 dark:text-blue-200 mb-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Ürün Arama & Listeleme
      </motion.h2>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 mb-5 justify-center">
        <input
          type="text"
          placeholder="Far, model veya marka ara..."
          className="border rounded px-4 py-2 w-full md:w-60"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-4 py-2 w-full md:w-48"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Tüm Ürün Grupları</option>
          <option value="Far Camı">Far Camı</option>
          <option value="Far Kasası">Far Kasası</option>
          <option value="Led Modül">Led Modül</option>
        </select>
        <select
          className="border rounded px-4 py-2 w-full md:w-40"
          value={geriAlan}
          onChange={(e) => setGeriAlan(e.target.value)}
        >
          <option value="">Tümü (Orijinal/Çıkma/Yan Sanayi)</option>
          <option value="Orijinal">Orijinal</option>
          <option value="Çıkma">Çıkma</option>
          <option value="Yan Sanayi">Yan Sanayi</option>
        </select>
        <select
          className="border rounded px-4 py-2 w-full md:w-40"
          value={durum}
          onChange={(e) => setDurum(e.target.value)}
        >
          <option value="">Tümü (Yeni/İkinci El)</option>
          <option value="Yeni">Yeni</option>
          <option value="İkinci El">İkinci El</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <motion.span
          className="text-sm text-zinc-600 dark:text-zinc-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {filtered.length} ilan · {activeFilters.length ? "Filtreler" : "Tüm ürünler"}
        </motion.span>
        {activeFilters.map((tag) => (
          <motion.span
            key={tag}
            className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 text-sm"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {tag}
          </motion.span>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {filtered.length === 0 && (
          <div className="col-span-3 text-center text-zinc-500">Sonuç bulunamadı.</div>
        )}
        {filtered.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white dark:bg-zinc-900 rounded-xl shadow p-5 flex flex-col items-center"
            whileHover={{ scale: 1.03 }}
          >
            <Image
              src={item.image}
              alt={item.title}
              width={120}
              height={80}
              className="mb-3 rounded"
            />
            <div className="font-bold text-lg text-blue-800 dark:text-blue-200 mb-1">{item.title}</div>
            <div className="text-zinc-600 dark:text-zinc-300 mb-1">{item.brand} {item.model} ({item.year})</div>
            <div className="text-blue-700 font-semibold mb-2">{priceFormatter.format(item.price)} TL</div>
            <span className="text-xs px-2 py-1 rounded bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 mb-2">{item.category} / {item.geriAlan} / {item.durum}</span>
            <button className="mt-2 px-4 py-2 rounded bg-blue-700 text-white font-medium hover:bg-blue-800 transition">Detay</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
