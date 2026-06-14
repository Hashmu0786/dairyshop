"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";

export default function InquiryModal({
  isOpen,
  onClose,
  supplierName,
  productName,
  supplierId,
  productId,
}) {
  const { user } = useAuth();
  const { addInquiry } = useData();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  useEffect(() => {
    if (isOpen && user) {
      setForm({
        name: user.name ?? "",
        company: user.company ?? "",
        email: user.email ?? "",
        phone: user.phone ?? "",
        quantity: "",
        message: "",
      });
    }
  }, [isOpen, user]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setSubmitted(false);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addInquiry({
      buyerId: user?.id ?? null,
      supplierId,
      productId: productId ?? null,
      subject: productName ? `Inquiry: ${productName}` : `Contact ${supplierName}`,
      ...form,
    });
    setSubmitted(true);
  }

  function handleClose() {
    setForm({ name: "", company: "", email: "", phone: "", quantity: "", message: "" });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-4">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Send Inquiry</h2>
            <p className="text-sm text-gray-500">
              {productName ? `Re: ${productName}` : `Contact ${supplierName}`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            aria-label="Close"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="px-6 py-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">
              ✓
            </div>
            <h3 className="mt-4 text-xl font-bold text-gray-900">Inquiry Sent!</h3>
            <p className="mt-2 text-gray-600">
              Your message has been sent to <strong>{supplierName}</strong>. Track it in your dashboard.
            </p>
            {user?.role === "buyer" && (
              <a href="/buyer/inquiries" className="mt-4 inline-block text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                View My Inquiries →
              </a>
            )}
            <button
              type="button"
              onClick={handleClose}
              className="mt-6 block w-full rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-700"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 px-6 py-5">
            {!user && (
              <div className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
                <a href="/login" className="font-semibold underline">Sign in</a> to auto-fill your details and track inquiries.
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Your Name *</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Rahul Mehta"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Company *</label>
                <input
                  required
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Fresh Foods Pvt Ltd"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Email *</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="rahul@company.com"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">Phone *</label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="+91 98765 43210"
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Estimated Quantity</label>
              <input
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="e.g. 100 kg/week"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Message *</label>
              <textarea
                required
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Tell the supplier about your requirements..."
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700"
            >
              Send Inquiry to {supplierName}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
