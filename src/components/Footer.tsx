"use client";

import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { usePathname } from "next/navigation";

const NAV = [
  {
    heading: "فروشگاه رویال",
    links: [
      { label: "همه محصولات", href: "/products" },
      { label: "دکانت‌ها", href: "/decants" },
      { label: "کلکسیون‌ها", href: "/collections" },
      { label: "تازه‌واردها", href: "/new" },
    ],
  },
  {
    heading: "راهنما و پشتیبانی",
    links: [
      { label: "درباره دکانت", href: "/about-decant" },
      { label: "راهنمای انتخاب رایحه", href: "/guide" },
      { label: "سوالات متداول", href: "/faq" },
      { label: "تماس با ما", href: "/contact" },
    ],
  },
  {
    heading: "حساب کاربری",
    links: [
      { label: "ورود به پنل", href: "/login" },
      { label: "ثبت‌نام", href: "/register" },
      { label: "سفارش‌های من", href: "/orders" },
      { label: "علاقه‌مندی‌ها", href: "/wishlist" },
    ],
  },
];

const SOCIALS = [
  { label: "اینستاگرام", href: "https://instagram.com" },
  { label: "تلگرام", href: "https://t.me" },
  { label: "واتساپ", href: "https://wa.me" },
];

export default function Footer() {
  const path = usePathname();
  if (path?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer
      dir="rtl"
      className="border-t border-border bg-background text-foreground"
    >
      {/* ── Newsletter Strip ─────────────────────────────────────────────── */}
      <div className="border-b border-border">
        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-5 py-8 md:px-6 md:py-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">
              خبرنامه خانه رویال
            </p>
            <h3 className="text-base md:text-lg font-semibold">
              اولین باش از رایحه‌های تازه خبردار شو
            </h3>
          </div>
          <div className="flex w-full max-w-sm items-center gap-0 rounded-xl border border-border overflow-hidden bg-secondary/10">
            <input
              type="email"
              placeholder="نشانی ایمیل شما"
              className="flex-1 bg-transparent px-4 py-2.5 text-xs md:text-sm outline-none placeholder:text-muted-foreground/40"
            />
            <button className="flex shrink-0 items-center gap-2 bg-foreground px-4 py-2.5 text-xs md:text-sm font-medium text-background transition hover:opacity-90 cursor-pointer">
              <span>عضویت</span>
              <HiArrowNarrowLeft size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main Grid Container (Optimized Layout Footprint) ────────────── */}
      <div className="container mx-auto px-5 py-10 md:px-6 md:py-14">
        {/* Responsive grid uses 2 columns on mobile instead of stacking long vertically */}
        <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand/Identity Column (Spans full width on mobile grid rows to reset layout safely) */}
          <div className="flex flex-col gap-4 col-span-2 sm:col-span-3 lg:col-span-1 pb-4 lg:pb-0 border-b border-border/40 lg:border-none">
            <div>
              <p className="text-xl font-black tracking-wider text-foreground">
                ROYAL
              </p>
              <p className="mt-0.5 text-[9px] tracking-[0.4em] text-muted-foreground uppercase">
                خانه عطر رویال
              </p>
            </div>
            <p className="max-w-xs text-xs md:text-sm leading-6 text-muted-foreground">
              ارائه دکانت‌های اصیل و رایحه‌های کلکسیونی نایاب از لوکس‌ترین
              خانه‌های عطر جهان برای صاحبان سلیقه.
            </p>
            <div className="flex gap-4 mt-1">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted-foreground transition hover:text-foreground underline underline-offset-4 decoration-transparent hover:decoration-current"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Links Columns */}
          {NAV.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3.5 col-span-1">
              <p className="text-[10px] tracking-[0.2em] font-bold text-muted-foreground/80 uppercase">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-xs md:text-sm text-muted-foreground transition hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom Metrics & Meta Row ──────────────────────────────────── */}
      <div className="border-t border-border bg-secondary/5">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-5 py-5 text-[10px] sm:text-xs text-muted-foreground sm:flex-row md:px-6">
          <p>
            © {new Date().getFullYear()} گالری عطر رویال. تمام حقوق مادی و معنوی
            محفوظ است.
          </p>

          <p className="flex items-center gap-1 order-3 sm:order-2">
            <span>ساخته شده با</span>
            <span className="text-rose-500 animate-pulse">♥</span>
            <span>توسط</span>
            <a
              // href="https://aaui.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition hover:opacity-75 underline underline-offset-2"
            >
              Arshia
            </a>
          </p>

          <div className="flex gap-4 order-2 sm:order-3">
            <Link href="/privacy" className="transition hover:text-foreground">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="transition hover:text-foreground">
              قوانین فروشگاه
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
