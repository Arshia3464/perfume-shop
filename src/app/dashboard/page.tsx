import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { db } from "@/db";
import { order, cartItem, product, wishlistItem } from "@/db/schema";

import { eq } from "drizzle-orm";

// Premium React Icons for minimal luxury aesthetic
import {
  IoBagHandleOutline,
  IoBookmarkOutline,
  IoGridOutline,
  IoShieldCheckmarkOutline,
  IoTimeOutline,
  IoCheckmarkCircleOutline,
  IoCarOutline,
  IoCubeOutline,
} from "react-icons/io5";
import { FiUser, FiShoppingBag, FiHeart } from "react-icons/fi";

// Elegant Persian structural dictionaries
const roleMap: Record<string, string> = {
  admin: "نمایشگاه‌دار رسمی (مدیر)",
  user: "عضو ویژه کلکسیون عطر",
};

const statusMap: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  pending: {
    label: "در انتظار پرداخت",
    color: "text-amber-600 bg-amber-500/5 border-amber-500/20",
    icon: <IoTimeOutline className="w-3.5 h-3.5" />,
  },
  paid: {
    label: "تایید اصالت و پرداخت شده",
    color: "text-emerald-600 bg-emerald-500/5 border-emerald-500/20",
    icon: <IoCheckmarkCircleOutline className="w-3.5 h-3.5" />,
  },
  shipped: {
    label: "ارسال شده با پست اختصاصی",
    color: "text-blue-600 bg-blue-500/5 border-blue-500/20",
    icon: <IoCarOutline className="w-3.5 h-3.5" />,
  },
  delivered: {
    label: "تحویل داده شده نهایی",
    color: "text-neutral-500 bg-neutral-500/5 border-neutral-500/20",
    icon: <IoCubeOutline className="w-3.5 h-3.5" />,
  },
};

