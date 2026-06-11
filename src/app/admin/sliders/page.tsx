import React from "react";
import { sliderItem } from "@/db/schema";
import { db } from "@/db";
import SlidersClient from "./SlidersClient";
import { asc } from "drizzle-orm";
import { product } from "@/db/schema";

const page = async () => {
  const sliders = await db
    .select()
    .from(sliderItem)
    .orderBy(asc(sliderItem.order));
  const products = await db.select().from(product);
  return <SlidersClient Sliders={sliders} Products={products} />;
};

export default page;
