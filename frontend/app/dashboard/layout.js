"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const links = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/products", label: "Products" },
  { href: "/dashboard/orders", label: "Orders" },
];

export default function DashboardLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Login nahi hai to home par bhejo
  useEffect(() => {
    if (!loading && !user) router.replace("/");
  }, [loading, user, router]);

  if (loading || !user) return <p className="p-8 text-gray-500">Loading...</p>;

  return (
    <div className="flex min-h-screen flex-wrap bg-gray-50">
      <aside className="flex w-full flex-col gap-1.5 bg-gray-900 p-4 text-white md:w-56">
        <div className="mx-2 mb-4 text-xl font-bold text-red-300 md:mb-6">Ricoz Innovation</div>
        {links.map((l) => (
          <Link key={l.href} href={l.href}
            className={`rounded-lg p-3 ${pathname === l.href ? "bg-red-700 font-bold" : "text-gray-300 hover:bg-gray-800"}`}>
            {l.label}
          </Link>
        ))}
        <div className="mt-auto border-t border-gray-700 pt-4 text-sm">
          <p className="font-bold">{user.name}</p>
          <p className="mb-3 text-gray-400">{user.role}</p>
          <button onClick={() => { logout(); router.push("/"); }} className="rounded-lg border border-gray-600 px-4 py-2 hover:bg-gray-800">
            Logout
          </button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 p-6 md:p-8">{children}</main>
    </div>
  );
}