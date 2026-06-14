"use client";

import Image from "next/image";
import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import StatusBadge from "@/components/dashboard/StatusBadge";
import { useData } from "@/context/DataContext";
import { categories } from "@/data/categories";
import { getSupplierById } from "@/data/suppliers";
import { formatPrice } from "@/lib/utils";

export default function AdminProductsPage() {
  const { products, updateProduct, deleteProduct } = useData();

  return (
    <>
      <PageHeader
        title="Products"
        description="Manage all marketplace product listings"
        action={
          <Link href="/products" className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700">
            View on Site
          </Link>
        }
      />

      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="border-b border-gray-100 bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
              <tr>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Supplier</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 font-semibold">Featured</th>
                <th className="px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => {
                const supplier = getSupplierById(product.supplierId);
                const cat = categories.find((c) => c.id === product.category);
                return (
                  <tr key={product.id} className="hover:bg-gray-50/50">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg">
                          <Image src={product.image} alt="" fill className="object-cover" sizes="40px" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-700">{cat?.name ?? product.category}</td>
                    <td className="px-5 py-4 text-gray-700">{supplier?.name ?? "—"}</td>
                    <td className="px-5 py-4 font-semibold">{formatPrice(product.price)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={product.inStock ? "active" : "inactive"} />
                    </td>
                    <td className="px-5 py-4">
                      <input
                        type="checkbox"
                        checked={product.featured}
                        onChange={(e) => updateProduct(product.id, { featured: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300 text-emerald-600"
                      />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => updateProduct(product.id, { inStock: !product.inStock })}
                          className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50"
                        >
                          Toggle Stock
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const price = prompt("New price (INR):", product.price);
                            if (price && !isNaN(Number(price))) updateProduct(product.id, { price: Number(price) });
                          }}
                          className="rounded-lg border border-gray-200 px-2 py-1 text-xs font-medium hover:bg-gray-50"
                        >
                          Edit Price
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
