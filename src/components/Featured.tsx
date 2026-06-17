"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";

// ─── Types ────────────────────────────────────────────────────────────────────

type Collection = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  accent: string; // tailwind bg class for the pill tag
  tag: string;
};

type Feature = {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
};

// ─── Mock data (replace with your real props/fetch) ───────────────────────────

const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    label: "کلکسیون اول",
    title: "شرق بی‌پایان",
    description:
      "رایحه‌هایی از قلب خاورمیانه — عود، عنبر، و مشک سیاه که روی پوست زندگی می‌کنند.",
    image: "/placeholder-dark.jpg",
    accent: "bg-amber-900/60",
    tag: "بهترین‌ فروش",
  },
  {
    id: "c2",
    label: "کلکسیون دوم",
    title: "باغ پاریس",
    description:
      "گل‌های تازه‌چیده‌شده از مزارع گراس — گل‌رز، یاسمن، و نارنج شکوفا در یک دکانت کمیاب.",
    image: "/placeholder-light.jpg",
    accent: "bg-rose-900/60",
    tag: "جدید",
  },
  {
    id: "c3",
    label: "کلکسیون سوم",
    title: "جنگل سرد",
    description:
      "صنوبر کوهستانی، چوب سدر، و نفس یخ‌زده — برای کسانی که سکوت را می‌شنوند.",
    image: "/placeholder-green.jpg",
    accent: "bg-emerald-900/60",
    tag: "محدود",
  },
];

const FEATURES: Feature[] = [
  {
    id: "f1",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-7 h-7"
      >
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "دکانت اصل",
    body: "هر ظرف مستقیماً از بطری اصلی پر می‌شود — هیچ واسطه‌ای، هیچ رقیق‌سازی.",
  },
  {
    id: "f2",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-7 h-7"
      >
        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
      </svg>
    ),
    title: "بسته‌بندی لوکس",
    body: "جعبه مخملی طراحی‌شده برای هدیه‌دادن. هر سفارش آماده‌ی تحویل می‌رسد.",
  },
  {
    id: "f3",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-7 h-7"
      >
        <path d="M9 12l2 2 4-4" />
        <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "ضمانت اصالت",
    body: "کد تأیید روی هر بطری. در صورت هرگونه تردید، بازپرداخت کامل.",
  },
  {
    id: "f4",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
        className="w-7 h-7"
      >
        <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8" />
      </svg>
    ),
    title: "ارسال سراسری",
    body: "پیک ویژه با بسته‌بندی ضد ضربه به سراسر کشور در کمتر از ۴۸ ساعت.",
  },
];

// ─── Animation helpers ─────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs tracking-[0.35em] text-muted-foreground uppercase">
      <span className="block h-px w-8 bg-current opacity-50" />
      {children}
    </span>
  );
}