export default async function DashboardPage() {
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
          جهت دسترسی به صندوقچه شخصی خود، ابتدا وارد شوید.
        </p>
        <a
          href="/login"
          className="mt-2 rounded-full bg-primary px-6 py-2.5 text-xs font-bold text-background transition hover:opacity-90 active:scale-95"
        >
          ورود به حساب
        </a>
      </div>
    );
  }

  // Fetch metrics from Drizzle
  const orders = await db
    .select()
    .from(order)
    .where(eq(order.userId, session.user.id));

  const cartItems = await db
    .select({
      id: cartItem.id,
      quantity: cartItem.quantity,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
    })
    .from(cartItem)
    .leftJoin(product, eq(cartItem.productId, product.id))
    .where(eq(cartItem.userId, session.user.id));

  const wishListItems = await db
    .select({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
    })
    .from(wishlistItem)
    .innerJoin(product, eq(wishlistItem.productId, product.id))
    .where(eq(wishlistItem.userId, session.user.id));

  // Safe calculated metric strings
  const formattedOrdersCount = orders.length.toLocaleString("fa-IR");
  const formattedCartCount = cartItems.length.toLocaleString("fa-IR");
  const userRoleString = roleMap[session.user.role] || session.user.role;

  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-background text-foreground overflow-hidden antialiased selection:bg-accent selection:text-primary"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-[140px]" />
      </div>

      <div className="relative container mx-auto px-4 py-12 md:py-24 max-w-6xl space-y-12 md:space-y-16 z-10">
        {/* ───────── HERO PANELS ───────── */}
        <section className="relative overflow-hidden rounded-3xl border border-secondary/60 bg-secondary/20 backdrop-blur-md p-6 md:p-10 shadow-sm">
          {/* Elegant Ghost Typography */}
          <span className="absolute -bottom-6 left-6 text-[5rem] md:text-[8rem] font-black opacity-[0.02] select-none tracking-widest">
            ATIGH
          </span>

          <div className="space-y-2 max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.25em] text-accent font-bold block">
              پنل اختصاصی خانه عطر عتیق
            </span>
            <h1 className="text-2xl md:text-4xl font-black text-primary">
              خوش آمدید، {session.user.name}
            </h1>
            <p className="text-xs md:text-sm text-neutral-500 leading-6 font-medium">
              اینجا آرشیو و صندوقچه شخصی روایح متمایز شماست؛ مجموعه‌ای نفیس که
              بر اساس هویت و اصالت منحصر به‌فردتان گردهم آمده است.
            </p>
          </div>
        </section>

        {/* ───────── METRIC CARDS STRIP ───────── */}
        <section className="grid gap-4 md:grid-cols-3">
          {/* Orders Metric */}
          <div className="relative overflow-hidden rounded-2xl border border-secondary/60 bg-secondary/20 p-5 md:p-6 backdrop-blur-sm flex justify-between items-center">
            <div className="space-y-2">
              <p className="text-xs font-bold text-neutral-400">
                بایگانی سفارشات گالری
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl md:text-3xl font-black text-primary">
                  {formattedOrdersCount}
                </p>
                <span className="text-[10px] text-neutral-400 font-medium">
                  مرسوله
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background border border-secondary/40 shadow-xs">
              <FiShoppingBag className="w-5 h-5 text-accent" />
            </div>
          </div>

          {/* Cart Metric */}
          <div className="relative overflow-hidden rounded-2xl border border-secondary/60 bg-secondary/20 p-5 md:p-6 backdrop-blur-sm flex justify-between items-center">
            <div className="space-y-2">
              <p className="text-xs font-bold text-neutral-400">
                سبد خرید در جریان
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl md:text-3xl font-black text-primary">
                  {formattedCartCount}
                </p>
                <span className="text-[10px] text-neutral-400 font-medium">
                  رایحه
                </span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background border border-secondary/40 shadow-xs">
              <IoBagHandleOutline className="w-5 h-5 text-accent" />
            </div>
          </div>

          {/* Role Metric */}
          <div className="relative overflow-hidden rounded-2xl border border-secondary/60 bg-secondary/20 p-5 md:p-6 backdrop-blur-sm flex justify-between items-center">
            <div className="space-y-2">
              <p className="text-xs font-bold text-neutral-400">
                سطح اشتراک کاربری
              </p>
              <div className="flex items-baseline gap-1">
                <p className="text-xl md:text-2xl font-black text-primary">
                  {userRoleString}
                </p>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-background border border-secondary/40 shadow-xs">
              <FiUser className="w-5 h-5 text-accent" />
            </div>
          </div>
        </section>

        {/* ───────── DOUBLE COLUMN CONTENTS ───────── */}
        <div className="grid gap-10 lg:grid-cols-12 items-start">
          {/* LEFT: CART ITEMS */}
          <section className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 border-b border-secondary/60 pb-3">
              <IoBagHandleOutline className="w-4 h-4 text-accent" />
              <h2 className="text-xs uppercase tracking-wider font-bold text-neutral-500">
                سبد خرید جاری (اقلام صندوقچه)
              </h2>
            </div>

            <div className="space-y-3">
              {cartItems.length === 0 ? (
                <div className="text-center py-10 rounded-2xl border border-dashed border-neutral-300/60 bg-secondary/5 text-xs text-neutral-400">
                  هیچ رایحه فعالی در سبد خرید مجلل شما یافت نشد.
                </div>
              ) : (
                cartItems.map((item) => {
                  const combinedPrice = (item.price ?? 0) * item.quantity;
                  return (
                    <div
                      key={item.id}
                      className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-secondary/50 bg-secondary/10 p-4 transition duration-200 hover:border-neutral-300"
                    >
                      <div className="flex items-center gap-4 z-10">
                        <div className="h-14 w-14 rounded-xl bg-background border border-secondary/60 overflow-hidden flex items-center justify-center shadow-2xs shrink-0">
                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name ?? ""}
                              className="h-full w-full object-contain p-1.5 transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <span className="text-[10px] text-neutral-400">
                              فاقد تصویر
                            </span>
                          )}
                        </div>

                        <div>
                          <p className="font-bold text-sm text-primary">
                            {item.name}
                          </p>
                          <p className="text-[11px] font-medium text-neutral-400 mt-0.5">
                            {item.brand}
                          </p>
                          <span className="inline-block mt-1.5 text-[10px] font-bold text-accent bg-background border border-secondary/60 rounded-md px-2 py-0.5">
                            {item.quantity.toLocaleString("fa-IR")} عدد
                          </span>
                        </div>
                      </div>

                      <div className="text-left z-10 shrink-0">
                        <p className="text-base font-black text-primary">
                          {combinedPrice.toLocaleString("fa-IR")}
                        </p>
                        <p className="text-[10px] font-medium text-neutral-400">
                          تومان
                        </p>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          {/* RIGHT: SAVED FRAGRANCES (WISHLIST) */}
          <section className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2 border-b border-secondary/60 pb-3">
              <FiHeart className="w-4 h-4 text-accent" />
              <h2 className="text-xs uppercase tracking-wider font-bold text-neutral-500">
                روایح نشان‌شده و محبوب
              </h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {wishListItems.length === 0 ? (
                <div className="text-center py-10 col-span-full rounded-2xl border border-dashed border-neutral-300/60 bg-secondary/5 text-xs text-neutral-400">
                  هنوز اسانس یا ادکلنی به لیست علاقه‌مندی‌ها پیوست نشده است.
                </div>
              ) : (
                wishListItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-xl border border-secondary/40 bg-secondary/10 p-3.5 hover:border-neutral-300 transition duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-background border border-secondary/40 flex items-center justify-center overflow-hidden shrink-0">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name ?? ""}
                            className="w-full h-full object-contain p-1"
                          />
                        ) : (
                          <span className="text-[9px] text-neutral-400">
                            N/A
                          </span>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-xs text-primary">
                          {item.name}
                        </p>
                        <p className="text-[10px] text-neutral-400 mt-0.5">
                          {item.brand}
                        </p>
                      </div>
                    </div>
                    <div className="text-left shrink-0">
                      <p className="text-xs font-black text-primary">
                        {item.price
                          ? `${item.price.toLocaleString("fa-IR")} ت`
                          : "نامشخص"}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>

        {/* ───────── ORDERS ARCHIVE ───────── */}
        <section className="space-y-4 pt-4">
          <div className="flex items-center gap-2 border-b border-secondary/60 pb-3">
            <IoGridOutline className="w-4 h-4 text-accent" />
            <h2 className="text-xs uppercase tracking-wider font-bold text-neutral-500">
              سوابق مرسولات و سفارشات گذشته
            </h2>
          </div>

          <div className="space-y-3">
            {orders.length === 0 ? (
              <div className="text-center py-12 rounded-2xl border border-dashed border-neutral-300/60 bg-secondary/5 text-xs text-neutral-400">
                هیچ تراکنش یا تاریخچه خریدی برای این حساب ثبت نشده است.
              </div>
            ) : (
              orders.map((o) => {
                const mappedStatus = statusMap[o.status.toLowerCase()] || {
                  label: o.status,
                  color: "text-neutral-500 bg-neutral-100",
                  icon: null,
                };
                return (
                  <div
                    key={o.id}
                    className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between rounded-2xl border border-secondary/50 bg-secondary/10 p-4 md:p-5"
                  >
                    <div className="space-y-2">
                      <p className="font-bold text-xs tracking-wider text-primary">
                        کد مرسوله: #{o.id.slice(0, 8).toUpperCase()}
                      </p>
                      <div
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold border ${mappedStatus.color}`}
                      >
                        {mappedStatus.icon}
                        <span>{mappedStatus.label}</span>
                      </div>
                    </div>

                    <div className="sm:text-left flex sm:flex-col items-baseline sm:items-end justify-between sm:justify-center gap-1 border-t sm:border-t-0 pt-2 sm:pt-0 border-neutral-300/40">
                      <span className="text-[10px] text-neutral-400 block sm:hidden">
                        مبلغ کل پرداخت شده:
                      </span>
                      <div>
                        <span className="text-lg font-black text-primary">
                          {o.total.toLocaleString("fa-IR")}
                        </span>
                        <span className="text-[10px] text-neutral-400 font-medium mr-1">
                          تومان
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
