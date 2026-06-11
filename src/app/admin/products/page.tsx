import { db } from "@/db";
import { product } from "@/db/schema";
import ProductsClient from "./ProductsClient";

export default async function AdminProductsPage() {
  const products = await db.select().from(product);

  return <ProductsClient initialProducts={products} />;
}
