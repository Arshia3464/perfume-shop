import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";

import ProductClient from "./ProductClient";

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
      <div className="min-h-screen flex items-center justify-center">
        محصول پیدا نشد
      </div>
    );
  }

  return <ProductClient item={item} />;
}
