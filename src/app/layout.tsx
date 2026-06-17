import type { Metadata } from "next";
import "@fontsource/vazirmatn/400.css";
import "@fontsource/vazirmatn/700.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "قروشگاه عطر ",
  description:
    "فروش انواع عطرهای با کیفیت با قیمت مناسب و ضمانت اصالت کالا. ارسال سریع و رایگان به سراسر کشور. خرید آسان و امن با پشتیبانی 24 ساعته.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  return (
    <html lang="fa" dir="rtl">
      <body className="font-sans pt-20 antialiased">
        <Navbar user={session?.user ?? null} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
