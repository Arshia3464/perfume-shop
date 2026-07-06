import { S3Client, ListObjectsV2Command } from "@aws-sdk/client-s3";

export const dynamic = "force-dynamic";

const diagnosticClient = new S3Client({
  endpoint: process.env.MINIO_ENDPOINT,
  region: "us-east-1",
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
  },
  forcePathStyle: true,
});

export default async function DebugStoragePage() {
  let fileObjects: any[] = [];
  let storageError: string | null = null;

  try {
    const data = await diagnosticClient.send(
      new ListObjectsV2Command({
        Bucket: process.env.MINIO_BUCKET_NAME!,
      }),
    );
    fileObjects = data.Contents || [];
  } catch (error: any) {
    storageError = error?.message || String(error);
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-6 text-right" dir="rtl">
      <div>
        <h1 className="text-xl font-bold text-cyan-600">
          صفحه عیب‌یابی: بررسی فضای ذخیره‌سازی ابری
        </h1>
        <p className="text-xs text-gray-500 mt-1">
          نمایش تمام فایل‌های فیزیکی آپلود شده درون باکت مینیو چابکان
        </p>
      </div>

      {storageError && (
        <div
          className="bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-700 text-sm font-mono text-left"
          dir="ltr"
        >
          <p className="font-bold mb-2">
            ❌ MinIO Object Storage Listing Failed:
          </p>
          <pre className="whitespace-pre-wrap">{storageError}</pre>
        </div>
      )}

      {!storageError && fileObjects.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center text-sm text-gray-400">
          سرور MinIO متصل است اما این باکت (`{process.env.MINIO_BUCKET_NAME}`)
          کاملاً خالی است.
        </div>
      )}

      {!storageError && fileObjects.length > 0 && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {fileObjects.map((file) => {
              const fileUrl = `${process.env.MINIO_ENDPOINT}/${process.env.MINIO_BUCKET_NAME}/${file.Key}`;
              return (
                <div
                  key={file.Key}
                  className="border border-gray-200 rounded-xl p-3 bg-white space-y-2 shadow-sm text-left flex flex-col justify-between"
                  dir="ltr"
                >
                  <div className="aspect-square bg-gray-50 border rounded-lg overflow-hidden flex items-center justify-center">
                    <img
                      src={fileUrl}
                      alt={file.Key}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1">
                    <p
                      className="text-xs font-mono font-bold text-gray-800 truncate"
                      title={file.Key}
                    >
                      {file.Key}
                    </p>
                    <p className="text-[10px] text-gray-400 font-mono">
                      Size: {(file.Size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <a
                    href={fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center text-[10px] bg-gray-100 hover:bg-gray-200 text-gray-600 py-1.5 rounded-md font-medium transition"
                  >
                    Open Link URL
                  </a>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-900 rounded-xl p-4 text-left" dir="ltr">
            <p className="text-xs text-gray-400 font-bold mb-2">
              📦 Raw MinIO SDK S3 Payload Object Metadata:
            </p>
            <pre className="text-cyan-400 font-mono text-xs overflow-x-auto max-h-96 whitespace-pre">
              {JSON.stringify(fileObjects, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
