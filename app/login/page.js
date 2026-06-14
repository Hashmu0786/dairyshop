"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { demoCredentials } from "@/data/users";

export default function LoginPage() {
  const { login, user, ready, dashboardPath } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  function fillDemo(cred) {
    setEmail(cred.email);
    setPassword(cred.password);
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const result = login(email, password);
    setLoading(false);
    if (result.ok) {
      router.push(result.redirect);
    } else {
      setError(result.error);
    }
  }

  return (
    <div className="flex min-h-screen">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-emerald-800 via-emerald-700 to-teal-700 p-12 text-white lg:flex">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-xl">🐄</span>
          <span className="text-xl font-bold">DairyShop</span>
        </Link>
        <div>
          <h1 className="text-4xl font-bold leading-tight">Manage your dairy business in one place</h1>
          <p className="mt-4 text-lg text-emerald-100">
            Role-based portals for buyers, sellers, and platform admins. Track orders, respond to inquiries, and manage products — just like a real B2B marketplace.
          </p>
          <ul className="mt-8 space-y-3 text-emerald-100">
            <li className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Real-time order tracking</li>
            <li className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Inquiry management</li>
            <li className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Product & inventory control</li>
            <li className="flex items-center gap-2"><span className="text-emerald-300">✓</span> Multi-role access control</li>
          </ul>
        </div>
        <p className="text-sm text-emerald-200/70">© 2026 DairyShop · Demo Platform</p>
      </div>

      <div className="flex w-full flex-col justify-center px-6 py-12 lg:w-1/2 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 lg:hidden">
            ← Back to site
          </Link>

          <h2 className="text-2xl font-bold text-gray-900">Sign in to your account</h2>
          <p className="mt-2 text-gray-600">Access your buyer, seller, or admin dashboard</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 py-3.5 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link href="/signup" className="font-semibold text-emerald-600 hover:text-emerald-700">
              Sign up now
            </Link>
          </p>

          <div className="mt-8 rounded-2xl border border-emerald-100 bg-emerald-50/50 p-5">
            <p className="text-sm font-semibold text-emerald-900">Demo accounts — click to fill</p>
            <div className="mt-3 space-y-2">
              {demoCredentials.map((cred) => (
                <button
                  key={cred.role}
                  type="button"
                  onClick={() => fillDemo(cred)}
                  className="flex w-full items-center justify-between rounded-xl border border-emerald-100 bg-white px-4 py-3 text-left text-sm transition hover:border-emerald-300 hover:shadow-sm"
                >
                  <div>
                    <span className="font-semibold text-gray-900">{cred.role}</span>
                    <span className="mt-0.5 block text-xs text-gray-500">{cred.email}</span>
                  </div>
                  <span className="text-xs font-medium text-emerald-600">Use →</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
