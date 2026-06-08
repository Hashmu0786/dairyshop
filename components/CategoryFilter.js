"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { categories } from "@/data/categories";

export default function CategoryFilter({ basePath = "/products" }) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "";
  const searchQuery = searchParams.get("q") || "";

  function buildHref(categoryId) {
    const params = new URLSearchParams();
    if (searchQuery) params.set("q", searchQuery);
    if (categoryId) params.set("category", categoryId);
    const qs = params.toString();
    return `${basePath}${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Link
        href={buildHref("")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
          !activeCategory
            ? "bg-emerald-600 text-white shadow-sm"
            : "bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-emerald-300"
        }`}
      >
        All
      </Link>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={buildHref(cat.id)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            activeCategory === cat.id
              ? "bg-emerald-600 text-white shadow-sm"
              : "bg-white text-gray-600 ring-1 ring-gray-200 hover:ring-emerald-300"
          }`}
        >
          {cat.icon} {cat.name}
        </Link>
      ))}
    </div>
  );
}
