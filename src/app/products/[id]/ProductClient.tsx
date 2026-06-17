"use client";

import { useState } from "react";

import { addToCart, wishListToggle } from "../actions";

type Product = {
  id: string;

  name: string;

  description: string | null;

  price: number;

  stock: number;

  brand: string;

  gender: string;

  season: string | null;

  volumeMl: number | null;

  image: string | null;
};

export default function ProductClient({ item }: { item: Product }) {
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    try {
      setLoading(true);

      await addToCart(item.id);

      alert("به سبد خرید اضافه شد");
    } catch (err) {
      console.error(err);

      alert("ابتدا وارد حساب شوید");
    } finally {
      setLoading(false);
    }
  };

  const toggleWishList = async () => {
    try {
      await wishListToggle(item.id);

      alert("تغییر با موفقیت انجام شد");
    } catch (err) {
      console.error(err);

      alert("ابتدا وارد حساب شوید");
    }
  };

  return (
    <div className="min-h-screen py-10 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 bg-white border rounded-3xl shadow-sm overflow-hidden">
          {/* IMAGE */}
          <div className="bg-gray-100 h-105 md:h-full">
            {item.image ? (
              <img
                src={item.image ?? undefined}
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-400">
                بدون تصویر
              </div>
            )}
          </div>

          {/* INFO */}
          <div className="p-6 flex flex-col justify-between">
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold">{item.name}</h1>

              {/* TAGS */}
              <div className="flex flex-wrap gap-2 text-xs text-gray-500">
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  {item.brand}
                </span>

                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  {item.gender === "men"
                    ? "مردانه"
                    : item.gender === "women"
                      ? "زنانه"
                      : "یونی‌سکس"}
                </span>

                {item.season && (
                  <span className="px-3 py-1 bg-gray-100 rounded-full">
                    {item.season}
                  </span>
                )}
              </div>

              {/* DESCRIPTION */}
              <p className="text-sm text-gray-600 leading-relaxed">
                {item.description || "توضیحی ثبت نشده است."}
              </p>

              {/* VOLUME */}
              {item.volumeMl && (
                <p className="text-sm text-gray-500">
                  حجم: {item.volumeMl} میلی‌لیتر
                </p>
              )}
            </div>

            {/* BOTTOM */}
            <div className="space-y-4 mt-6">
              <div className="text-2xl font-semibold">
                {item.price.toLocaleString()} تومان
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={loading}
                  className="flex-1 bg-black text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
                >
                  {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
                </button>

                <button
                  onClick={toggleWishList}
                  className="px-4 py-3 border rounded-xl hover:bg-gray-50 transition"
                >
                  ♥
                </button>
              </div>

              <p className="text-xs text-gray-400">
                ارسال سریع • ضمانت اصالت کالا
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
