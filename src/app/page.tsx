import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "@/components/LogoutButton";
import { getSliders } from "./actions";
import { db } from "@/db";
import { sliderItem } from "@/db/schema";
export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const sliders = await db.select().from(sliderItem);
  console.log(sliders);

  const user = session?.user;

  return (
    <div className="min-h-screen flex items-center justify-center text-white">
      <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center space-y-4">
        {user ? (
          <>
            <h1 className="text-xl font-bold">خوش آمدی {user.name}</h1>

            <p className="text-gray-400">{user.email}</p>

            <LogoutButton />
          </>
        ) : (
          <h1 className="text-xl">وارد نشده‌اید</h1>
        )}
      </div>
      <div>
        {sliders &&
          sliders.map((s) => (
            <div key={s.id}>
              <p>{s.text}</p>
              <p>{s.order}</p>
              {s.image && <img src={s.image} alt="Slider Image" />}
            </div>
          ))}
      </div>
    </div>
  );
}
