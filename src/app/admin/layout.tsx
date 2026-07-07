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

  if (!session) {
    redirect("/login");
  }

  return (
    <div
      dir="rtl"
      className="flex min-h-screen bg-background text-foreground antialiased selection:bg-accent selection:text-primary relative"
    >
      {/* ───── PERSISTENT RIGHT-SIDE SIDEBAR ───── */}
      <AdminSidebar />

      {/* ───── MAIN CONTENT AREA (Flows left) ───── */}
      {/* Added clear dynamic right padding (pr-20 md:pr-24 lg:pr-28) so the icons never overlap the cards */}
      <main className="flex-1 p-4 sm:p-6 md:p-10 pr-20 md:pr-24 lg:pr-0 flex flex-col justify-start overflow-y-auto w-full">
        {children}
      </main>
    </div>
  );
}
