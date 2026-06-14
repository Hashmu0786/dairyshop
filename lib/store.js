const STORAGE_KEYS = {
  session: "dairyconnect_session",
  orders: "dairyconnect_orders",
  inquiries: "dairyconnect_inquiries",
  products: "dairyconnect_products",
  users: "dairyconnect_users",
  suppliers: "dairyconnect_suppliers",
};

export function getStorageItem(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function setStorageItem(key, value) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function removeStorageItem(key) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}

export { STORAGE_KEYS };

export function generateId(prefix) {
  return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;
}

export function generateOrderNumber() {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `DC-2026-${num}`;
}

export function formatDateTime(iso) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

export function formatDate(iso) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso));
}
