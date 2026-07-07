"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import {
  IoLayersOutline,
  IoGiftOutline,
  IoShieldCheckmarkOutline,
  IoPaperPlaneOutline,
  IoArrowBackOutline,
} from "react-icons/io5";

// ─── Types ────────────────────────────────────────────────────────────────────

type Collection = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
  accent: string;
  tag: string;
};

type Feature = {
  id: string;
  icon: React.ReactNode;
  title: string;
  body: string;
};

// ─── Humanized Editorial Mock Data (House of Royal) ──────────────────────────

const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    label: "مجموعه اول",
    title: "اصالت شرق",
    description:
      "ترکیب‌هایی عمیق بر پایه عود طبیعی، رایحه چرم و صمغ‌های گران‌بها که با حرارت پوست به آرامی جان می‌گیرند.",
    image:
      "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=80",
    accent: "bg-amber-950/60 border-amber-500/30 text-amber-200",
    tag: "نسخه‌های کلکسیونی",
  },
  {
    id: "c2",
    label: "مجموعه دوم",
    title: "شکوفه‌های گراس",
    description:
      "روایحی ظریف و باوقار از تقطیر گل‌های مزارع انحصاری فرانسه؛ سمفونی هماهنگی از یاس، رز دمشقی و بهارنارنج.",
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80",
    accent: "bg-rose-950/60 border-rose-500/30 text-rose-200",
    tag: "جدیدترین‌ها",
  },
  {
    id: "c3",
    label: "مجموعه سوم",
    title: "مینی‌مالیسم سرد",
    description:
      "رایحه‌ای ترد و مدرن حاصل ترکیب صنوبر کوهستانی، خس‌خس مرطوب و نوت‌های اوزونیک برای سلیقه‌های خاص.",
    image:
      "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    accent: "bg-emerald-950/60 border-emerald-500/30 text-emerald-200",
    tag: "تعداد محدود",
  },
];

const FEATURES: Feature[] = [
  {
    id: "f1",
    icon: <IoLayersOutline className="w-5 h-5 text-accent" />,
    title: "دکانت دست‌ساز و دقیق",
    body: "تمامی دست‌ریزها به صورت مستقیم، با ابزار آزمایشگاهی و بدون کوچک‌ترین تغییر از بطری اصلی منتقل می‌شوند.",
  },
  {
    id: "f2",
    icon: <IoGiftOutline className="w-5 h-5 text-accent" />,
    title: "بسته‌بندی نفیس",
    body: "ارائه شده در هاردباکس‌های اختصاصی گالری، همراه با عایق‌بندی کامل حرارتی؛ آماده برای هدیه دادن.",
  },
  {
    id: "f3",
    icon: <IoShieldCheckmarkOutline className="w-5 h-5 text-accent" />,
    title: "تضمین اصالت رویال",
    body: "ارائه شناسنامه رسمی رایحه؛ تضمین عودت کامل وجه در صورت عدم مطابقت با اسانس کالا.",
  },
  {
    id: "f4",
    icon: <IoPaperPlaneOutline className="w-5 h-5 text-accent" />,
    title: "ارسال اختصاصی اکسپرس",
    body: "تحویل فوق‌سریع به سراسر ایران در بسته‌بندی‌های ضد ضربه ایمن، طی کوتاه‌ترین زمان کاری ممکن.",
  },
];

// ─── Animation Helpers ─────────────────────────────────────────────────────────

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
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.25, 1, 0.5, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[10px] tracking-[0.3em] text-neutral-400 uppercase font-bold">
      <span className="block h-px w-6 bg-accent/40" />
      {children}
    </span>
  );
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function CollectionCard({ item, index }: { item: Collection; index: number }) {
  const isLarge = index === 0;

  return (
    <FadeUp
      delay={index * 0.05}
      className={isLarge ? "lg:col-span-2 lg:row-span-2" : "lg:col-span-1"}
    >
      <div
        className={`group relative overflow-hidden rounded-3xl border border-secondary/60 bg-secondary/10 w-full ${
          isLarge
            ? "h-80 sm:h-[420px] lg:h-full lg:min-h-[500px]"
            : "h-64 sm:h-72 lg:h-auto lg:min-h-[240px]"
        } flex flex-col justify-end p-5 md:p-8`}
      >
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-0"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/50 to-transparent z-10 pointer-events-none" />

        <div className="absolute top-4 right-4 z-20">
          <span
            className={`rounded-md border backdrop-blur-md px-2.5 py-1 text-[10px] font-medium ${item.accent}`}
          >
            {item.tag}
          </span>
        </div>

        <div className="relative z-20 space-y-1.5">
          <p className="text-[10px] tracking-wider text-accent font-bold uppercase">
            {item.label}
          </p>
          <h3 className="text-lg md:text-xl font-black text-background">
            {item.title}
          </h3>

          {/* Desktop/Mobile safe rendering layout overrides */}
          <p
            className={`text-xs leading-6 text-neutral-300 font-medium overflow-hidden transition-all duration-300 ${
              isLarge
                ? "block mt-1 max-w-md"
                : "block lg:max-h-0 lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:opacity-100 lg:group-hover:mt-1"
            }`}
          >
            {item.description}
          </p>

          <div className="pt-2 flex items-center gap-1 text-[10px] font-bold text-background/60 group-hover:text-background transition-colors cursor-pointer">
            <span>بررسی کاتالوگ</span>
            <IoArrowBackOutline className="w-3 h-3 transition duration-300 transform group-hover:-translate-x-1" />
          </div>
        </div>
      </div>
    </FadeUp>
  );
}

