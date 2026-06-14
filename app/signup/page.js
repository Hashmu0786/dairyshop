"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const INDIAN_STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh",
  "Uttarakhand", "West Bengal", "Delhi"
];

export default function SignupPage() {
  const { signup, user, ready, dashboardPath } = useAuth();
  const router = useRouter();

  const [role, setRole] = useState("buyer"); // "buyer" or "seller"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    company: "",
    designation: "",
    city: "",
    state: "",
    gstin: "",
    fssai: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ready && user && dashboardPath) {
      router.replace(dashboardPath);
    }
  }, [ready, user, dashboardPath, router]);

  if (ready && user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-200 border-t-emerald-600" />
      </div>
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // Validation
    if (form.phone.replace(/[^0-9]/g, "").length < 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    if (form.gstin) {
      const gstinRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
      if (!gstinRegex.test(form.gstin.toUpperCase())) {
        setError("Please enter a valid 15-character GSTIN format (e.g. 29AAAAA1234A1Z5)");
        return;
      }
    }

    if (role === "seller" && form.fssai) {
      if (form.fssai.replace(/[^0-9]/g, "").length !== 14) {
        setError("FSSAI License Number must be exactly 14 digits");
        return;
      }
    }

    setLoading(true);
    const result = signup({
      ...form,
      role,
      gstin: form.gstin.toUpperCase(),
    });
    setLoading(false);

    if (result.ok) {
      router.push(result.redirect);
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left gradient sidebar (same as login page) */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-12 text-white lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl">🐄</span>
          <span className="text-xl font-bold">DairyShop</span>
        </Link>
        <div>
          <h1 className="text-4xl font-bold leading-tight">Scale your B2B dairy trade effortlessly</h1>
          <p className="mt-4 text-lg text-emerald-100">
            Join the digital hub connecting verified Indian cooperatives, farms, and artisan cheese makers directly with bulk institutional buyers.
          </p>
          <ul className="mt-8 space-y-3 text-emerald-100">
            <li className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Direct bulk trading with zero brokers</li>
            <li className="flex items-center gap-2"><span className="text-emerald-300">✓</span> FSSAI & GSTIN verified partners</li>
            <li className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Secure logistics & cold chain tracking</li>
            <li className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Smart digital orders & price inquiries</li>
          </ul>
        </div>
        <p className="text-sm text-emerald-200/70">© 2026 DairyShop · Demo Platform</p>
      </div>

      {/* Right panel with form */}
      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16 bg-gray-50 overflow-y-auto">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 lg:hidden">
            ← Back to site
          </Link>

          <h2 className="text-2xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">Join our wholesale marketplace community</p>

          {/* Role selector tabs */}
          <div className="mt-6 flex gap-2 rounded-xl bg-gray-200/70 p-1.5">
            <button
              type="button"
              onClick={() => {
                setRole("buyer");
                setError("");
              }}
              className={`flex-1 rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                role === "buyer"
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              🛍️ Register as Buyer
            </button>
            <button
              type="button"
              onClick={() => {
                setRole("seller");
                setError("");
              }}
              className={`flex-1 rounded-lg py-2.5 text-center text-sm font-semibold transition ${
                role === "seller"
                  ? "bg-white text-emerald-800 shadow-sm"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              🚜 Register as Seller
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">Full Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="e.g. Amit Patel"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">Phone Number</label>
                <input
                  type="tel"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="e.g. 9876543210"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">Email Address</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">Password</label>
              <input
                type="password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="Choose a strong password"
              />
            </div>

            {/* Business Info */}
            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">Company / Business Name</label>
              <input
                type="text"
                required
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="e.g. Quality Dairy Cooperative"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">Designation</label>
                <input
                  type="text"
                  required
                  value={form.designation}
                  onChange={(e) => setForm({ ...form, designation: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="e.g. Owner, Manager"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">City</label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="e.g. Anand"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">State</label>
              <select
                required
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              >
                <option value="">Select your state</option>
                {INDIAN_STATES.map((st) => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>

            {/* Optional Tax/Compliance details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">GSTIN {role === "seller" && <span className="text-red-500">*</span>}</label>
                <input
                  type="text"
                  required={role === "seller"}
                  value={form.gstin}
                  onChange={(e) => setForm({ ...form, gstin: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 uppercase"
                  placeholder="15-digit GSTIN"
                />
              </div>
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-700 uppercase tracking-wide">FSSAI License {role === "seller" && <span className="text-red-500">*</span>}</label>
                <input
                  type="text"
                  required={role === "seller"}
                  value={form.fssai}
                  onChange={(e) => setForm({ ...form, fssai: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="14-digit License"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60 shadow-sm"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
