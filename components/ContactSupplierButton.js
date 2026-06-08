"use client";

import { useState } from "react";
import InquiryModal from "./InquiryModal";

export default function ContactSupplierButton({ supplierName, productName, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={className || "rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"}
      >
        Contact Supplier
      </button>
      <InquiryModal
        isOpen={open}
        onClose={() => setOpen(false)}
        supplierName={supplierName}
        productName={productName}
      />
    </>
  );
}
