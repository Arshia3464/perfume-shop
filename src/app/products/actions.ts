"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cartItem, wishlistItem } from "@/db/schema";

import { headers } from "next/headers";
import { eq, and } from "drizzle-orm";

import { nanoid } from "nanoid";

export async function addToCart(productId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // user not logged in
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  // check existing cart item
  const existing = await db
    .select()
    .from(cartItem)
    .where(
      and(
        eq(cartItem.userId, session.user.id),
        eq(cartItem.productId, productId),
      ),
    )
    .then((res) => res[0]);

  // already exists → increase quantity
  if (existing) {
    await db
      .update(cartItem)
      .set({
        quantity: existing.quantity + 1,
      })
      .where(eq(cartItem.id, existing.id));

    return;
  }

  // create new cart item
  await db.insert(cartItem).values({
    id: nanoid(),

    userId: session.user.id,

    productId,

    quantity: 1,
  });
}

export async function wishListToggle(productId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  const userId = session.user.id;

  const existing = await db
    .select()
    .from(wishlistItem)
    .where(
      and(
        eq(wishlistItem.userId, userId),
        eq(wishlistItem.productId, productId),
      ),
    )
    .then((res) => res[0]);

  // ✅ TOGGLE BEHAVIOR
  if (existing) {
    await db
      .delete(wishlistItem)
      .where(
        and(
          eq(wishlistItem.userId, userId),
          eq(wishlistItem.productId, productId),
        ),
      );

    return { added: false };
  }

  await db.insert(wishlistItem).values({
    id: nanoid(),
    userId,
    productId,
  });

  return { added: true };
}
