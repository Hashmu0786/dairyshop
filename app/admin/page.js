"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatCard from "@/components/dashboard/StatCard";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useData } from "@/context/DataContext";
import { useAuth } from "@/context/AuthContext";
import { suppliers } from "@/data/suppliers";
import { formatPrice } from "@/lib/utils";
import { formatDateTime } from "@/lib/store";

export default function AdminDashboard() {
  const { stats, orders, inquiries, enrichOrder, enrichInquiry, resetData } = useData();
  const { getAllUsers } = useAuth();
  const users = getAllUsers();
  const recentOrders = orders.slice(0, 5).map(enrichOrder);
  const recentInquiries = inquiries.slice(0, 5).map(enrichInquiry);

  return (
    <>
      <PageHeader
        title="Platform Overview"
        description="Monitor marketplace activity across buyers, sellers, and orders"
        action={
          <button
            type="button"
            onClick={resetData}
            className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Reset Demo Data
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Revenue" value={formatPrice(stats.totalRevenue)} icon="💰" sub="Excluding cancelled" />
        <StatCard label="Total Orders" value={stats.totalOrders} icon="📦" sub={`${stats.pendingOrders} pending`} />
        <StatCard label="Active Users" value={users.filter((u) => u.status === "active").length} icon="👥" sub={`${users.length} total accounts`} />
        <StatCard label="New Inquiries" value={stats.newInquiries} icon="💬" sub={`${stats.totalInquiries} total`} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-semibold text-gray-900">Recent Orders</h3>
            <Link href="/admin/orders" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between px-5 py-3.5">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{order.orderNumber}</p>
                  <p className="text-xs text-gray-500">{order.buyer?.company} → {order.supplier?.name}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={order.status} />
                  <p className="mt-1 text-sm font-medium text-gray-900">{formatPrice(order.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
            <h3 className="font-semibold text-gray-900">Recent Inquiries</h3>
            <Link href="/admin/inquiries" className="text-sm font-medium text-emerald-600 hover:text-emerald-700">View all</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {recentInquiries.map((inq) => (
              <div key={inq.id} className="px-5 py-3.5">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{inq.subject}</p>
                    <p className="text-xs text-gray-500">{inq.company} → {inq.supplier?.name}</p>
                  </div>
                  <StatusBadge status={inq.status} />
                </div>
                <p className="mt-1 text-xs text-gray-400">{formatDateTime(inq.createdAt)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
        <h3 className="font-semibold text-gray-900">Marketplace Snapshot</h3>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl bg-emerald-50 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-800">{stats.totalProducts}</p>
            <p className="text-sm text-emerald-700">Products Listed</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-800">{suppliers.length}</p>
            <p className="text-sm text-emerald-700">Verified Suppliers</p>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-800">{stats.inStockProducts}</p>
            <p className="text-sm text-emerald-700">In Stock</p>
          </div>
        </div>
      </div>
    </>
  );
}
