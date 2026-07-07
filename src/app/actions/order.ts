"use server";

import { db } from "@/db";
import { order, orderItem, cartItem } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

interface CheckoutInput {
  customerName: string;
  customerPhone: string;
  province: string;
  city: string;
  shippingAddress: string;
  postalCode: string;
  cartItems: {
    id: string;
    name: string;
    brand: string;
    image: string;
    volumeMl: number | null;
    price: number;
    quantity: number;
  }[];
}

export async function createCashOnDeliveryOrder(input: CheckoutInput) {
  try {
    // 1. Authenticate user session securely on the server
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session || !session.user) {
      return {
        success: false,
        error: "جهت ثبت سفارش ابتدا باید وارد حساب کاربری خود شوید.",
      };
    }

    if (!input.cartItems || input.cartItems.length === 0) {
      return { success: false, error: "سبد خرید شما خالی است." };
    }

    // 2. Compute total amount on the server (never trust client calculations)
    const computedTotal = input.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    // 3. Generate tracking order number
    const uniqueOrderId = `RYL-${Math.floor(100000 + Math.random() * 900000)}`;

    // 4. Insert main record envelope into 'order' table
    await db.insert(order).values({
      id: uniqueOrderId,
      userId: session.user.id,
      total: computedTotal,
      status: "processing", // Defaulting to processing for Cash on Delivery
      customerName: input.customerName,
      customerPhone: input.customerPhone,
      province: input.province,
      city: input.city,
      shippingAddress: input.shippingAddress,
      postalCode: input.postalCode,
    });

    // 5. Build historic item snapshots and insert into 'orderItem'
    const itemsToInsert = input.cartItems.map((item) => ({
      id: crypto.randomUUID(),
      orderId: uniqueOrderId,
      productId: item.id, // Loose link that handles product hard deletions safely
      quantity: item.quantity,
      priceAtPurchase: item.price,

      // Frozen snapshot values keeping financial/historical integrity intact
      snapshotName: item.name,
      snapshotBrand: item.brand,
      snapshotImage: item.image,
      snapshotVolumeMl: item.volumeMl,
    }));

    await db.insert(orderItem).values(itemsToInsert);

    // 6. Complete Database persistent cart wipe cleanup
    await db.delete(cartItem).where(eq(cartItem.userId, session.user.id));

    // Clear Next.js cache layers so global navigation cart counters update to 0 instantly
    revalidatePath("/cart");
    revalidatePath("/");

    return { success: true, orderId: uniqueOrderId };
  } catch (error) {
    console.error("Order process crash:", error);
    return {
      success: false,
      error: "خطایی در سیستم ثبت سفارش رخ داد. لطفا دوباره تلاش کنید.",
    };
  }
}
