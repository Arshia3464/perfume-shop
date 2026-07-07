"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  FiSearch,
  FiX,
  FiUser,
  FiShoppingBag,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";

type Member = {
  id: string;
  name: string | null;
  email: string;
  image: string | null;
  role: string;
  createdAt: Date | string;
  totalOrders: number;
  totalSpent: number;
};

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
  exit: { opacity: 0, scale: 0.98, y: 8, transition: { duration: 0.2 } },
};

export default function MembersClient({
  initialMembers,
}: {
  initialMembers: Member[];
}) {
  const [search, setSearch] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const filteredMembers = initialMembers.filter((member) => {
    const searchTerm = search.toLowerCase();
    return (
      member.name?.toLowerCase().includes(searchTerm) ||
      member.email.toLowerCase().includes(searchTerm)
    );
  });

  return (
    <div className="space-y-6 w-full relative z-10" dir="rtl">
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-secondary/60 pb-5">
        <div className="text-right">
          <h1 className="text-xl font-black text-primary tracking-tight">
            مدیریت کاربران
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            مشاهده، جستجو و بررسی سوابق خرید اعضای ثبت‌نام شده در سیستم
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="relative w-full sm:w-80">
          <FiSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="جستجو با نام یا ایمیل..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-secondary/20 border border-secondary/60 text-xs rounded-xl focus:outline-none focus:border-accent/50 text-primary transition-all placeholder:text-muted-foreground/40"
          />
        </div>
      </div>

      {/* PROFESSIONAL MEMBERS TABLE */}
      {filteredMembers.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-secondary/60 rounded-2xl bg-secondary/5">
          <p className="text-xs font-medium text-muted-foreground">
            هیچ کاربری یافت نشد.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-secondary/60 bg-secondary/10 backdrop-blur-md shadow-sm">
          <table className="w-full text-right border-collapse text-xs">
            <thead>
              <tr className="border-b border-secondary/60 bg-secondary/20 text-muted-foreground font-bold">
                <th className="p-4">کاربر</th>
                <th className="p-4">ایمیل</th>
                <th className="p-4">نقش</th>
                <th className="p-4">تعداد سفارشات</th>
                <th className="p-4">مجموع خرید</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary/40 text-primary">
              {filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="hover:bg-secondary/20 transition-colors cursor-pointer group"
                >
                  <td className="p-4 font-bold group-hover:text-accent transition-colors">
                    {member.name || "بدون نام"}
                  </td>
                  <td
                    className="p-4 text-neutral-400  tracking-wide select-all"
                    dir="ltr"
                  >
                    {member.email}
                  </td>
                  <td className="p-4">
                    <span
                      className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                        member.role === "admin"
                          ? "bg-accent/5 text-accent border-accent/20"
                          : "bg-secondary/40 text-neutral-400 border-secondary/60"
                      }`}
                    >
                      {member.role === "admin" ? "مدیر" : "کاربر"}
                    </span>
                  </td>
                  <td className="p-4 font">
                    {member.totalOrders.toLocaleString("fa-IR")}
                  </td>
                  <td className="p-4 font font-bold text-left sm:text-right">
                    {member.totalSpent.toLocaleString("fa-IR")} تومان
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MEMBER PROFILE DETAILED MODAL */}
      <AnimatePresence>
        {selectedMember && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              variants={overlayVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={() => setSelectedMember(null)}
              className="absolute inset-0 bg-background/60 backdrop-blur-md"
            />

            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative w-full max-w-md overflow-hidden rounded-2xl border border-secondary/80 bg-background shadow-xl p-6 space-y-6 text-right"
            >
              {/* Modal Header */}
              <div className="flex flex-row-reverse items-center justify-between border-b border-secondary/40 pb-4">
                <div className="flex items-center gap-2">
                  <FiUser className="w-4 h-4 text-accent" />
                  <h2 className="text-sm font-black text-primary">
                    جزئیات پروفایل کاربر
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="p-1.5 rounded-lg border border-secondary/60 bg-secondary/10 text-muted-foreground hover:text-primary hover:border-accent/40 transition cursor-pointer"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* User Overview Frame */}
              <div className="flex items-center gap-4 bg-secondary/10 p-4 rounded-xl border border-secondary/40">
                <div className="h-11 w-11 rounded-xl bg-background border border-secondary/60 flex items-center justify-center font-black text-xs text-accent uppercase font shadow-inner">
                  {selectedMember.name ? selectedMember.name.slice(0, 2) : "UR"}
                </div>
                <div className="space-y-0.5">
                  <h4 className="font-bold text-sm text-primary">
                    {selectedMember.name || "بدون نام"}
                  </h4>
                  <p className="text-[10px] font-bold text-accent uppercase tracking-wider">
                    {selectedMember.role}
                  </p>
                </div>
              </div>

              {/* Stats Numerical Metric Blocks */}
              <div className="grid grid-cols-2 gap-3 text-right">
                <div className="p-3.5 border border-secondary/40 bg-secondary/10 rounded-xl space-y-1">
                  <span className="text-[10px] text-neutral-400 flex items-center gap-1.5 justify-end">
                    تعداد سفارشات{" "}
                    <FiShoppingBag className="w-3 h-3 text-accent" />
                  </span>
                  <p className="text-base font-black text-primary ">
                    {selectedMember.totalOrders.toLocaleString("fa-IR")}{" "}
                    <span className="text-[10px] text-neutral-400 font-normal">
                      عدد
                    </span>
                  </p>
                </div>

                <div className="p-3.5 border border-secondary/40 bg-secondary/10 rounded-xl space-y-1">
                  <span className="text-[10px] text-neutral-400 flex items-center gap-1.5 justify-end">
                    مجموع خرید <FiDollarSign className="w-3 h-3 text-accent" />
                  </span>
                  <p className="text-base font-black text-primary ">
                    {selectedMember.totalSpent.toLocaleString("fa-IR")}{" "}
                    <span className="text-[10px] text-neutral-400 font-normal">
                      تومان
                    </span>
                  </p>
                </div>
              </div>

              {/* System Metadata Core Registry Fields */}
              <div className="space-y-2.5 border-t border-secondary/40 pt-4 text-[11px] text-muted-foreground">
                <div className="flex flex-row-reverse justify-between items-center bg-secondary/5 p-2 rounded-lg border border-secondary/30">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <FiUser className="w-3.5 h-3.5 text-accent/80" /> شناسه
                    منحصر‌به‌فرد
                  </span>
                  <span className=" text-primary bg-background border border-secondary/60 px-2 py-0.5 rounded-md text-[10px] select-all">
                    {selectedMember.id}
                  </span>
                </div>

                <div className="flex flex-row-reverse justify-between items-center bg-secondary/5 p-2 rounded-lg border border-secondary/30">
                  <span className="text-neutral-400 flex items-center gap-1.5">
                    <FiCalendar className="w-3.5 h-3.5 text-accent/80" /> تاریخ
                    عضویت
                  </span>
                  <span className="text-primary  tracking-wide" dir="ltr">
                    {new Date(selectedMember.createdAt).toLocaleDateString(
                      "fa-IR",
                    )}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
