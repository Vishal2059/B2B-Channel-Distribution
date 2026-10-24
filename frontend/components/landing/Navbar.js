"use client";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar({ onOpen }) {
  const { user } = useAuth();
  return (
    <header className="border-b border-gray-100">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-4">
        <div className="flex items-center gap-3 text-2xl font-bold">
          <span className="flex h-12 w-12 items-center justify-center rounded-[10px] bg-red-700 text-lg text-white">RI</span>
          Ricoz Innovation
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => onOpen("contact")} className="min-h-11 rounded-[10px] border border-gray-200 px-5 font-medium hover:bg-gray-50">
            Get in Touch
          </button>
          <button onClick={() => onOpen("apply")} className="min-h-11 rounded-[10px] bg-red-700 px-5 font-bold text-white hover:bg-red-800">
            Become a Partner
          </button>
          {user ? (
            <Link href="/dashboard" className="flex min-h-11 items-center rounded-[10px] border border-red-700 px-5 font-bold text-red-700">
              Dashboard
            </Link>
          ) : (
            <button onClick={() => onOpen("login")} className="min-h-11 rounded-[10px] border border-red-700 px-5 font-bold text-red-700 hover:bg-red-50">
              Partner Login
            </button>
          )}
        </div>
      </div>
    </header>
  );
}