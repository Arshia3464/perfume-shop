import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import LogoutButton from "@/components/LogoutButton";
export default async function HomePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
    </div>
  );
}
