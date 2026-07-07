"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  IoCheckmarkCircle,
  IoBagCheckOutline,
  IoArrowBackOutline,
  IoTimeOutline,
} from "react-icons/io5";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id") || "RYL-XXXXXX";

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background text-primary flex items-center justify-center p-4 antialiased selection:bg-accent selection:text-primary"
    >
      {/* Premium Receipt Card Container */}
      <div className="w-full max-w-md border border-accent/20 bg-secondary/10 rounded-3xl p-6 md:p-8 text-center space-y-6 backdrop-blur-md relative overflow-hidden shadow-xl">
        {/* Subtle Ambient Glow Decoration */}
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        {/* Animated Success Icons Frame */}
        <div className="relative inline-flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
            <IoBagCheckOutline className="w-7 h-7" />
          </div>
          <IoCheckmarkCircle className="w-5 h-5 text-emerald-600 absolute bottom-0 right-0 bg-background rounded-full" />
        </div>

        {/* Title Messaging Header */}
        <div className="space-y-2">
          <h1 className="text-xl font-bold tracking-tight text-primary">
            سفارش شما با موفقیت ثبت شد
          </h1>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-xs mx-auto">
            رایحه ملوکانه انتخابی شما در صف پردازش قرار گرفت. محموله در
            بسته‌بندی ویژه کارشناسی ارسال خواهد شد.
          </p>
        </div>

        {/* Highlighted Tracking Number Box Layout */}
        <div className="rounded-2xl border border-accent/15 bg-background p-4 space-y-1.5 shadow-xs">
          <span className="text-[10px] tracking-widest text-muted-foreground uppercase block font-medium">
            کد رهگیری سفارش ROYAL
          </span>
          <span className="text-lg font-black tracking-widest text-accent font-mono block select-all">
            {orderId}
          </span>
        </div>

        {/* Operational Flow Meta Parameters */}
        <div className="border-t border-accent/10 pt-4 flex items-center gap-3 text-right text-xs text-muted-foreground/80 bg-secondary/5 px-2 py-2 rounded-xl">
          <IoTimeOutline className="w-4 h-4 text-accent shrink-0" />
          <p className="leading-5">
            <span className="font-semibold text-primary block mb-0.5">
              شیوه پرداخت: پرداخت در محل
            </span>
            تسویه حساب کامل فیزیکی پس از تحویل کالا و تایید اصالت رایحه انجام
            می‌پذیرد.
          </p>
        </div>

        {/* Action Routes Navigation Footers */}
        <div className="pt-2 flex flex-col gap-2.5">
          <Link
            href="/dashboard"
            className="w-full py-3 bg-primary text-background text-xs font-semibold rounded-xl transition active:scale-[0.99] hover:opacity-90 flex items-center justify-center gap-2"
          >
            <span>مشاهده وضعیت در پنل کاربری</span>
          </Link>

          <Link
            href="/products"
            className="group w-full py-3 border border-accent/10 bg-secondary/20 text-xs font-medium rounded-xl transition hover:bg-secondary/40 text-primary flex items-center justify-center gap-2"
          >
            <span>بازگشت به گالری عطرها</span>
            <IoArrowBackOutline className="w-3.5 h-3.5 transition duration-200 transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
