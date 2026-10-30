
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  // Default role
  const [role, setRole] = useState("brand");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  function updateField(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Signup API
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    if (form.name.trim().length < 2) {
      setMessage("Please enter your full name.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      setMessage("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9]{10}$/.test(form.phone)) {
      setMessage("Please enter a valid 10-digit phone number.");
      return;
    }

    if (form.password.length < 8) {
      setMessage("Password must be at least 8 characters.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    if (!form.terms) {
      setMessage("Please accept the Terms of Service and Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const { signupUser, saveAuthSession } = await import("../lib/auth");

      const data = await signupUser({
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        password: form.password,

        // Backend role format
        role: role === "brand" ? "Brand" : "Distributor",
      });

      saveAuthSession(data);

      router.replace("/");
    } catch (error) {
      setMessage(error.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-100 px-4 py-5 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">

      {/* Header */}
      <header className="mx-auto flex max-w-6xl items-center justify-between py-3">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-extrabold text-slate-950 dark:text-white"
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">
            ◈
          </span>
          LeadMarket
        </Link>

        <Link
          href="/"
          className="text-sm font-medium text-slate-600 hover:text-blue-600 dark:text-slate-300"
        >
          ← Back to Home
        </Link>
      </header>

      {/* Main Container */}
      <div className="mx-auto mt-6 grid max-w-6xl overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-xl shadow-blue-900/5 dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-[1.1fr_0.9fr]">

        {/* Signup Form */}
        <section className="p-6 sm:p-10">

          <h1 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            Create your LeadMarket account
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Join as a brand or distributor to get started.
          </p>

          <form onSubmit={handleSubmit} className="mt-7 space-y-4">

            {/* Full Name */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium">
                Full Name *
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={updateField}
                placeholder="Enter your full name"
                autoComplete="name"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {/* Business Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Business Email *
              </label>

              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={updateField}
                placeholder="you@company.com"
                autoComplete="email"
                className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="mb-1.5 block text-sm font-medium">
                Phone Number *
              </label>

              <div className="flex gap-2">
                <span className="rounded-lg border border-slate-200 px-3 py-3 text-sm dark:border-slate-700">
                  🇮🇳 +91
                </span>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="numeric"
                  maxLength={10}
                  pattern="[0-9]{10}"
                  value={form.phone}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, "");

                    setForm((previous) => ({
                      ...previous,
                      phone: value.slice(0, 10),
                    }));
                  }}
                  placeholder="Enter phone number"
                  autoComplete="tel"
                  className="min-w-0 flex-1 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:border-blue-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium">
                Password *
              </label>

              <div className="flex rounded-lg border border-slate-200 focus-within:border-blue-500 dark:border-slate-700">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  value={form.password}
                  onChange={updateField}
                  placeholder="Create a password"
                  autoComplete="new-password"
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

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium">
                Confirm Password *
              </label>

              <div className="flex rounded-lg border border-slate-200 focus-within:border-blue-500 dark:border-slate-700">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  minLength={8}
                  value={form.confirmPassword}
                  onChange={updateField}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                  className="min-w-0 flex-1 rounded-lg bg-transparent px-4 py-3 text-sm outline-none dark:text-white"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="px-3 text-sm text-slate-500"
                >
                  {showConfirm ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Business Role */}
            <div>
              <p className="mb-3 text-sm font-medium">
                Business Role *
              </p>

              <div className="grid gap-3 sm:grid-cols-2">

                {/* Brand */}
                <button
                  type="button"
                  onClick={() => setRole("brand")}
                  aria-pressed={role === "brand"}
                  className={`rounded-xl border p-4 text-left transition ${
                    role === "brand"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/40"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span className="text-2xl text-blue-600">▦</span>

                  <span className="mt-2 block font-bold">
                    Brand Owner / Manufacturer
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                    List products and manage your distribution network.
                  </span>
                </button>

                {/* Distributor */}
                <button
                  type="button"
                  onClick={() => setRole("distributor")}
                  aria-pressed={role === "distributor"}
                  className={`rounded-xl border p-4 text-left transition ${
                    role === "distributor"
                      ? "border-blue-500 bg-blue-50 ring-1 ring-blue-500 dark:bg-blue-950/40"
                      : "border-slate-200 dark:border-slate-700"
                  }`}
                >
                  <span className="text-2xl text-blue-600">▣</span>

                  <span className="mt-2 block font-bold">
                    Distributor / Wholesaler
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-slate-500 dark:text-slate-400">
                    Discover products and manage your purchases.
                  </span>
                </button>

              </div>
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <input
                name="terms"
                type="checkbox"
                checked={form.terms}
                onChange={updateField}
                className="mt-1 accent-blue-600"
              />

              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600">
                  Privacy Policy
                </Link>.
              </span>
            </label>

            {/* Error Message */}
            {message && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950 dark:text-red-200"
              >
                {message}
              </p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>

          </form>

          <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-blue-600">
              Sign in
            </Link>
          </p>

        </section>

        {/* Original Right Side - Warehouse Image */}
        <aside className="hidden flex-col justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-10 dark:from-slate-800 dark:to-blue-950 lg:flex">

          <h2 className="text-3xl font-extrabold text-slate-950 dark:text-white">
            Join LeadMarket
          </h2>

          <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
            Get access to verified brands, a wide product range and an easy way to manage your wholesale business.
          </p>

          <img
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=85"
            alt="Wholesale warehouse"
            className="mt-8 h-72 w-full rounded-2xl object-cover shadow-lg"
          />

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-semibold text-slate-700 dark:text-slate-200">
            <p className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">
              ▦ List Products
            </p>

            <p className="rounded-xl bg-white/80 p-4 dark:bg-slate-900/80">
              ▣ Place Bulk Orders
            </p>
          </div>

        </aside>

      </div>
    </main>
  );
}
