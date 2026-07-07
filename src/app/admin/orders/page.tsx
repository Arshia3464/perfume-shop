import React from "react";
import { getAdminOrdersWithItems } from "@/app/actions/order-admin";
import AdminOrdersClientManager from "./AdminOrdersClientManager";

export const revalidate = 0;

export default async function AdminOrdersPage() {
  const rawOrders = await getAdminOrdersWithItems();

  // Convert schema types cleanly to match the front-end layout expectations
  const serializedOrders = rawOrders.map((ord) => ({
    id: ord.id,
    total: ord.total,
    status: ord.status,
    customerName: ord.customerName,
    customerPhone: ord.customerPhone,
    city: ord.city,
    shippingAddress: ord.shippingAddress,
    createdAt: ord.createdAt,
    items: ord.items.map((item) => ({
      id: item.id,
      snapshotName: item.snapshotName,
      snapshotBrand: item.snapshotBrand,
      quantity: item.quantity,
      priceAtPurchase: item.priceAtPurchase,
    })),
  }));

  return (
    <div className="space-y-6 w-full">
      <div>
        <h1 className="text-xl font-black tracking-tight">
          نظارت بر سفارش‌های استودیو رویال
        </h1>
        <p className="text-xs text-muted-foreground mt-1">
          بررسی فاکتورها، فیلترینگ هوشمند و تغییر وضعیت لجیستیک توزیع کشور
        </p>
      </div>

      <AdminOrdersClientManager initialOrders={serializedOrders} />
    </div>
  );
}
