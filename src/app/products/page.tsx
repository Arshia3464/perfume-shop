import { db } from "@/db";
import { product } from "@/db/schema";
import Link from "next/link";

// Premium React Icons for luxury UI branding
import {
  IoManOutline,
  IoWomanOutline,
  IoMaleFemaleOutline,
  IoArrowBackOutline,
  IoSparklesOutline,
} from "react-icons/io5";

export default async function ProductsPage() {
  const products = await db.select().from(product);

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-primary"
    >
      {/* ───── LUXURY EDITORIAL HEADER ───── */}
      <div className="relative overflow-hidden border-b border-secondary/60 bg-secondary/10">
        {/* Background ambient ghost text */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="select-none text-[8rem] md:text-[14rem] font-black opacity-[0.02] tracking-widest">
            عطر
          </span>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 text-center relative z-10 max-w-5xl space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-bold text-accent">
            <IoSparklesOutline className="w-3 h-3" />
            <span>گالری خانه عطر عتیق</span>
          </div>

          <h1 className="text-3xl font-black leading-tight sm:text-5xl lg:text-6xl text-primary">
            رایحه‌هایی برای
            <br />
            <span className="text-accent">سلیقه‌های خاص و متمایز</span>
          </h1>

          <p className="mx-auto max-w-xl text-xs md:text-sm leading-6 md:leading-7 text-neutral-500 font-medium">
            مجموعه‌ای گران‌بها از عطرهای اورجینال، دکانت‌های لوکس کلکسیونی و
            شاهکارهای نایاب نیش از برترین خانه‌های عطر جهان.
          </p>
        </div>
      </div>

      {/* ───── PREMIUM PRODUCT GRID ───── */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, index) => {
            // Elegant Persian translation + specific line icon configuration for target demographic
            const demographic =
              p.gender.toLowerCase() === "men"
                ? {
                    label: "مردانه",
                    icon: <IoManOutline className="w-3.5 h-3.5" />,
                  }
                : p.gender.toLowerCase() === "women"
                  ? {
                      label: "زنانه",
                      icon: <IoWomanOutline className="w-3.5 h-3.5" />,
                    }
                  : {
                      label: "مشترک",
                      icon: <IoMaleFemaleOutline className="w-3.5 h-3.5" />,
                    };

            return (
              <Link
                key={p.id}
                href={`/products/${p.id}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-secondary/60 bg-secondary/10 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
              >
                <div>
                  {/* IMAGE PREVIEW FRAME */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/20 border-b border-secondary/40 flex items-center justify-center">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={p.name}
                        className="h-4/5 w-4/5 object-contain p-4 transition duration-500 group-hover:scale-105 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.05)]"
                      />
                    ) : (
                      <div className="text-xs font-bold text-neutral-400">
                        فاقد تصویر محصول
                      </div>
                    )}

                    {/* Premium minimalist card position index number */}
                    <div className="absolute right-4 top-4 text-[10px] font-bold tracking-widest text-neutral-400">
                      {(index + 1).toLocaleString("fa-IR", {
                        minimumIntegerDigits: 2,
                      })}
                    </div>

                    {/* Floating Gender/Type Badge */}
                    <div className="absolute left-4 top-4 flex items-center gap-1 rounded-md border border-secondary/60 bg-background/80 backdrop-blur-xs px-2 py-1 text-[10px] font-bold text-neutral-500">
                      {demographic.icon}
                      <span>{demographic.label}</span>
                    </div>

                    {/* Gradient soft grounding backdrop shadow */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* ESSENTIAL WRITTEN DETAILS */}
                  <div className="p-5 space-y-2.5">
                    <span className="text-[10px] uppercase tracking-wider text-accent font-bold block">
                      {p.brand}
                    </span>

                    <h2 className="line-clamp-1 text-base font-black text-primary transition-colors group-hover:text-accent">
                      {p.name}
                    </h2>

                    <p className="line-clamp-2 text-xs leading-5 text-neutral-500 font-medium">
                      {p.description ||
                        "توضیحات تکمیلی پیرامون ساختار اسانس و هرم بویایی این عطر ثبت نشده است."}
                    </p>
                  </div>
                </div>

                {/* TRANSACTION PRICING BAR */}
                <div className="px-5 pb-5 pt-2 border-t border-secondary/30 mt-auto flex items-center justify-between">
                  <div className="text-sm font-black text-primary">
                    {p.price.toLocaleString("fa-IR")}{" "}
                    <span className="text-[10px] font-medium text-neutral-400 mr-0.5">
                      تومان
                    </span>
                  </div>

                  {/* Clean vector micro-arrow that translates on container hover */}
                  <div className="flex items-center gap-1 text-[11px] font-bold text-accent transition-colors">
                    <span>مشاهده</span>
                    <IoArrowBackOutline className="w-3.5 h-3.5 transition duration-300 transform group-hover:-translate-x-1" />
                  </div>
                </div>

                {/* Luxury ambient light hover flare hidden behind contents */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100 z-0">
                  <div className="absolute -bottom-12 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
