"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar({ defaultValue = "", placeholder = "Search dairy products...", size = "default" }) {
  const router = useRouter();
  const [query, setQuery] = useState(defaultValue);

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    router.push(`/products${params.toString() ? `?${params}` : ""}`);
  }

  const isLarge = size === "large";

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm ${isLarge ? "shadow-lg" : ""}`}>
        <div className="flex flex-1 items-center gap-3 px-4">
          <svg className="h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={`w-full border-0 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-0 ${isLarge ? "py-4 text-base" : "py-3 text-sm"}`}
          />
        </div>
        <button
          type="submit"
          className={`shrink-0 bg-emerald-600 font-semibold text-white transition hover:bg-emerald-700 ${isLarge ? "px-8 py-4 text-base" : "px-5 py-3 text-sm"}`}
        >
          Search
        </button>
      </div>
    </form>
  );
}
