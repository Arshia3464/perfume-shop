import { db } from "@/db";
import { product } from "@/db/schema";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await db.select().from(product);

  return (
    <div className="min-h-screen bg-zinc-50 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">محصولات</h1>
          <p className="text-sm text-gray-500">مجموعه‌ای از بهترین عطرها</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition group"
            >
              {/* Image */}
              <div className="h-44 bg-gray-100 overflow-hidden">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    بدون تصویر
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-3 space-y-2">
                <h2 className="text-sm font-medium line-clamp-1">{p.name}</h2>

                <p className="text-xs text-gray-500 line-clamp-2">
                  {p.description || "بدون توضیحات"}
                </p>

                {/* Tags */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <span>{p.brand}</span>
                  <span>•</span>
                  <span>
                    {p.gender === "men"
                      ? "مردانه"
                      : p.gender === "women"
                        ? "زنانه"
                        : "یونی‌سکس"}
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold">
                    {p.price.toLocaleString()} تومان
                  </span>

                  <Link
                    href={`/products/${p.id}`}
                    className="text-xs bg-black text-white px-3 py-1.5 rounded-lg hover:opacity-90"
                  >
                    مشاهده
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
