
import Link from "next/link";

export default function AuthLayout({
  children,
  heading,
  description,
  footerText,
  footerLink,
  footerHref,
}) {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">

      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900 lg:grid-cols-2">

        {/* Left Side */}
        <section className="hidden flex-col justify-between bg-gradient-to-br from-blue-700 to-indigo-800 p-10 text-white lg:flex">

          <Link href="/" className="text-3xl font-bold">
            LeadMarket
          </Link>

          <div>
            <h2 className="text-4xl font-bold leading-tight">
              Build stronger business connections.
            </h2>

            <p className="mt-5 leading-7 text-blue-100">
              Discover trusted partners, connect with businesses
              and grow your distribution network.
            </p>
          </div>

          <p className="text-sm text-blue-100">
            © 2026 LeadMarket
          </p>

        </section>

        {/* Right Side */}
        <section className="p-6 sm:p-10 lg:p-12">

          <div className="mb-8 flex justify-between">

            <Link
              href="/"
              className="font-bold text-xl lg:hidden"
            >
              LeadMarket
            </Link>

            <Link
              href="/"
              className="ml-auto text-sm text-slate-500 hover:text-blue-600"
            >
              ← Back to home
            </Link>

          </div>

          <h1 className="text-3xl font-bold">
            {heading}
          </h1>

          <p className="mt-3 mb-8 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>

          {children}

          <p className="mt-8 text-center text-sm text-slate-500">
            {footerText}{" "}
            <Link
              href={footerHref}
              className="font-bold text-blue-600"
            >
              {footerLink}
            </Link>
          </p>

        </section>
      </div>
    </main>
  );
}
