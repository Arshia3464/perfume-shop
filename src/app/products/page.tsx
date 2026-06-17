import { db } from "@/db";
import { product } from "@/db/schema";
import Link from "next/link";

export default async function ProductsPage() {
  const products = await db.select().from(product);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
    >
      {/* ───── HEADER ───── */}
      <div className="relative overflow-hidden border-b border-border/40">
        {/* background ghost text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[10rem] font-black opacity-[0.03]">
            عطر
          </span>
        </div>

        <div className="container mx-auto px-6 py-20 text-center">
          <p className="text-xs tracking-[0.35em] text-muted-foreground">
            مجموعه محصولات
          </p>

          <h1 className="mt-4 text-4xl font-black leading-[1.2] lg:text-6xl">
            رایحه‌هایی برای
            <br />
            <span className="text-[var(--accent)]">سلیقه‌های خاص</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground">
            مجموعه‌ای از عطرهای اصل، دکانت‌های لوکس و رایحه‌های نایاب از برندهای
            جهانی.
          </p>
        </div>
      </div>

      {/* ───── GRID ───── */}
      <div className="container mx-auto px-6 py-14">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, index) => (
            <Link
              key={p.id}
              href={`/products/${p.id}`}
              className="group relative overflow-hidden rounded-3xl border border-border/40 bg-[var(--secondary)]/30 transition-all duration-500 hover:-translate-y-1 hover:border-[var(--accent)]/40"
            >
              {/* IMAGE SECTION */}
              <div className="relative h-[260px] overflow-hidden bg-black/5">
                {p.image ? (
                  <img
                    src={p.image}
                    alt={p.name}
                    className="h-full w-full object-contain p-6 transition duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                    بدون تصویر
                  </div>
                )}

                {/* soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/80 via-transparent to-transparent" />

                {/* index number */}
                <div className="absolute left-4 top-4 text-xs tracking-[0.3em] text-foreground/40">
                  {String(index + 1).padStart(2, "0")}
                </div>
              </div>

              {/* CONTENT */}
              <div className="space-y-3 p-5">
                <h2 className="line-clamp-1 text-lg font-bold">{p.name}</h2>

                <p className="line-clamp-2 text-xs leading-6 text-muted-foreground">
                  {p.description || "بدون توضیحات"}
                </p>

                {/* META */}
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{p.brand}</span>
                  <span>
                    {p.gender === "men"
                      ? "مردانه"
                      : p.gender === "women"
                        ? "زنانه"
                        : "یونی‌سکس"}
                  </span>
                </div>

                {/* PRICE + CTA */}
                <div className="flex items-center justify-between pt-2">
                  <span className="text-sm font-semibold">
                    {p.price.toLocaleString()} تومان
                  </span>

                  <span className="text-xs text-[var(--accent)] group-hover:translate-x-1 transition">
                    مشاهده →
                  </span>
                </div>
              </div>

              {/* hover glow */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100">
                <div className="absolute -bottom-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-3xl" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
