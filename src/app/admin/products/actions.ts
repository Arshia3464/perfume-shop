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

// Initialize the S3 client to connect to Chabokan MinIO container
const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  region: "us-east-1", // AWS client requires a placeholder region format
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true, // Required for self-hosted MinIO clusters
});

export async function createProduct(formData: FormData) {
  try {
    const name = String(formData.get("name"));
    const description = String(formData.get("description"));
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const brand = String(formData.get("brand"));
    const gender = String(formData.get("gender"));
    const season = String(formData.get("season"));
    const volumeMl = Number(formData.get("volumeMl"));

    // Extract the raw file object from the form input
    const imageFile = formData.get("image") as File;
    let imageUrl = "";

    // If a file was uploaded, handle transmission to MinIO
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate a unique randomized filename to avoid overwrite collisions
      const fileExtension = imageFile.name.split(".").pop();
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.MINIO_BUCKET_NAME,
          Key: uniqueFileName,
          Body: buffer,
          ContentType: imageFile.type,
        }),
      );

      // Construct your permanent static public file URL
      imageUrl = `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/${uniqueFileName}`;
    }

    // Insert everything seamlessly into your Chabokan database
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
      image: imageUrl, // Storing our permanent cloud storage string link
    });

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to upload and create product:", error);
    return { success: false, error: "Product creation failed." };
  }
}

export async function updateProduct(formData: FormData) {
  try {
    const id = String(formData.get("id"));
    const name = String(formData.get("name"));
    const description = String(formData.get("description"));
    const price = Number(formData.get("price"));
    const stock = Number(formData.get("stock"));
    const brand = String(formData.get("brand"));
    const gender = String(formData.get("gender"));
    const season = String(formData.get("season"));
    const volumeMl = Number(formData.get("volumeMl"));

    const imageFile = formData.get("image") as File;

    // Set up standard mutations container
    const updateData: any = {
      name,
      description,
      price,
      stock,
      brand,
      gender,
      season,
      volumeMl,
    };

    // Only process upload if user added a brand new asset file
    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fileExtension = imageFile.name.split(".").pop();
      const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExtension}`;

      await s3Client.send(
        new PutObjectCommand({
          Bucket: process.env.MINIO_BUCKET_NAME,
          Key: uniqueFileName,
          Body: buffer,
          ContentType: imageFile.type,
        }),
      );

      updateData.image = `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/${uniqueFileName}`;
    }

    await db.update(product).set(updateData).where(eq(product.id, id));

    revalidatePath("/admin/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to modify product record:", error);
    return { success: false, error: "Product update failed." };
  }
}

export async function deleteProduct(
  productId: string,
  imageUrl: string | null,
) {
  try {
    // 1. Only try to delete from MinIO if a valid image URL exists
    if (imageUrl) {
      // Extract the filename/key out of the full URL string
      // e.g. "https://.../perfumes/file.png" -> split gives ["https:", "", "...", "perfumes", "file.png"]
      // pop() gives "file.png". Your key is "file.png" (or "perfumes/file.png" depending on your bucket folder nesting)
      const fileKey = imageUrl.split("/").pop();

      if (fileKey) {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: process.env.MINIO_BUCKET_NAME,
            Key: fileKey, // The exact key/name of the file inside the bucket
          }),
        );
        console.log("Successfully deleted image from storage:", fileKey);
      }
    }

    // 2. Delete the record from your Chabokan PostgreSQL database via Drizzle ORM
    await db.delete(product).where(eq(product.id, productId));
    console.log("Successfully deleted product from database:", productId);

    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    throw new Error("Deletion sequence failed");
  }
}
