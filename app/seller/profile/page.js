"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { getSupplierById } from "@/data/suppliers";

export default function SellerProfilePage() {
  const { user, updateProfile } = useAuth();
  const supplier = getSupplierById(user?.supplierId);
  const [form, setForm] = useState({
    name: user?.name ?? "",
    phone: user?.phone ?? "",
    designation: user?.designation ?? "",
  });
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
  }

  return (
    <>
      <PageHeader title="Profile" description="Your seller account and business details" />

      <div className="grid gap-6 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h3 className="font-semibold text-gray-900">Account Details</h3>
          {saved && <div className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Profile saved.</div>}
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Name</label>
              <input value={form.name} onChange={(e) => { setForm({ ...form, name: e.target.value }); setSaved(false); }} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email</label>
              <input value={user?.email ?? ""} disabled className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone</label>
              <input value={form.phone} onChange={(e) => { setForm({ ...form, phone: e.target.value }); setSaved(false); }} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Designation</label>
              <input value={form.designation} onChange={(e) => { setForm({ ...form, designation: e.target.value }); setSaved(false); }} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm" />
            </div>
          </div>
          <button type="submit" className="mt-6 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700">Save</button>
        </form>

        {supplier && (
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-gray-900">Business Profile</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-gray-500">Company</dt><dd className="font-medium">{supplier.name}</dd></div>
              <div><dt className="text-gray-500">Location</dt><dd className="font-medium">{supplier.location}</dd></div>
              <div><dt className="text-gray-500">FSSAI</dt><dd className="font-medium">{supplier.fssai}</dd></div>
              <div><dt className="text-gray-500">GSTIN</dt><dd className="font-medium">{supplier.gstin}</dd></div>
              <div><dt className="text-gray-500">Capacity</dt><dd className="font-medium">{supplier.business.capacity}</dd></div>
              <div><dt className="text-gray-500">Delivery Areas</dt><dd className="font-medium">{supplier.business.delivery}</dd></div>
              <div><dt className="text-gray-500">Payment Terms</dt><dd className="font-medium">{supplier.business.paymentTerms}</dd></div>
              <div><dt className="text-gray-500">Rating</dt><dd className="font-medium">★ {supplier.rating} ({supplier.reviewCount} reviews)</dd></div>
            </dl>
          </div>
        )}
      </div>
    </>
  );
}
