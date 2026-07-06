"use server";

import { db } from "@/db";
import { cartItem } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

// Action 1: Handle increasing or decreasing quantity safely on the server
export async function updateCartQuantity(cartItemId: string, quantity: number) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthenticated");

  // If quantity drops to zero or below, delete it entirely
  if (quantity <= 0) {
    await db
      .delete(cartItem)
      .where(
        and(eq(cartItem.id, cartItemId), eq(cartItem.userId, session.user.id)),
      );
  } else {
    // Otherwise update it securely in Postgres
    await db
      .update(cartItem)
      .set({ quantity })
      .where(
        and(eq(cartItem.id, cartItemId), eq(cartItem.userId, session.user.id)),
      );
  }

  // Tell Next.js to clear its layout cache and show the fresh amounts instantly
  revalidatePath("/cart");
}

// Action 2: Handle clicking the trash icon to completely remove the item
export async function removeFromCart(cartItemId: string) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new Error("Unauthenticated");

  await db
    .delete(cartItem)
    .where(
      and(eq(cartItem.id, cartItemId), eq(cartItem.userId, session.user.id)),
    );

  revalidatePath("/cart");
}
