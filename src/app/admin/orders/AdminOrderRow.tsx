"use client";

import { useState, useTransition } from "react";
import { updateOrderStatus } from "@/app/actions/order-admin";

type OrderItemSnapshot = {
  id: string;
  snapshotName: string | null;
  snapshotBrand: string | null;
  quantity: number;
  priceAtPurchase: number;
};

type Props = {
  initialOrder: {
    id: string;
    total: number;
    status: string;
    customerName: string | null;
    customerPhone: string | null;
    city: string | null;
    shippingAddress: string | null;
    createdAt: Date | null;
    items: OrderItemSnapshot[];
  };
};

export default function AdminOrderRow({ initialOrder }: Props) {
  const [status, setStatus] = useState(initialOrder.status);
  const [isPending, startTransition] = useTransition();

  const handleStatusUpdate = (newStatus: string) => {
    setStatus(newStatus);
    startTransition(async () => {
      await updateOrderStatus(initialOrder.id, newStatus);
    });
  };

  // High-visibility accent map configurations
  const statusConfigMap: Record<
    string,
    {
      label: string;
      colorClass: string;
      cardBorderClass: string;
      cardBgClass: string;
    }
  > = {
    pending: {
      label: "در انتظار بررسی",
      colorClass: "bg-amber-500 text-white border-transparent",
      cardBorderClass: "border-amber-500/50 shadow-md shadow-amber-500/5",
      cardBgClass: "bg-amber-500/[0.02]",
    },
    processing: {
      label: "در حال آماده‌سازی",
      colorClass: "bg-blue-500 text-white border-transparent",
      cardBorderClass: "border-blue-500/50 shadow-md shadow-blue-500/5",
      cardBgClass: "bg-blue-500/[0.02]",
    },
    shipped: {
      label: "ارسال شده",
      colorClass: "bg-purple-500 text-white border-transparent",
      cardBorderClass: "border-purple-300/40",
      cardBgClass: "bg-purple-500/[0.01]",
    },
    delivered: {
      label: "تحویل نهایی شده",
      colorClass: "bg-neutral-200 text-neutral-600 border-neutral-300/60",
      cardBorderClass: "border-border/60 opacity-75",
      cardBgClass: "bg-secondary/[0.05]",
    },
  };

  const currentStyle = statusConfigMap[status] || statusConfigMap.pending;

  return (
    <div
      className={`p-5 border rounded-2xl space-y-4 transition-all duration-300 ${currentStyle.cardBorderClass} ${currentStyle.cardBgClass}`}
    >
      {/* Invoice Meta Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-black tracking-wider text-accent font-mono select-all">
              {initialOrder.id}
            </span>
            <span
              className={`text-[9px] border px-2 py-0.5 rounded-md font-bold tracking-wide ${currentStyle.colorClass}`}
            >
              {currentStyle.label}
            </span>
          </div>
          <p className="text-[10px] text-muted-foreground font-medium">
            تاریخ ثبت:{" "}
            {initialOrder.createdAt
              ? new Date(initialOrder.createdAt).toLocaleDateString("fa-IR")
              : "نامشخص"}
          </p>
        </div>

        {/* Change Status Dropdown Selector Matrix */}
        <div className="flex items-center gap-2">
          <label className="text-[10px] font-bold text-muted-foreground/80">
            تغییر وضعیت سفارش:
          </label>
          <select
            disabled={isPending}
            value={status}
            onChange={(e) => handleStatusUpdate(e.target.value)}
            className="p-1.5 bg-background border border-border rounded-xl text-xs font-medium cursor-pointer focus:outline-none disabled:opacity-50"
          >
            <option value="pending">در انتظار بررسی</option>
            <option value="processing">در حال آماده‌سازی</option>
            <option value="shipped">ارسال شده</option>
            <option value="delivered">تحویل نهایی شده</option>
          </select>
        </div>
      </div>

      {/* Customer Delivery Sub-Card Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs bg-background border border-border/40 p-3 rounded-xl text-muted-foreground">
        <div>
          <strong className="text-foreground font-semibold">گیرنده:</strong>{" "}
          {initialOrder.customerName || "ثبت نشده"}
        </div>
        <div>
          <strong className="text-foreground font-semibold">
            تلفن هماهنگی:
          </strong>{" "}
          {initialOrder.customerPhone || "ثبت نشده"}
        </div>
        <div>
          <strong className="text-foreground font-semibold">شهر مقصد:</strong>{" "}
          {initialOrder.city || "ثبت نشده"}
        </div>
        <div className="md:col-span-3">
          <strong className="text-foreground font-semibold">
            نشانی تحویل محموله:
          </strong>{" "}
          {initialOrder.shippingAddress || "ثبت نشده"}
        </div>
      </div>

      {/* Embedded Historic Purchase Snippets List Layout */}
      <div className="space-y-2">
        <h3 className="text-[10px] font-bold tracking-wider text-muted-foreground uppercase">
          اقلام فاکتور شده:
        </h3>
        <div className="divide-y divide-border/20 border border-border/30 rounded-xl bg-background/50 px-3 overflow-hidden">
          {initialOrder.items.map((item) => (
            <div
              key={item.id}
              className="py-2.5 flex justify-between text-xs items-center gap-4"
            >
              <div className="truncate">
                <span className="font-semibold text-foreground block md:inline truncate">
                  {item.snapshotName || "محصول پاک شده"}
                </span>
                <span className="text-[10px] text-muted-foreground md:mx-2 block md:inline mt-0.5 md:mt-0">
                  برند: {item.snapshotBrand || "رویال"}
                </span>
              </div>
              <div className="text-muted-foreground shrink-0 text-left font-medium">
                <span>{item.quantity.toLocaleString("fa-IR")} عدد</span>
                <span className="mx-1.5">×</span>
                <span className="text-foreground font-semibold">
                  {item.priceAtPurchase.toLocaleString("fa-IR")} تومان
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Total Aggregation Invoice Row */}
      <div className="pt-2 border-t border-border/40 flex justify-between items-baseline px-1">
        <span className="text-xs font-semibold text-muted-foreground">
          جمع کل فاکتور تسویه در محل:
        </span>
        <span className="text-base font-black text-primary">
          {initialOrder.total.toLocaleString("fa-IR")} تومان
        </span>
      </div>
    </div>
  );
}
