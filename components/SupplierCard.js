import Image from "next/image";
import Link from "next/link";

export default function SupplierCard({ supplier }) {
  return (
    <Link
      href={`/suppliers/${supplier.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:border-emerald-200 hover:shadow-md"
    >
      <div className="relative h-36 overflow-hidden bg-emerald-50">
        <Image
          src={supplier.image}
          alt={supplier.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {supplier.verified && (
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white">
            ✓ Verified
          </span>
        )}
      </div>

      <div className="relative flex flex-1 flex-col p-4 pt-8">
        <div className="absolute -top-8 left-4 h-14 w-14 overflow-hidden rounded-xl border-2 border-white shadow-md">
          <Image src={supplier.logo} alt="" fill className="object-cover" sizes="56px" />
        </div>

        <h3 className="font-semibold text-gray-900 group-hover:text-emerald-700">{supplier.name}</h3>
        <p className="mt-1 text-xs text-gray-500">{supplier.location}</p>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600">{supplier.tagline}</p>

        <div className="mt-auto flex items-center justify-between pt-4">
          <div className="flex items-center gap-1 text-sm text-amber-600">
            <span>★</span>
            <span className="font-medium">{supplier.rating}</span>
            <span className="text-gray-400">({supplier.reviewCount})</span>
          </div>
          <span className="text-xs font-medium text-emerald-600">Est. {supplier.established}</span>
        </div>
      </div>
    </Link>
  );
}
