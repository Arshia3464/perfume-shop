"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AnimatePresence, motion } from "framer-motion";
import {
  IoMailOutline,
  IoLockClosedOutline,
  IoPersonOutline,
  IoWarningOutline,
} from "react-icons/io5";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [error, setError] = useState("");

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const isStrongPassword = (password: string) => {
    return password.length >= 8;
  };

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("وارد کردن ایمیل و رمز عبور الزامی است");
      return;
    }

    if (!isValidEmail(email)) {
      setError("فرمت نشانی ایمیل وارد شده صحیح نیست");
      return;
    }

    setLoading(true);

    try {
      const response = await authClient.signIn.email({
        email,
        password,
      });

      if (response.error) {
        setError("ایمیل یا رمز عبور اشتباه است");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("خطایی در اتصال به سرور رخ داد");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("تکمیل تمامی فیلدها الزامی است");
      return;
    }

    if (!isValidEmail(email)) {
      setError("فرمت نشانی ایمیل وارد شده صحیح نیست");
      return;
    }

    if (!isStrongPassword(password)) {
      setError("رمز عبور باید حداقل شامل ۸ کاراکتر باشد");
      return;
    }

    setLoading(true);

    try {
      const response = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (response.error) {
        setError("خطا در فرآیند ثبت‌نام. مجدداً تلاش کنید");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("خطا در ارتباط با سرور کاربری");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 bg-background selection:bg-accent selection:text-primary"
    >
      {/* MAIN CONTAINER */}
      <div className="relative w-full max-w-5xl min-h-[620px] lg:h-[680px] overflow-hidden rounded-3xl bg-secondary/20 border border-secondary/60 shadow-xl backdrop-blur-sm flex flex-col md:block">
        {/* DESKTOP/MOBILE IMAGE BANNER PANEL */}
        <motion.div
          className="relative md:absolute top-0 bottom-0 w-full md:w-[52%] h-64 md:h-[calc(100%-2rem)] md:m-4 rounded-b-2xl md:rounded-2xl overflow-hidden z-20 shadow-lg"
          animate={{
            left: !isSigningUp ? "auto" : "1%",
            right: !isSigningUp ? "1%" : "auto",
          }}
          transition={{
            duration: 0.65,
            ease: [0.25, 1, 0.5, 1], // Custom elegant bezier curve
          }}
        >
          <img
            src="/login-image.png"
            alt="گالری عطر عتیق"
            className="w-full h-full object-cover grayscale-[20%] contrast-[105%]"
          />
          {/* Luxury dark gradient overlay */}
          <div className="absolute inset-0 bg-linear-to-t from-primary/90 via-primary/40 to-transparent" />

          <div className="absolute bottom-6 right-6 left-6 md:bottom-12 md:right-10 md:left-10 text-background">
            <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-semibold block mb-2">
              خانه عطر عتیق
            </span>
            <h2 className="text-2xl md:text-4xl font-black leading-tight mb-2 md:mb-4">
              {isSigningUp
                ? "به گالری لوکس ما بپیوندید"
                : "خوش‌آمدید به تالار رایحه‌ها"}
            </h2>
            <p className="text-neutral-300 text-xs md:text-sm leading-6 md:leading-7 max-w-sm">
              {isSigningUp
                ? "با ایجاد حساب کاربری، به دنیای رایحه‌های اصیل، نایاب و کلکسیونی قدم بگذارید."
                : "وارد پنل کاربری خود شوید و مسیر سفارشی‌سازی رایحه امضای خود را دنبال کنید."}
            </p>
          </div>
        </motion.div>

        {/* FORMS CONTAINMENT AREA */}
        <div className="flex-1 relative grid grid-cols-1 md:grid-cols-12 h-full items-center p-6 md:p-0">
          {/* LOGIN CONTENT BLOCK */}
          <motion.div
            layout
            className="col-span-1 md:col-span-5 md:absolute md:left-0 md:w-[45%] flex items-center justify-center py-6 md:p-10"
            animate={{
              opacity: isSigningUp ? 0 : 1,
              x: isSigningUp ? -40 : 0,
              pointerEvents: isSigningUp ? "none" : "auto",
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full max-w-sm space-y-6">
              <div>
                <h1 className="text-3xl font-black text-primary mb-1.5">
                  ورود به حساب
                </h1>
                <p className="text-xs text-neutral-500">
                  جهت دسترسی به سبد خرید لوکس خود وارد شوید
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="relative">
                  <IoMailOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="email"
                    className="w-full h-13 pr-12 pl-4 rounded-xl bg-secondary/40 border border-neutral-300/40 outline-none focus:border-accent text-sm text-primary transition duration-200 font-medium"
                    placeholder="نشانی ایمیل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <IoLockClosedOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="password"
                    className="w-full h-13 pr-12 pl-4 rounded-xl bg-secondary/40 border border-neutral-300/40 outline-none focus:border-accent text-sm text-primary transition duration-200"
                    placeholder="رمز عبور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* ERROR PANEL */}
                <AnimatePresence mode="wait">
                  {error && !isSigningUp && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2 rounded-xl border border-red-200/60 bg-red-50/50 px-4 py-2.5 text-xs text-red-700 font-medium"
                    >
                      <IoWarningOutline className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleLogin}
                  disabled={loading}
                  className="w-full h-13 rounded-xl bg-primary text-background font-bold text-sm transition hover:opacity-95 hover:shadow-md active:scale-[0.98] duration-150 disabled:opacity-50"
                >
                  {loading ? "در حال تایید اصالت..." : "ورود ایمن"}
                </button>
              </div>

              <p className="text-xs text-neutral-500 text-center pt-2">
                هنوز بخشی از گالری ما نیستید؟
                <button
                  onClick={() => {
                    setError("");
                    setIsSigningUp(true);
                  }}
                  className="text-accent font-bold mr-1.5 underline underline-offset-4"
                >
                  عضویت سریع
                </button>
              </p>
            </div>
          </motion.div>

          {/* SIGNUP CONTENT BLOCK */}
          <motion.div
            layout
            className="col-span-1 md:col-span-5 md:absolute md:right-0 md:w-[45%] flex items-center justify-center py-6 md:p-10"
            animate={{
              opacity: isSigningUp ? 1 : 0,
              x: isSigningUp ? 0 : 40,
              pointerEvents: isSigningUp ? "auto" : "none",
            }}
            transition={{ duration: 0.4 }}
          >
            <div className="w-full max-w-sm space-y-6">
              <div>
                <h1 className="text-3xl font-black text-primary mb-1.5">
                  ایجاد عضویت
                </h1>
                <p className="text-xs text-neutral-500">
                  مشخصات مجلل خود را برای ثبت نام وارد کنید
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="relative">
                  <IoPersonOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    className="w-full h-13 pr-12 pl-4 rounded-xl bg-secondary/40 border border-neutral-300/40 outline-none focus:border-accent text-sm text-primary transition duration-200 font-medium"
                    placeholder="نام و نام خانوادگی کامل"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <IoMailOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="email"
                    className="w-full h-13 pr-12 pl-4 rounded-xl bg-secondary/40 border border-neutral-300/40 outline-none focus:border-accent text-sm text-primary transition duration-200 font-medium"
                    placeholder="نشانی ایمیل"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <IoLockClosedOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
                  <input
                    type="password"
                    className="w-full h-13 pr-12 pl-4 rounded-xl bg-secondary/40 border border-neutral-300/40 outline-none focus:border-accent text-sm text-primary transition duration-200"
                    placeholder="رمز عبور (حداقل ۸ کاراکتر)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {/* ERROR PANEL */}
                <AnimatePresence mode="wait">
                  {error && isSigningUp && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="flex items-center gap-2 rounded-xl border border-red-200/60 bg-red-50/50 px-4 py-2.5 text-xs text-red-700 font-medium"
                    >
                      <IoWarningOutline className="w-4 h-4 shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  onClick={handleSignUp}
                  disabled={loading}
                  className="w-full h-13 rounded-xl bg-primary text-background font-bold text-sm transition hover:opacity-95 hover:shadow-md active:scale-[0.98] duration-150 disabled:opacity-50"
                >
                  {loading
                    ? "در حال ثبت اطلاعات..."
                    : "ایجاد حساب کاربری نهایی"}
                </button>
              </div>

              <p className="text-xs text-neutral-500 text-center pt-2">
                قبلاً ثبت‌نام کرده‌اید؟
                <button
                  onClick={() => {
                    setError("");
                    setIsSigningUp(false);
                  }}
                  className="text-accent font-bold mr-1.5 underline underline-offset-4"
                >
                  ورود کاربری
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
