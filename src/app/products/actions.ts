"use server";

import { auth } from "@/lib/auth";
import { db } from "@/db";
import { cartItem } from "@/db/schema";

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
