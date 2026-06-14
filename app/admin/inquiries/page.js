"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useData } from "@/context/DataContext";
import { INQUIRY_STATUSES } from "@/data/inquiries";
import { formatDateTime } from "@/lib/store";

export default function AdminInquiriesPage() {
  const { inquiries, enrichInquiry, updateInquiry } = useData();
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState("");
  const enriched = inquiries.map(enrichInquiry);
  const active = selected ? enriched.find((i) => i.id === selected) : null;

  function handleRespond() {
    if (!active || !response.trim()) return;
    updateInquiry(active.id, { status: "responded", response: response.trim() });
    setResponse("");
    setSelected(null);
  }

  return (
    <>
      <PageHeader title="Inquiries" description="View and manage buyer-supplier inquiries" />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-3">
          {enriched.map((inq) => (
            <button
              key={inq.id}
              type="button"
              onClick={() => { setSelected(inq.id); setResponse(inq.response ?? ""); }}
              className={`w-full rounded-2xl border p-5 text-left transition ${
                selected === inq.id ? "border-emerald-300 bg-emerald-50/50 shadow-sm" : "border-gray-100 bg-white hover:border-emerald-200"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{inq.subject}</p>
                  <p className="mt-1 text-sm text-gray-500">{inq.company} → {inq.supplier?.name}</p>
                  {inq.product && <p className="mt-1 text-xs text-emerald-600">Re: {inq.product.name}</p>}
                </div>
                <StatusBadge status={inq.status} />
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-gray-600">{inq.message}</p>
              <p className="mt-2 text-xs text-gray-400">{formatDateTime(inq.createdAt)}</p>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm lg:sticky lg:top-24 lg:self-start">
          {active ? (
            <>
              <h3 className="font-semibold text-gray-900">{active.subject}</h3>
              <div className="mt-4 space-y-3 text-sm">
                <div><span className="text-gray-500">From:</span> <span className="font-medium">{active.name} ({active.company})</span></div>
                <div><span className="text-gray-500">Email:</span> {active.email}</div>
                <div><span className="text-gray-500">Phone:</span> {active.phone}</div>
                <div><span className="text-gray-500">Quantity:</span> {active.quantity || "—"}</div>
                <div className="rounded-xl bg-gray-50 p-3 text-gray-700">{active.message}</div>
              </div>

              {active.response && (
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-3 text-sm text-blue-900">
                  <p className="font-semibold">Previous response:</p>
                  <p className="mt-1">{active.response}</p>
                </div>
              )}

              <div className="mt-4">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Response</label>
                <textarea
                  rows={4}
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none"
                  placeholder="Type your response..."
                />
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  onClick={handleRespond}
                  className="flex-1 rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700"
                >
                  Send Response
                </button>
                <select
                  value={active.status}
                  onChange={(e) => updateInquiry(active.id, { status: e.target.value })}
                  className="rounded-xl border border-gray-200 px-3 py-2 text-sm"
                >
                  {INQUIRY_STATUSES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            </>
          ) : (
            <p className="text-center text-sm text-gray-500 py-8">Select an inquiry to view details</p>
          )}
        </div>
      </div>
    </>
  );
}
