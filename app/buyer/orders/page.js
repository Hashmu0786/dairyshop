"use client";

import { useState } from "react";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { ORDER_STATUSES } from "@/data/orders";
import { formatPrice } from "@/lib/utils";
import { formatDateTime } from "@/lib/store";

export default function BuyerOrdersPage() {
  const { user } = useAuth();
  const { orders, enrichOrder } = useData();
  const [expanded, setExpanded] = useState(null);
  const myOrders = orders.filter((o) => o.buyerId === user?.id).map(enrichOrder);

  return (
    <>
      <PageHeader title="My Orders" description="Track and manage your procurement orders" />

      {myOrders.length === 0 ? (
        <div className="rounded-2xl border border-gray-100 bg-white p-12 text-center shadow-sm">
          <p className="text-4xl">📦</p>
          <p className="mt-4 font-semibold text-gray-900">No orders yet</p>
          <p className="mt-2 text-sm text-gray-500">Browse products and place your first bulk order.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {myOrders.map((order) => (
            <div key={order.id} className="rounded-2xl border border-gray-100 bg-white shadow-sm">
              <button
                type="button"
                onClick={() => setExpanded(expanded === order.id ? null : order.id)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <div>
                  <p className="font-semibold text-gray-900">{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">{order.supplier?.name} · {formatDateTime(order.createdAt)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <StatusBadge status={order.status} />
                  <span className="font-bold text-gray-900">{formatPrice(order.total)}</span>
                  <span className="text-gray-400">{expanded === order.id ? "▲" : "▼"}</span>
                </div>
              </button>

              {expanded === order.id && (
                <div className="border-t border-gray-100 px-5 py-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900">Order Items</h4>
                      <ul className="mt-2 space-y-2">
                        {order.items.map((item, idx) => (
                          <li key={idx} className="flex justify-between text-sm">
                            <span>{item.name} × {item.quantity} {item.unit}</span>
                            <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-3 border-t border-gray-100 pt-3 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">GST (18%)</span><span>{formatPrice(order.gst)}</span></div>
                        <div className="flex justify-between font-bold"><span>Total</span><span>{formatPrice(order.total)}</span></div>
                      </div>
                    </div>
                    <div className="space-y-3 text-sm">
                      <div><span className="text-gray-500">Payment:</span> <StatusBadge status={order.paymentStatus} /> · {order.paymentMethod}</div>
                      <div><span className="text-gray-500">Delivery:</span> {order.deliveryAddress}</div>
                      {order.notes && <div><span className="text-gray-500">Notes:</span> {order.notes}</div>}
                      {order.deliveredAt && <div><span className="text-gray-500">Delivered:</span> {formatDateTime(order.deliveredAt)}</div>}
                      <div className="flex gap-1 pt-2">
                        {ORDER_STATUSES.map((s) => (
                          <span
                            key={s}
                            className={`h-2 flex-1 rounded-full ${ORDER_STATUSES.indexOf(s) <= ORDER_STATUSES.indexOf(order.status === "cancelled" ? "pending" : order.status) ? "bg-emerald-500" : "bg-gray-200"}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
