"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

const NAV_CONFIG = {
  admin: {
    title: "Admin Panel",
    subtitle: "Platform Management",
    links: [
      { href: "/admin", label: "Dashboard", icon: "📊" },
      { href: "/admin/orders", label: "Orders", icon: "📦" },
      { href: "/admin/inquiries", label: "Inquiries", icon: "💬" },
      { href: "/admin/products", label: "Products", icon: "🥛" },
      { href: "/admin/suppliers", label: "Suppliers", icon: "🏭" },
      { href: "/admin/users", label: "Users", icon: "👥" },
    ],
  },
  buyer: {
    title: "Buyer Portal",
    subtitle: "Procurement Dashboard",
    links: [
      { href: "/buyer", label: "Dashboard", icon: "📊" },
      { href: "/buyer/orders", label: "My Orders", icon: "📦" },
      { href: "/buyer/inquiries", label: "Inquiries", icon: "💬" },
      { href: "/buyer/profile", label: "Profile", icon: "👤" },
    ],
  },
  seller: {
    title: "Seller Portal",
    subtitle: "Supplier Dashboard",
    links: [
      { href: "/seller", label: "Dashboard", icon: "📊" },
      { href: "/seller/products", label: "My Products", icon: "🥛" },
      { href: "/seller/orders", label: "Orders", icon: "📦" },
      { href: "/seller/inquiries", label: "Inquiries", icon: "💬" },
      { href: "/seller/profile", label: "Profile", icon: "👤" },
    ],
  },
};

export default function DashboardShell({ role, children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const config = NAV_CONFIG[role];

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-emerald-100 bg-emerald-950 text-emerald-50 transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-emerald-800 px-5 py-5">
          <Link href="/" className="flex items-center gap-2.5" onClick={() => setSidebarOpen(false)}>
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-lg">🐄</span>
            <div>
              <span className="block text-sm font-bold">DairyShop</span>
              <span className="text-xs text-emerald-300">{config.subtitle}</span>
            </div>
          </Link>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {config.links.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-600 text-white"
                    : "text-emerald-100/80 hover:bg-emerald-900 hover:text-white"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-emerald-800 p-4">
          <div className="rounded-xl bg-emerald-900/50 px-3 py-3">
            <p className="truncate text-sm font-semibold">{user?.name}</p>
            <p className="truncate text-xs text-emerald-300">{user?.email}</p>
            <span className="mt-2 inline-block rounded-full bg-emerald-700 px-2 py-0.5 text-xs capitalize">
              {role}
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <Link
              href="/"
              className="flex-1 rounded-lg border border-emerald-700 px-3 py-2 text-center text-xs font-medium text-emerald-100 hover:bg-emerald-900"
            >
              View Site
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="flex-1 rounded-lg bg-emerald-700 px-3 py-2 text-xs font-medium text-white hover:bg-emerald-600"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-200 bg-white px-4 py-3 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
              aria-label="Open menu"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-lg font-bold text-gray-900">{config.title}</h2>
          </div>
          <Link
            href="/products"
            className="hidden rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 sm:inline-flex"
          >
            Browse Marketplace
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
