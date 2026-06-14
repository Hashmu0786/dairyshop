"use client";

import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { formatDateTime } from "@/lib/store";

export default function BuyerInquiriesPage() {
  const { user } = useAuth();
  const { inquiries, enrichInquiry } = useData();
  const myInquiries = inquiries.filter((i) => i.buyerId === user?.id).map(enrichInquiry);

  return (
    <>
      <PageHeader title="My Inquiries" description="Track messages sent to suppliers" />

      <div className="space-y-4">
        {myInquiries.length === 0 ? (
          <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
            <p className="text-4xl">💬</p>
            <p className="mt-4 font-semibold text-gray-900">No inquiries yet</p>
            <p className="mt-2 text-sm text-gray-500">Contact a supplier from any product page to start.</p>
          </div>
        ) : (
          myInquiries.map((inq) => (
            <div key={inq.id} className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-gray-900">{inq.subject}</p>
                  <p className="text-sm text-gray-500">To: {inq.supplier?.name}</p>
                  {inq.product && <p className="text-xs text-emerald-600">Re: {inq.product.name}</p>}
                </div>
                <StatusBadge status={inq.status} />
              </div>
              <p className="mt-3 text-sm text-gray-600">{inq.message}</p>
              {inq.quantity && <p className="mt-2 text-xs text-gray-500">Quantity: {inq.quantity}</p>}
              {inq.response && (
                <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50 p-4">
                  <p className="text-xs font-semibold uppercase text-blue-700">Supplier Response</p>
                  <p className="mt-1 text-sm text-blue-900">{inq.response}</p>
                </div>
              )}
              <p className="mt-3 text-xs text-gray-400">Sent {formatDateTime(inq.createdAt)}</p>
            </div>
          ))
        )}
      </div>
    </>
  );
}