// ─── Main Section ──────────────────────────────────────────────────────────────

export default function FeaturedSection() {
  const formattedBrandCount = (200).toLocaleString("fa-IR");
  const formattedClientCount = (5000).toLocaleString("fa-IR");
  const formattedSatisfactionCount = (98).toLocaleString("fa-IR");

  return (
    <div
      dir="rtl"
      className="bg-background text-foreground overflow-hidden w-full"
    >
      {/* ── 1. COLLECTIONS GRID ────────────────────────────────────────────── */}
      <section className="py-12 md:py-20 max-w-7xl container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <FadeUp>
              <SectionEyebrow>مجموعه‌های اختصاصی رویال</SectionEyebrow>
              <h2 className="text-2xl md:text-4xl font-black text-primary leading-tight mt-1.5">
                رایحه‌هایی ممتاز که
                <br />
                <span className="text-neutral-400 font-bold">
                  هویت شما را امضا می‌کنند
                </span>
              </h2>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="shrink-0">
            <a
              href="/collections"
              className="group inline-flex items-center gap-2 text-xs font-bold text-accent"
            >
              <span>مشاهده تمامی مجموعه‌ها</span>
              <IoArrowBackOutline className="w-3.5 h-3.5 transition duration-300 transform group-hover:-translate-x-1" />
            </a>
          </FadeUp>
        </div>

        {/* CSS grid parameters fixed safely to preserve alignment rules */}
        <div className="grid gap-4 grid-cols-1 lg:grid-cols-3">
          {COLLECTIONS.map((item, i) => (
            <CollectionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── 2. EDITORIAL MARQUEE TICKER ────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-secondary/60 py-3.5 bg-secondary/10 backdrop-blur-xs select-none">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 whitespace-nowrap"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-[10px] font-bold tracking-[0.35em] text-neutral-400 uppercase flex items-center gap-3"
            >
              <span>تضمین اصالت خانه عطر رویال</span>
              <span>·</span>
              <span>دکانت دست‌ریز کلکسیونی</span>
              <span>·</span>
              <span>شاهکارهای مینی‌مال نیش</span>
              <span>·</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ── 3. CURATORIAL ACCORDION SPOTLIGHT ──────────────────────────────── */}
      <section className="py-12 md:py-24 max-w-7xl container mx-auto px-4">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          {/* Image Stage Container Frame */}
          <FadeUp className="relative lg:col-span-6 w-full max-w-md lg:max-w-none mx-auto">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-12 -right-6 select-none text-[8rem] md:text-[11rem] font-black leading-none text-primary/[0.02] z-0"
            >
              ۰۱
            </span>

            <div className="relative overflow-hidden rounded-3xl bg-secondary/20 border border-secondary/60 aspect-[4/5] w-full flex items-center justify-center shadow-xs z-10">
              <Image
                src="https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&w=1000&q=80"
                alt="Oud Ispahan Spotlight"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />

              <div className="absolute bottom-4 right-4 left-4 rounded-2xl border border-secondary/40 bg-background/90 backdrop-blur-md p-4 flex items-center justify-between z-20 shadow-lg">
                <div>
                  <span className="text-[9px] text-accent font-bold uppercase block mb-0.5">
                    انتخاب منتخب خانه رویال
                  </span>
                  <p className="font-bold text-sm text-primary">Oud Ispahan</p>
                  <p className="text-[10px] text-neutral-400 font-medium">
                    Christian Dior
                  </p>
                </div>
                <a
                  href="/products/oud-ispahan"
                  className="rounded-full bg-primary px-4 py-2 text-[10px] text-background font-bold transition hover:opacity-90"
                >
                  تهیه دست‌ریز
                </a>
              </div>
            </div>
          </FadeUp>

          {/* Curatorial Notes Typography Layout */}
          <div className="flex flex-col gap-5 lg:col-span-6 max-w-xl mx-auto lg:mx-0">
            <FadeUp>
              <SectionEyebrow>یادداشت کیوریتور خانه رویال</SectionEyebrow>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight">
                رایحه‌ای متمایز،
                <br />
                روایتی نامرئی از اصالتی که
                <br />
                <span className="text-accent">هنوز به زبان نیامده است.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="text-xs md:text-sm leading-7 text-muted-foreground font-medium">
                ما در خانه عطر رویال، با دوری از جریان‌های تکراری بازار،
                گزیده‌ای از آثار اصیل عطرسازی جهان را در قالب دکانت‌های
                استاندارد جمع‌آوری کرده‌ایم؛ انتخاب‌هایی متمایز و حساب‌شده که
                برای ماندگاری در حافظه بویایی اطرافیان طراحی شده‌اند.
              </p>
            </FadeUp>

            {/* Micro Stats Columns Mapping */}
            <div className="flex flex-col gap-3.5 border-t border-secondary/60 pt-4 mt-2">
              {[
                {
                  num: `${formattedBrandCount}+`,
                  label: "خانه عطر و برند بین‌المللی",
                },
                {
                  num: `${formattedClientCount}+`,
                  label: "مخاطب همراه و وفادار",
                },
                {
                  num: `${formattedSatisfactionCount}٪`,
                  label: "شاخص رضایت و تضمین اصالت",
                },
              ].map((stat, idx) => (
                <FadeUp key={idx} delay={0.15 + idx * 0.04}>
                  <div className="flex items-center justify-between text-xs font-medium">
                    <span className="text-base md:text-lg font-black text-primary">
                      {stat.num}
                    </span>
                    <span className="h-px flex-1 bg-secondary/60 mx-4 border-dashed" />
                    <span className="text-muted-foreground font-medium">
                      {stat.label}
                    </span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. BRAND VALUES FEATURES STRIP ───────────────────────────────── */}
      <section className="border-t border-secondary/60 py-12 md:py-16 bg-secondary/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeUp className="mb-8 text-center">
            <SectionEyebrow>اصول پایدار مجموعه رویال</SectionEyebrow>
          </FadeUp>

          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <FadeUp key={f.id} delay={i * 0.04}>
                <div className="group flex flex-col gap-2.5 rounded-2xl border border-secondary/50 bg-background p-5 transition duration-200 hover:border-neutral-400 h-full">
                  <div className="w-9 h-9 rounded-xl bg-secondary/30 border border-secondary/50 flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-sm text-primary mt-1">
                    {f.title}
                  </h3>
                  <p className="text-xs leading-6 text-muted-foreground font-medium">
                    {f.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLEAN BRANDING CALL TO ACTION ──────────────────────────────── */}
      <section className="relative overflow-hidden py-16 md:py-24 bg-primary text-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
        >
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-background blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-background blur-3xl" />
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[6rem] md:text-[12rem] font-black opacity-[0.012] tracking-widest"
        >
          ROYAL
        </span>

        <div className="container relative z-10 mx-auto px-4 max-w-3xl text-center space-y-5">
          <FadeUp>
            <SectionEyebrow>
              <span className="text-neutral-400">سفارشی‌سازی رایحه امضا</span>
            </SectionEyebrow>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="text-2xl md:text-4xl font-black text-background leading-tight">
              رایحه امضای خود را
              <br />
              کشف کنید
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mx-auto max-w-md text-xs md:text-sm leading-6 md:leading-7 text-neutral-300 font-medium">
              با تکیه بر مشاوره تخصصی ما، عطر منحصربه‌فردی را بیابید که بازتابی
              واقعی از سبک زندگی، کاراکتر و اصالت شما باشد.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-full bg-background px-6 py-2.5 text-xs font-bold text-primary transition hover:scale-[1.02] active:scale-[0.98] cursor-pointer shadow-sm">
                درخواست مشاوره اختصاصی
              </button>
              <a
                href="/products"
                className="rounded-full border border-background/20 px-6 py-2.5 text-xs font-bold text-background transition hover:bg-background/10"
              >
                مشاهده کاتالوگ محصولات
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
