"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { getSupplierById } from "@/data/suppliers";
import { formatPrice } from "@/lib/utils";
import { formatDateTime } from "@/lib/store";

export default function SellerDashboard() {
  const { user } = useAuth();
  const { orders, inquiries, products, enrichOrder, enrichInquiry } = useData();
  const supplier = getSupplierById(user?.supplierId);

  const myProducts = products.filter((p) => p.supplierId === user?.supplierId);
  const myOrders = orders.filter((o) => o.supplierId === user?.supplierId).map(enrichOrder);
  const myInquiries = inquiries.filter((i) => i.supplierId === user?.supplierId).map(enrichInquiry);
  const revenue = myOrders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + o.total, 0);
  const newInquiries = myInquiries.filter((i) => i.status === "new");

  return (
    <>
      <PageHeader
        title={supplier?.name ?? "Seller Dashboard"}
        description={supplier?.tagline ?? "Manage your dairy business"}
        action={
          <Link href={`/suppliers/${user?.supplierId}`} className="rounded-xl border border-emerald-200 px-4 py-2 text-sm font-semibold text-emerald-700 hover:bg-emerald-50">
            View Public Profile
          </Link>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Revenue" value={formatPrice(revenue)} icon="💰" />
        <StatCard label="Orders" value={myOrders.length} icon="📦" sub={`${myOrders.filter((o) => o.status === "pending").length} pending`} />
        <StatCard label="Products Listed" value={myProducts.length} icon="🥛" sub={`${myProducts.filter((p) => p.inStock).length} in stock`} />
        <StatCard label="New Inquiries" value={newInquiries.length} icon="💬" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/seller/orders" className="text-sm font-medium text-emerald-600">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {myOrders.slice(0, 5).map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-semibold">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">{order.buyer?.company}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={order.status} />
                  <p className="mt-1 text-sm font-medium">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
            {myOrders.length === 0 && <p className="px-5 py-8 text-center text-sm text-gray-500">No orders yet</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-semibold text-gray-900">New Inquiries</h3>
            <Link href="/seller/inquiries" className="text-sm font-medium text-emerald-600">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {newInquiries.slice(0, 5).map((inq) => (
              <div key={inq.id} className="px-5 py-3.5">
                <div className="flex items-start justify-between">
                  <p className="text-sm font-semibold">{inq.subject}</p>
                  <StatusBadge status={inq.status} />
                </div>
                <p className="mt-1 text-xs text-gray-500">{inq.company}</p>
                <p className="mt-1 text-xs text-gray-400">{formatDateTime(inq.createdAt)}</p>
              </div>
            ))}
            {newInquiries.length === 0 && <p className="px-5 py-8 text-center text-sm text-gray-500">No new inquiries</p>}
          </div>
        </div>
      </div>
    </>
  );
}
