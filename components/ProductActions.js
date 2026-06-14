"use client";

import ContactSupplierButton from "@/components/ContactSupplierButton";
import PlaceOrderButton from "@/components/PlaceOrderButton";

export default function ProductActions({ product, supplier }) {
  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row">
      <PlaceOrderButton product={product} supplier={supplier} />
      <ContactSupplierButton
        supplierName={supplier.name}
        productName={product.name}
        supplierId={supplier.id}
        productId={product.id}
        className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700 sm:w-auto sm:px-8"
      />
    </div>
  );
}
