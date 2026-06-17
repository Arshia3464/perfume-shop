import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import { db } from "@/db";
import { order, cartItem, product, wishlistItem } from "@/db/schema";

import { eq } from "drizzle-orm";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)] text-[var(--foreground)]">
        <p className="text-sm text-muted-foreground">لطفا وارد شوید</p>
      </div>
    );
  }

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
    })
    .from(wishlistItem)
    .innerJoin(product, eq(wishlistItem.productId, product.id))
    .where(eq(wishlistItem.userId, session.user.id));

  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden"
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[400px] w-[400px] rounded-full bg-[var(--accent)]/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-black/5 blur-[140px]" />
      </div>

      <div className="relative container mx-auto px-6 py-24 space-y-20">
        {/* ───────── HERO CARD ───────── */}
        <section className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-[var(--secondary)]/40 backdrop-blur-xl p-10">
          {/* ghost typography */}
          <span className="absolute inset-0 flex items-center justify-center text-[9rem] font-black opacity-[0.03] select-none">
            VAULT
          </span>

          <div className="relative space-y-2">
            <p className="text-xs tracking-[0.35em] text-muted-foreground">
              FRAGRANCE VAULT
            </p>

            <h1 className="text-3xl font-black lg:text-5xl">
              خوش آمدی، {session.user.name}
            </h1>

            <p className="text-sm text-muted-foreground">
              اینجا آرشیو شخصی رایحه‌های توست — انتخاب‌هایی که هویتت را می‌سازند
            </p>
          </div>
        </section>

        {/* ───────── STATS STRIP (EDITORIAL CARDS) ───────── */}
        <section className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Orders Archive", value: orders.length },
            { label: "Active Cart Items", value: cartItems.length },
            {
              label: "Account Tier",
              value: session.user.role === "admin" ? "Curator" : "Member",
            },
          ].map((s) => (
            <div
              key={s.label}
              className="relative overflow-hidden rounded-2xl border border-black/10 bg-[var(--secondary)]/30 p-6 backdrop-blur-xl"
            >
              <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-[var(--accent)]/10 blur-2xl" />

              <p className="text-xs tracking-[0.3em] text-muted-foreground">
                {s.label}
              </p>

              <p className="mt-4 text-4xl font-black">{s.value}</p>
            </div>
          ))}
        </section>

        {/* ───────── CART (VAULT ITEMS) ───────── */}
        <section className="space-y-6">
          <h2 className="text-xs tracking-[0.35em] text-muted-foreground">
            VAULT / CART
          </h2>

          <div className="space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                هنوز رایحه‌ای در این بخش نیست
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative flex items-center justify-between overflow-hidden rounded-2xl border border-black/10 bg-[var(--secondary)]/30 p-5 backdrop-blur-xl transition hover:scale-[1.01]"
                >
                  {/* glow hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-r from-[var(--accent)]/10 to-transparent" />

                  <div className="relative flex items-center gap-5">
                    {/* IMAGE */}
                    <div className="h-16 w-16 rounded-xl bg-white/30 overflow-hidden flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name ?? ""}
                          className="h-full w-full object-contain p-2"
                        />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          N/A
                        </span>
                      )}
                    </div>

                    {/* INFO */}
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.brand}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        × {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="relative text-left">
                    <p className="text-lg font-bold">
                      {(item.price ?? 0 * item.quantity).toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">TOMAN</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ───────── ORDERS (ARCHIVE STYLE) ───────── */}
        <section className="space-y-6">
          <h2 className="text-xs tracking-[0.35em] text-muted-foreground">
            ORDER ARCHIVE
          </h2>

          <div className="space-y-3">
            {orders.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                هنوز سفارشی ثبت نشده
              </p>
            ) : (
              orders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between rounded-2xl border border-black/10 bg-[var(--secondary)]/30 p-5 backdrop-blur-xl"
                >
                  <div>
                    <p className="font-medium">
                      ORDER #{o.id.slice(0, 6).toUpperCase()}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {o.status}
                    </p>
                  </div>

                  <p className="text-lg font-bold">
                    {o.total.toLocaleString()} ₮
                  </p>
                </div>
              ))
            )}
          </div>
        </section>

        {/* ───────── WISHLIST (SAVED FRAGRANCES) ───────── */}
        <section className="space-y-6">
          <h2 className="text-xs tracking-[0.35em] text-muted-foreground">
            SAVED FRAGRANCES
          </h2>

          <div className="grid gap-4 md:grid-cols-2">
            {wishListItems.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                هیچ رایحه‌ای ذخیره نشده
              </p>
            ) : (
              wishListItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border border-black/10 bg-[var(--secondary)]/30 p-5 backdrop-blur-xl hover:scale-[1.02] transition"
                >
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {item.price?.toLocaleString()} ₮
                  </p>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
