import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";

import ProductClient from "./ProductClient";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await db
    .select()
    .from(product)
    .where(eq(product.id, id))
    .then((res) => res[0]);

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center font-bold text-neutral-500">
        محصول پیدا نشد
      </div>
    );
  }

  const endpoint = process.env.MINIO_ENDPOINT?.replace(/\/$/, "");
  const bucket = process.env.MINIO_BUCKET_NAME || "perfumes";

  const imageUrl = item.image
    ? item.image.startsWith("http://") || item.image.startsWith("https://")
      ? item.image
      : `${endpoint}/${bucket}/${item.image.replace(/^\//, "")}`
    : null;

  return <ProductClient item={item} imageUrl={imageUrl} />;
}
