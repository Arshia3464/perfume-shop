"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { HiArrowNarrowLeft, HiArrowNarrowRight } from "react-icons/hi";

type SliderItem = {
  id: string;
  productId: string;
  text: string | null;
  image: string | null;
  order: number;
  active: boolean;
};

interface HeroProps {
  sliders: SliderItem[];
}

export default function Hero({ sliders }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const total = sliders.length;

  useEffect(() => {
    if (!total) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [total, current]);

  if (!sliders.length) return null;

  const slide = sliders[current];

  const nextSlide = () => setCurrent((prev) => (prev + 1) % total);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + total) % total);

  return (
    <section
      dir="rtl"
      className="relative overflow-hidden bg-background min-h-[100svh] w-full flex items-center justify-center"
    >
      {/* ── Ambient background orbs ───────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`orb-${slide.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <div className="absolute top-[-10%] right-[-5%] h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-foreground/[0.02] blur-3xl" />
            <div className="absolute bottom-[-10%] left-[10%] h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full bg-foreground/[0.02] blur-3xl" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Ghost slide number (Hidden completely on smaller phones to look cleaner) ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden sm:flex items-center justify-end pr-[6%]"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`num-${current}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="select-none text-[16rem] md:text-[22rem] lg:text-[28rem] font-black leading-none text-foreground/[0.04] lg:text-[0.085]"
          >
            {String(current + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 right-0 left-0 z-20 h-px bg-border">
        <motion.div
          key={`progress-${current}`}
          className="h-full bg-foreground/30"
          initial={{ scaleX: 0, originX: 1 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>

      {/* ── Vertical slide label (right edge) ────────────────────────────── */}
      <div className="absolute right-6 top-1/2 z-10 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
        <span className="text-[0.65rem] tracking-[0.35em] text-muted-foreground [writing-mode:vertical-rl]">
          عطر منتخب
        </span>
        <span className="block h-16 w-px bg-border" />
      </div>

      {/* ── Main Layout Wrapper ────────────────────────────────────────── */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 text-foreground w-full relative z-10">
        <div className="grid min-h-[100svh] items-center gap-6 pt-20 pb-10 lg:grid-cols-[1fr_1fr] lg:gap-0 lg:pt-0 lg:pb-0">
          {/* CONTENT COL (Blink-Free layout containment) ───────────────────── */}
          <div className="flex flex-col justify-center order-2 lg:order-1 lg:h-full max-w-xl mx-auto lg:mx-0 w-full">
            {/* Unified Animation Frame to avoid multi-element jerking layout resets */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`slide-content-${slide.id}`}
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -15 }}
                transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
                className="w-full flex flex-col items-center text-center lg:items-start lg:text-right"
              >
                {/* Eyebrow */}
                <div className="mb-4 flex items-center gap-3 justify-center lg:justify-start">
                  <span className="hidden lg:block h-px w-8 bg-muted-foreground/40" />
                  <span className="text-[10px] md:text-xs tracking-[0.35em] uppercase text-muted-foreground font-medium">
                    کلکسیون ویژه رویال
                  </span>
                </div>

                {/* Headline (Min height container locks layout shifting) */}
                <h1 className="mb-4 text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black leading-[1.25] tracking-tight text-foreground min-h-[2.5em] lg:min-h-[auto] flex items-center justify-center lg:justify-start">
                  {slide.text}
                </h1>

                {/* Body Text */}
                <p className="mb-8 max-w-sm text-xs sm:text-sm md:text-base leading-7 md:leading-8 text-muted-foreground lg:text-foreground">
                  مجموعه‌ای از بهترین عطرها و دکانت‌های خاص برای کسانی که به
                  دنبال امضای شخصی رایحه خود هستند.
                </p>

                {/* Call To Actions */}
                <div className="flex items-center gap-4 justify-center lg:justify-start w-full sm:w-auto">
                  <button className="rounded-full bg-foreground px-6 sm:px-8 py-2.5 sm:py-3 text-xs sm:text-sm font-medium text-background transition-transform hover:scale-105 active:scale-100 shadow-sm cursor-pointer">
                    مشاهده محصول
                  </button>
                  <button className="group flex items-center gap-2.5 text-xs sm:text-sm font-medium text-muted-foreground transition hover:text-foreground cursor-pointer">
                    <span>اطلاعات بیشتر</span>
                    <span className="block h-px w-4 bg-current transition-all duration-300 group-hover:w-8" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls Component Container */}
            <div className="mt-10 sm:mt-12 lg:mt-16 flex items-center justify-center lg:justify-start gap-5 w-full">
              <button
                onClick={prevSlide}
                aria-label="اسلاید قبلی"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground active:scale-95 cursor-pointer"
              >
                <HiArrowNarrowRight size={16} />
              </button>

              {/* Dot Indicators */}
              <div className="flex items-center gap-1.5">
                {sliders.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`اسلاید ${i + 1}`}
                    className="relative flex h-3 w-3 items-center justify-center cursor-pointer"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        i === current
                          ? "h-1.5 w-1.5 bg-foreground"
                          : "h-1 w-1 bg-muted-foreground/30"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                aria-label="اسلاید بعدی"
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground active:scale-95 cursor-pointer"
              >
                <HiArrowNarrowLeft size={16} />
              </button>

              {/* Counter UI Metrics */}
              <span className="text-[10px] sm:text-xs tracking-[0.25em] text-muted-foreground font-medium mr-4 sm:mr-6 lg:mr-auto">
                {String(current + 1).padStart(2, "0")}
                <span className="mx-1.5 text-muted-foreground/30">/</span>
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* IMAGE PERFORMANCE STAGE COL ─────────────────────────────── */}
          <div className="relative flex items-center justify-center order-1 lg:order-2 h-[260px] sm:h-[340px] lg:h-auto">
            {/* Decorative structural circles (Scaled safely dynamically down on phones) */}
            <div
              aria-hidden
              className="absolute h-[240px] w-[240px] sm:h-[340px] sm:w-[340px] lg:h-[560px] lg:w-[560px] rounded-full border border-border/20"
            />
            <div
              aria-hidden
              className="absolute h-[180px] w-[180px] sm:h-[260px] sm:w-[260px] lg:h-[440px] lg:w-[440px] rounded-full border border-border/10"
            />

            {/* Stage bounds mapping */}
            <div className="relative z-10 h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] lg:h-[500px] lg:w-[500px]">
              {sliders.map((s, i) => (
                <motion.div
                  key={s.id}
                  animate={{
                    opacity: i === current ? 1 : 0,
                    scale: i === current ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.55, ease: [0.25, 1, 0.5, 1] }}
                  className="absolute inset-0"
                >
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.text ?? ""}
                      fill
                      priority={i === 0}
                      className="object-contain drop-shadow-2xl select-none pointer-events-none"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-5">
                      <div className="w-12 h-20 bg-foreground rounded-lg" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Premium Floating Context Label (Hidden completely below desktop thresholds) */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${slide.id}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.35 }}
                className="absolute bottom-6 left-2 z-20 hidden lg:block"
              >
                <div className="rounded-2xl border border-border bg-background/70 px-5 py-4 backdrop-blur-md shadow-xs">
                  <p className="mb-0.5 text-[0.65rem] tracking-[0.25em] text-muted-foreground uppercase font-medium">
                    دسته‌بندی
                  </p>
                  <p className="text-sm font-semibold">{slide.text}</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-muted-foreground">
                      اصالت تضمین شده
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
