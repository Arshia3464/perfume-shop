"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  FiSliders,
  FiBox,
  FiShoppingBag,
  FiUsers,
  FiLayers,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(true); // Default to icon-only state everywhere

  const navigationItems = [
    {
      id: "dashboard",
      label: "کنترل پنل",
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
      icon: <FiLayers className="w-4 h-4" />,
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
      {/* ───── PERSISTENT RIGHT-ALIGNED COLLAPSIBLE ICON RAIL (Desktop & Mobile) ───── */}
      <motion.aside
        animate={{ width: isCollapsed ? "64px" : "240px" }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="fixed md:sticky top-0 right-0 h-screen border-l border-border bg-background/95 backdrop-blur-md p-3 flex flex-col justify-between shrink-0 z-50 overflow-hidden shadow-xl md:shadow-none"
      >
        <div className="space-y-6">
          {/* Top Panel Brand Trigger Area */}
          <div
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-between min-h-[44px] px-2 rounded-xl hover:bg-secondary/40 cursor-pointer transition select-none"
          >
            {!isCollapsed ? (
              <motion.div
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-right"
              >
                <span className="text-[9px] uppercase tracking-wider text-muted-foreground block">
                  ROYAL
                </span>
                <h1 className="text-xs font-bold text-foreground">
                  پنل استودیو
                </h1>
              </motion.div>
            ) : (
              <div className="mx-auto text-xs font-black text-accent tracking-tighter">
                R
              </div>
            )}

            {/* Micro Toggle Arrow Icon */}
            {!isCollapsed && (
              <FiChevronRight className="w-4 h-4 text-muted-foreground/60" />
            )}
          </div>

          {/* Navigation Items Stack (Centered vertically when collapsed) */}
          <nav className="flex flex-col gap-2 text-xs font-medium">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  title={isCollapsed ? item.label : ""}
                  className={`group relative flex items-center h-10 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-primary bg-accent/10 border border-accent/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/30"
                  } ${isCollapsed ? "justify-center px-0" : "px-3 gap-3"}`}
                >
                  {/* Active Indicator Bar (RTL Right-Side Anchor) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeAdminStripe"
                      className="absolute right-0 top-2 bottom-2 w-0.5 bg-accent rounded-l-full"
                    />
                  )}

                  {/* Icon Frame */}
                  <span
                    className={`shrink-0 transition-transform group-hover:scale-105 ${isActive ? "text-accent" : "text-muted-foreground/70"}`}
                  >
                    {item.icon}
                  </span>

                  {/* Text Labels Hidden Completely in Closed Icon Mode */}
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: 4 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Manual Arrow Trigger at Bottom of the Rail */}
        <div className="flex flex-col gap-4 items-center">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center justify-center w-8 h-8 rounded-lg border border-border bg-background hover:bg-secondary/40 text-muted-foreground hover:text-foreground shadow-xs transition cursor-pointer"
            aria-label={isCollapsed ? "بزرگ کردن منو" : "کوچک کردن منو"}
          >
            {isCollapsed ? (
              <FiChevronLeft className="w-3.5 h-3.5" />
            ) : (
              <FiChevronRight className="w-3.5 h-3.5" />
            )}
          </button>

          <div className="w-full text-center text-[9px] text-muted-foreground/30 font-light truncate px-1">
            <span>{isCollapsed ? "•" : "Studio Royal"}</span>
          </div>
        </div>
      </motion.aside>

      {/* Invisible Layout Spacer to handle page shifting for content grids on Desktop layouts */}
      <div className="hidden md:block w-[64px] shrink-0 pointer-events-none" />
    </>
  );
}
