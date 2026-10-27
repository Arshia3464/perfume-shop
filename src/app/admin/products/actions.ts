"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { db } from "@/db";
import { product } from "@/db/schema";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";

const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true,
});

export async function createProduct(formData: FormData) {
  try {
    const name = String(formData.get("name") || "");
    const description = String(formData.get("description") || "");
    const price = Number(formData.get("price") || 0);
    const stock = Number(formData.get("stock") || 0);
    const brand = String(formData.get("brand") || "");
    const gender = String(formData.get("gender") || "unisex");
    const season = String(formData.get("season") || "");
    const volumeMl = Number(formData.get("volumeMl") || 0);

    const imageFile = formData.get("image") as File | null;
    let imageKey: string | null = null;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExtension = imageFile.name.split(".").pop() || "png";
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.MINIO_BUCKET_NAME,
          Key: uniqueFileName,
          Body: buffer,
          ContentType: imageFile.type,
        }),
      );

      imageKey = uniqueFileName;
    }

    await db.insert(product).values({
      id: nanoid(),
      name,
      description,
      price,
      stock,
      brand,
      gender,
      season,
      volumeMl,
      image: imageKey,
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to create product:", error);
    return { success: false, error: "Product creation failed." };
  }
}

export async function updateProduct(formData: FormData) {
  try {
    const id = String(formData.get("id"));
    if (!id) {
      return { success: false, error: "Missing product ID." };
    }

    const name = String(formData.get("name") || "");
    const description = String(formData.get("description") || "");
    const price = Number(formData.get("price") || 0);
    const stock = Number(formData.get("stock") || 0);
    const brand = String(formData.get("brand") || "");
    const gender = String(formData.get("gender") || "unisex");
    const season = String(formData.get("season") || "");
    const volumeMl = Number(formData.get("volumeMl") || 0);

    const imageFile = formData.get("image") as File | null;

    const updateData: Record<string, any> = {
      name,
      description,
      price,
      stock,
      brand,
      gender,
      season,
      volumeMl,
      updatedAt: new Date(),
    };

    if (imageFile && imageFile.size > 0) {
      const existing = await db
        .select({ image: product.image })
        .from(product)
        .where(eq(product.id, id))
        .limit(1);

      if (existing[0]?.image) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.MINIO_BUCKET_NAME,
              Key: existing[0].image,
            }),
          );
        } catch (err) {
          console.warn("Failed to delete previous image:", err);
        }
      }

      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExtension = imageFile.name.split(".").pop() || "png";
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.MINIO_BUCKET_NAME,
          Key: uniqueFileName,
          Body: buffer,
          ContentType: imageFile.type,
        }),
      );

      updateData.image = uniqueFileName;
    }

    await db.update(product).set(updateData).where(eq(product.id, id));

    revalidatePath("/admin/products/");
    return { success: true };
  } catch (error) {
    console.error("Failed to update product:", error);
    return { success: false, error: "Product update failed." };
  }
}

export async function deleteProduct(
  productId: string,
  imageKey: string | null,
) {
  if (imageKey) {
    try {
      await s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.MINIO_BUCKET_NAME,
          Key: imageKey,
        }),
      );
    } catch (error) {
      console.warn("Failed to delete image from storage:", error);
    }
  }

  try {
    await db.delete(product).where(eq(product.id, productId));
    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product from database:", error);
    return { success: false, error: "Failed to delete product." };
  }
}
