"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  IoSnowOutline,
  IoSunnyOutline,
  IoLeafOutline,
  IoFlameOutline,
  IoMaleFemaleOutline,
  IoHeartOutline,
  IoHeart,
  IoAddOutline,
  IoRemoveOutline,
  IoCheckmarkCircleOutline,
} from "react-icons/io5";
import { FiBox, FiAward, FiGift } from "react-icons/fi";
import { addToCart, wishListToggle } from "../actions";
import AuthGatewayModal from "@/components/AuthGatewayModal";

type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  stock: number;
  brand: string;
  gender: string;
  season: string | null;
  volumeMl: number | null;
  image: string | null;
};

const seasonMap: Record<string, { label: string; icon: React.ReactNode }> = {
  winter: {
    label: "ژرفای زمستان",
    icon: <IoSnowOutline className="w-4 h-4 text-blue-500/70" />,
  },
  summer: {
    label: "طراوت تابستان",
    icon: <IoSunnyOutline className="w-4 h-4 text-amber-500/70" />,
  },
  spring: {
    label: "نسیم بهاری",
    icon: <IoLeafOutline className="w-4 h-4 text-emerald-500/70" />,
  },
  autumn: {
    label: "جنگل‌های پاییزی",
    icon: <IoFlameOutline className="w-4 h-4 text-orange-500/70" />,
  },
};

const genderMap: Record<string, string> = {
  men: "مردانه - باوقار و جسور",
  women: "زنانه - ظریف و فریبنده",
  unisex: "یونیسکس - رایحه بدون مرز",
};

function splitDescription(text: string | null) {
  if (!text) return { intro: "بدون توضیحات.", body: "", end: "" };
  const parts = text.split(".");
  return {
    intro: parts[0]?.trim() || "",
    body: parts.slice(1, -1).join(". ").trim(),
    end: parts[parts.length - 1]?.trim() || "",
  };
}

