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

// ─── Refined Editorial Mock Data (With Real Luxury Image URLs) ─────────────

const COLLECTIONS: Collection[] = [
  {
    id: "c1",
    label: "مجموعه اول",
    title: "میراث شرقی",
    description:
      "روایحی غنی بر پایه نوت‌های عمیق عود طبیعی، چرم دست‌ساز و عنبرسائل که با حرارت پوست جان می‌گیرند.",
    // Moody, dark amber luxury perfume bottle
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
      "عصاره خالص تقطیر‌شده از مزارع انحصاری فرانسه؛ سمفونی ظریفی از رز دمشقی، یاس سفید و بهارنارنج.",
    // Elegant, bright floral perfume aesthetic
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
      "رایحه‌ای ترد از ترکیب صنوبر کوهستانی، خس‌خس مرطوب و نوت‌های اوزونیک؛ مناسب سلیقه‌های مدرن.",
    // Minimalist, crisp green/woody glass bottle
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
    title: "دکانت دست‌ساز",
    body: "تمامی دست‌ریزها به صورت مستقیم، با ابزار آزمایشگاهی دقیق و بدون کوچک‌ترین دخل و تصرف از بطری اصلی منتقل می‌شوند.",
  },
  {
    id: "f2",
    icon: <IoGiftOutline className="w-5 h-5 text-accent" />,
    title: "بسته‌بندی نفیس",
    body: "ارائه شده در هاردباکس‌های مخملی اختصاصی گالری، همراه با عایق‌بندی کامل حرارتی؛ آماده برای هدیه دادن.",
  },
  {
    id: "f3",
    icon: <IoShieldCheckmarkOutline className="w-5 h-5 text-accent" />,
    title: "تضمین اصالت عتیق",
    body: "صدور فاکتور رسمی اصالت و شناسنامه رایحه؛ تضمین بازگشت کامل وجه در صورت وجود کوچک‌ترین مغایرت در اسانس کالا.",
  },
  {
    id: "f4",
    icon: <IoPaperPlaneOutline className="w-5 h-5 text-accent" />,
    title: "ارسال اختصاصی اکسپرس",
    body: "تحویل فوق‌سریع به سراسر ایران در بسته‌بندی‌های ضد ضربه ایمن، طی کوتاه‌ترین زمان کاری ممکن.",
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
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 1, 0.5, 1] }}
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
    <FadeUp delay={index * 0.08} className={isLarge ? "lg:row-span-2" : ""}>
      <div
        className={`group relative overflow-hidden rounded-3xl border border-secondary/60 bg-secondary/10 w-full ${
          isLarge ? "h-full min-h-[520px]" : "min-h-[260px]"
        } flex flex-col justify-end p-6 md:p-8`}
      >
        {/* Real Unsplash Background Image */}
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={
            isLarge
              ? "(max-width: 1024px) 100vw, 50vw"
              : "(max-width: 1024px) 100vw, 25vw"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-0"
        />

        {/* Soft elegant vignette overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent z-10 pointer-events-none" />

        {/* Minimal Label Tag */}
        <div className="absolute top-4 right-4 z-20">
          <span
            className={`rounded-md border backdrop-blur-md px-2.5 py-1 text-[10px] font-bold ${item.accent}`}
          >
            {item.tag}
          </span>
        </div>

        {/* Dynamic Content Details Layout */}
        <div className="relative z-20 space-y-2">
          <p className="text-[10px] tracking-wider text-accent font-bold uppercase">
            {item.label}
          </p>
          <h3 className="text-xl md:text-2xl font-black text-background">
            {item.title}
          </h3>

          <p
            className={`text-xs leading-6 text-neutral-300 transition-all duration-300 font-medium ${
              isLarge
                ? "max-h-24 opacity-100 mt-2"
                : "max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100 group-hover:mt-2"
            } overflow-hidden`}
          >
            {item.description}
          </p>

          <div className="pt-3 flex items-center gap-1 text-[10px] font-bold text-background/60 group-hover:text-background transition-colors">
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
    <div dir="rtl" className="bg-background text-foreground overflow-hidden">
      {/* ── 1. COLLECTIONS GRID ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 max-w-7xl container mx-auto px-4">
        <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-3">
            <FadeUp>
              <SectionEyebrow>مجموعه‌های اختصاصی</SectionEyebrow>
              <h2 className="text-2xl md:text-4xl font-black text-primary leading-tight mt-2">
                روایحی متمایز که
                <br />
                <span className="text-neutral-400 font-bold">
                  هویت شما را امضا می‌کنند
                </span>
              </h2>
            </FadeUp>
          </div>

          <FadeUp delay={0.12} className="shrink-0">
            <a
              href="/collections"
              className="group inline-flex items-center gap-2 text-xs font-bold text-accent"
            >
              <span>مشاهده تمامی آرشیوها</span>
              <IoArrowBackOutline className="w-3.5 h-3.5 transition duration-300 transform group-hover:-translate-x-1" />
            </a>
          </FadeUp>
        </div>

        <div className="grid gap-4 lg:grid-cols-2 lg:grid-rows-2">
          {COLLECTIONS.map((item, i) => (
            <CollectionCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── 2. EDITORIAL MARQUEE TICKER ────────────────────────────────────── */}
      <div className="overflow-hidden border-y border-secondary/60 py-4 bg-secondary/10 backdrop-blur-xs select-none">
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
              <span>تضمین اصالت خانه عطر</span>
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
      <section className="py-16 md:py-28 max-w-7xl container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-12">
          <FadeUp className="relative lg:col-span-6">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-12 -right-6 select-none text-[8rem] md:text-[11rem] font-black leading-none text-primary/[0.02] z-0"
            >
              ۰۱
            </span>

            <div className="relative overflow-hidden rounded-3xl bg-secondary/20 border border-secondary/60 aspect-[4/5] w-full flex items-center justify-center shadow-xs z-10">
              {/* High-end Dior Oud Ispahan style editorial photography */}
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
                    انتخاب برتر گالری
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

          <div className="flex flex-col gap-6 lg:col-span-6">
            <FadeUp>
              <SectionEyebrow>یادداشت کیوریتور گالری</SectionEyebrow>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2 className="text-2xl md:text-3xl font-black text-primary leading-tight">
                رایحه‌ای متمایز،
                <br />
                روایتی نامرئی از اصالتی که
                <br />
                <span className="text-accent">هنوز به زبان نیامده است.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p className="text-xs md:text-sm leading-7 text-neutral-500 font-medium">
                ما در خانه عطر عتیق، به جای تمرکز بر روایح اشباع‌شده بازاری،
                شاهکارهای پنهان دنیای عطرسازی را گرد هم آورده‌ایم. انتخاب‌هایی
                جسورانه و نیش که صرفاً برای ماندگاری در حافظه بویایی اطرافیان
                طراحی شده‌اند.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <div className="flex flex-col gap-4 border-t border-secondary/60 pt-4">
                {[
                  {
                    num: `${formattedBrandCount}+`,
                    label: "خانه عطر و برند بین‌المللی",
                  },
                  {
                    num: `${formattedClientCount}+`,
                    label: "کلکسیونر و مخاطب وفادار",
                  },
                  {
                    num: `${formattedSatisfactionCount}٪`,
                    label: "شاخص رضایت اصالت کالا",
                  },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between text-xs font-medium"
                  >
                    <span className="text-lg font-black text-primary">
                      {stat.num}
                    </span>
                    <span className="h-px flex-1 bg-secondary/60 mx-4 border-dashed" />
                    <span className="text-neutral-400 font-bold">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 4. BRAND VALUES FEATURES STRIP ───────────────────────────────── */}
      <section className="border-t border-secondary/60 py-16 bg-secondary/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeUp className="mb-10 text-center">
            <SectionEyebrow>اصول پایدار مجموعه</SectionEyebrow>
          </FadeUp>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {FEATURES.map((f, i) => (
              <FadeUp key={f.id} delay={i * 0.05}>
                <div className="group flex flex-col gap-3 rounded-2xl border border-secondary/50 bg-background p-5 transition duration-200 hover:border-neutral-300">
                  <div className="w-10 h-10 rounded-xl bg-secondary/30 border border-secondary/50 flex items-center justify-center shrink-0">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-sm text-primary mt-1">
                    {f.title}
                  </h3>
                  <p className="text-xs leading-6 text-neutral-400 font-medium">
                    {f.body}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. CLEAN BRANDING CALL TO ACTION ──────────────────────────────── */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-primary text-background">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-10"
        >
          <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-background blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-background blur-3xl" />
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap text-[6rem] md:text-[12rem] font-black opacity-[0.015] tracking-widest"
        >
          ATIGH
        </span>

        <div className="container relative z-10 mx-auto px-4 max-w-3xl text-center space-y-6">
          <FadeUp>
            <SectionEyebrow>
              <span className="text-neutral-400">سفارشی‌سازی امضا</span>
            </SectionEyebrow>
          </FadeUp>

          <FadeUp delay={0.08}>
            <h2 className="text-3xl md:text-5xl font-black text-background leading-tight">
              رایحه امضای خود را
              <br />
              کشف کنید
            </h2>
          </FadeUp>

          <FadeUp delay={0.14}>
            <p className="mx-auto max-w-md text-xs md:text-sm leading-7 text-neutral-300 font-medium">
              با تکیه بر مشاوران تخصصی ما، عطر منحصربه‌فردی را بیابید که بازتابی
              عمیق از کاراکتر، سبک زندگی و کمال شخصی شما باشد.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button className="rounded-full bg-background px-6 py-3 text-xs font-bold text-primary transition hover:scale-[1.02] active:scale-[0.98]">
                درخواست مشاوره اختصاصی
              </button>
              <a
                href="/products"
                className="rounded-full border border-background/20 px-6 py-3 text-xs font-bold text-background transition hover:bg-background/10"
              >
                مشاهده کل کاتالوگ محصولات
              </a>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
