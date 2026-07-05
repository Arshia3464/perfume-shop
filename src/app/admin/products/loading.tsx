// src/app/admin/loading.tsx
import { FiLoader } from "react-icons/fi";

export default function GlobalAdminLoading() {
  return (
    <div
      dir="rtl"
      className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-4 text-center antialiased"
    >
      {/* Premium Minimal Rotating Spinner Wrapper */}
      <div className="relative flex items-center justify-center">
        <FiLoader className="w-8 h-8 animate-spin text-[var(--accent)] stroke-[1.5]" />
        <div className="absolute w-12 h-12 border border-[var(--accent)]/10 rounded-full animate-ping duration-1000" />
      </div>

      {/* Understated Sensory Typography */}
      <div className="space-y-1">
        <p className="text-sm font-light text-[var(--foreground)] tracking-wide">
          در حال بارگذاری داده‌های استودیو...
        </p>
        <p className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/30 font-light">
          ROYAL Archive Engine
        </p>
      </div>
    </div>
  );
}
