import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-emerald-100 bg-emerald-950 text-emerald-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-sm">🐄</span>
              <span className="text-lg font-bold">DairyShop</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-emerald-200/80">
              India&apos;s trusted B2B dairy marketplace connecting buyers with verified suppliers across the country.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Explore</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100/80">
              <li><Link href="/products" className="hover:text-white">All Products</Link></li>
              <li><Link href="/products?category=milk" className="hover:text-white">Milk</Link></li>
              <li><Link href="/products?category=ghee" className="hover:text-white">Ghee</Link></li>
              <li><Link href="/products?category=paneer" className="hover:text-white">Paneer</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Suppliers</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100/80">
              <li><Link href="/suppliers" className="hover:text-white">Find Suppliers</Link></li>
              <li><Link href="/suppliers" className="hover:text-white">Verified Partners</Link></li>
              <li><Link href="/login" className="hover:text-white">Seller Login</Link></li>
              <li><Link href="/login" className="hover:text-white">Buyer Login</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-300">Contact</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-emerald-100/80">
              <li>support@dairyshop.in</li>
              <li>+91 1800-DAIRY-01</li>
              <li>Bengaluru, Karnataka, India</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-emerald-800 pt-8 sm:flex-row">
          <p className="text-sm text-emerald-300/70">© 2026 DairyShop. All rights reserved.</p>
          <p className="text-xs text-emerald-400/60">FSSAI Licensed Platform · Demo Project</p>
        </div>
      </div>
    </footer>
  );
}
