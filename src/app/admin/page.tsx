import { db } from "@/db";
import { user, product, order, cartItem, wishlistItem } from "@/db/schema";
import { sql } from "drizzle-orm";
import {
  FiUsers,
  FiBox,
  FiShoppingBag,
  FiLayers,
  FiActivity,
} from "react-icons/fi";

export default async function AdminDashboardRootPage() {
  // 1. Fetch Aggregated Metrics & Sample Data parallelized from Neon Postgres
  const [
    usersCountResult,
    productsCountResult,
    ordersCountResult,
    recentOrders,
    popularProducts,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(user),
    db.select({ count: sql<number>`count(*)` }).from(product),
    db.select({ count: sql<number>`count(*)` }).from(order),
    db
      .select()
      .from(order)
      .orderBy(sql`created_at desc`)
      .limit(3),
    db.select().from(product).orderBy(product.stock).limit(3), // Low stock spotlight
  ]);

  const totalUsers = usersCountResult[0]?.count ?? 0;
  const totalProducts = productsCountResult[0]?.count ?? 0;
  const totalOrders = ordersCountResult[0]?.count ?? 0;

  return (
    <div className="space-y-12 max-w-6xl w-full">
      {/* ───── DASHBOARD HEADER ───── */}
      <div className="space-y-1">
        <span className="text-xs tracking-wider text-[var(--accent)] uppercase font-medium">
          Overview
        </span>
        <h2 className="text-2xl font-light tracking-tight text-[var(--foreground)]">
          میز کار کیوریتور استودیو ROYAL
        </h2>
        <p className="text-xs text-[var(--foreground)]/40 font-light">
          خلاصه وضعیت آماری ساختار انبار و تعاملات جاری کاربران گالری.
        </p>
      </div>

      {/* ───── STATS GRID (METRICS CONTAINER) ───── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Stat Item: Users */}
        <div className="bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-2xl p-6 flex items-center justify-between backdrop-blur-sm">
          <div className="space-y-1">
            <p className="text-xs text-[var(--foreground)]/40 font-light">
              جمعیت مخاطبین حساب‌شده
            </p>
            <p className="text-3xl font-light tracking-tight text-[var(--foreground)]">
              {totalUsers.toLocaleString("fa-IR")}{" "}
              <span className="text-xs text-[var(--foreground)]/40">کاربر</span>
            </p>
          </div>
          <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl">
            <FiUsers className="w-5 h-5" />
          </div>
        </div>

        {/* Stat Item: Products */}
        <div className="bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-2xl p-6 flex items-center justify-between backdrop-blur-sm">
          <div className="space-y-1">
            <p className="text-xs text-[var(--foreground)]/40 font-light">
              آرشیو محصولات نیش
            </p>
            <p className="text-3xl font-light tracking-tight text-[var(--foreground)]">
              {totalProducts.toLocaleString("fa-IR")}{" "}
              <span className="text-xs text-[var(--foreground)]/40">رایحه</span>
            </p>
          </div>
          <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl">
            <FiBox className="w-5 h-5" />
          </div>
        </div>

        {/* Stat Item: Orders */}
        <div className="bg-[var(--secondary)]/10 border border-[var(--accent)]/20 rounded-2xl p-6 flex items-center justify-between backdrop-blur-sm">
          <div className="space-y-1">
            <p className="text-xs text-[var(--foreground)]/40 font-light">
              سفارش‌های ثبت‌شده در سیستم
            </p>
            <p className="text-3xl font-light tracking-tight text-[var(--foreground)]">
              {totalOrders.toLocaleString("fa-IR")}{" "}
              <span className="text-xs text-[var(--foreground)]/40">
                درخواست
              </span>
            </p>
          </div>
          <div className="p-3 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl">
            <FiShoppingBag className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* ───── DETAILED PREVIEW GRIDS ───── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Preview Panel */}
        <div className="bg-[var(--secondary)]/5 border border-[var(--accent)]/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--accent)]/10 pb-3">
            <FiActivity className="text-[var(--accent)] w-4 h-4" />
            <h3 className="text-sm font-medium text-[var(--foreground)]">
              آخرین سفارش‌های جاری
            </h3>
          </div>
          <div className="space-y-3">
            {recentOrders.length === 0 ? (
              <p className="text-xs text-[var(--foreground)]/30 py-4 font-light">
                هیچ سفارشی در سیستم یافت نشد.
              </p>
            ) : (
              recentOrders.map((o) => (
                <div
                  key={o.id}
                  className="flex justify-between items-center text-xs py-2 border-b border-[var(--accent)]/5 last:border-none"
                >
                  <span className="font-mono text-[var(--foreground)]/50">
                    #{o.id.slice(0, 8).toUpperCase()}
                  </span>
                  <span className="text-[var(--foreground)] font-light">
                    {(o.total ?? 0).toLocaleString("fa-IR")} تومان
                  </span>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Low Stock Watchlist */}
        <div className="bg-[var(--secondary)]/5 border border-[var(--accent)]/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--accent)]/10 pb-3">
            <FiLayers className="text-[var(--accent)] w-4 h-4" />
            <h3 className="text-sm font-medium text-[var(--foreground)]">
              کنترل موجودی بحرانی انبار
            </h3>
          </div>
          <div className="space-y-3">
            {popularProducts.length === 0 ? (
              <p className="text-xs text-[var(--foreground)]/30 py-4 font-light">
                موجودی انبار در وضعیت ایده‌آل قرار دارد.
              </p>
            ) : (
              popularProducts.map((p) => (
                <div
                  key={p.id}
                  className="flex justify-between items-center text-xs py-2 border-b border-[var(--accent)]/5 last:border-none"
                >
                  <span className="text-[var(--foreground)]/80 font-light">
                    {p.name}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-md ${p.stock <= 2 ? "bg-rose-500/10 text-rose-400" : "bg-amber-500/10 text-rose-400"}`}
                  >
                    {p.stock === 0
                      ? "اتمام موجودی"
                      : `${p.stock.toLocaleString("fa-IR")} عدد باقی‌مانده`}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
