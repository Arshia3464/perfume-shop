"use server";

import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { db } from "@/db";
import { sliderItem } from "@/db/schema";
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

// Helper function to extract file keys safely from your full URLs
function getS3KeyFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  // Double check that the asset belongs to our MinIO endpoint before trying to delete
  const isMinioAsset =
    url.includes("chbkn.run") ||
    url.includes("chabokan.net") ||
    (process.env.MINIO_ENDPOINT && url.includes(process.env.MINIO_ENDPOINT));
  if (!isMinioAsset) return null;

  return url.split("/").pop() || null;
}

// -------------------- CREATE --------------------
export async function createSlider(formData: FormData) {
  try {
    const productId = String(formData.get("productId"));
    const text = formData.get("text");
    const order = Number(formData.get("order") ?? 0);

    const imageFile = formData.get("image") as File;
    let imageUrl = "";

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

    await db.insert(sliderItem).values({
      id: nanoid(),
      productId,
      text: typeof text === "string" ? text : null,
      image: imageUrl,
      order,
    });

    revalidatePath("/admin/sliders");
    return { success: true };
  } catch (error) {
    console.error("Failed to upload and create slider:", error);
    return { success: false, error: "Slider creation failed." };
  }
}

// -------------------- UPDATE --------------------
export async function updateSlider(formData: FormData) {
  try {
    const id = String(formData.get("id"));
    const productId = String(formData.get("productId"));
    const text = formData.get("text");
    const order = Number(formData.get("order") ?? 0);

    // Fetch existing slider data to know what the current image is
    const [existingSlider] = await db
      .select()
      .from(sliderItem)
      .where(eq(sliderItem.id, id));
    if (!existingSlider) {
      return { success: false, error: "Slider item not found." };
    }

    const imageFile = formData.get("image") as File | null;
    let updatedImageUrl = existingSlider.image;

    // Check if a brand-new file was actually provided via the update form
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

      // Clean up the legacy object storage file if it exists to keep storage pristine
      const oldFileKey = getS3KeyFromUrl(existingSlider.image);
      if (oldFileKey) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.MINIO_BUCKET_NAME,
              Key: oldFileKey,
            }),
          );
        } catch (s3Error) {
          console.warn(
            "Could not delete old asset during replacement sequence:",
            s3Error,
          );
        }
      }

      updatedImageUrl = `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/${uniqueFileName}`;
    }

    await db
      .update(sliderItem)
      .set({
        productId,
        text: typeof text === "string" ? text : null,
        image: updatedImageUrl,
        order,
      })
      .where(eq(sliderItem.id, id));

    revalidatePath("/admin/sliders");
    return { success: true };
  } catch (error) {
    console.error("Failed to update slider:", error);
    return { success: false, error: "Slider update failed." };
  }
}

// -------------------- DELETE --------------------
export async function deleteSlider(id: string) {
  try {
    // 1. Fetch current row state to extract existing file configurations
    const [existingSlider] = await db
      .select()
      .from(sliderItem)
      .where(eq(sliderItem.id, id));

    if (existingSlider) {
      const fileKey = getS3KeyFromUrl(existingSlider.image);

      // 2. Clear out storage dependencies safely if matched
      if (fileKey) {
        try {
          await s3Client.send(
            new DeleteObjectCommand({
              Bucket: process.env.MINIO_BUCKET_NAME,
              Key: fileKey,
            }),
          );
        } catch (s3Error) {
          // If the image asset doesn't exist anymore, MinIO won't break,
          // but logging unexpected connection context is helpful.
          console.warn("Storage deletion bypassed or skipped:", s3Error);
        }
      }
    }

    // 3. Purge operational table index
    await db.delete(sliderItem).where(eq(sliderItem.id, id));

    revalidatePath("/admin/sliders");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete slider:", error);
    return { success: false, error: "Slider deletion failed." };
  }
}

// -------------------- TOGGLE ACTIVE --------------------
export async function toggleSliderActive(id: string, active: boolean) {
  try {
    await db.update(sliderItem).set({ active }).where(eq(sliderItem.id, id));

    revalidatePath("/admin/sliders");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle slider visibility state:", error);
    return { success: false, error: "Visibility mutation failed." };
  }
}
