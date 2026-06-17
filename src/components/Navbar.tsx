"use client";

import Link from "next/link";
import { authClient } from "@/lib/auth-client";

type Props = {
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
};

export default function Navbar({ user }: Props) {
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  return (
    <header dir="rtl" className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-6xl px-6 pt-4">
        <div className="relative flex flex-row-reverse items-center justify-between rounded-2xl border border-black/10 bg-[var(--background)]/70 backdrop-blur-2xl px-6 py-3">
          {/* ambient glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
            <div className="absolute -top-10 right-1/2 h-24 w-24 translate-x-1/2 rounded-full bg-[var(--accent)]/10 blur-2xl" />
          </div>

          {/* ───────── LEFT SIDE (NAV + AUTH) ───────── */}
          <div className="relative flex items-center gap-8 text-sm">
            <Link
              href="/"
              className="text-muted-foreground hover:text-foreground transition"
            >
              خانه
            </Link>

            <Link
              href="/products"
              className="text-muted-foreground hover:text-foreground transition"
            >
              عطرها
            </Link>

            <Link
              href="/about"
              className="text-muted-foreground hover:text-foreground transition"
            >
              داستان
            </Link>

            <span className="h-4 w-px bg-black/10" />

            {/* AUTH */}
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="group flex items-center gap-2 text-sm text-foreground"
                >
                  <span className="relative">
                    {user.name}
                    <span className="absolute -right-3 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-[var(--accent)] animate-pulse" />
                  </span>

                  {/* <span className="text-xs text-muted-foreground group-hover:text-foreground transition">
                    داشبورد
                  </span> */}
                </Link>

                <button
                  onClick={handleLogout}
                  className="text-xs tracking-[0.2em] text-muted-foreground hover:text-red-500 transition"
                >
                  خروج
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm text-foreground hover:text-muted-foreground transition"
              >
                ورود
              </Link>
            )}
          </div>

          {/* ───────── RIGHT SIDE (LOGO) ───────── */}
          <Link
            href="/"
            className="relative text-sm tracking-[0.6em] font-light text-foreground"
          >
            <span className="relative z-10">PERFUME</span>

            <span className="absolute -bottom-2 right-1/2 h-px w-12 translate-x-1/2 bg-[var(--accent)] opacity-70" />
          </Link>
        </div>
      </div>
    </header>
  );
}
