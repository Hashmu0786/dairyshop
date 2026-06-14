import { getSupplierById } from "@/data/suppliers";

export async function generateMetadata({ params }) {
  const { id } = await params;
  const supplier = getSupplierById(id);
  if (!supplier) return { title: "Supplier | DairyConnect" };
  return {
    title: `${supplier.name} | DairyConnect`,
    description: supplier.description,
  };
}

export default function SupplierLayout({ children }) {
  return children;
}
