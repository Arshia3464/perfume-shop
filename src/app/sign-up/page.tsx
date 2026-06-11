"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);

    try {
      await authClient.signUp.email({
        name,
        email,
        password,
      });

      // optional: redirect after signup
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert("خطا در ثبت‌نام");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white"
      dir="rtl"
    >
      <div className="w-full max-w-md p-8 rounded-2xl bg-white/5 backdrop-blur border border-white/10 shadow-xl">
        <h1 className="text-2xl font-bold text-center mb-6">
          ایجاد حساب کاربری
        </h1>

        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-blue-500"
            placeholder="نام"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-blue-500"
            placeholder="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            className="w-full p-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-blue-500"
            placeholder="رمز عبور"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignUp}
            disabled={loading}
            className="w-full p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-semibold"
          >
            {loading ? "در حال ساخت حساب..." : "ثبت‌نام"}
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-6">
          قبلاً حساب دارید؟{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            ورود
          </a>
        </p>
      </div>
    </div>
  );
}
