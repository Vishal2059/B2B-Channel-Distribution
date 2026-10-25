"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const links = [
  ["About", "#about"],
  ["How it works", "#how-it-works"],
  ["Features", "#features"],
  ["Products", "#products"],
  ["FAQ", "#faq"],
];

export default function Navbar({ onOpen }) {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-40 border-b border-gray-100 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <a href="#top" className="flex items-center gap-3 text-xl font-bold">
          <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-red-700 text-base text-white">RI</span>
          Ricoz Innovation
        </a>
        <nav className="hidden items-center gap-6 text-[15px] font-medium text-gray-600 lg:flex">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hover:text-red-700">{label}</a>
          ))}
        </nav>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onOpen("contact")} className="min-h-11 rounded-[10px] border border-gray-200 px-4 font-medium hover:bg-gray-50">
            Get in Touch
          </button>
          <button onClick={() => onOpen("apply")} className="min-h-11 rounded-[10px] bg-red-700 px-4 font-bold text-white hover:bg-red-800">
            Get Started
          </button>
          {user ? (
            <Link href="/dashboard" className="flex min-h-11 items-center rounded-[10px] border border-red-700 px-4 font-bold text-red-700">
              Dashboard
            </Link>
          ) : (
            <button onClick={() => onOpen("login")} className="min-h-11 rounded-[10px] border border-red-700 px-4 font-bold text-red-700 hover:bg-red-50">
              Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}