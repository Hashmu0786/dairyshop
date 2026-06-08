import SupplierCard from "@/components/SupplierCard";
import { suppliers } from "@/data/suppliers";

export const metadata = {
  title: "Suppliers | DairyConnect",
  description: "Find verified dairy suppliers across India — cooperatives, farms, and artisan producers.",
};

export default function SuppliersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dairy Suppliers</h1>
        <p className="mt-2 text-gray-600">
          Connect with {suppliers.length} verified suppliers from across India
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5 text-sm text-emerald-800">
        <span>✓ FSSAI Licensed</span>
        <span>✓ GST Registered</span>
        <span>✓ B2B Verified</span>
        <span>✓ Cold Chain Ready</span>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
    </div>
  );
}
