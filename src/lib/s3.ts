import { S3Client } from "@aws-sdk/client-s3";

if (
  !process.env.MINIO_ENDPOINT ||
  !process.env.MINIO_ACCESS_KEY ||
  !process.env.MINIO_SECRET_KEY
) {
  throw new Error("Missing MinIO credentials in environment variables.");
}

export const s3Client = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  region: "us-east-1", // AWS SDK enforces a placeholder string parameter format
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY,
    secretAccessKey: process.env.MINIO_SECRET_KEY,
  },
  forcePathStyle: true, // Crucial architectural flag for self-hosted MinIO clusters
});
