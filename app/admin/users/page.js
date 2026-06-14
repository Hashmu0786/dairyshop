"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { getSupplierById } from "@/data/suppliers";
import { formatDate } from "@/lib/store";

export default function AdminUsersPage() {
  const { getAllUsers, updateUserStatus } = useAuth();
  const users = getAllUsers();

  return (
    <>
      <PageHeader title="Users" description="Manage buyer, seller, and admin accounts" />

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">User</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Company</th>
                <th className="px-5 py-3 font-semibold">Location</th>
                <th className="px-5 py-3 font-semibold">Linked Supplier</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
                <th className="px-5 py-3 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {users.map((u) => {
                const supplier = u.supplierId ? getSupplierById(u.supplierId) : null;
                return (
                  <tr key={u.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold capitalize text-emerald-800">{u.role}</span>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{u.company}</td>
                    <td className="px-5 py-4 text-gray-600">{u.city}, {u.state}</td>
                    <td className="px-5 py-4 text-gray-600">{supplier?.name ?? "—"}</td>
                    <td className="px-5 py-4"><StatusBadge status={u.status} /></td>
                    <td className="px-5 py-4 text-xs text-gray-500">{formatDate(u.createdAt)}</td>
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => updateUserStatus(u.id, u.status === "active" ? "inactive" : "active")}
                        className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50"
                      >
                        {u.status === "active" ? "Deactivate" : "Activate"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
