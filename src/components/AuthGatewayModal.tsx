"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoShieldCheckmarkOutline, IoCloseOutline } from "react-icons/io5";
import Link from "next/link";

type AuthGatewayModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthGatewayModal({
  isOpen,
  onClose,
}: AuthGatewayModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div
          dir="rtl"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* PREMIUM BACKDROP BLUR */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-primary/40 backdrop-blur-md"
          />

          {/* MODAL CARD BODY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-secondary/60 bg-background p-6 md:p-8 shadow-2xl z-10 text-center space-y-6"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-4 left-4 p-1.5 rounded-full border border-secondary text-neutral-400 hover:text-primary transition duration-200"
            >
              <IoCloseOutline className="w-5 h-5" />
            </button>

            {/* BRANDING ICON */}
            <div className="mx-auto w-12 h-12 rounded-2xl bg-secondary/30 border border-secondary flex items-center justify-center text-accent">
              <IoShieldCheckmarkOutline className="w-6 h-6" />
            </div>

            {/* HIGH-END CURATED COPY */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold block">
                دسترسی به صندوقچه روایح
              </span>
              <h2 className="text-xl font-black text-primary">
                ورود به گالری عطر عتیق
              </h2>
              <p className="text-xs leading-6 text-neutral-500 font-medium px-2">
                برای افزودن این اثر نفیس به سبد خرید یا نشان کردن آن در مجموعه
                شخصی خود، نیاز است ابتدا به تالار کاربری خود متصل شوید.
              </p>
            </div>

            {/* EDITORIAL CALL TO ACTIONS */}
            <div className="pt-2 flex flex-col gap-2.5">
              <Link
                href="/login"
                className="w-full py-3.5 rounded-xl bg-primary text-background font-bold text-xs transition text-center hover:opacity-95 active:scale-[0.98] duration-150"
              >
                ورود به حساب کاربری
              </Link>

              <Link
                href="/login?signup=true"
                className="w-full py-3.5 rounded-xl border border-neutral-300 text-neutral-600 font-bold text-xs transition text-center hover:bg-secondary/20 active:scale-[0.98] duration-150"
              >
                پیوستن به مجموعه عتیق (عضویت سریع)
              </Link>
            </div>

            {/* GHOST FOOTNOTE */}
            <p className="text-[10px] text-neutral-400 font-medium">
              عضویت در تالار رایحه‌ها کاملاً رایگان است · اصالت تضمین شده
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
