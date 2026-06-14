"use client";

import { useState } from "react";
import Image from "next/image";
import PageHeader from "@/components/dashboard/PageHeader";
import { useAuth } from "@/context/AuthContext";
import { useData } from "@/context/DataContext";
import { categories } from "@/data/categories";
import { formatPrice } from "@/lib/utils";

export default function SellerProductsPage() {
  const { user } = useAuth();
  const { products, updateProduct, addProduct } = useData();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    category: "milk",
    price: "",
    unit: "per litre",
    minOrder: "",
    description: "",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=450&fit=crop",
  });

  const myProducts = products.filter((p) => p.supplierId === user?.supplierId);

  function handleAdd(e) {
    e.preventDefault();
    addProduct({
      ...form,
      price: Number(form.price),
      supplierId: user.supplierId,
      specs: { packaging: "Bulk supply" },
    });
    setShowForm(false);
    setForm({ name: "", category: "milk", price: "", unit: "per litre", minOrder: "", description: "", image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=600&h=450&fit=crop" });
  }

  return (
    <>
      <PageHeader
        title="My Products"
        description="Manage your product listings and inventory"
        action={
          <button
            type="button"
            onClick={() => setShowForm(!showForm)}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            {showForm ? "Cancel" : "+ Add Product"}
          </button>
        }
      />

      {showForm && (
        <form onSubmit={handleAdd} className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50/50 p-5">
          <h3 className="font-semibold text-gray-900">New Product</h3>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <input required placeholder="Product name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm" />
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm">
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <input required type="number" placeholder="Price (INR)" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm" />
            <input required placeholder="Min order (e.g. 50 litres)" value={form.minOrder} onChange={(e) => setForm({ ...form, minOrder: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm" />
            <input placeholder="Unit" value={form.unit} onChange={(e) => setForm({ ...form, unit: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm" />
            <input placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm sm:col-span-2" />
            <textarea required placeholder="Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm sm:col-span-2" />
          </div>
          <button type="submit" className="mt-4 rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">Add Product</button>
        </form>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myProducts.map((product) => {
          const cat = categories.find((c) => c.id === product.category);
          return (
            <div key={product.id} className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
              <div className="relative h-40">
                <Image src={product.image} alt={product.name} fill className="object-cover" sizes="300px" />
                {!product.inStock && (
                  <span className="absolute left-3 top-3 rounded-full bg-red-600 px-2 py-0.5 text-xs font-semibold text-white">Out of Stock</span>
                )}
              </div>
              <div className="p-4">
                <p className="text-xs font-medium text-emerald-600">{cat?.name}</p>
                <h3 className="font-semibold text-gray-900">{product.name}</h3>
                <p className="mt-1 text-lg font-bold text-emerald-700">{formatPrice(product.price)} <span className="text-sm font-normal text-gray-500">{product.unit}</span></p>
                <p className="mt-1 text-xs text-gray-500">Min: {product.minOrder}</p>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => updateProduct(product.id, { inStock: !product.inStock })}
                    className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium hover:bg-gray-50"
                  >
                    {product.inStock ? "Mark Out of Stock" : "Mark In Stock"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const price = prompt("New price:", product.price);
                      if (price && !isNaN(Number(price))) updateProduct(product.id, { price: Number(price) });
                    }}
                    className="flex-1 rounded-lg border border-gray-200 py-2 text-xs font-medium hover:bg-gray-50"
                  >
                    Edit Price
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
