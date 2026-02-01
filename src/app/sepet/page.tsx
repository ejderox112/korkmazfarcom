"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: false });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false });

export default function SepetPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(cartData);
  }, []);

  const removeFromCart = (id: string) => {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const total = cart.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950">
      <Navbar />
      <div className="pt-32 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-8">
            Sepetim
          </h1>

          {cart.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-zinc-600 dark:text-zinc-400 mb-4">
                Sepetiniz boş
              </p>
              <Link
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
              >
                Alışverişe Başla
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 gap-4 mb-8">
                {cart.map((product, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg p-6 border border-zinc-200 dark:border-zinc-800 flex items-center gap-6"
                  >
                    <img
                      src={product.image || "/new-headlight.svg"}
                      alt={product.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">
                        {product.title}
                      </h3>
                      <p className="text-sm text-zinc-600 dark:text-zinc-400">
                        {product.brand} {product.model} - {product.partType}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600 mb-2">
                        {product.price} TL
                      </p>
                      <button
                        onClick={() => removeFromCart(product.id)}
                        className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
                      >
                        Kaldır
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 dark:bg-zinc-900 rounded-xl p-8 border border-blue-200 dark:border-zinc-800">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold text-zinc-900 dark:text-white">
                    Toplam:
                  </span>
                  <span className="text-3xl font-bold text-blue-600">
                    {total.toFixed(2)} TL
                  </span>
                </div>
                <a
                  href={`https://wa.me/905326669351?text=Merhaba, sepetimde ${cart.length} ürün var. Toplam: ${total.toFixed(2)} TL`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-4 bg-green-600 hover:bg-green-700 text-white text-center font-bold rounded-lg transition text-lg"
                >
                  WhatsApp ile Sipariş Ver
                </a>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
