import React from "react";
import { db } from "@/db";
import { order, orderItem } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

// Premium layout icons aligning directly with your main dashboard systems
import {
  IoBagHandleOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoCarOutline,
  IoCubeOutline,
  IoLocationOutline,
  IoCalendarOutline,
  IoChevronBackOutline,
} from "react-icons/io5";

export const dynamic = "force-dynamic";

const statusConfigMap: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "در انتظار پرداخت",
    color: "text-amber-600 bg-amber-500/5 border-amber-500/10",
    icon: <IoTimeOutline className="w-3.5 h-3.5" />,
  },
  processing: {
    label: "در حال آماده‌سازی مرسوله",
    color: "text-blue-600 bg-blue-500/5 border-blue-500/10",
    icon: <IoTimeOutline className="w-3.5 h-3.5" />,
  },
  paid: {
    label: "تایید اصالت و پرداخت شده",
    color: "text-emerald-600 bg-emerald-500/5 border-emerald-500/10",
    icon: <IoCheckmarkCircleOutline className="w-3.5 h-3.5" />,
  },
  shipped: {
    label: "ارسال شده با پست اختصاصی رویال",
    color: "text-purple-600 bg-purple-500/5 border-purple-500/10",
    icon: <IoCarOutline className="w-3.5 h-3.5" />,
  },
  delivered: {
    label: "تحویل داده شده نهایی",
    color: "text-neutral-500 bg-neutral-500/5 border-neutral-500/10",
    icon: <IoCubeOutline className="w-3.5 h-3.5" />,
  },
};

