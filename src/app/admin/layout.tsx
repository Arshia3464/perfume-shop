import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminSidebar from "./AdminSidebar";

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

  return (
    <div
      dir="rtl"
      className="flex min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-primary"
    >
      {/* ───── PERSISTENT CLIENT SIDEBAR ───── */}
      <AdminSidebar />

      {/* ───── NESTED ROUTE CONTENT AREA ───── */}
      <main className="flex-1 p-10 flex flex-col justify-start overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
