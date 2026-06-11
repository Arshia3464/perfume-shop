import { db } from "@/db";
import { sliderItem } from "@/db/schema";

export async function getSliders() {
  return await db.select().from(sliderItem);
}
