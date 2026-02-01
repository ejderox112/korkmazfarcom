"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function FavorilerPage() {
  const [favorites, setFavorites] = useState<any[]>([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(favs);
  }, []);

  const removeFavorite = (id: string) => {
    const updated = favorites.filter((f) => f.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
            Favorilerim
          </h1>

          {favorites.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-4">
                Favori ürününüz yok
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                Ürünlere Göz At
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((product) => (
                <div
                  key={product.id}
                  className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-800"
                >
                  <img
                    src={product.image || "/new-headlight.svg"}
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                    {product.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    {product.brand} {product.model}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    {product.price} TL
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
                        cart.push(product);
                        localStorage.setItem("cart", JSON.stringify(cart));
                        alert("Sepete eklendi!");
                      }}
                      className="flex-1 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
                    >
                      Sepete Ekle
                    </button>
                    <button
                      onClick={() => removeFavorite(product.id)}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
