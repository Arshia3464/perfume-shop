import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "@/db";
import { sliderItem } from "@/db/schema";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const rawSliders = await db.select().from(sliderItem);

  const endpoint = process.env.MINIO_ENDPOINT?.replace(/\/$/, "");
  const bucket = process.env.MINIO_BUCKET_NAME || "perfumes";

  const sliders = rawSliders.map((slide) => {
    let resolvedImage: string | null = null;

    if (slide.image) {
      resolvedImage =
        slide.image.startsWith("http://") || slide.image.startsWith("https://")
          ? slide.image
          : `${endpoint}/${bucket}/${slide.image.replace(/^\//, "")}`;
    }

    return {
      ...slide,
      image: resolvedImage,
    };
  });

  return (
    <div className="min-h-screen flex w-full overflow-x-hidden items-center justify-center text-white flex-col gap-6">
      {sliders.length > 0 && <Hero sliders={sliders} />}
      <Featured />
    </div>
  );
}
