import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "@/components/LogoutButton";
import { getSliders } from "./actions";
import { db } from "@/db";
import { sliderItem } from "@/db/schema";
import Hero from "@/components/Hero";
import Featured from "@/components/Featured";
export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const sliders = await db.select().from(sliderItem);
  console.log(sliders);

  const user = session?.user;

  return (
    <div className="min-h-screen flex w-vw overflow-x-hidden items-center justify-center text-white flex-col gap-6">
      <div>{sliders && <Hero sliders={sliders} />}</div>
      <Featured />
    </div>
  );
}
