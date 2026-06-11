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
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="mx-auto max-w-5xl px-6">
        <div className="h-16 mt-4 rounded-2xl bg-white/70 backdrop-blur-xl border border-black/5 shadow-sm flex items-center justify-between px-6">
          {/* Right */}
          <div className="flex items-center gap-6 text-sm text-neutral-600">
            <Link href="/" className="hover:text-black transition">
              خانه
            </Link>
            <Link href="/products" className="hover:text-black transition">
              محصولات
            </Link>
            <Link href="/about" className="hover:text-black transition">
              درباره
            </Link>
          </div>

          {/* Center */}
          <div className="text-sm tracking-[0.3em] font-light text-black">
            PERFUME
          </div>

          {/* Left */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-black hover:text-black transition"
                >
                  <span className="text-sm text-black">{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-xl text-sm bg-red-500 text-white hover:opacity-90 transition"
                >
                  خروج
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-xl text-sm border border-black/10 hover:bg-black hover:text-white transition"
                >
                  ورود
                </Link>

                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-xl text-sm bg-black text-white hover:opacity-90 transition"
                >
                  ثبت‌نام
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
