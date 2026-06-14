import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import SearchBar from "@/components/SearchBar";
import { filterProducts } from "@/data/products";
import { enrichProducts } from "@/lib/utils";

export const metadata = {
  title: "Products | DairyShop",
  description: "Browse dairy products — milk, curd, paneer, butter, ghee, and cheese from verified suppliers.",
};

function ProductsContent({ searchParams }) {
  const query = searchParams.q || "";
  const category = searchParams.category || "";
  const filtered = enrichProducts(filterProducts({ search: query, category }));

  return (
    <>
      <div className="mt-6">
        <SearchBar defaultValue={query} />
      </div>

      <div className="mt-6">
        <Suspense fallback={<div className="h-10 animate-pulse rounded-full bg-gray-100" />}>
          <CategoryFilter />
        </Suspense>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-gray-500">
          Showing <span className="font-medium text-gray-900">{filtered.length}</span> product
          {filtered.length !== 1 ? "s" : ""}
          {query && (
            <> for &ldquo;<span className="font-medium text-gray-900">{query}</span>&rdquo;</>
          )}
        </p>
      </div>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <span className="text-5xl">🔍</span>
          <h3 className="mt-4 text-xl font-semibold text-gray-900">No products found</h3>
          <p className="mt-2 text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </>
  );
}

export default function ProductsPage({ searchParams }) {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dairy Products</h1>
        <p className="mt-2 text-gray-600">
          Explore our catalogue of bulk dairy products from verified suppliers
        </p>
      </div>

      <ProductsContent searchParams={searchParams} />
    </div>
  );
}
