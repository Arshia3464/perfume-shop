"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  IoFlaskOutline,
  IoShieldCheckmarkOutline,
  IoSparklesOutline,
  IoArrowBackOutline,
  IoLockClosedOutline,
  IoCloseCircleOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";

// ─── Types ────────────────────────────────────────────────────────────────────

type ProcessStep = {
  step: string;
  tag: string;
  title: string;
  description: string;
  spec: string;
};

type Pillar = {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  body: string;
};

// ─── Grounded, Human Editorial Copy (House of Royal) ──────────────────────────

const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "۰۱",
    tag: "سورسینگ و بچ‌کد",
    title: "تأمین از بوتیک‌های مرجع",
    description:
      "تمامی باتل‌های مادر مستقیماً از نمایندگی‌های رسمی اروپا و امارات تهیه می‌شوند. پیش از بازگشایی، اصالت شیشه، افشانه و بچ‌کد (Batch Code) هر نسخه به دقت ثبت و آرشیو می‌شود.",
    spec: "100% Original Flacons",
  },
  {
    step: "۰۲",
    tag: "استخراج ایزوله",
    title: "انتقال بدون تماس با هوا",
    description:
      "پاشیدن عطر داخل ظرف دکانت باعث اکسید شدن نوت‌های ابتدایی (Top Notes) می‌شود. ما مایع عطر را با سرنگ‌های آزمایشگاهی مدرج و در محیط ایزوله، بدون کوچک‌ترین تغییر در ساختار رایحه منتقل می‌کنیم.",
    spec: "Zero-Oxidation Syringe",
  },
  {
    step: "۰۳",
    tag: "پلمپ و استانداردسازی",
    title: "شیشه‌های ضد UV و والو فلزی",
    description:
      "دکانت‌ها در ویال‌های شیشه‌ای ضخیم با افشانه‌های فلزی استاندارد (پخش بو و پودر شدن دقیق) بسته‌بندی شده و گلویی شیشه با تفلون مخصوص آب‌بندی می‌شود تا از نشت و تبخیر جلوگیری شود.",
    spec: "Teflon Sealed & UV Safe",
  },
];

const PILLARS: Pillar[] = [
  {
    id: "p1",
    icon: <IoFlaskOutline className="w-5 h-5 text-accent" />,
    title: "پایان ریسک بلایندبای (Blind Buy)",
    subtitle: "تست در شرایط واقعی زندگی",
    body: "تست کردن عطر روی بلاتر کاغذی در فروشگاه، فقط نوت اولیه را به شما نشان می‌دهد. دکانت به شما فرصت می‌دهد یک عطر نیش ۲۰ میلیون تومانی را چند روز روی پوست خودتان، در هوای واقعی و موقعیت‌های مختلف زندگی کنید و بعد تصمیم بگیرید.",
  },
  {
    id: "p2",
    icon: <IoSparklesOutline className="w-5 h-5 text-accent" />,
    title: "کیوریتوری به جای انبارداری",
    subtitle: "فیلتر کردن هیاهوی تبلیغاتی",
    body: "ما هر عطری که صرفاً ترند شده باشد را موجود نمی‌کنیم. کاتالوگ رویال حاصل تست صدها نسخه از برندهای نیش و آرتیزانال است تا فقط کارهایی که واقعاً ارزش هنری، ماندگاری استاندارد و شخصیت مستقل دارند انتخاب شوند.",
  },
  {
    id: "p3",
    icon: <IoShieldCheckmarkOutline className="w-5 h-5 text-accent" />,
    title: "شفافیت مطلق در اصالت",
    subtitle: "بدون اسانس‌های گرمی و شرکتی",
    body: "در رویال چیزی به نام «عطر شرکتی»، «های‌کپی» یا «اسانس خالص فرانسوی» وجود ندارد. هر قطره دقیقاً همان مایع درون شیشه اورجینال برند مادر است؛ بدون یک درصد رقیق‌سازی یا دستکاری.",
  },
];

const RED_LINES = {
  weNeverDo: [
    "استفاده از اسانس‌های روغنی، فیک یا اماراتی به نام دکانت",
    "انتقال عطر به روش اسپری کردن مستقیم (که باعث پریدن نوت‌های سر می‌شود)",
    "نگهداری باتل‌های مادر در معرض نور خورشید یا دمای نامتعادل",
    "استفاده از ظروف پلاستیکی بی‌کیفیت که بوی عطر را تغییر می‌دهند",
  ],
  ourStandard: [
    "نگهداری کلکسیون مادر در کابینت‌های تاریک با دمای کنترل‌شده (۱۶ تا ۱۸ درجه)",
    "لیبل‌گذاری دقیق شامل نام عطر، برند، غلظت و کد رهگیری باتل مادر",
    "استفاده از شیشه‌های کریستالی ضخیم با والوهای پمپینگ استاندارد",
    "ضمانت بی‌قید و شرط مرجوعی وجه در صورت اثبات هرگونه مغایرت",
  ],
};

