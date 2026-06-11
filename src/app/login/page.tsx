"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { AnimatePresence, easeInOut, motion } from "framer-motion";

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
      setError("ایمیل و رمز الزامی هستند");
      return;
    }

    if (!isValidEmail(email)) {
      setError("فرمت ایمیل صحیح نیست");
      return;
    }

    setLoading(true);

    try {
      const response = await authClient.signIn.email({
        email,
        password,
      });

      if (response.error) {
        setError("ایمیل یا رمز اشتباه است");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("خطای سرور");
    } finally {
      setLoading(false);
    }
  };
  const handleSignUp = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("تمام فیلدها الزامی هستند");
      return;
    }

    if (!isValidEmail(email)) {
      setError("فرمت ایمیل صحیح نیست");
      return;
    }

    if (!isStrongPassword(password)) {
      setError("رمز باید حداقل ۸ کاراکتر باشد");
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
        setError("خطا در ثبت‌نام");
        return;
      }

      window.location.href = "/";
    } catch (err) {
      console.error(err);
      setError("خطا در ثبت‌نام");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      dir="rtl"
      className="min-h-screen w-full flex items-center justify-center p-6"
    >
      <div className="relative h-175 w-full max-w-5xl overflow-hidden rounded-4xl bg-white shadow-2xl text-black">
        {/* IMAGE */}
        <motion.div
          className="absolute top-4 w-4/7 h-[calc(100%-2rem)] rounded-3xl overflow-hidden z-20"
          animate={{
            left: !isSigningUp ? "auto" : "1rem",
            right: !isSigningUp ? "1rem" : "auto",
          }}
          transition={{
            duration: 0.7,
            ease: easeInOut,
          }}
        >
          <img
            src="/login-image.png"
            alt="Login Illustration"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-0 inset-0 bg-linear-to-t from-black" />

          <div className="absolute bottom-10 right-10 text-white max-w-md">
            <h2 className="text-4xl font-bold leading-tight mb-4">
              {isSigningUp ? "به خانواده ما خوش اومدی" : "دوباره خوش اومدی"}
            </h2>

            <p className="text-white/80 text-lg leading-8">
              {isSigningUp
                ? "حساب خودت رو بساز و همین امروز شروع کن."
                : "وارد حسابت شو و ادامه بده."}
            </p>
          </div>
        </motion.div>

        {/* LOGIN FORM */}
        <motion.div
          layout
          className="absolute top-0 left-0 h-full w-3/7 flex items-center justify-center p-10"
          animate={{
            opacity: isSigningUp ? 0 : 1,
            x: isSigningUp ? -80 : 0,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <div className="w-full max-w-sm">
            <h1 className="text-4xl font-bold text-black mb-2">ورود</h1>

            <p className="text-neutral-500 mb-8">وارد حساب کاربری خود شوید</p>

            <div className="space-y-4">
              <input
                className="w-full h-14 px-5 rounded-2xl bg-neutral-100 border border-neutral-200 outline-none focus:border-black transition"
                placeholder="ایمیل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="w-full h-14 px-5 rounded-2xl bg-neutral-100 border border-neutral-200 outline-none focus:border-black transition"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{
                      duration: 0.25,

                      ease: "easeOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleLogin}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-black text-white font-semibold hover:opacity-90 transition"
              >
                {loading ? "در حال ورود..." : "ورود"}
              </button>
            </div>

            <p className="text-sm text-neutral-500 mt-8 text-center">
              حساب ندارید؟
              <button
                onClick={() => setIsSigningUp(true)}
                className="text-black font-semibold mr-2"
              >
                ثبت‌نام
              </button>
            </p>
          </div>
        </motion.div>

        {/* SIGNUP FORM */}
        <motion.div
          layout
          className="absolute top-0 right-0 h-full w-3/7 flex items-center justify-center p-10"
          animate={{
            opacity: isSigningUp ? 1 : 0,
            x: isSigningUp ? 0 : 80,
          }}
          transition={{
            duration: 0.4,
          }}
        >
          <div className="w-full max-w-sm">
            <h1 className="text-4xl font-bold text-black mb-2">ثبت‌نام</h1>

            <p className="text-neutral-500 mb-8">حساب جدید ایجاد کنید</p>

            <div className="space-y-4">
              <input
                className="w-full h-14 px-5 rounded-2xl bg-neutral-100 border border-neutral-200 outline-none focus:border-black transition"
                placeholder="نام کامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                className="w-full h-14 px-5 rounded-2xl bg-neutral-100 border border-neutral-200 outline-none focus:border-black transition"
                placeholder="ایمیل"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                className="w-full h-14 px-5 rounded-2xl bg-neutral-100 border border-neutral-200 outline-none focus:border-black transition"
                placeholder="رمز عبور"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <AnimatePresence mode="wait">
                {error && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                    transition={{
                      duration: 0.25,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={handleSignUp}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-black text-white font-semibold hover:opacity-90 transition"
              >
                ایجاد حساب
              </button>
            </div>

            <p className="text-sm text-neutral-500 mt-8 text-center">
              حساب دارید؟
              <button
                onClick={() => setIsSigningUp(false)}
                className="text-black font-semibold mr-2"
              >
                ورود
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
