"use client";

import { useEffect, useRef, useState } from "react";
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
      className="relative overflow-hidden bg-background min-h-[100svh]"
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
            <div className="absolute top-[-10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-foreground/[0.03] blur-3xl" />
            <div className="absolute bottom-[-10%] left-[10%] h-[400px] w-[400px] rounded-full bg-foreground/[0.025] blur-3xl" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Ghost slide number ────────────────────────────────────────────── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-end pr-[6%]"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={`num-${current}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="select-none text-[22rem] font-black leading-none text-foreground/[0.085] lg:text-[28rem]"
          >
            {String(current + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* ── Progress bar ─────────────────────────────────────────────────── */}
      <div className="absolute bottom-0 right-0 left-0 z-20 h-px bg-border">
        <motion.div
          key={`progress-${current}`}
          className="h-full bg-foreground/40"
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

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 lg:px-12 text-foreground">
        <div className="grid min-h-[100svh] items-center gap-8 lg:grid-cols-[1fr_1fr] lg:gap-0">
          {/* CONTENT ─────────────────────────────────────────────────────── */}
          <div className="relative z-10 flex flex-col justify-center pt-24 pb-16 lg:py-0">
            {/* Eyebrow */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`eyebrow-${slide.id}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mb-6 flex items-center gap-3"
              >
                <span className="block h-px w-8 bg-muted-foreground/40" />
                <span className="text-xs tracking-[0.35em] text-muted-foreground">
                  کلکسیون ویژه
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`headline-${slide.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{
                  duration: 0.6,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-6 text-5xl font-extrabold leading-[1.2] tracking-tight lg:text-7xl"
              >
                {slide.text}
              </motion.h1>
            </AnimatePresence>

            {/* Body */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`body-${slide.id}`}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{
                  duration: 0.55,
                  delay: 0.18,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-10 max-w-sm text-base leading-8 text-foreground"
              >
                مجموعه‌ای از بهترین عطرها و دکانت‌های خاص برای کسانی که به دنبال
                امضای شخصی رایحه خود هستند.
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`cta-${slide.id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{
                  duration: 0.5,
                  delay: 0.26,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-wrap items-center gap-4"
              >
                <button className="rounded-full bg-foreground px-8 py-3 text-sm font-medium text-background transition-transform hover:scale-105 active:scale-100">
                  مشاهده محصول
                </button>
                <button className="group flex items-center gap-3 text-sm font-medium text-muted-foreground transition hover:text-foreground">
                  <span>اطلاعات بیشتر</span>
                  <span className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-10" />
                </button>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-16 flex items-center gap-6">
              <button
                onClick={prevSlide}
                aria-label="اسلاید قبلی"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
              >
                <HiArrowNarrowRight size={18} />
              </button>

              {/* Dot indicators */}
              <div className="flex items-center gap-2">
                {sliders.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`اسلاید ${i + 1}`}
                    className="relative flex h-4 w-4 items-center justify-center"
                  >
                    <span
                      className={`block rounded-full transition-all duration-300 ${
                        i === current
                          ? "h-2 w-2 bg-foreground"
                          : "h-1.5 w-1.5 bg-muted-foreground/40"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={nextSlide}
                aria-label="اسلاید بعدی"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
              >
                <HiArrowNarrowLeft size={18} />
              </button>

              {/* Counter */}
              <span className="mr-auto text-xs tracking-[0.25em] text-muted-foreground">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.25 }}
                    className="inline-block"
                  >
                    {String(current + 1).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
                <span className="mx-1 text-muted-foreground/30">/</span>
                {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* IMAGE ───────────────────────────────────────────────────────── */}
          <div className="relative flex items-center justify-center">
            {/* Decorative rings */}
            <div
              aria-hidden
              className="absolute h-[420px] w-[420px] rounded-full border border-border/30 lg:h-[560px] lg:w-[560px]"
            />
            <div
              aria-hidden
              className="absolute h-[320px] w-[320px] rounded-full border border-border/20 lg:h-[440px] lg:w-[440px]"
            />

            {/* Fixed-size stage — never changes size, images crossfade inside */}
            <div className="relative z-10 h-[360px] w-[360px] lg:h-[500px] lg:w-[500px]">
              {sliders.map((s, i) => (
                <motion.div
                  key={s.id}
                  animate={{
                    opacity: i === current ? 1 : 0,
                    scale: i === current ? 1 : 0.96,
                  }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  {s.image ? (
                    <Image
                      src={s.image}
                      alt={s.text ?? ""}
                      fill
                      priority={i === 0}
                      className="object-contain drop-shadow-2xl"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="flex flex-col items-center opacity-10">
                        <div className="h-4 w-8 rounded-t-full bg-foreground" />
                        <div className="h-3 w-14 bg-foreground" />
                        <div className="h-64 w-36 rounded-b-2xl rounded-t-sm bg-foreground" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Floating label card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`card-${slide.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute bottom-12 left-4 z-20 hidden lg:block"
              >
                <div className="rounded-2xl border border-border bg-background/80 px-5 py-4 backdrop-blur-md shadow-sm">
                  <p className="mb-0.5 text-[0.65rem] tracking-[0.25em] text-muted-foreground">
                    دسته‌بندی
                  </p>
                  <p className="text-sm font-semibold">{slide.text}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-muted-foreground">
                      موجود در انبار
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
