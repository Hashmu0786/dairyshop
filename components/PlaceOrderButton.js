"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { formatPrice } from "@/lib/utils";

export default function PlaceOrderButton({ product, supplier }) {
  const { user } = useAuth();
  const { addOrder } = useData();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  if (!product.inStock) return null;

  function handleOpen() {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    if (user.role !== "buyer") {
      alert("Only buyer accounts can place orders. Please sign in as a buyer.");
      return;
    }
    setAddress(`${user.company}, ${user.city}, ${user.state}`);
    setOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const qty = Number(quantity);
    if (!qty || qty <= 0) return;

    const unit = product.unit.includes("kg") ? "kg" : "litres";
    const subtotal = product.price * qty;
    const gst = Math.round(subtotal * 0.18);
    const total = subtotal + gst;

    const order = addOrder({
      buyerId: user.id,
      supplierId: product.supplierId,
      items: [{
        productId: product.id,
        name: product.name,
        quantity: qty,
        unit,
        price: product.price,
      }],
      subtotal,
      gst,
      total,
      paymentMethod: supplier?.business?.paymentTerms ?? "Net 15 days",
      deliveryAddress: address,
      notes,
    });

    setOrderNumber(order.orderNumber);
    setSubmitted(true);
  }

  function handleClose() {
    setOpen(false);
    setSubmitted(false);
    setQuantity("");
    setNotes("");
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="w-full rounded-xl border-2 border-emerald-600 py-3.5 font-semibold text-emerald-700 transition hover:bg-emerald-50 sm:w-auto sm:px-8"
      >
        Place Bulk Order
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={handleClose} />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            {submitted ? (
              <div className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-3xl">✓</div>
                <h3 className="mt-4 text-xl font-bold">Order Placed!</h3>
                <p className="mt-2 text-gray-600">Order <strong>{orderNumber}</strong> has been sent to {supplier?.name}.</p>
                <Link href="/buyer/orders" className="mt-4 inline-block text-sm font-semibold text-emerald-600">Track Order →</Link>
                <button type="button" onClick={handleClose} className="mt-6 w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white">Done</button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold">Place Order — {product.name}</h3>
                <p className="text-sm text-gray-500">{formatPrice(product.price)} {product.unit} · Min: {product.minOrder}</p>
                <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Quantity ({product.unit.includes("kg") ? "kg" : "litres"})</label>
                    <input
                      required
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
                      placeholder="e.g. 100"
                    />
                    {quantity && (
                      <p className="mt-1 text-sm text-emerald-700">
                        Est. total: {formatPrice(product.price * Number(quantity) * 1.18)} (incl. GST)
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Delivery Address</label>
                    <textarea
                      required
                      rows={2}
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-sm font-medium">Notes (optional)</label>
                    <input
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm"
                      placeholder="Delivery slot, special instructions..."
                    />
                  </div>
                  <button type="submit" className="w-full rounded-xl bg-emerald-600 py-3 font-semibold text-white hover:bg-emerald-700">
                    Confirm Order
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
