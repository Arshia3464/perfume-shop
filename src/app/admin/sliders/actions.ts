"use server";

import { db } from "@/db";
import { sliderItem } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

// -------------------- CREATE --------------------
export async function createSlider(formData: FormData) {
  const productId = String(formData.get("productId"));
  const text = formData.get("text");
  const order = Number(formData.get("order") ?? 0);

  await db.insert(sliderItem).values({
    id: nanoid(),
    productId,
    text: typeof text === "string" ? text : null,
    image: String(formData.get("image")),
    order,
  });
}

// -------------------- UPDATE --------------------
export async function updateSlider(formData: FormData) {
  const id = String(formData.get("id"));

  const productId = String(formData.get("productId"));
  const text = formData.get("text");
  const image = formData.get("image");
  const order = Number(formData.get("order") ?? 0);

  await db
    .update(sliderItem)
    .set({
      productId,
      text: typeof text === "string" ? text : null,
      image: typeof image === "string" ? image : null,
      order,
    })
    .where(eq(sliderItem.id, id));
}

// -------------------- DELETE --------------------
export async function deleteSlider(id: string) {
  await db.delete(sliderItem).where(eq(sliderItem.id, id));
}

// -------------------- TOGGLE ACTIVE --------------------
export async function toggleSliderActive(id: string, active: boolean) {
  await db.update(sliderItem).set({ active }).where(eq(sliderItem.id, id));
}
