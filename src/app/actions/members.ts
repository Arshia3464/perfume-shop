"use server";

import { db } from "@/db";
import { user, order } from "@/db/schema";
import { eq, sql } from "drizzle-orm";

export async function getAllMembersWithStats() {
  try {
    const members = await db
      .select({
        id: user.id,
        name: user.name,
        email: user.email,
        image: user.image,
        role: user.role,
        createdAt: user.createdAt,
        totalOrders: sql<number>`count(${order.id})::int`,
        totalSpent: sql<number>`coalesce(sum(${order.total}), 0)::int`,
      })
      .from(user)
      .leftJoin(order, eq(order.userId, user.id))
      .groupBy(user.id)
      .orderBy(sql`count(${order.id}) desc`);

    return { success: true, data: members };
  } catch (error) {
    console.error("Failed to fetch ROYAL members:", error);
    return { success: false, data: [] };
  }
}
