import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:grid-cols-2 md:py-24">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-2 text-sm font-medium text-blue-700 dark:border-blue-900 dark:bg-slate-900 dark:text-blue-300">
            <span>✦</span> B2B Channel Distribution Platform
          </div>

          <h1 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:text-5xl lg:text-6xl">
            Wholesale sourcing,
            <span className="block text-blue-600"> made simple.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Connect trusted brands with distributors. Discover products,
            request bulk orders, and grow your network.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/signup" className="rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-700">
              Get Started <span className="ml-2">→</span>
            </Link>
            <a href="#categories" className="rounded-xl border border-blue-300 bg-white px-6 py-3.5 font-semibold text-blue-700 transition hover:bg-blue-50 dark:border-slate-700 dark:bg-slate-900 dark:text-blue-300">
              ▷ View Products
            </a>
          </div>

          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-600 dark:text-slate-300">
            <span>✓ Verified Brands</span>
            <span>▣ Bulk Ordering</span>
            <span>♧ Secure Transactions</span>
            <span>▦ Wide Categories</span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-5 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="relative overflow-hidden rounded-3xl border border-white bg-white/70 p-3 shadow-2xl shadow-blue-900/10 dark:border-slate-700 dark:bg-slate-900/60">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1100&q=85"
              alt="Warehouse with wholesale inventory"
              className="h-[300px] w-full rounded-2xl object-cover sm:h-[390px]"
            />
            <div className="absolute left-6 top-7 rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs text-slate-500">Verified network</p>
              <p className="mt-1 text-lg font-extrabold text-slate-950 dark:text-white">500+ Brands</p>
            </div>
            <div className="absolute bottom-7 right-6 rounded-2xl border border-blue-100 bg-white/95 p-4 shadow-lg dark:border-slate-700 dark:bg-slate-900">
              <p className="text-xs text-slate-500">Wholesale catalog</p>
              <p className="mt-1 text-lg font-extrabold text-blue-600">10,000+ Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}