import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import SupplierCard from "@/components/SupplierCard";
import HowItWorks from "@/components/HowItWorks";
import { categories } from "@/data/categories";
import { getFeaturedProducts } from "@/data/products";
import { getTopSuppliers } from "@/data/suppliers";
import { enrichProducts } from "@/lib/utils";

export default function HomePage() {
  const featuredProducts = enrichProducts(getFeaturedProducts(6));
  const topSuppliers = getTopSuppliers(4);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-700 via-emerald-600 to-teal-600">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white" />
          <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-white" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium text-emerald-50 backdrop-blur-sm">
              🥛 India&apos;s B2B Dairy Marketplace
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Connect with Trusted Dairy Suppliers
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-emerald-100 sm:text-xl">
              Source fresh milk, paneer, ghee, and more from 9+ verified suppliers.
              Built for restaurants, retailers, and food businesses.
            </p>
            <div className="mx-auto mt-8 max-w-xl">
              <SearchBar size="large" placeholder="Search milk, paneer, ghee..." />
            </div>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-emerald-100">
              <span>✓ 20+ Products</span>
              <span>✓ 9 Verified Suppliers</span>
              <span>✓ Pan-India Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-gray-50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Product Categories</h2>
              <p className="mt-2 text-gray-600">Browse by category to find exactly what you need</p>
            </div>
            <Link href="/products" className="hidden text-sm font-semibold text-emerald-600 hover:text-emerald-700 sm:block">
              View all →
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.id}`}
                className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white p-5 text-center shadow-sm transition hover:border-emerald-200 hover:shadow-md"
              >
                <span className="text-3xl transition group-hover:scale-110">{cat.icon}</span>
                <h3 className="mt-3 font-semibold text-gray-900">{cat.name}</h3>
                <p className="mt-1 text-xs text-gray-500">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Featured Products</h2>
              <p className="mt-2 text-gray-600">Top-rated dairy products from verified suppliers</p>
            </div>
            <Link href="/products" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Suppliers */}
      <section className="bg-emerald-50/50 py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">Top Suppliers</h2>
              <p className="mt-2 text-gray-600">Highly rated dairy partners across India</p>
            </div>
            <Link href="/suppliers" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700">
              View all →
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {topSuppliers.map((supplier) => (
              <SupplierCard key={supplier.id} supplier={supplier} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA */}
      <section className="py-14 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-emerald-900">
            <Image
              src="https://images.unsplash.com/photo-1560493676-04071c5f467b?w=1200&h=400&fit=crop"
              alt="Dairy farm"
              fill
              className="object-cover opacity-30"
            />
            <div className="relative px-8 py-12 text-center sm:px-16 sm:py-16">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                Ready to source quality dairy for your business?
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-emerald-100">
                Join hundreds of restaurants and retailers who trust DairyShop for their daily dairy needs.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/products"
                  className="rounded-xl bg-white px-6 py-3 font-semibold text-emerald-800 transition hover:bg-emerald-50"
                >
                  Browse Products
                </Link>
                <Link
                  href="/suppliers"
                  className="rounded-xl border border-white/30 px-6 py-3 font-semibold text-white transition hover:bg-white/10"
                >
                  Find Suppliers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <HowItWorks />
    </>
  );
}