export default function ProductClient({ item }: { item: Product }) {
  const [loading, setLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("notes");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Luxury inline notification states
  const [successNotification, setSuccessNotification] = useState<string | null>(
    null,
  );

  const desc = useMemo(() => splitDescription(item.description), [item]);

  const mood = useMemo(() => {
    return genderMap[item.gender.toLowerCase()] || "امضای منحصر به فرد رایحه";
  }, [item.gender]);

  const currentSeason = item.season
    ? seasonMap[item.season.toLowerCase()]
    : null;

  // Auto-clear notification banner after 4 seconds
  useEffect(() => {
    if (successNotification) {
      const timer = setTimeout(() => setSuccessNotification(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [successNotification]);

  const handleAddToCart = async () => {
    try {
      setSuccessNotification(null);
      setLoading(true);
      await addToCart(item.id);
      setSuccessNotification(
        `تعداد ${quantity.toLocaleString("fa-IR")} عدد از این اثر با موفقیت به صندوقچه خرید شما افزوده شد.`,
      );
    } catch {
      setIsAuthModalOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishList = async () => {
    try {
      setSuccessNotification(null);
      setWishLoading(true);
      await wishListToggle(item.id);
      setIsWishlisted(!isWishlisted);
      setSuccessNotification(
        !isWishlisted
          ? "رایحه با موفقیت در آرشیو علاقه‌مندی‌های شما نشان شد."
          : "رایحه از آرشیو محبوب شما حذف گردید.",
      );
    } catch {
      setIsAuthModalOpen(true);
    } finally {
      setWishLoading(false);
    }
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-primary"
    >
      <div className="container mx-auto px-4 py-12 lg:py-24 max-w-7xl">
        {/* ───────── MAIN PRODUCT INTERACTION ───────── */}
        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* LEFT: IMAGE PREVIEW WITH MOTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 lg:sticky lg:top-28"
          >
            <div className="relative aspect-[4/5] w-full flex items-center justify-center overflow-hidden rounded-3xl bg-secondary/30 border border-secondary/40 backdrop-blur-sm">
              <div className="absolute h-96 w-96 rounded-full bg-accent/5 blur-3xl animate-pulse" />

              {item.image ? (
                <motion.img
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={item.image}
                  alt={item.name}
                  className="z-10 h-4/5 w-4/5 object-contain filter drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
                />
              ) : (
                <div className="text-sm tracking-widest text-neutral-400">
                  بدون تصویر محصول
                </div>
              )}
            </div>
          </motion.div>

          {/* RIGHT: COMPREHENSIVE LUXURY UI */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-6 space-y-8"
          >
            {/* BRAND & META */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                {item.brand}
              </span>
              <h1 className="text-3xl font-black tracking-tight md:text-5xl lg:leading-[1.2]">
                {item.name}
              </h1>
              <p className="text-sm text-neutral-500 font-medium">{mood}</p>
            </div>

            {/* CHIPS */}
            <div className="flex flex-wrap gap-2.5">
              {currentSeason && (
                <span className="flex items-center gap-1.5 rounded-full border border-neutral-300/60 px-4 py-1.5 text-xs font-medium bg-background">
                  {currentSeason.icon}
                  <span>{currentSeason.label}</span>
                </span>
              )}

              <span className="flex items-center gap-1.5 rounded-full border border-neutral-300/60 px-4 py-1.5 text-xs font-medium bg-background">
                <IoMaleFemaleOutline className="w-4 h-4 text-neutral-400" />
                <span>
                  {item.volumeMl
                    ? `${item.volumeMl.toLocaleString("fa-IR")} میلی‌لیتر`
                    : "حجم استاندارد"}
                </span>
              </span>

              <span className="rounded-full border border-neutral-300/60 px-4 py-1.5 text-xs font-medium bg-background">
                {item.stock > 0
                  ? `موجود در انبار (${item.stock.toLocaleString("fa-IR")})`
                  : "ناموجود"}
              </span>
            </div>

            {/* PRICE */}
            <div className="border-y border-neutral-300/40 py-5 flex items-center justify-between">
              <span className="text-sm text-neutral-500 font-medium">
                قیمت اصالت کالا
              </span>
              <div className="text-3xl font-black text-primary">
                {item.price.toLocaleString("fa-IR")}{" "}
                <span className="text-sm font-normal text-neutral-500 mr-1">
                  تومان
                </span>
              </div>
            </div>

            {/* STORY / ACCORDION TABS */}
            <div className="space-y-4">
              <div className="flex border-b border-neutral-300/40 gap-6 text-sm font-bold pb-2">
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`relative pb-2 transition-colors ${activeTab === "notes" ? "text-primary font-black" : "text-neutral-400"}`}
                >
                  داستان عطر
                  {activeTab === "notes" && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 right-0 left-0 h-[2px] bg-accent"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("details")}
                  className={`relative pb-2 transition-colors ${activeTab === "details" ? "text-primary font-black" : "text-neutral-400"}`}
                >
                  مشخصات فنی
                  {activeTab === "details" && (
                    <motion.div
                      layoutId="tab-underline"
                      className="absolute bottom-0 right-0 left-0 h-[2px] bg-accent"
                    />
                  )}
                </button>
              </div>

              <div className="min-h-[140px] text-neutral-700 leading-8 text-base">
                <AnimatePresence mode="wait">
                  {activeTab === "notes" ? (
                    <motion.div
                      key="notes"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-3"
                    >
                      <p className="font-medium text-lg text-primary">
                        {desc.intro}
                      </p>
                      <p className="text-sm text-neutral-500">{desc.body}</p>
                      {desc.end && (
                        <p className="text-xs italic text-accent font-medium">
                          {desc.end}
                        </p>
                      )}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="grid grid-cols-2 gap-4 text-sm pt-2"
                    >
                      <div className="bg-secondary/20 p-3 rounded-xl">
                        <span className="text-neutral-400 block text-xs">
                          برند خانه عطر
                        </span>
                        <span className="font-bold">{item.brand}</span>
                      </div>
                      <div className="bg-secondary/20 p-3 rounded-xl">
                        <span className="text-neutral-400 block text-xs">
                          گروه هدف
                        </span>
                        <span className="font-bold">
                          {item.gender === "men"
                            ? "آقایان"
                            : item.gender === "women"
                              ? "بانوان"
                              : "مشترک"}
                        </span>
                      </div>
                      <div className="bg-secondary/20 p-3 rounded-xl">
                        <span className="text-neutral-400 block text-xs">
                          فصل پیشنهادی
                        </span>
                        <span className="font-bold">
                          {currentSeason?.label || "تمامی فصول"}
                        </span>
                      </div>
                      <div className="bg-secondary/20 p-3 rounded-xl">
                        <span className="text-neutral-400 block text-xs">
                          نوع عرضه
                        </span>
                        <span className="font-bold">
                          بسته‌بندی اصلی کارخانه
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* LUXURY INLINE STATUS NOTIFICATION */}
            <AnimatePresence>
              {successNotification && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: "auto", y: 0 }}
                  exit={{ opacity: 0, height: 0, y: -10 }}
                  className="overflow-hidden"
                >
                  <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200/60 bg-emerald-500/5 p-4 text-xs font-semibold text-emerald-800 backdrop-blur-xs">
                    <IoCheckmarkCircleOutline className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <p className="leading-5">{successNotification}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* QUANTITY & ACTIONS */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-300 rounded-full px-2 py-1 bg-background">
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 transition hover:bg-secondary/40"
                  >
                    <IoAddOutline className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm">
                    {quantity.toLocaleString("fa-IR")}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full text-neutral-600 transition hover:bg-secondary/40"
                  >
                    <IoRemoveOutline className="w-4 h-4" />
                  </button>
                </div>

                <p className="text-xs text-neutral-400">
                  تعداد درخواستی سفارشی شما
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={loading || item.stock === 0}
                  className="flex-1 rounded-full bg-primary py-4 text-sm font-bold text-background transition hover:bg-primary/90 hover:shadow-lg disabled:opacity-50 active:scale-95 duration-200"
                >
                  {loading
                    ? "در حال افزودن به سبد..."
                    : "افزودن به سبد خرید لوکس"}
                </button>

                <button
                  onClick={toggleWishList}
                  disabled={wishLoading}
                  className="rounded-full border border-neutral-300 px-6 py-4 text-sm transition hover:bg-secondary/40 active:scale-95 duration-200 flex items-center justify-center text-neutral-700"
                >
                  {wishLoading ? (
                    "..."
                  ) : isWishlisted ? (
                    <IoHeart className="w-5 h-5 text-red-500 animate-bounce" />
                  ) : (
                    <IoHeartOutline className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* PREMIUM VALUE PROP STRIP */}
            <div className="grid grid-cols-3 gap-3 pt-6 text-center border-t border-neutral-300/40 text-[11px] font-medium text-neutral-500">
              <div className="py-3 bg-secondary/10 rounded-xl flex flex-col items-center gap-1.5 justify-center">
                <FiBox className="w-4.5 h-4.5 text-accent" />
                <span>تحویل اکسپرس اختصاصی</span>
              </div>
              <div className="py-3 bg-secondary/10 rounded-xl flex flex-col items-center gap-1.5 justify-center">
                <FiAward className="w-4.5 h-4.5 text-accent" />
                <span>تضمین اصالت خانه عطر</span>
              </div>
              <div className="py-3 bg-secondary/10 rounded-xl flex flex-col items-center gap-1.5 justify-center">
                <FiGift className="w-4.5 h-4.5 text-accent" />
                <span>بسته‌بندی نفیس هدیه</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AuthGatewayModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}
