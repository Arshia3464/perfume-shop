"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiSliders,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiLayers,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Automatically close the mobile sheet drawer whenever a route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navigationItems = [
    {
      id: "dashboard",
      label: "کنترل پنل مدیریت",
      href: "/admin",
      icon: <FiSliders className="w-4 h-4" />,
    },
    {
      id: "products",
      label: "مدیریت محصولات",
      href: "/admin/products",
      icon: <FiBox className="w-4 h-4" />,
    },
    {
      id: "sliders",
      label: "مدیریت اسلایدرها",
      href: "/admin/sliders",
      icon: <FiLayers className="w-4 h-4" />, // Upgraded to a custom layout stack icon
    },
    {
      id: "orders",
      label: "بررسی سفارش‌ها",
      href: "/admin/orders",
      icon: <FiShoppingBag className="w-4 h-4" />,
    },
    {
      id: "users",
      label: "فهرست کاربران",
      href: "/admin/users",
      icon: <FiUsers className="w-4 h-4" />,
    },
  ];

  return (
    <>
      {/* ───── MOBILE TOP HEADER BAR (Only visible on small viewports) ───── */}
      <header className="md:hidden fixed top-0 right-0 left-0 h-16 border-b border-[var(--accent)]/20 bg-[var(--background)]/80 backdrop-blur-md z-40 flex items-center justify-between px-6">
        <div className="space-y-0.5 text-right">
          <span className="text-[9px] uppercase tracking-widest text-[var(--foreground)]/40 block">
            ROYAL Panel
          </span>
          <h1 className="text-sm font-medium tracking-tight text-[var(--foreground)]">
            نظارت استودیو
          </h1>
        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors border border-[var(--accent)]/20 rounded-xl bg-[var(--secondary)]/10"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      </header>

      {/* Spacer to push down main layout text blocks on mobile so they don't slide under the fixed header */}
      <div className="md:hidden h-16 w-full block shrink-0" />

      {/* ───── DESKTOP PERSISTENT SIDEBAR (Hidden on mobile screens) ───── */}
      <aside className="hidden md:flex w-64 border-l border-[var(--accent)]/30 bg-[var(--secondary)]/10 p-6 flex-col justify-between backdrop-blur-sm sticky top-0 h-screen shrink-0">
        <div className="space-y-8">
          {/* Brand/Header block using official name ROYAL */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-widest text-[var(--foreground)]/40 block">
              ROYAL Archive
            </span>
            <h1 className="text-lg font-medium tracking-tight text-[var(--foreground)]">
              پنل نظارت استودیو
            </h1>
          </div>

          {/* Navigation Links Mapping */}
          <nav className="flex flex-col gap-1 text-sm">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`group relative flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-300 ${
                    isActive
                      ? "text-[var(--foreground)] font-medium bg-[var(--accent)]/10"
                      : "text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/30"
                  }`}
                >
                  {/* Layout active indicator spring pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute right-0 top-2 bottom-2 w-[3px] bg-[var(--accent)] rounded-l"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                  <span
                    className={`transition-transform duration-300 group-hover:scale-105 ${
                      isActive
                        ? "text-[var(--accent)]"
                        : "text-[var(--foreground)]/40 group-hover:text-[var(--foreground)]/70"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Editorial Footnote */}
        <div className="pt-4 border-t border-[var(--accent)]/10 text-[10px] text-[var(--foreground)]/30 font-light">
          <span>سامانه متمرکز استودیو عطر ROYAL</span>
        </div>
      </aside>

      {/* ───── MOBILE DRAWER MODAL SHEET BOUNDARY ───── */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 md:hidden" dir="rtl">
            {/* Backdrop Dimming Mesh Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            {/* Sliding Container Drawer Structure */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-72 bg-[var(--background)] border-l border-[var(--accent)]/30 p-6 flex flex-col justify-between shadow-2xl"
            >
              <div className="space-y-8">
                {/* Mobile Drawer Top Heading Info Block */}
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5 text-right">
                    <span className="text-[9px] uppercase tracking-widest text-[var(--foreground)]/40 block">
                      ROYAL Archive
                    </span>
                    <h1 className="text-base font-medium text-[var(--foreground)]">
                      منوی دسترسی سریع
                    </h1>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-[var(--foreground)]/40 hover:text-[var(--foreground)] transition-colors border border-[var(--accent)]/10 rounded-lg"
                  >
                    <FiX className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Specific Navigation Map Links */}
                <nav className="flex flex-col gap-1 text-sm">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                          isActive
                            ? "text-[var(--foreground)] font-medium bg-[var(--accent)]/10 border border-[var(--accent)]/20"
                            : "text-[var(--foreground)]/60 hover:text-[var(--foreground)] hover:bg-[var(--secondary)]/20"
                        }`}
                      >
                        <span
                          className={
                            isActive
                              ? "text-[var(--accent)]"
                              : "text-[var(--foreground)]/40"
                          }
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Drawer Footnote */}
              <div className="pt-4 border-t border-[var(--accent)]/10 text-[9px] text-[var(--foreground)]/30 font-light text-right">
                <span>سامانه متمرکز استودیو عطر ROYAL</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
