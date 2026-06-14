"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { ORDER_STATUSES, PAYMENT_STATUSES } from "@/data/orders";
import { formatPrice } from "@/lib/utils";
import { formatDateTime } from "@/lib/store";

export default function SellerOrdersPage() {
  const { user } = useAuth();
  const { orders, enrichOrder, updateOrder } = useData();
  const [filter, setFilter] = useState("all");
  const myOrders = orders.filter((o) => o.supplierId === user?.supplierId).map(enrichOrder);
  const filtered = filter === "all" ? myOrders : myOrders.filter((o) => o.status === filter);

  return (
    <>
      <PageHeader title="Orders" description="Manage incoming orders from buyers" />

      <div className="mb-6 flex flex-wrap gap-2">
        <button type="button" onClick={() => setFilter("all")} className={`rounded-full px-4 py-1.5 text-sm font-medium ${filter === "all" ? "bg-emerald-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
          All ({myOrders.length})
        </button>
        {ORDER_STATUSES.map((s) => (
          <button key={s} type="button" onClick={() => setFilter(s)} className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${filter === s ? "bg-emerald-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Buyer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Total</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Payment</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 font-semibold">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50">
                  <td className="px-5 py-4 font-semibold">{order.orderNumber}</td>
                  <td className="px-5 py-4">
                    <p className="font-medium">{order.buyer?.name}</p>
                    <p className="text-xs text-gray-500">{order.buyer?.company}</p>
                  </td>
                  <td className="px-5 py-4 text-gray-600">{order.items.map((i) => i.name).join(", ")}</td>
                  <td className="px-5 py-4 font-semibold">{formatPrice(order.total)}</td>
                  <td className="px-5 py-4"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-4"><StatusBadge status={order.paymentStatus} /></td>
                  <td className="px-5 py-4 text-xs text-gray-500">{formatDateTime(order.createdAt)}</td>
                  <td className="px-5 py-4">
                    <div className="flex flex-col gap-1">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrder(order.id, { status: e.target.value })}
                        className="rounded-lg border border-gray-200 px-2 py-1 text-xs"
                      >
                        {ORDER_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <select
                        value={order.paymentStatus}
                        onChange={(e) => updateOrder(order.id, { paymentStatus: e.target.value })}
                        className="rounded-lg border border-gray-200 px-2 py-1 text-xs"
                      >
                        {PAYMENT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && <p className="py-12 text-center text-sm text-gray-500">No orders in this category</p>}
      </div>
    </>
  );
}
