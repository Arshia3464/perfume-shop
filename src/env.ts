// src/env.ts
import { z } from "zod";

const envSchema = z.object({
  // Requires a non-empty string, works whether local or docker network
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  // MinIO endpoint can be http://localhost:9000, http://minio:9000, or a domain
  MINIO_ENDPOINT: z.string().min(1, "MINIO_ENDPOINT is required"),
  MINIO_ACCESS_KEY: z.string().min(1, "MINIO_ACCESS_KEY is required"),
  MINIO_SECRET_KEY: z.string().min(1, "MINIO_SECRET_KEY is required"),
  MINIO_BUCKET_NAME: z.string().min(1, "MINIO_BUCKET_NAME is required"),

  // Auth credentials
  BETTER_AUTH_SECRET: z.string().min(1, "BETTER_AUTH_SECRET is required"),
  BETTER_AUTH_URL: z.string().min(1).default("http://localhost:3000"),
});

export const env = envSchema.parse(process.env);
