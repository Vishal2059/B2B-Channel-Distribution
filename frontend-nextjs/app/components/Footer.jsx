
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      id="about"
      className="mt-12 border-t border-blue-100 bg-white transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold text-slate-950 dark:text-white"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-white">
              ◈
            </span>
            LeadMarket
          </Link>

          <p className="mt-4 max-w-xs text-sm leading-6 text-slate-500 dark:text-slate-400">
            Bringing brands and distributors together through a simpler B2B
            wholesale marketplace.
          </p>
        </div>

        {/* Marketplace */}
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">
            Marketplace
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <Link href="/signup" className="block hover:text-blue-600">
              Explore Products
            </Link>

            <Link
              href="/signup?role=brand"
              className="block hover:text-blue-600"
            >
              For Brands
            </Link>

            <Link
              href="/signup?role=distributor"
              className="block hover:text-blue-600"
            >
              For Distributors
            </Link>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">
            Company
          </h3>

          <div className="mt-4 space-y-3 text-sm text-slate-500 dark:text-slate-400">
            <a href="#about" className="block hover:text-blue-600">
              About Us
            </a>

            <a href="#how-it-works" className="block hover:text-blue-600">
              How It Works
            </a>

            <a
              href="mailto:support@leadmarket.example"
              className="block hover:text-blue-600"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Get Started */}
        <div>
          <h3 className="font-bold text-slate-950 dark:text-white">
            Get started
          </h3>

          <p className="mt-4 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Join the network to discover products and build business
            relationships.
          </p>

          <Link
            href="/signup"
            className="mt-4 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Create Account →
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-slate-100 px-5 py-5 text-center text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © 2026 LeadMarket. All rights reserved.
      </div>
    </footer>
  );
}