// ─── Animation Helpers (Synced with FeaturedSection) ──────────────────────────

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

// ─── Main About Page ──────────────────────────────────────────────────────────

export default function AboutPage() {
  const formattedYear = (1401).toLocaleString("fa-IR", { useGrouping: false });
  const formattedDecants = (18000).toLocaleString("fa-IR");
  const formattedPurity = (100).toLocaleString("fa-IR");

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-primary overflow-hidden w-full"
    >
      {/* ── 1. ARCHITECTURAL HERO SECTION ──────────────────────────────────── */}
      <section className="relative pt-14 pb-16 md:pt-24 md:pb-28 max-w-7xl container mx-auto px-4">
        {/* Subtle Watermark Typography */}
        <span
          aria-hidden
          className="pointer-events-none absolute top-6 left-4 select-none text-[6rem] sm:text-[10rem] lg:text-[14rem] font-black leading-none text-primary/[0.025] tracking-widest z-0"
        >
          ROYAL
        </span>

        <div className="relative z-10 grid gap-8 lg:grid-cols-12 items-end">
          <div className="lg:col-span-8 space-y-4">
            <FadeUp>
              <SectionEyebrow>داستان شکل‌گیری خانه عطر رویال</SectionEyebrow>
            </FadeUp>

            <FadeUp delay={0.05}>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-primary leading-[1.2] tracking-tight">
                عطر خوب به شعر نیاز ندارد؛
                <br />
                <span className="text-neutral-400">
                  فقط باید روی پوست شما،
                </span>{" "}
                <span className="text-accent">خودش باشد.</span>
              </h1>
            </FadeUp>
          </div>

          <FadeUp delay={0.1} className="lg:col-span-4 lg:pb-2">
            <p className="text-xs md:text-sm leading-7 text-muted-foreground font-medium border-r-2 border-accent/40 pr-4">
              ما رویال را نساختیم که با کلمات پیچیده به شما عطر بفروشیم. هدف ما
              یک چیز ساده اما کمیاب بود: دسترسی بدون ریسک به شاهکارهای اورجینال
              دنیای عطر، با همان کیفیتی که عطار در روز اول داخل شیشه ریخته است.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── 2. BENTO EDITORIAL STORY & ORIGIN ──────────────────────────────── */}
      <section className="py-8 md:py-16 max-w-7xl container mx-auto px-4">
        <div className="grid gap-4 lg:grid-cols-12">
          {/* Main Visual Frame (Col 7) */}
          <FadeUp className="lg:col-span-7">
            <div className="group relative overflow-hidden rounded-3xl border border-secondary/60 bg-secondary/10 h-[360px] sm:h-[460px] lg:h-full min-h-[420px] flex flex-col justify-between p-6 md:p-8">
              <Image
                src="/story.avif"
                alt="آرشیو باتل‌های مادر خانه عطر رویال"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 z-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-transparent z-10 pointer-events-none" />

              {/* Top Badge */}
              <div className="relative z-20 flex justify-between items-center">
                <span className="rounded-md border border-amber-500/30 bg-amber-950/60 backdrop-blur-md px-3 py-1 text-[10px] font-medium text-amber-200">
                  آرشیو اختصاصی رویال
                </span>
                <span className="text-[10px] font-mono text-background/70 tracking-widest uppercase">
                  EST. {formattedYear}
                </span>
              </div>

              {/* Bottom Caption inside Image */}
              <div className="relative z-20 space-y-2 max-w-lg">
                <p className="text-[10px] tracking-wider text-accent font-bold uppercase">
                  چرا رویال شکل گرفت؟
                </p>
                <h2 className="text-xl md:text-2xl font-black text-background leading-snug">
                  از دغدغه یک کلکسیونر، تا استاندارد جدید دست‌ریز در ایران
                </h2>
                <p className="text-xs leading-6 text-neutral-300 font-medium">
                  هر کسی که جدی دنبال عطر باشد، طعم تلخ خرید یک شیشه گران‌قیمت
                  بر اساس تعریف دیگران و پشیمانیِ بعد از آن را چشیده است.
                </p>
              </div>
            </div>
          </FadeUp>

          {/* Right Column Narrative + Micro Stats Card (Col 5) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {/* Real Narrative Card */}
            <FadeUp delay={0.05} className="flex-1">
              <div className="rounded-3xl border border-secondary/60 bg-secondary/10 p-6 md:p-8 h-full flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <SectionEyebrow>مسئله واقعی بازار</SectionEyebrow>
                  <h3 className="text-lg md:text-xl font-black text-primary leading-snug">
                    وقتی بین «خرید کورکورانه» و «دکانت‌های مشکوک» گیر می‌کنید
                  </h3>
                  <p className="text-xs leading-7 text-muted-foreground font-medium">
                    تا پیش از این، برای تست کردن یک عطر نیش یا دیزاینر سطح بالا
                    دو راه بیشتر نداشتید: یا با هزینه سنگین ریسک خرید باتل کامل
                    را بپذیرید، یا سراغ دکانت‌هایی بروید که نه نحوه استخراجشان
                    معلوم بود و نه اصالت شیشه مادرشان.
                  </p>
                  <p className="text-xs leading-7 text-muted-foreground font-medium">
                    ما در رویال تصمیم گرفتیم بخش تاریک ماجرا را حذف کنیم. فرآیند
                    دکانت‌گیری را از یک کار دستیِ پشت‌پرده، به یک پروتکل دقیق،
                    تمیز و کاملاً شفاف تبدیل کردیم تا خیالتان از بابت هر سی‌سی
                    عطری که دریافت می‌کنید، راحت باشد.
                  </p>
                </div>

                <div className="pt-4 border-t border-secondary/60 flex items-center justify-between text-[11px] font-bold text-primary">
                  <span>تضمین اصالت بی‌قید و شرط</span>
                  <span className="text-accent font-mono">100% AUTHENTIC</span>
                </div>
              </div>
            </FadeUp>

            {/* Dark Accent Stat Box */}
            <FadeUp delay={0.1}>
              <div className="rounded-3xl bg-primary text-background p-6 md:p-7 grid grid-cols-2 gap-4">
                <div className="space-y-1 border-l border-background/15 pl-4">
                  <span className="text-[10px] text-neutral-400 font-bold block">
                    دکانت‌های تحویل‌شده
                  </span>
                  <p className="text-2xl md:text-3xl font-black text-background">
                    +{formattedDecants}
                  </p>
                  <span className="text-[10px] text-accent font-medium block">
                    در سراسر ایران
                  </span>
                </div>
                <div className="space-y-1 pr-2">
                  <span className="text-[10px] text-neutral-400 font-bold block">
                    خلوص عصاره انتقالی
                  </span>
                  <p className="text-2xl md:text-3xl font-black text-background">
                    {formattedPurity}٪
                  </p>
                  <span className="text-[10px] text-neutral-300 font-medium block">
                    مستقیم از باتل اورجینال
                  </span>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── 3. THE DECANTING LAB PROTOCOL (3-STEP PIPELINE) ────────────────── */}
      <section className="py-12 md:py-20 border-y border-secondary/60 bg-secondary/10">
        <div className="max-w-7xl container mx-auto px-4 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <FadeUp className="space-y-2">
              <SectionEyebrow>پروتکل فنی خانه رویال</SectionEyebrow>
              <h2 className="text-2xl md:text-4xl font-black text-primary leading-tight">
                چطور یک شیشه عطر،
                <br />
                <span className="text-neutral-400">
                  بدون افت کیفیت دکانت می‌شود؟
                </span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.05}>
              <p className="text-xs leading-6 text-muted-foreground font-medium max-w-sm">
                کوچک‌ترین تماس عطر با هوا یا آلودگی محیط، نت‌های ظریف آن را
                تخریب می‌کند. این ۳ مرحله، استاندارد ثابت ما برای هر سفارش است:
              </p>
            </FadeUp>
          </div>

          <div className="grid gap-4 lg:grid-cols-3">
            {PROCESS_STEPS.map((item, idx) => (
              <FadeUp key={item.step} delay={idx * 0.06}>
                <div className="group relative rounded-3xl border border-secondary/60 bg-background p-6 md:p-8 h-full flex flex-col justify-between transition duration-300 hover:border-neutral-400">
                  {/* Top Header */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-secondary/40 border border-secondary/60 px-2.5 py-1 text-[10px] font-bold text-accent">
                        {item.tag}
                      </span>
                      <span className="text-2xl font-black text-primary/15 group-hover:text-accent/40 transition-colors">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="text-base md:text-lg font-black text-primary">
                      {item.title}
                    </h3>

                    <p className="text-xs leading-7 text-muted-foreground font-medium">
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Technical Spec Bar */}
                  <div className="mt-6 pt-4 border-t border-secondary/50 flex items-center justify-between text-[10px] font-mono text-neutral-400">
                    <span>ROYAL LAB STANDARD</span>
                    <span className="font-bold text-primary">{item.spec}</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. CORE PILLARS & PHILOSOPHY ───────────────────────────────────── */}
      <section className="py-12 md:py-24 max-w-7xl container mx-auto px-4 space-y-10">
        <FadeUp className="text-center max-w-2xl mx-auto space-y-2">
          <SectionEyebrow>چرا کلکسیونرها با ما می‌مانند؟</SectionEyebrow>
          <h2 className="text-2xl md:text-3xl font-black text-primary">
            فرهنگ درست انتخاب و خرید عطر
          </h2>
        </FadeUp>

        <div className="grid gap-4 md:grid-cols-3">
          {PILLARS.map((pillar, i) => (
            <FadeUp key={pillar.id} delay={i * 0.05}>
              <div className="rounded-3xl border border-secondary/60 bg-secondary/10 p-6 md:p-7 h-full flex flex-col justify-between space-y-5 hover:bg-secondary/20 transition duration-200">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-background border border-secondary/60 flex items-center justify-center shadow-2xs">
                    {pillar.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-accent block mb-0.5">
                      {pillar.subtitle}
                    </span>
                    <h3 className="text-base font-black text-primary">
                      {pillar.title}
                    </h3>
                  </div>
                  <p className="text-xs leading-7 text-muted-foreground font-medium">
                    {pillar.body}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── 5. THE MANIFESTO: RED LINES COMPARISON ─────────────────────────── */}
      <section className="py-6 md:py-12 max-w-7xl container mx-auto px-4">
        <FadeUp>
          <div className="rounded-3xl border border-secondary/60 bg-secondary/15 p-6 sm:p-8 md:p-12">
            <div className="max-w-2xl space-y-2 mb-8">
              <SectionEyebrow>منشور شفافیت رویال</SectionEyebrow>
              <h2 className="text-xl md:text-3xl font-black text-primary">
                خط قرمزهایی که هرگز از آن‌ها عبور نمی‌کنیم
              </h2>
              <p className="text-xs leading-6 text-muted-foreground font-medium">
                اعتماد در بازار عطر با شعار ساخته نمی‌شود؛ با کارهایی که انجام
                نمی‌دهیم تعریف می‌شود.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-2">
              {/* What we NEVER do */}
              <div className="rounded-2xl border border-rose-500/20 bg-rose-950/[0.04] p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-2 text-rose-500 font-bold text-xs">
                  <IoCloseCircleOutline className="w-4 h-4 shrink-0" />
                  <span>آنچه در خانه رویال هرگز نخواهید دید</span>
                </div>
                <ul className="space-y-3">
                  {RED_LINES.weNeverDo.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs leading-6 text-muted-foreground font-medium"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-rose-500/60 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What we ALWAYS guarantee */}
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-950/[0.04] p-5 md:p-6 space-y-4">
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                  <IoCheckmarkCircleOutline className="w-4 h-4 shrink-0" />
                  <span>تعهد دائمی ما در تمام سفارش‌ها</span>
                </div>
                <ul className="space-y-3">
                  {RED_LINES.ourStandard.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs leading-6 text-primary/90 font-medium"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </FadeUp>
      </section>

      {/* ── 6. SIGNATURE FOOTER CTA (Matched with FeaturedSection) ─────────── */}
      <section className="relative overflow-hidden py-16 md:py-24 mt-12 bg-primary text-background">
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
          ARCHIVE
        </span>

        <div className="container relative z-10 mx-auto px-4 max-w-3xl text-center space-y-5">
          <FadeUp>
            <SectionEyebrow>
              <span className="text-neutral-400">شروع تجربه بویایی</span>
            </SectionEyebrow>
          </FadeUp>

          <FadeUp delay={0.05}>
            <h2 className="text-2xl md:text-4xl font-black text-background leading-tight">
              به جای حدس زدن،
              <br />
              رایحه بعدی‌تان را زندگی کنید
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="mx-auto max-w-md text-xs md:text-sm leading-6 md:leading-7 text-neutral-300 font-medium">
              کاتالوگ دست‌ریزهای نیش و دیزاینر رویال را مرور کنید یا اگر بین چند
              گزینه مردد هستید، از مشاوره تخصصی ما کمک بگیرید.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/products"
                className="group inline-flex items-center gap-2 rounded-full bg-background px-6 py-2.5 text-xs font-bold text-primary transition hover:scale-[1.02] active:scale-[0.98] shadow-sm"
              >
                <span>مشاهده کاتالوگ عطرها</span>
                <IoArrowBackOutline className="w-3.5 h-3.5 transition duration-300 transform group-hover:-translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-background/20 px-6 py-2.5 text-xs font-bold text-background transition hover:bg-background/10"
              >
                <IoLockClosedOutline className="w-3.5 h-3.5 text-accent" />
                <span>مشاوره انتخاب رایحه</span>
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>
    </div>
  );
}
