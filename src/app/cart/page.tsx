import React from "react";
import { db } from "@/db";
import { cartItem, product } from "@/db/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { IoBagHandleOutline } from "react-icons/io5";
import CartPageClient from "./CartPageClient";

export default async function PublicCartPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div
        dir="rtl"
        className="min-h-screen bg-background text-primary flex flex-col items-center justify-center p-6 antialiased"
      >
        <div className="text-center space-y-4 max-w-sm">
          <IoBagHandleOutline className="w-12 h-12 mx-auto text-accent/40" />
          <h2 className="text-lg font-medium">عدم دسترسی به سبد خرید</h2>
          <p className="text-xs text-primary/60 leading-relaxed">
            برای مشاهده مجموعه‌های انتخاب شده و صدور صورت‌حساب گالری ROYAL،
            ابتدا باید وارد حساب کاربری خود شوید.
          </p>
        </div>
      </div>
    );
  }

  // Fetch verified transient product items from Neon Postgres
  const fetchedItems = await db
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

  // Serialize and clean optional database fields safely to resolve strict type checking
  const serializedItems = fetchedItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    productId: item.productId, // Fallback check is now natively permitted by CartItem type unions
    name: item.name ?? "رایحه گالری",
    price: item.price ?? 0,
    image: item.image,
    brand: item.brand ?? "ROYAL",
  }));

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-background text-primary p-6 md:p-20 antialiased selection:bg-accent selection:text-primary"
    >
      <div className="max-w-6xl mx-auto">
        {/* Hand the clean database array to the specialized Zustand interactive matrix wrapper */}
        <CartPageClient
          initialItems={serializedItems}
          userId={session.user.id}
        />
      </div>
    </div>
  );
}
