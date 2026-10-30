
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { loginUser, saveAuthSession } from "../lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("error");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (!form.email.trim() || !form.password) {
      setMessageType("error");
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      saveAuthSession(data, rememberMe);

      setMessageType("success");
      setMessage("Login successful! Redirecting...");

      router.replace("/");
    } catch (error) {
      setMessageType("error");
      setMessage(error.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 px-4 py-5 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <header className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-slate-950 dark:text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">◈</span>
          LeadMarket
        </Link>
        <Link href="/" className="text-sm text-slate-600 hover:text-blue-600 dark:text-slate-300">
          ← Back to Home
        </Link>
      </header>

      <div className="mx-auto mt-10 grid max-w-5xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2">
        <section className="flex flex-col justify-center p-7 sm:p-12">
          <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            Welcome back
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Sign in to your LeadMarket account.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">Business Email *</label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium">Password *</label>
              <div className="flex rounded-lg border border-slate-200 focus-within:border-blue-500 dark:border-slate-700">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="min-w-0 flex-1 rounded-lg bg-transparent px-4 py-3 text-sm outline-none dark:text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="px-3 text-sm text-slate-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
              <label className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-blue-600"
                />
                Remember me
              </label>
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>

            {message && (
              <p
                role="status"
                className={`rounded-lg p-3 text-sm ${
                  messageType === "success"
                    ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-200"
                    : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-200"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing In..." : "Sign In →"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
            New to LeadMarket?{" "}
            <Link href="/signup" className="font-semibold text-blue-600">Create account</Link>
          </p>
        </section>

        <aside className="hidden flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-10 dark:from-slate-800 dark:to-blue-950 lg:flex">
          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            Access your business account
          </h2>
          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            Manage products, track orders and connect with trusted business partners.
          </p>

          <img
            src="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=900&q=85"
            alt="Warehouse and distribution"
            className="mt-8 h-72 w-full rounded-2xl object-cover shadow-lg"
          />

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <p className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">▦ Manage Products</p>
            <p className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">▣ Track Orders</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
