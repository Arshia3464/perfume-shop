import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.log(session?.user);

  if (!session) {
    redirect("/login");
  }

  // if (session.user.role !== "admin") {
  //   redirect("/");
  // }

  return <div className="flex min-h-screen">{children}</div>;
}
