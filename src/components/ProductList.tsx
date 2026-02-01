"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Headlight {
  id: number;
  title: string;
  category: string;
  model: string;
  brand: string;
  year: number;
  price: number;
  image: string;
  geriAlan: string;
  durum: string;
}

const DUMMY_HEADLIGHTS: Headlight[] = [
  { id: 1, title: "Volkswagen Golf 7 Sol Far Camı", category: "Far Camı", model: "Golf 7", brand: "Volkswagen", year: 2017, price: 3500, image: "/new-headlight.svg", geriAlan: "Orijinal", durum: "Yeni" },
  { id: 2, title: "Renault Clio 4 Sağ Far Kasası", category: "Far Kasası", model: "Clio 4", brand: "Renault", year: 2015, price: 1200, image: "/used-headlight.svg", geriAlan: "Çıkma", durum: "İkinci El" },
  { id: 3, title: "Ford Focus 3 Led Modül Takımı", category: "Led Modül", model: "Focus 3", brand: "Ford", year: 2018, price: 4200, image: "/new-headlight.svg", geriAlan: "Yan Sanayi", durum: "Yeni" },
  { id: 4, title: "BMW F30 Xenon Beyni", category: "Xenon Beyni", model: "3 Serisi F30", brand: "BMW", year: 2016, price: 2800, image: "/new-headlight.svg", geriAlan: "Orijinal", durum: "Yeni" },
  { id: 5, title: "Mercedes C180 W205 Far Camı", category: "Far Camı", model: "C Serisi W205", brand: "Mercedes", year: 2019, price: 4500, image: "/new-headlight.svg", geriAlan: "Orijinal", durum: "Yeni" },
  { id: 6, title: "Audi A4 B8 Komple Far", category: "Komple Far", model: "A4 B8", brand: "Audi", year: 2014, price: 6500, image: "/used-headlight.svg", geriAlan: "Çıkma", durum: "İkinci El" },
  { id: 7, title: "Toyota Corolla Sinyal Lambası", category: "Sinyal Lambası", model: "Corolla", brand: "Toyota", year: 2020, price: 850, image: "/new-headlight.svg", geriAlan: "Yan Sanayi", durum: "Yeni" },
  { id: 8, title: "Opel Astra J Far Kasası", category: "Far Kasası", model: "Astra J", brand: "Opel", year: 2013, price: 1800, image: "/used-headlight.svg", geriAlan: "Çıkma", durum: "İkinci El" },
];

const categories = ["Far Camı", "Far Kasası", "Led Modül", "Xenon Beyni", "Sinyal Lambası", "Komple Far"];
const brands = ["Volkswagen", "BMW", "Mercedes", "Audi", "Ford", "Renault", "Toyota", "Opel"];