export default async function UserOrdersPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div
        dir="rtl"
        className="min-h-screen flex flex-col gap-4 items-center justify-center bg-background text-foreground antialiased"
      >
        <IoShieldCheckmarkOutline className="w-10 h-10 text-accent/60 animate-pulse" />
        <p className="text-sm font-medium text-neutral-500">
          جهت دسترسی به صندوقچه سفارشات خود، ابتدا وارد شوید.
        </p>
        <Link
          href="/login"
          className="mt-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-background transition hover:opacity-90"
        >
          ورود به حساب
        </Link>
      </div>
    );
  }

  // Fetch only this explicit user's transaction tracking records
  const userOrders = await db
    .select()
    .from(order)
    .where(eq(order.userId, session.user.id))
    .orderBy(desc(order.createdAt));

  const ordersWithItems = await Promise.all(
    userOrders.map(async (ord) => {
      const items = await db
        .select()
        .from(orderItem)
        .where(eq(orderItem.orderId, ord.id));
      return { ...ord, items };
    }),
  );

  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-background text-foreground overflow-hidden antialiased selection:bg-accent selection:text-primary"
    >
      {/* Immersive localized background blur meshes */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 h-100 w-100 rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-125 w-125 rounded-full bg-secondary/10 blur-[140px]" />
      </div>

      <div className="relative container mx-auto px-4 py-12 max-w-4xl space-y-10 z-10">
        {/* ───────── PAGE HERO TEXT LAYOUT HEADER ───────── */}
        <section className="relative overflow-hidden rounded-3xl border border-secondary/60 bg-secondary/20 backdrop-blur-md p-6 md:p-8 shadow-sm">
          <span className="absolute -bottom-6 left-6 text-[5rem] md:text-[7rem] font-black opacity-[0.025] select-none tracking-widest">
            ORDERS
          </span>
          <div className="space-y-1.5">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold block">
              تاریخچه مرسولات سفارشی رویال
            </span>
            <h1 className="text-xl md:text-3xl font-black text-primary">
              صندوقچه سوابق خرید
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 font-medium">
              پیگیری، نظارت و بررسی فاکتورهای صادرشده برای روایح نفیس شما.
            </p>
          </div>
        </section>

        {/* ───────── HISTORIC LIST VIEW GRID ───────── */}
        <div className="space-y-6">
          {ordersWithItems.length === 0 ? (
            <div className="text-center py-20 rounded-2xl border border-dashed border-secondary/60 bg-secondary/10 text-xs text-neutral-400">
              هیچ سابقه خرید یا فاکتور ثبت‌شده‌ای برای این حساب یافت نشد.
            </div>
          ) : (
            ordersWithItems.map((o) => {
              const currentStatus = statusConfigMap[o.status.toLowerCase()] || {
                label: o.status,
                color:
                  "text-neutral-500 bg-neutral-500/5 border-neutral-500/20",
                icon: null,
              };

              return (
                <div
                  key={o.id}
                  className="group rounded-2xl border border-secondary/60 bg-secondary/10 backdrop-blur-xs overflow-hidden transition duration-300 hover:border-secondary/100"
                >
                  {/* Order Top Panel Descriptor Row */}
                  <div className="p-4 md:p-5 border-b border-secondary/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-secondary/5">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <p className="font-black text-xs md:text-sm tracking-wider text-primary">
                          کد مرسوله:{" "}
                          <span className="font-mono text-accent select-all">
                            #{o.id.toUpperCase()}
                          </span>
                        </p>
                        <div
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold border ${currentStatus.color}`}
                        >
                          {currentStatus.icon}
                          <span>{currentStatus.label}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-[10px] text-neutral-400 font-medium">
                        <span className="flex items-center gap-1">
                          <IoCalendarOutline className="w-3 h-3 text-accent/80" />
                          {o.createdAt
                            ? new Date(o.createdAt).toLocaleDateString("fa-IR")
                            : "نامشخص"}
                        </span>
                        <span className="flex items-center gap-1">
                          <IoLocationOutline className="w-3 h-3 text-accent/80" />
                          مقصد: {o.city || "نامشخص"}
                        </span>
                      </div>
                    </div>

                    <div className="text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-secondary/30 flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-0.5">
                      <span className="text-[9px] text-neutral-400 block sm:hidden font-medium">
                        مبلغ کل فاکتور:
                      </span>
                      <div>
                        <span className="text-base md:text-xl font-black text-primary">
                          {o.total.toLocaleString("fa-IR")}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium mr-1">
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Inner Snapshot Items Mapping Frame */}
                  <div className="p-4 md:p-5 space-y-3 bg-background/30">
                    {o.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between gap-4 p-3 rounded-xl border border-secondary/40 bg-background/50 hover:bg-background/80 transition"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Render the frozen S3 image snapshot key carefully */}
                          <div className="h-11 w-11 rounded-lg bg-background border border-secondary/50 overflow-hidden flex items-center justify-center shrink-0 shadow-2xs">
                            {item.snapshotImage ? (
                              <img
                                src={item.snapshotImage}
                                alt={item.snapshotName || ""}
                                className="h-full w-full object-contain p-1"
                              />
                            ) : (
                              <span className="text-[9px] text-neutral-400 font-medium">
                                ROYAL
                              </span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-bold text-xs text-primary truncate">
                              {item.snapshotName || "رایحه ناپدید شده پلتفرم"}
                            </h3>
                            <p className="text-[10px] text-neutral-400 font-medium mt-0.5">
                              {item.snapshotBrand || "برند لوکس"}
                            </p>
                          </div>
                        </div>

                        <div className="text-left shrink-0 font-medium text-xs text-neutral-400 flex items-center gap-3">
                          <span className="bg-secondary/40 border border-secondary/60 rounded-md px-1.5 py-0.5 text-[9px] font-bold text-accent">
                            {item.quantity.toLocaleString("fa-IR")} عدد
                          </span>
                          <div>
                            <span className="text-primary font-black text-xs">
                              {item.priceAtPurchase.toLocaleString("fa-IR")}
                            </span>
                            <span className="text-[9px] text-neutral-400 font-light mr-0.5">
                              ت
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Shipping address footer banner strip */}
                  {o.shippingAddress && (
                    <div className="px-4 py-2.5 bg-secondary/5 border-t border-secondary/30 text-[10px] text-neutral-400 flex items-center gap-1.5 font-medium">
                      <IoLocationOutline className="w-3 h-3 text-accent shrink-0" />
                      <span className="truncate">
                        نشانی ارسال: {o.shippingAddress}
                      </span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* ───────── FOOTER ACTION NAVIGATION ROW ───────── */}
        <div className="pt-2 flex justify-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-full border border-secondary/80 bg-secondary/20 px-5 py-2.5 text-xs font-semibold text-primary transition hover:bg-secondary/40"
          >
            <span>بازگشت به صندوقچه مدیریت داشبورد</span>
            <IoChevronBackOutline className="w-3.5 h-3.5 transition duration-200 transform group-hover:-translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}
