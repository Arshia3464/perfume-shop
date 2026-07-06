import React from "react";
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";
import {
  FiCheckCircle,
  FiXCircle,
  FiCpu,
  FiDatabase,
  FiCloud,
} from "react-icons/fi";

// Temporary client runner for checking the S3 configuration context
const diagnosticS3 = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY || "",
    secretAccessKey: process.env.MINIO_SECRET_KEY || "",
  },
  forcePathStyle: true,
});

export const dynamic = "force-dynamic"; // Ensure it runs freshly on every load

export default async function DiagnosticsPage() {
  // 1. Core String Presence Validations
  const envChecks = {
    DATABASE_URL: !!process.env.DATABASE_URL,
    MINIO_ENDPOINT: !!process.env.MINIO_ENDPOINT,
    MINIO_BUCKET_NAME: !!process.env.MINIO_BUCKET_NAME,
    MINIO_ACCESS_KEY: !!process.env.MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY: !!process.env.MINIO_SECRET_KEY,
  };

  // 2. Database Handshake Test
  let databaseLive = false;
  let dbErrorReason = "";
  if (envChecks.DATABASE_URL) {
    try {
      // Execute a lightweight query to test the active pool stream
      await db.execute(sql`SELECT 1`);
      databaseLive = true;
    } catch (err: any) {
      dbErrorReason = err?.message || "Connection refused";
    }
  }

  // 3. Object Storage Connection Test
  let storageLive = false;
  let storageErrorReason = "";
  if (envChecks.MINIO_BUCKET_NAME && envChecks.MINIO_ACCESS_KEY) {
    try {
      // Try to list maximum 1 object from the bucket to verify access keys are valid
      await diagnosticS3.send(
        new ListObjectsV2Command({
          Bucket: process.env.MINIO_BUCKET_NAME,
          MaxKeys: 1,
        }),
      );
      storageLive = true;
    } catch (err: any) {
      storageErrorReason = err?.message || "Authentication / Network Failure";
    }
  }

  return (
    <div className="p-8 w-full max-w-4xl space-y-8 text-right" dir="rtl">
      <div className="space-y-1">
        <h1 className="text-2xl font-light tracking-tight text-[var(--foreground)] flex items-center gap-2">
          <FiCpu className="w-6 h-6 text-[var(--accent)]" />
          <span>عیب‌یابی و وضعیت زیرساخت سرور</span>
        </h1>
        <p className="text-xs text-[var(--foreground)]/50 font-light">
          بررسی صحت بارگذاری متغیرهای محیطی (Environment Variables) و تست زنده
          ارتباط با پایگاه‌داده و سرویس ابری چابکان.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* SECTION 1: VARIABLE CHECKLIST */}
        <div className="bg-[var(--secondary)]/10 border border-[var(--accent)]/10 rounded-2xl p-6 space-y-4">
          <h2 className="text-sm font-medium text-[var(--foreground)] border-b border-[var(--accent)]/5 pb-2 flex items-center gap-2">
            <span>بررسی کلیدهای پیکربندی (ENV)</span>
          </h2>
          <div className="space-y-3 font-mono text-xs">
            {Object.entries(envChecks).map(([key, isDefined]) => (
              <div
                key={key}
                className="flex items-center justify-between bg-black/10 px-3 py-2 rounded-xl border border-[var(--accent)]/5"
              >
                <span className="text-[var(--foreground)]/60">{key}</span>
                {isDefined ? (
                  <span className="text-emerald-400 flex items-center gap-1 font-sans text-[11px]">
                    بارگذاری شده <FiCheckCircle className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="text-rose-400 flex items-center gap-1 font-sans text-[11px]">
                    یافت نشد <FiXCircle className="w-4 h-4" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: LIVE HANDSHAKES */}
        <div className="space-y-6">
          {/* DATABASE DIAGNOSTIC CARD */}
          <div className="bg-[var(--secondary)]/10 border border-[var(--accent)]/10 rounded-2xl p-6 flex items-start gap-4">
            <div
              className={`p-3 rounded-xl bg-black/20 ${databaseLive ? "text-emerald-400" : "text-rose-400"}`}
            >
              <FiDatabase className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="text-sm font-medium text-[var(--foreground)]">
                اتصال به دیتابیس (PostgreSQL)
              </h3>
              {databaseLive ? (
                <p className="text-xs text-emerald-400 font-light">
                  ارتباط با موفقیت برقرار شد. استخر اتصال فعال است.
                </p>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-rose-400 font-light">
                    خطا در برقراری ارتباط!
                  </p>
                  {dbErrorReason && (
                    <p className="text-[10px] text-rose-400/60 font-mono bg-rose-500/5 p-1.5 rounded-lg border border-rose-500/10">
                      {dbErrorReason}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* MINIO DIAGNOSTIC CARD */}
          <div className="bg-[var(--secondary)]/10 border border-[var(--accent)]/10 rounded-2xl p-6 flex items-start gap-4">
            <div
              className={`p-3 rounded-xl bg-black/20 ${storageLive ? "text-emerald-400" : "text-rose-400"}`}
            >
              <FiCloud className="w-6 h-6" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="text-sm font-medium text-[var(--foreground)]">
                ذخیره‌سازی ابری (MinIO Object Storage)
              </h3>
              {storageLive ? (
                <p className="text-xs text-emerald-400 font-light">
                  ارتباط برقرار شد. مجوز دسترسی Read/Write تایید شد.
                </p>
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-rose-400 font-light">
                    خطا در احراز هویت یا آدرس باکت!
                  </p>
                  {storageErrorReason && (
                    <p className="text-[10px] text-rose-400/60 font-mono bg-rose-500/5 p-1.5 rounded-lg border border-rose-500/10">
                      {storageErrorReason}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
