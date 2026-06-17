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
    return <div className="p-6">لطفا وارد شوید</div>;
  }

  // ORDERS
  const orders = await db
    .select()
    .from(order)
    .where(eq(order.userId, session.user.id));

  // CART ITEMS + PRODUCT INFO
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
    <div className="min-h-screen bg-zinc-50 p-6 pt-28">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* HEADER */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border">
          <h1 className="text-xl font-semibold">
            سلام، {session.user.name} 👋
          </h1>

          <p className="text-sm text-gray-500 mt-1">داشبورد حساب کاربری شما</p>
        </div>

        {/* STATS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white rounded-3xl p-5 border shadow-sm">
            <p className="text-sm text-gray-500">سفارش‌ها</p>

            <p className="text-3xl font-bold mt-2">{orders.length}</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border shadow-sm">
            <p className="text-sm text-gray-500">سبد خرید</p>

            <p className="text-3xl font-bold mt-2">{cartItems.length}</p>
          </div>

          <div className="bg-white rounded-3xl p-5 border shadow-sm">
            <p className="text-sm text-gray-500">نوع حساب</p>

            <p className="text-sm mt-2">
              {session.user.role == "admin" ? "ادمین" : "کاربر"}
            </p>
          </div>
        </div>

        {/* CART */}
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-semibold">سبد خرید</h2>
          </div>

          <div className="p-5 space-y-4">
            {cartItems.length === 0 ? (
              <p className="text-sm text-gray-500">
                هنوز محصولی به سبد خرید اضافه نکرده‌اید
              </p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-2xl p-4"
                >
                  {/* LEFT */}
                  <div className="flex items-center gap-4">
                    {/* IMAGE */}
                    <div className="w-20 h-20 rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
                      {item.image ? (
                        <img
                          src={item.image ?? undefined}
                          alt={item.name ?? undefined}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                          بدون تصویر
                        </div>
                      )}
                    </div>

                    {/* INFO */}
                    <div className="space-y-1 text-right">
                      <h3 className="font-medium">{item.name}</h3>

                      <p className="text-xs text-gray-500">{item.brand}</p>

                      <p className="text-sm text-gray-400">
                        تعداد: {item.quantity}
                      </p>
                    </div>
                  </div>

                  {/* PRICE */}
                  <div className="text-left">
                    <p className="font-semibold">
                      {(item.price ?? 0 * item.quantity).toLocaleString()}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">تومان</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ORDERS */}
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-semibold">سفارش‌های اخیر</h2>
          </div>

          <div className="p-5 space-y-3">
            {orders.length === 0 ? (
              <p className="text-sm text-gray-500">هنوز سفارشی ثبت نکرده‌اید</p>
            ) : (
              orders.map((o) => (
                <div
                  key={o.id}
                  className="flex items-center justify-between border rounded-2xl p-4"
                >
                  <div>
                    <p className="font-medium">سفارش #{o.id.slice(0, 6)}</p>

                    <p className="text-xs text-gray-400 mt-1">{o.status}</p>
                  </div>

                  <p className="font-semibold">
                    {o.total.toLocaleString()} تومان
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* WISHLIST */}
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
          <div className="p-5 border-b">
            <h2 className="font-semibold">لیست علاقه‌مندی‌ها </h2>
          </div>

          <div className="p-5 space-y-3">
            {wishListItems.length === 0 ? (
              <p className="text-sm text-gray-500">
                هنوز محصولی به لیست علاقه‌مندی‌ها اضافه نکرده‌اید
              </p>
            ) : (
              wishListItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border rounded-2xl p-4"
                >
                  <div>
                    <p className="font-medium">ادکلن {item.name}</p>
                    <p className="text-xs text-gray-400 mt-1">{item.price}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
