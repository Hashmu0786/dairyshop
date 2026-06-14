"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { suppliers } from "@/data/suppliers";
import { useData } from "@/context/DataContext";

export default function AdminSuppliersPage() {
  const { products } = useData();

  return (
    <>
      <PageHeader title="Suppliers" description="Verified dairy suppliers on the platform" />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {suppliers.map((supplier) => {
          const productCount = products.filter((p) => p.supplierId === supplier.id).length;
          return (
            <div key={supplier.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="relative h-32">
                <Image src={supplier.image} alt="" fill className="object-cover" sizes="400px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <div className="relative h-10 w-10 overflow-hidden rounded-lg border-2 border-white">
                    <Image src={supplier.logo} alt="" fill className="object-cover" sizes="40px" />
                  </div>
                  <div>
                    <p className="font-semibold text-white text-sm">{supplier.name}</p>
                    <p className="text-xs text-white/80">{supplier.location}</p>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <p className="text-sm text-gray-600 line-clamp-2">{supplier.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {supplier.verified && <StatusBadge status="active" />}
                  <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">★ {supplier.rating}</span>
                  <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700">{productCount} products</span>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-2 text-xs">
                  <div><dt className="text-gray-500">FSSAI</dt><dd className="font-medium">{supplier.fssai}</dd></div>
                  <div><dt className="text-gray-500">GSTIN</dt><dd className="font-medium">{supplier.gstin}</dd></div>
                  <div><dt className="text-gray-500">Capacity</dt><dd className="font-medium">{supplier.business.capacity}</dd></div>
                  <div><dt className="text-gray-500">Delivery</dt><dd className="font-medium line-clamp-1">{supplier.business.delivery}</dd></div>
                </dl>
                <Link
                  href={`/suppliers/${supplier.id}`}
                  className="mt-4 block rounded-xl border border-emerald-200 py-2 text-center text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
                >
                  View Public Profile
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
