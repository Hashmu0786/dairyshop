"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { formatPrice } from "@/lib/utils";
import { formatDateTime } from "@/lib/store";

export default function BuyerDashboard() {
  const { user } = useAuth();
  const { orders, inquiries, enrichOrder, enrichInquiry } = useData();

  const myOrders = orders.filter((o) => o.buyerId === user?.id).map(enrichOrder);
  const myInquiries = inquiries.filter((i) => i.buyerId === user?.id).map(enrichInquiry);
  const totalSpent = myOrders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const pendingOrders = myOrders.filter((o) => ["pending", "confirmed", "processing", "shipped"].includes(o.status));

  return (
    <>
      <PageHeader
        title={`Welcome, ${user?.name?.split(" ")[0]}`}
        description={`${user?.company} · Procurement Dashboard`}
        action={
          <Link href="/products" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            Browse Products
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Orders" value={myOrders.length} icon="📦" />
        <StatCard label="Total Spent" value={formatPrice(totalSpent)} icon="💰" />
        <StatCard label="Active Orders" value={pendingOrders.length} icon="🚚" />
        <StatCard label="Inquiries Sent" value={myInquiries.length} icon="💬" sub={`${myInquiries.filter((i) => i.status === "new").length} awaiting response`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/buyer/orders" className="text-sm font-medium text-emerald-600">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {myOrders.length === 0 ? (
              <p className="px-5 py-8 text-center text-sm text-gray-500">No orders yet. Browse products to place your first order.</p>
            ) : (
              myOrders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                  <div>
                    <p className="text-sm font-semibold">{order.orderNumber}</p>
                    <p className="text-xs text-gray-500">{order.supplier?.name}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={order.status} />
                    <p className="mt-1 text-sm font-medium">{formatPrice(order.total)}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-semibold text-gray-900">Recent Inquiries</h3>
            <Link href="/buyer/inquiries" className="text-sm font-medium text-emerald-600">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {myInquiries.slice(0, 5).map((inq) => (
              <div key={inq.id} className="px-5 py-3.5">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold">{inq.subject}</p>
                  <StatusBadge status={inq.status} />
                </div>
                <p className="mt-1 text-xs text-gray-500">{inq.supplier?.name}</p>
                <p className="mt-1 text-xs text-gray-400">{formatDateTime(inq.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