function CollectionCard({ item, index }: { item: Collection; index: number }) {
  const isLarge = index === 0;

  return (
    <FadeUp delay={index * 0.1}>
      <div
        className={`group relative overflow-hidden rounded-2xl bg-muted ${
          isLarge ? "lg:row-span-2 min-h-[560px]" : "min-h-[260px]"
        }`}
      >
        {/* Image placeholder — swap for real Image when you have src */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 z-10" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-zinc-700 to-zinc-900 transition-transform duration-700 ease-out group-hover:scale-105"
          aria-hidden
        />

        {/* Tag pill */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium text-white ${item.accent}`}
          >
            {item.tag}
          </span>
        </div>

        {/* Bottom copy */}
        <div className="absolute bottom-0 right-0 left-0 z-20 p-6">
          <p className="mb-1 text-xs tracking-[0.25em] text-white/50">
            {item.label}
          </p>
          <h3 className="mb-2 text-2xl font-bold text-white">{item.title}</h3>
          <p
            className={`text-sm leading-6 text-white/70 transition-all duration-500 ${
              isLarge
                ? "max-h-20 opacity-100"
                : "max-h-0 opacity-0 group-hover:max-h-20 group-hover:opacity-100"
            }`}
          >
            {item.description}
          </p>
          <button className="mt-4 text-xs tracking-widest text-white/60 transition hover:text-white flex items-center gap-2">
            <span>مشاهده کلکسیون</span>
            <span className="block h-px w-6 bg-current" />
          </button>
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function FeaturedSection() {
  return (
    <div dir="rtl" className="bg-background text-foreground">
      {/* ── 1. COLLECTIONS GRID ────────────────────────────────────────────── */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <FadeUp>
              <SectionEyebrow>کلکسیون‌های ویژه</SectionEyebrow>
              <h2 className="mt-4 text-4xl font-extrabold leading-[1.25] lg:text-5xl">
                رایحه‌هایی که
                <br />
                <em className="not-italic text-muted-foreground">
                  فراموش نمی‌شوند
                </em>
              </h2>
            </FadeUp>

            <FadeUp delay={0.15} className="shrink-0">
              <a
                href="/collections"
                className="group inline-flex items-center gap-3 text-sm font-medium"
              >
                <span>همه کلکسیون‌ها</span>
                <span className="block h-px w-8 bg-foreground transition-all duration-300 group-hover:w-14" />
              </a>
            </FadeUp>
          </div>

          {/* Grid */}
          <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
            {COLLECTIONS.map((item, i) => (
              <CollectionCard key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. MARQUEE DIVIDER ─────────────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-border py-5 bg-muted/30">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-sm tracking-[0.4em] text-muted-foreground"
            >
              عطر اصل&nbsp;&nbsp;·&nbsp;&nbsp;دکانت
              ویژه&nbsp;&nbsp;·&nbsp;&nbsp;رایحه
              منحصربه‌فرد&nbsp;&nbsp;·&nbsp;&nbsp;
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── 3. EDITORIAL SPOTLIGHT ─────────────────────────────────────────── */}
      <section className="py-24 lg:py-36">
        <div className="container mx-auto px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            {/* Large visual card */}
            <FadeUp className="relative">
              {/* Ghost number */}
              <span
                aria-hidden
                className="pointer-events-none absolute -top-8 -right-4 select-none text-[11rem] font-black leading-none text-foreground/[0.04]"
              >
                ۰۱
              </span>

              <div className="relative overflow-hidden rounded-3xl bg-muted min-h-[500px]">
                {/* Decorative gradient orb */}
                <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 h-48 w-48 rounded-full bg-rose-500/10 blur-3xl" />

                {/* Fake perfume bottle silhouette using CSS */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-0 opacity-20">
                    <div className="h-3 w-6 rounded-t-full bg-foreground" />
                    <div className="h-2 w-10 bg-foreground" />
                    <div className="h-52 w-28 rounded-b-xl rounded-t-sm bg-foreground" />
                  </div>
                </div>

                {/* Bottom label */}
                <div className="absolute bottom-6 right-6 left-6 rounded-xl bg-background/80 backdrop-blur-md p-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-muted-foreground">محبوب‌ترین</p>
                    <p className="font-semibold">
                      Oud Ispahan — Christian Dior
                    </p>
                  </div>
                  <button className="rounded-full bg-foreground px-4 py-2 text-xs text-background font-medium">
                    خرید دکانت
                  </button>
                </div>
              </div>
            </FadeUp>

            {/* Copy */}
            <div className="flex flex-col gap-8">
              <FadeUp>
                <SectionEyebrow>نگاه سردبیر</SectionEyebrow>
              </FadeUp>

              <FadeUp delay={0.1}>
                <h2 className="text-3xl font-extrabold leading-[1.3] lg:text-4xl">
                  یک عطر خوب
                  <br />
                  خاطره‌ای است که
                  <br />
                  <span className="text-muted-foreground">
                    هنوز اتفاق نیفتاده
                  </span>
                </h2>
              </FadeUp>

              <FadeUp delay={0.2}>
                <p className="text-base leading-8 text-muted-foreground">
                  ما برای شما عطرهایی را انتخاب کرده‌ایم که کمتر کسی از آن‌ها
                  می‌داند. نه لیست‌های پرفروش، نه رایحه‌های تکراری — فقط آنچه
                  واقعاً ماندگار می‌شود.
                </p>
              </FadeUp>

              <FadeUp delay={0.3}>
                <div className="flex flex-col gap-6">
                  {[
                    { num: "۲۰۰+", label: "برند بین‌المللی" },
                    { num: "۵ هزار+", label: "مشتری راضی" },
                    { num: "۹۸٪", label: "نرخ رضایت" },
                  ].map((stat) => (
                    <div key={stat.num} className="flex items-center gap-5">
                      <span className="text-3xl font-black">{stat.num}</span>
                      <span className="h-px flex-1 bg-border" />
                      <span className="text-sm text-muted-foreground">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeUp>

              <FadeUp delay={0.4}>
                <button className="self-start rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition hover:scale-105">
                  داستان ما
                </button>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. FEATURES STRIP ──────────────────────────────────────────────── */}
      <section className="border-t border-border py-20 bg-muted/20">
        <div className="container mx-auto px-6">
          <FadeUp className="mb-12 text-center">
            <SectionEyebrow>چرا ما</SectionEyebrow>
          </FadeUp>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <FadeUp key={f.id} delay={i * 0.08}>
                <div className="group flex flex-col gap-4 rounded-2xl border border-border/50 bg-background p-6 transition hover:border-border hover:shadow-sm">
                  <span className="text-muted-foreground transition group-hover:text-foreground">
                    {f.icon}
                  </span>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {f.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. FULL-BLEED CTA ──────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-32 lg:py-40 bg-foreground text-background">
        {/* Ambient blobs */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        </div>

        {/* Ghost text */}
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[clamp(4rem,15vw,14rem)] font-black leading-none text-white/[0.03]"
        >
          رایحه
        </span>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <FadeUp>
            <SectionEyebrow>
              <span className="text-background/40">تجربه متفاوت</span>
            </SectionEyebrow>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h2 className="mx-auto mt-6 max-w-2xl text-4xl font-extrabold leading-[1.2] lg:text-6xl">
              امضای رایحه‌ات را
              <br />
              پیدا کن
            </h2>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="mx-auto mt-6 max-w-md text-base leading-8 text-background/60">
              با راهنمایی متخصصان ما، عطری بیابید که نه‌تنها بوی خوبی دارد —
              بلکه شما را روایت می‌کند.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <button className="rounded-full bg-background px-8 py-3 text-sm font-medium text-foreground transition hover:scale-105">
                مشاوره رایگان
              </button>
              <button className="rounded-full border border-background/20 px-8 py-3 text-sm font-medium text-background transition hover:bg-white/10">
                مشاهده همه محصولات
              </button>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
