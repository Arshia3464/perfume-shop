import { getAllMembersWithStats } from "@/app/actions/members";
import MembersClient from "./MembersClient";

export const dynamic = "force-dynamic";

export default async function AdminMembersPage() {
  const result = await getAllMembersWithStats();

  if (!result.success) {
    return (
      <div
        className="p-8 text-center text-red-500 text-xs font-medium"
        dir="rtl"
      >
        خطا در اتصال به پایگاه داده چابوکان. وضعیت متغیرهای محیطی سیستم را بررسی
        کنید.
      </div>
    );
  }

  return <MembersClient initialMembers={result.data} />;
}
