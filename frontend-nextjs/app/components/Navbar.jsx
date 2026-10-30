"use client";

import Link from "next/link";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-blue-100/70 bg-white/90 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-600 text-xl text-white">
            ◈
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-950 dark:text-white">
            Lead<span className="text-blue-600">Market</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300 lg:flex">
          <a href="#categories" className="hover:text-blue-600">Products</a>
          <a href="#how-it-works" className="hover:text-blue-600">How it works</a>
          <a href="#brands" className="hover:text-blue-600">For Brands</a>
          <a href="#distributors" className="hover:text-blue-600">For Distributors</a>
          <a href="#about" className="hover:text-blue-600">About</a>
        </div>

        <div className="hidden items-center gap-3 sm:flex">
          <ThemeToggle />
          <Link
            href="/login"
            className="rounded-xl border border-blue-200 px-4 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-blue-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-slate-700 dark:border-slate-700 dark:text-white sm:hidden"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </nav>

      {menuOpen && (
        <div className="space-y-3 border-t border-slate-100 bg-white px-5 py-5 dark:border-slate-800 dark:bg-slate-950 sm:hidden">
          <a href="#categories" onClick={() => setMenuOpen(false)} className="block">Products</a>
          <a href="#how-it-works" onClick={() => setMenuOpen(false)} className="block">How it works</a>
          <a href="#brands" onClick={() => setMenuOpen(false)} className="block">For Brands</a>
          <a href="#distributors" onClick={() => setMenuOpen(false)} className="block">For Distributors</a>
          <div className="flex items-center gap-3 pt-2">
            <ThemeToggle />
            <Link href="/login" className="text-blue-600">Sign In</Link>
            <Link href="/signup" className="rounded-lg bg-blue-600 px-4 py-2 text-white">Get Started</Link>
          </div>
        </div>
      )}
    </header>
  );
}