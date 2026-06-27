import { db } from "@/db";
import { product } from "@/db/schema";
import ProductsClient from "./ProductsClient";

export default async function AdminProductsPage() {
  const rawProducts = await db.select().from(product);

  // Safely serialize database date objects into strings before passing to Client
  const serializedProducts = rawProducts.map((p) => ({
    ...p,
    createdAt: p.createdAt ? p.createdAt.toISOString() : null,
    updatedAt: p.updatedAt ? p.updatedAt.toISOString() : null,
  }));

  return <ProductsClient initialProducts={serializedProducts} />;
}
