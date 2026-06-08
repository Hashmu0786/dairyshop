import { getSupplierById } from "@/data/suppliers";
import { getCategoryName } from "@/data/categories";

export function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function enrichProduct(product) {
  const supplier = getSupplierById(product.supplierId);
  return {
    ...product,
    categoryName: getCategoryName(product.category),
    supplier: supplier
      ? { id: supplier.id, name: supplier.name, slug: supplier.slug, location: supplier.location }
      : null,
  };
}

export function enrichProducts(productList) {
  return productList.map(enrichProduct);
}
