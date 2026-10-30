
import Link from "next/link";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import BusinessCards from "./components/BusinessCards";
import HowItWorks from "./components/HowItWorks";
import Categories from "./components/Categories";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
      <Navbar />
      <Hero />
      <Stats />
      <BusinessCards />
      <HowItWorks />
      <Categories />

      <section className="mx-auto max-w-7xl px-5 py-10">
        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-extrabold sm:text-4xl">
            Ready to grow your wholesale business?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-blue-100 sm:text-base">
            Join LeadMarket to discover business opportunities, connect with
            partners and simplify bulk sourcing.
          </p>

          <Link
            href="/signup"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3.5 font-bold text-blue-700 transition hover:bg-blue-50"
          >
            Get Started Today →
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
