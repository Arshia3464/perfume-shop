"use server";

import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export async function createProduct(formData: FormData) {
  await db.insert(product).values({
    id: nanoid(),

    name: String(formData.get("name")),
    price: Number(formData.get("price")),
    stock: Number(formData.get("stock")),
    brand: String(formData.get("brand")),

    gender: String(formData.get("gender")),
    image: String(formData.get("image")),

    createdAt: new Date().toISOString(),
  });
}

export async function updateProduct(formData: FormData) {
  const id = String(formData.get("id"));

  await db

    .update(product)

    .set({
      name: String(formData.get("name")),

      description: String(formData.get("description")),

      price: Number(formData.get("price")),

      stock: Number(formData.get("stock")),

      brand: String(formData.get("brand")),

      gender: String(formData.get("gender")),

      season: String(formData.get("season")),

      volumeMl: Number(formData.get("volumeMl")),

      image: String(formData.get("image")),

      updatedAt: new Date().toISOString(),
    })

    .where(eq(product.id, id));
}
