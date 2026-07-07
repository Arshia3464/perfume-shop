"use client";

import { useState } from "react";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { IoChevronBackOutline } from "react-icons/io5";
import { AnimatePresence, motion, Variants } from "framer-motion"; // Imported Variants type here
import { usePathname } from "next/navigation";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export default function Navbar({ user }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  // Explicitly type the configuration matrix to resolve the index signature collision
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1],
        staggerChildren: 0.05,
        delayChildren: 0.02,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      transition: {
        duration: 0.25,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Explicitly type the individual menu line animations to resolve the "easeOut" string mismatch
  const itemVariants: Variants = {
    hidden: { opacity: 0, x: 8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.35, ease: "easeOut" },
    },
  };

  return (
    <header dir="rtl" className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-6xl px-4 md:px-6 pt-4">
        {/* HEADER CONTAINER */}
        <div className="relative flex flex-row-reverse items-center justify-between rounded-2xl border border-white/10 bg-[var(--background)]/60 backdrop-blur-2xl px-5 py-3 md:px-6 shadow-sm z-50">
          {/* Ambient Glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-10 right-1/2 h-24 w-24 translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-2xl" />
          </div>

          {/* DESKTOP NAVIGATION */}
          <div className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium relative z-10">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition duration-200"
            >
              خانه
            </Link>
            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground transition duration-200"
            >
              عطرها
            </Link>
            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition duration-200"
            >
              داستان برند
            </Link>

            <span className="h-3 w-px bg-foreground/10" />

            {user ? (
              <Link
                href="/dashboard"
                className="group flex items-center gap-2 text-foreground"
              >
                <span className="relative">
                  {user.name}
                  <span className="absolute -right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--accent)] animate-pulse" />
                </span>
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-foreground hover:text-muted-foreground transition duration-200"
              >
                ورود
              </Link>
            )}
          </div>

          {/* MOBILE INTERACTION TRIGGER */}
          <div className="flex md:hidden relative z-50">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground focus:outline-none p-1.5 transition-transform duration-200 active:scale-95"
              aria-label="تغییر وضعیت منو"
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close-icon"
                    initial={{ opacity: 0, rotate: -45 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiX className="w-5 h-5 text-foreground/80" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu-icon"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <HiMenuAlt3 className="w-5 h-5 text-foreground/80" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>

          {/* BRAND LOGO */}
          <Link
            href="/"
            className="relative text-xs tracking-[0.5em] font-light text-foreground z-50 transition-opacity hover:opacity-80"
          >
            <span className="relative z-10">ROYAL</span>
            <span className="absolute -bottom-1 right-1/2 h-px w-10 translate-x-1/2 bg-[var(--accent)] opacity-60" />
          </Link>
        </div>

        {/* PREMIUM ANIMATED MOBILE OVERLAY DRAWER */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="md:hidden absolute top-[calc(100%+0.5rem)] left-4 right-4 rounded-2xl border border-white/10 bg-[var(--background)]/90 shadow-2xl backdrop-blur-3xl z-40 flex flex-col p-6 origin-top"
            >
              <nav className="flex flex-col text-right space-y-1">
                <motion.div variants={itemVariants}>
                  <Link
                    href="/"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-foreground/90 font-light text-sm py-3.5 border-b border-foreground/5 transition active:bg-secondary/20 px-2 rounded-lg"
                  >
                    <span className="tracking-wide">خانه</span>
                    <IoChevronBackOutline className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/products"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-foreground/90 font-light text-sm py-3.5 border-b border-foreground/5 transition active:bg-secondary/20 px-2 rounded-lg"
                  >
                    <span className="tracking-wide">
                      مجموعه رایحه‌ها (عطرها)
                    </span>
                    <IoChevronBackOutline className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </Link>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Link
                    href="/about"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between text-foreground/90 font-light text-sm py-3.5 border-b border-foreground/5 transition active:bg-secondary/20 px-2 rounded-lg"
                  >
                    <span className="tracking-wide">داستان خانه رویال</span>
                    <IoChevronBackOutline className="w-3.5 h-3.5 text-muted-foreground/60" />
                  </Link>
                </motion.div>
              </nav>

              <motion.div variants={itemVariants} className="mt-8">
                {user ? (
                  <Link
                    href="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-secondary/60 text-foreground text-xs font-medium border border-foreground/5"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>حساب کاربری: {user.name}</span>
                  </Link>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center w-full py-3 rounded-xl bg-primary text-background text-xs font-semibold tracking-widest uppercase transition active:opacity-90 shadow-xs"
                  >
                    ورود به تالار کاربری
                  </Link>
                )}
              </motion.div>

              <motion.button
                variants={itemVariants}
                onClick={() => setIsOpen(false)}
                className="mt-5 mx-auto flex items-center gap-1.5 text-[10px] tracking-widest text-muted-foreground/60 uppercase hover:text-foreground transition py-1 px-3"
              >
                <span>بازگشت به فروشگاه</span>
                <IoChevronBackOutline className="w-3 h-3 rotate-180" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
