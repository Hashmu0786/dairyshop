import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-emerald-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-emerald-800 backdrop-blur-sm">
          {product.categoryName}
        </span>
        {!product.inStock && (
          <span className="absolute right-3 top-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-medium text-white">
            Out of Stock
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700">{product.name}</h3>
        {product.supplier && (
          <p className="mt-1 text-xs text-gray-500">{product.supplier.name}</p>
        )}
        <div className="mt-auto flex items-end justify-between pt-3">
          <div>
            <p className="text-lg font-bold text-emerald-700">{formatPrice(product.price)}</p>
            <p className="text-xs text-gray-400">{product.unit}</p>
          </div>
          <div className="flex items-center gap-1 text-sm text-amber-600">
            <span>★</span>
            <span className="font-medium">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
