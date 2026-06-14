import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductActions from "@/components/ProductActions";
import ProductCard from "@/components/ProductCard";
import { getProductById, getProductsBySupplier } from "@/data/products";
import { getSupplierById } from "@/data/suppliers";
import { enrichProduct, enrichProducts, formatPrice } from "@/lib/utils";
import { getCategoryName } from "@/data/categories";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) return { title: "Product Not Found | DairyConnect" };
  return {
    title: `${product.name} | DairyConnect`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  const raw = getProductById(id);
  if (!raw) notFound();

  const product = enrichProduct(raw);
  const supplier = getSupplierById(product.supplierId);
  const relatedProducts = enrichProducts(
    getProductsBySupplier(product.supplierId).filter((p) => p.id !== product.id).slice(0, 3)
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <nav className="mb-6 text-sm text-gray-500">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="hover:text-emerald-600">Products</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-emerald-50">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800">
              {getCategoryName(product.category)}
            </span>
            {product.inStock ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">In Stock</span>
            ) : (
              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">Out of Stock</span>
            )}
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">{product.name}</h1>

          <div className="mt-3 flex items-center gap-3">
            <div className="flex items-center gap-1 text-amber-600">
              <span>★</span>
              <span className="font-semibold">{product.rating}</span>
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-sm text-gray-500">Min. order: {product.minOrder}</span>
          </div>

          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-3xl font-bold text-emerald-700">{formatPrice(product.price)}</span>
            <span className="text-gray-500">{product.unit}</span>
          </div>

          <p className="mt-6 leading-relaxed text-gray-600">{product.description}</p>

          {product.specs && (
            <div className="mt-6 rounded-2xl border border-gray-100 bg-gray-50 p-5">
              <h3 className="font-semibold text-gray-900">Specifications</h3>
              <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="flex justify-between gap-4 text-sm sm:block">
                    <dt className="capitalize text-gray-500">{key.replace(/([A-Z])/g, " $1")}</dt>
                    <dd className="font-medium text-gray-900">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {supplier && (
            <div className="mt-6 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
              <h3 className="font-semibold text-gray-900">Supplier</h3>
              <div className="mt-3 flex items-center gap-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                  <Image src={supplier.logo} alt="" fill className="object-cover" sizes="48px" />
                </div>
                <div>
                  <Link href={`/suppliers/${supplier.id}`} className="font-semibold text-emerald-700 hover:underline">
                    {supplier.name}
                  </Link>
                  <p className="text-sm text-gray-500">{supplier.location}</p>
                </div>
              </div>
              <div className="mt-4">
                <ProductActions product={product} supplier={supplier} />
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <section className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900">More from {supplier?.name}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
