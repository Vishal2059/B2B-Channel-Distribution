"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import ProductImage from "@/components/ui/ProductImage";

export default function ProductShowcase({ onOpen }) {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [state, setState] = useState("loading"); // loading | ok | error

  useEffect(() => {
    api("/api/products")
      .then((data) => {
        const latest = [...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setProducts(latest.slice(0, 4));
        setState("ok");
      })
      .catch(() => setState("error"));
  }, []);

  return (
    <section id="products" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <p className="text-center text-sm font-bold tracking-[0.12em] text-red-700">PRODUCTS ON THE PLATFORM</p>
      <h2 className="mx-auto mb-3 mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
        See what brands are offering
      </h2>
      <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-gray-500">
        A look at the latest products listed by brands. Log in as a distributor to order.
      </p>

      {state === "loading" && <p className="text-center text-gray-500">Loading products...</p>}
      {state === "error" && <p className="text-center text-gray-500">Products could not be loaded right now.</p>}
      {state === "ok" && products.length === 0 && (
        <p className="text-center text-gray-500">No products listed yet. Brands can add the first one after signing up.</p>
      )}

      {products.length > 0 && (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
              <ProductImage src={p.imageUrl} alt={p.title} className="h-40 w-full object-cover" />
              <div className="p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-red-700">{p.category}</p>
                <h3 className="truncate text-lg font-bold">{p.title}</h3>
                <p className="text-sm text-gray-500">by {p.brand?.name}</p>
                <p className="mt-2 text-xl font-bold">₹{p.price.toLocaleString("en-IN")}</p>
                <p className="mb-3 text-sm text-gray-500">MOQ {p.moq} · Stock {p.stock}</p>
                {user ? (
                  <Link href="/dashboard/products" className="flex min-h-11 items-center justify-center rounded-lg bg-red-700 font-bold text-white hover:bg-red-800">
                    View in dashboard
                  </Link>
                ) : (
                  <button onClick={() => onOpen("login")} className="min-h-11 w-full rounded-lg border border-red-700 font-bold text-red-700 hover:bg-red-50">
                    Login to order
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}