"use client";

import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";

const NAV = [
  {
    heading: "فروشگاه",
    links: [
      { label: "همه محصولات", href: "/products" },
      { label: "دکانت‌ها", href: "/decants" },
      { label: "کلکسیون‌ها", href: "/collections" },
      { label: "تازه‌واردها", href: "/new" },
    ],
  },
  {
    heading: "راهنما",
    links: [
      { label: "درباره دکانت", href: "/about-decant" },
      { label: "راهنمای انتخاب عطر", href: "/guide" },
      { label: "سوالات متداول", href: "/faq" },
      { label: "تماس با ما", href: "/contact" },
    ],
  },
  {
    heading: "حساب کاربری",
    links: [
      { label: "ورود", href: "/login" },
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
  return (
    <footer
      dir="rtl"
      className="border-t border-border bg-background text-foreground"
    >
      {/* ── Newsletter strip ─────────────────────────────────────────────── */}
      <div className="border-b border-border">
        <div className="container mx-auto flex flex-col items-start justify-between gap-6 px-6 py-10 lg:flex-row lg:items-center">
          <div>
            <p className="text-xs tracking-[0.3em] text-muted-foreground mb-2">
              خبرنامه
            </p>
            <h3 className="text-lg font-semibold">
              اولین باش از رایحه‌های تازه خبردار شو
            </h3>
          </div>
          <div className="flex w-full max-w-sm items-center gap-0 rounded-full border border-border overflow-hidden">
            <input
              type="email"
              placeholder="ایمیل تو اینجا"
              className="flex-1 bg-transparent px-5 py-3 text-sm outline-none placeholder:text-muted-foreground/50"
            />
            <button className="flex shrink-0 items-center gap-2 bg-foreground px-5 py-3 text-sm font-medium text-background transition hover:opacity-90">
              <span>عضویت</span>
              <HiArrowNarrowLeft size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* ── Main grid ────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          {/* Brand column */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-2xl font-black tracking-tight">عطر</p>
              <p className="mt-1 text-xs tracking-[0.3em] text-muted-foreground">
                DECANT HOUSE
              </p>
            </div>
            <p className="max-w-xs text-sm leading-7 text-muted-foreground">
              دکانت‌های اصل از بهترین برندهای دنیا. رایحه‌ای که تو را روایت کند.
            </p>
            <div className="flex gap-5">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs tracking-wide text-muted-foreground transition hover:text-foreground"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {NAV.map((col) => (
            <div key={col.heading} className="flex flex-col gap-5">
              <p className="text-xs tracking-[0.3em] text-muted-foreground">
                {col.heading}
              </p>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition hover:text-foreground"
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

      {/* ── Bottom bar ───────────────────────────────────────────────────── */}
      <div className="border-t border-border">
        <div className="container mx-auto flex flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} تمام حقوق محفوظ است.</p>

          <p className="flex items-center gap-1">
            <span>ساخته شده با</span>
            <span className="text-rose-500">♥</span>
            <span>توسط</span>
            <a
              href="https://arshia.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground transition hover:opacity-70"
            >
              Arshia
            </a>
          </p>

          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-foreground">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="transition hover:text-foreground">
              قوانین
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
