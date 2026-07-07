"use client";

import { useState, useMemo } from "react";
import AdminOrderRow from "./AdminOrderRow";
import { FiSearch, FiFilter } from "react-icons/fi";

type OrderItemSnapshot = {
  id: string;
  snapshotName: string | null;
  snapshotBrand: string | null;
  quantity: number;
  priceAtPurchase: number;
};

type OrderData = {
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

type Props = {
  initialOrders: OrderData[];
};

export default function AdminOrdersClientManager({ initialOrders }: Props) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  // Priority Weights Definition Matrix (Pending always rises to top)
  const STATUS_WEIGHTS: Record<string, number> = {
    pending: 1,
    processing: 2,
    shipped: 3,
    delivered: 4,
  };

  const processedOrders = useMemo(() => {
    // 1. Local Search & Tab Filtering Block
    let filtered = initialOrders.filter((ord) => {
      const matchesStatus =
        statusFilter === "all" || ord.status === statusFilter;
      const matchesText =
        ord.id.toLowerCase().includes(search.toLowerCase()) ||
        (ord.customerName ?? "").toLowerCase().includes(search.toLowerCase()) ||
        (ord.customerPhone ?? "").includes(search);

      return matchesStatus && matchesText;
    });

    // 2. Strict Priority Ordering Engine
    return filtered.sort((a, b) => {
      const weightA = STATUS_WEIGHTS[a.status] || 99;
      const weightB = STATUS_WEIGHTS[b.status] || 99;

      if (weightA !== weightB) {
        return weightA - weightB; // Lower weight number comes first
      }

      // If weight matches, fallback to newest timestamp date first
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return dateB - dateA;
    });
  }, [initialOrders, search, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Search and Filters Layout Panel Chassis */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-secondary/10 p-4 rounded-2xl border border-border/60">
        {/* Instant Search input box */}
        <div className="relative flex-1 max-w-md">
          <FiSearch className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <input
            type="text"
            placeholder="جستجو با کد رهگیری، نام گیرنده یا شماره تلفن..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pr-10 pl-4 py-2 bg-background border border-border text-xs rounded-xl focus:outline-none focus:border-accent/50 text-primary"
          />
        </div>

        {/* Status Pills Scrolling Header Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: "all", label: "همه" },
            { id: "pending", label: "بررسی نشده" },
            { id: "processing", label: "آماده‌سازی" },
            { id: "shipped", label: "ارسال شده" },
            { id: "delivered", label: "تحویل شده" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition cursor-pointer select-none ${
                statusFilter === tab.id
                  ? "bg-foreground text-background border-foreground"
                  : "bg-background border-border text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Rendered output blocks layout */}
      {processedOrders.length === 0 ? (
        <div className="p-16 text-center border border-dashed border-border rounded-3xl bg-secondary/5">
          <p className="text-xs font-medium text-muted-foreground">
            هیچ سفارشی مطابق فیلتر فعلی یافت نشد.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {processedOrders.map((ord) => (
            <AdminOrderRow key={ord.id} initialOrder={ord} />
          ))}
        </div>
      )}
    </div>
  );
}
