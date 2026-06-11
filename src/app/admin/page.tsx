import Link from "next/link";

export default function AdminPage() {
  return (
    <>
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-4 space-y-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>

        <nav className="flex flex-col gap-2 text-sm">
          <Link href="/admin" className="hover:text-black text-gray-600">
            داشبورد
          </Link>

          <Link
            href="/admin/products"
            className="hover:text-black text-gray-600"
          >
            محصولات
          </Link>

          <Link href="/admin/orders" className="hover:text-black text-gray-600">
            سفارش‌ها
          </Link>

          <Link href="/admin/users" className="hover:text-black text-gray-600">
            کاربران
          </Link>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-6">
        <h2 className="text-2xl font-semibold">خوش آمدید 👋</h2>
        <p className="text-gray-500 mt-2">
          از منو سمت راست مدیریت را شروع کنید
        </p>
      </main>
    </>
  );
}
