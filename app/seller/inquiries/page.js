"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { INQUIRY_STATUSES } from "@/data/inquiries";
import { formatDateTime } from "@/lib/store";

export default function SellerInquiriesPage() {
  const { user } = useAuth();
  const { inquiries, enrichInquiry, updateInquiry } = useData();
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState("");
  const myInquiries = inquiries.filter((i) => i.supplierId === user?.supplierId).map(enrichInquiry);
  const active = selected ? myInquiries.find((i) => i.id === selected) : null;

  function handleRespond() {
    if (!active || !response.trim()) return;
    updateInquiry(active.id, { status: "responded", response: response.trim() });
    setResponse("");
    setSelected(null);
  }

  return (
    <>
      <PageHeader title="Inquiries" description="Respond to buyer inquiries" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {myInquiries.map((inq) => (
            <button
              key={inq.id}
              type="button"
              onClick={() => { setSelected(inq.id); setResponse(inq.response ?? ""); }}
              className={`w-full rounded-2xl border p-5 text-left transition ${
                selected === inq.id ? "border-emerald-300 bg-emerald-50/50" : "border-gray-100 bg-white hover:border-emerald-200"
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{inq.subject}</p>
                  <p className="text-sm text-gray-500">{inq.company} · {inq.name}</p>
                </div>
                <StatusBadge status={inq.status} />
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-gray-600">{inq.message}</p>
              <p className="mt-2 text-xs text-gray-400">{formatDateTime(inq.createdAt)}</p>
            </button>
          ))}
          {myInquiries.length === 0 && (
            <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center">
              <p className="text-sm text-gray-500">No inquiries yet</p>
            </div>
          )}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24">
          {active ? (
            <>
              <h3 className="font-semibold">{active.subject}</h3>
              <div className="mt-4 space-y-2 text-sm">
                <p><span className="text-gray-500">From:</span> {active.name} ({active.company})</p>
                <p><span className="text-gray-500">Email:</span> {active.email}</p>
                <p><span className="text-gray-500">Phone:</span> {active.phone}</p>
                <p><span className="text-gray-500">Quantity:</span> {active.quantity || "—"}</p>
                <div className="rounded-xl bg-gray-50 p-3">{active.message}</div>
              </div>
              <textarea
                rows={4}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                className="mt-4 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm"
                placeholder="Write your response..."
              />
              <div className="mt-4 flex gap-2">
                <button type="button" onClick={handleRespond} className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
                  Send Response
                </button>
                <select
                  value={active.status}
                  onChange={(e) => updateInquiry(active.id, { status: e.target.value })}
                  className="rounded-xl border border-gray-200 px-2 text-sm"
                >
                  {INQUIRY_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
            </>
          ) : (
            <p className="py-8 text-center text-sm text-gray-500">Select an inquiry to respond</p>
          )}
        </div>
      </div>
    </>
  );
}
