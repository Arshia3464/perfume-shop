"use server";

import { db } from "@/db";
import { order, orderItem } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// Action 1: Allow Admins to update order fulfillment states
export async function updateOrderStatus(orderId: string, newStatus: string) {
  const session = await auth.api.getSession({ headers: await headers() });

  // Guard Clause: Secure check to verify the role is strictly admin
  if (!session?.user || session.user.role !== "admin") {
    return {
      success: false,
      error: "دسترسی غیرمجاز؛ تنها مدیران سیستم به این بخش دسترسی دارند.",
    };
  }

  try {
    await db
      .update(order)
      .set({ status: newStatus })
      .where(eq(order.id, orderId));

    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    return { success: false, error: "خطا در بروزرسانی وضعیت لجیستیک." };
  }
}

// Action 2: Fetch detailed tracking history for the Admin panel view
export async function getAdminOrdersWithItems() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user || session.user.role !== "admin")
    throw new Error("Unauthorized");

  // Fetch all orders from oldest to newest
  const allOrders = await db
    .select()
    .from(order)
    .orderBy(desc(order.createdAt));

  // Attach individual snapshot items to their respective orders
  const ordersWithItems = await Promise.all(
    allOrders.map(async (ord) => {
      const items = await db
        .select()
        .from(orderItem)
        .where(eq(orderItem.orderId, ord.id));
      return { ...ord, items };
    }),
  );

  return ordersWithItems;
}