export default function ProductList() {
  const [data] = useState<Headlight[]>(DUMMY_HEADLIGHTS);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [geriAlan, setGeriAlan] = useState("");
  const [durum, setDurum] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cart, setCart] = useState<number[]>([]);

  const priceFormatter = new Intl.NumberFormat("tr-TR");

  // LocalStorage'dan favoriler ve sepeti yükle
  useEffect(() => {
    const savedFavs = JSON.parse(localStorage.getItem("favorites") || "[]");
    const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setFavorites(savedFavs);
    setCart(savedCart);
  }, []);

  // Favorilere ekle/çıkar
  const toggleFavorite = (id: number) => {
    const newFavs = favorites.includes(id)
      ? favorites.filter((f) => f !== id)
      : [...favorites, id];
    setFavorites(newFavs);
    localStorage.setItem("favorites", JSON.stringify(newFavs));
  };

  // Sepete ekle
  const addToCart = (id: number) => {
    if (!cart.includes(id)) {
      const newCart = [...cart, id];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
    }
  };

  // Filtreleme
  let filtered = data.filter(
    (item) =>
      (item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase()) ||
        item.model.toLowerCase().includes(search.toLowerCase())) &&
      (category ? item.category === category : true) &&
      (brand ? item.brand === brand : true) &&
      (geriAlan ? item.geriAlan === geriAlan : true) &&
      (durum ? item.durum === durum : true)
  );

  // Sıralama
  if (sortBy === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === "newest") {
    filtered = [...filtered].sort((a, b) => b.year - a.year);
  }

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setBrand("");
    setGeriAlan("");
    setDurum("");
    setSortBy("default");
  };

  const hasFilters = search || category || brand || geriAlan || durum;

  return (
    <section id="urunler" className="py-20 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Başlık */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
            Ürünlerimiz
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
            Tüm Far Parçaları
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mt-3 max-w-xl mx-auto">
            Aradığınız parçayı filtrelerle kolayca bulun
          </p>
        </motion.div>

        {/* Filtreler */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Arama */}
            <div className="lg:col-span-2">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Far, marka veya model ara..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white transition"
                />
              </div>
            </div>

            {/* Kategori */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
            >
              <option value="">Tüm Kategoriler</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>

            {/* Marka */}
            <select
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
            >
              <option value="">Tüm Markalar</option>
              {brands.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Durum */}
            <select
              value={durum}
              onChange={(e) => setDurum(e.target.value)}
              className="px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
            >
              <option value="">Yeni / İkinci El</option>
              <option value="Yeni">Yeni</option>
              <option value="İkinci El">İkinci El</option>
            </select>

            {/* Sıralama */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-zinc-200 dark:border-zinc-700 rounded-xl focus:ring-2 focus:ring-blue-500 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white"
            >
              <option value="default">Sırala</option>
              <option value="price-asc">Fiyat (Düşük-Yüksek)</option>
              <option value="price-desc">Fiyat (Yüksek-Düşük)</option>
              <option value="newest">En Yeni</option>
            </select>
          </div>

          {/* Aktif Filtreler */}
          {hasFilters && (
            <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-700">
              <span className="text-sm text-zinc-500">Aktif filtreler:</span>
              {search && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  "{search}"
                </span>
              )}
              {category && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {category}
                </span>
              )}
              {brand && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {brand}
                </span>
              )}
              {durum && (
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                  {durum}
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-sm text-red-600 hover:text-red-700 font-medium ml-2"
              >
                Temizle
              </button>
            </div>
          )}
        </motion.div>

        {/* Sonuç Sayısı & Görünüm */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-zinc-600 dark:text-zinc-400">
            <span className="font-semibold text-zinc-900 dark:text-white">{filtered.length}</span> ürün bulundu
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-2 rounded-lg transition ${viewMode === "grid" ? "bg-blue-100 text-blue-600" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-2 rounded-lg transition ${viewMode === "list" ? "bg-blue-100 text-blue-600" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600"}`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Ürün Listesi */}
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 bg-zinc-100 dark:bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-2">
                Sonuç Bulunamadı
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                Arama kriterlerinize uygun ürün bulunamadı.
              </p>
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition"
              >
                Filtreleri Temizle
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "flex flex-col gap-4"}
            >
              {filtered.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: viewMode === "grid" ? -5 : 0 }}
                  className={`bg-white dark:bg-zinc-800 rounded-2xl shadow-lg overflow-hidden group ${
                    viewMode === "list" ? "flex flex-row" : ""
                  }`}
                >
                  {/* Görsel */}
                  <div className={`relative bg-zinc-100 dark:bg-zinc-700 ${viewMode === "list" ? "w-40 h-32 flex-shrink-0" : "h-48"}`}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-4 group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Durum Badge */}
                    <span className={`absolute top-2 left-2 px-2 py-1 text-xs font-semibold rounded-full ${
                      item.durum === "Yeni" ? "bg-green-500 text-white" : "bg-amber-500 text-white"
                    }`}>
                      {item.durum}
                    </span>
                    {/* Favori Butonu */}
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`absolute top-2 right-2 p-2 rounded-full transition ${
                        favorites.includes(item.id)
                          ? "bg-red-500 text-white"
                          : "bg-white/90 dark:bg-zinc-800/90 text-zinc-600 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <svg className="w-4 h-4" fill={favorites.includes(item.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* İçerik */}
                  <div className={`p-4 flex flex-col ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-zinc-900 dark:text-white line-clamp-2">
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                      {item.brand} {item.model} • {item.year}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-3">
                      <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded text-xs">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 bg-zinc-100 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded text-xs">
                        {item.geriAlan}
                      </span>
                    </div>
                    <div className="mt-auto flex items-center justify-between">
                      <span className="text-xl font-bold text-blue-600">
                        {priceFormatter.format(item.price)} ₺
                      </span>
                      <div className="flex gap-2">
                        <a
                          href={`https://wa.me/905326669351?text=Merhaba, ${item.title} hakkında bilgi almak istiyorum.`}
                          target="_blank"
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
                          title="WhatsApp ile Sor"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                          </svg>
                        </a>
                        <button
                          onClick={() => addToCart(item.id)}
                          className={`p-2 rounded-full transition ${
                            cart.includes(item.id)
                              ? "bg-blue-100 text-blue-600"
                              : "bg-blue-600 hover:bg-blue-700 text-white"
                          }`}
                          title="Sepete Ekle"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
