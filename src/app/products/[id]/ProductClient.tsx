"use client";

import { useMemo, useState } from "react";
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

const seasonMap: Record<string, string> = {
  winter: "Winter Depth ❄️",
  summer: "Summer Freshness ☀️",
  spring: "Floral Breeze 🌿",
  autumn: "Warm Woods 🍂",
};

function splitDescription(text: string | null) {
  if (!text) return { intro: "", body: "", end: "" };

  const parts = text.split(".");
  return {
    intro: parts[0] || "",
    body: parts.slice(1, -1).join("."),
    end: parts[parts.length - 1] || "",
  };
}

export default function ProductClient({ item }: { item: Product }) {
  const [loading, setLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);

  const desc = useMemo(() => splitDescription(item.description), [item]);

  const mood = useMemo(() => {
    if (item.gender === "men") return "Bold & confident presence";
    if (item.gender === "women") return "Elegant & expressive aura";
    return "Balanced signature scent";
  }, [item.gender]);

  const seasonLabel =
    (item.season && seasonMap[item.season.toLowerCase()]) ||
    item.season ||
    "All-season signature";

  const handleAddToCart = async () => {
    try {
      setLoading(true);
      await addToCart(item.id);
      alert("به سبد خرید اضافه شد");
    } catch {
      alert("ابتدا وارد حساب شوید");
    } finally {
      setLoading(false);
    }
  };

  const toggleWishList = async () => {
    try {
      setWishLoading(true);
      await wishListToggle(item.id);
      alert("تغییر با موفقیت انجام شد");
    } catch {
      alert("ابتدا وارد حساب شوید");
    } finally {
      setWishLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
    >
      <div className="container mx-auto px-6 py-16 space-y-16">
        {/* ───────── HERO ───────── */}
        <section className="grid gap-10 lg:grid-cols-2 items-center">
          {/* IMAGE */}
          <div className="relative flex items-center justify-center overflow-hidden rounded-3xl bg-[var(--secondary)]/40 min-h-[420px]">
            <div className="absolute h-72 w-72 rounded-full bg-[var(--accent)]/10 blur-3xl" />

            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="relative z-10 h-full w-full object-contain p-10 transition duration-700 hover:scale-105"
              />
            ) : (
              <div className="text-sm text-muted-foreground">بدون تصویر</div>
            )}
          </div>

          {/* BASIC INFO */}
          <div className="space-y-6">
            <p className="text-xs tracking-[0.35em] text-muted-foreground">
              {item.brand}
            </p>

            <h1 className="text-4xl font-black leading-[1.2] lg:text-5xl">
              {item.name}
            </h1>

            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-[var(--secondary)] px-4 py-1 text-xs">
                {seasonLabel}
              </span>

              <span className="rounded-full bg-[var(--secondary)] px-4 py-1 text-xs">
                {item.volumeMl ? `${item.volumeMl} ml` : "Signature"}
              </span>

              <span className="rounded-full bg-[var(--secondary)] px-4 py-1 text-xs">
                {mood}
              </span>
            </div>

            <div className="text-3xl font-bold">
              {item.price.toLocaleString()} تومان
            </div>
          </div>
        </section>

        {/* ───────── STORY ───────── */}
        <section className="space-y-6 max-w-3xl">
          <h2 className="text-sm tracking-[0.35em] text-muted-foreground">
            داستان رایحه
          </h2>

          <p className="text-lg leading-8">{desc.intro}</p>

          <p className="text-sm leading-7 text-muted-foreground">{desc.body}</p>

          <p className="text-sm italic text-muted-foreground">{desc.end}</p>
        </section>

        {/* ───────── MOOD / EXPERIENCE ───────── */}
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "شخصیت رایحه",
              value: mood,
            },
            {
              title: "زمان مناسب",
              value: item.season || "چهار فصل",
            },
            {
              title: "نوع تجربه",
              value: "Luxury Decant Experience",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border/40 bg-[var(--secondary)]/30 p-6"
            >
              <p className="text-xs text-muted-foreground">{c.title}</p>
              <p className="mt-2 font-semibold">{c.value}</p>
            </div>
          ))}
        </section>

        {/* ───────── BRAND STRIP ───────── */}
        <section className="border-y border-border/40 py-10 text-center">
          <p className="text-xs tracking-[0.35em] text-muted-foreground">
            انتخاب از خانه عطر
          </p>
          <h3 className="mt-2 text-2xl font-bold">{item.brand}</h3>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="text-2xl font-bold">
            {item.price.toLocaleString()} تومان
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAddToCart}
              disabled={loading}
              className="rounded-full bg-[var(--primary)] px-8 py-3 text-sm font-medium text-[var(--background)] transition hover:scale-105 disabled:opacity-50"
            >
              {loading ? "در حال افزودن..." : "افزودن به سبد خرید"}
            </button>

            <button
              onClick={toggleWishList}
              disabled={wishLoading}
              className="rounded-full border border-border/40 px-5 py-3 text-sm transition hover:bg-[var(--secondary)]"
            >
              ♥
            </button>
          </div>
        </section>

        {/* ───────── FOOT NOTE ───────── */}
        <section className="text-center text-xs text-muted-foreground">
          ارسال سریع • ضمانت اصالت • بسته‌بندی لوکس
        </section>
      </div>
    </div>
  );
}
