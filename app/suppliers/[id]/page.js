import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ContactSupplierButton from "@/components/ContactSupplierButton";
import ProductCard from "@/components/ProductCard";
import { getProductsBySupplier } from "@/data/products";
import { getSupplierById } from "@/data/suppliers";
import { enrichProducts } from "@/lib/utils";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const supplier = getSupplierById(id);
  if (!supplier) return { title: "Supplier Not Found | DairyConnect" };
  return {
    title: `${supplier.name} | DairyConnect`,
    description: supplier.description,
  };
}

export default async function SupplierProfilePage({ params }) {
  const { id } = await params;
  const supplier = getSupplierById(id);
  if (!supplier) notFound();

  const supplierProducts = enrichProducts(getProductsBySupplier(supplier.id));

  return (
    <div>
      {/* Cover */}
      <div className="relative h-48 sm:h-64">
        <Image src={supplier.image} alt="" fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="py-4 text-sm text-gray-500">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/suppliers" className="hover:text-emerald-600">Suppliers</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{supplier.name}</span>
        </nav>

        {/* Profile header */}
        <div className="relative -mt-16 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm sm:-mt-20 sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
            <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white shadow-lg sm:h-28 sm:w-28">
              <Image src={supplier.logo} alt="" fill className="object-cover" sizes="112px" />
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{supplier.name}</h1>
                {supplier.verified && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                    ✓ Verified Supplier
                  </span>
                )}
              </div>
              <p className="mt-1 text-emerald-600">{supplier.tagline}</p>
              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span>📍 {supplier.location}</span>
                <span className="flex items-center gap-1 text-amber-600">
                  ★ <span className="font-semibold">{supplier.rating}</span>
                  <span className="text-gray-400">({supplier.reviewCount} reviews)</span>
                </span>
                <span>Est. {supplier.established}</span>
              </div>
            </div>
            <ContactSupplierButton
              supplierName={supplier.name}
              supplierId={supplier.id}
              className="shrink-0 rounded-xl bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Main content */}
          <div className="space-y-8 lg:col-span-2">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">About</h2>
              <p className="mt-3 leading-relaxed text-gray-600">{supplier.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {supplier.specialties.map((s) => (
                  <span key={s} className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                    {s}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-lg font-bold text-gray-900">
                Products ({supplierProducts.length})
              </h2>
              {supplierProducts.length > 0 ? (
                <div className="mt-4 grid gap-6 sm:grid-cols-2">
                  {supplierProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-gray-500">No products listed yet.</p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Contact Information</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-gray-500">Contact Person</dt>
                  <dd className="font-medium text-gray-900">{supplier.contact.person}</dd>
                  <dd className="text-gray-500">{supplier.contact.designation}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Phone</dt>
                  <dd className="font-medium text-gray-900">{supplier.contact.phone}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Email</dt>
                  <dd className="font-medium text-emerald-700">{supplier.contact.email}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Website</dt>
                  <dd className="font-medium text-gray-900">{supplier.contact.website}</dd>
                </div>
              </dl>
            </section>

            <section className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900">Business Details</h2>
              <dl className="mt-4 space-y-3 text-sm">
                {Object.entries(supplier.business).map(([key, value]) => (
                  <div key={key}>
                    <dt className="capitalize text-gray-500">{key.replace(/([A-Z])/g, " $1")}</dt>
                    <dd className="font-medium text-gray-900">{value}</dd>
                  </div>
                ))}
                <div>
                  <dt className="text-gray-500">FSSAI License</dt>
                  <dd className="font-medium text-gray-900">{supplier.fssai}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">GSTIN</dt>
                  <dd className="font-medium text-gray-900">{supplier.gstin}</dd>
                </div>
                <div>
                  <dt className="text-gray-500">Employees</dt>
                  <dd className="font-medium text-gray-900">{supplier.employees}</dd>
                </div>
              </dl>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
