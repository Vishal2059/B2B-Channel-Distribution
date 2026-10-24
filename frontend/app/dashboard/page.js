"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import StatusBadge from "@/components/dashboard/StatusBadge";

const money = (n) => `₹${n.toLocaleString("en-IN")}`;
const date = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const newest = (list) => [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

const BAR = { Pending: "bg-gray-400", Processing: "bg-amber-500", Delivered: "bg-green-600", Cancelled: "bg-red-600" };
const STATUSES = ["Pending", "Processing", "Delivered", "Cancelled"];

function Stat({ label, value, hint, accent }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${accent ? "text-red-700" : ""}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    </div>
  );
}

function Card({ title, href, linkText, children }) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h2 className="text-lg font-bold">{title}</h2>
        {href && <Link href={href} className="text-sm font-bold text-red-700">{linkText} →</Link>}
      </div>
      {children}
    </section>
  );
}

export default function Overview() {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState(null); // null = is role ke liye orders available nahi
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setProducts(await api("/api/products"));
        if (user.role === "Distributor") setOrders(await api("/api/orders/myorders", { token }));
        if (user.role === "Admin") setOrders(await api("/api/orders", { token }));
      } catch (err) {
        console.error(err);
      }
      setReady(true);
    })();
  }, [user, token]);

  if (!ready) return <p className="text-gray-500">Loading overview...</p>;

  const isBrand = user.role === "Brand";
  const isAdmin = user.role === "Admin";
  const list = orders || [];
  const mine = products.filter((p) => p.brand?._id === user._id);

  const counts = Object.fromEntries(STATUSES.map((s) => [s, list.filter((o) => o.status === s).length]));
  const spent = list.filter((o) => o.status !== "Cancelled").reduce((sum, o) => sum + o.totalAmount, 0);
  const stockUnits = mine.reduce((sum, p) => sum + p.stock, 0);
  const stockValue = mine.reduce((sum, p) => sum + p.stock * p.price, 0);
  const lowStock = mine.filter((p) => p.stock <= p.moq * 2);

  const action = isBrand
    ? { href: "/dashboard/products", text: "Add product" }
    : isAdmin
      ? { href: "/dashboard/orders", text: "Manage orders" }
      : { href: "/dashboard/products", text: "Browse products" };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-500">Here is your {user.role.toLowerCase()} overview.</p>
        </div>
        <Link href={action.href} className="flex min-h-11 items-center rounded-[10px] bg-red-700 px-5 font-bold text-white hover:bg-red-800">
          {action.text}
        </Link>
      </div>

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {isBrand && (
          <>
            <Stat label="My products" value={mine.length} hint={`${products.length} in full catalog`} />
            <Stat label="Units in stock" value={stockUnits.toLocaleString("en-IN")} />
            <Stat label="Inventory value" value={money(stockValue)} accent />
            <Stat label="Low stock items" value={lowStock.length} hint="Stock within 2× MOQ" />
          </>
        )}
        {!isBrand && (
          <>
            <Stat label={isAdmin ? "Total orders" : "My orders"} value={list.length} />
            <Stat label="Pending" value={counts.Pending} hint="Waiting to be processed" />
            <Stat label="Delivered" value={counts.Delivered} />
            <Stat label={isAdmin ? "Total order value" : "Total spent"} value={money(spent)} hint="Excluding cancelled" accent />
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Orders by status */}
        {!isBrand && (
          <Card title="Orders by status">
            {list.length === 0 ? (
              <p className="text-gray-500">No orders yet.</p>
            ) : (
              <>
                <div className="flex h-3 overflow-hidden rounded-full bg-gray-100">
                  {STATUSES.map((s) => counts[s] > 0 && (
                    <div key={s} className={BAR[s]} style={{ width: `${(counts[s] / list.length) * 100}%` }} />
                  ))}
                </div>
                <ul className="mt-4 space-y-2">
                  {STATUSES.map((s) => (
                    <li key={s} className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-2"><span className={`h-3 w-3 rounded-full ${BAR[s]}`} />{s}</span>
                      <b>{counts[s]}</b>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Card>
        )}

        {/* Recent orders */}
        {!isBrand && (
          <div className="lg:col-span-2">
            <Card title="Recent orders" href="/dashboard/orders" linkText="View all">
              {list.length === 0 ? (
                <p className="text-gray-500">Orders will appear here.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[480px] text-left text-sm">
                    <thead className="text-gray-500">
                      <tr>
                        <th className="pb-2">Order</th>
                        {isAdmin && <th className="pb-2">Distributor</th>}
                        <th className="pb-2">Items</th>
                        <th className="pb-2">Total</th>
                        <th className="pb-2">Status</th>
                        <th className="pb-2">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {newest(list).slice(0, 5).map((o) => (
                        <tr key={o._id} className="border-t border-gray-100">
                          <td className="py-3 font-bold">#{o._id.slice(-6)}</td>
                          {isAdmin && <td className="py-3">{o.distributor?.name}</td>}
                          <td className="py-3">{o.orderItems[0]?.product?.title}{o.orderItems.length > 1 && ` +${o.orderItems.length - 1}`}</td>
                          <td className="py-3">{money(o.totalAmount)}</td>
                          <td className="py-3"><StatusBadge status={o.status} /></td>
                          <td className="py-3 text-gray-500">{date(o.createdAt)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card>
          </div>
        )}

        {/* Brand: low stock + my products */}
        {isBrand && (
          <>
            <Card title="Low stock alerts">
              {lowStock.length === 0 ? (
                <p className="text-gray-500">All your products have healthy stock.</p>
              ) : (
                <ul className="space-y-3">
                  {lowStock.map((p) => (
                    <li key={p._id} className="flex items-center justify-between text-sm">
                      <span className="font-medium">{p.title}</span>
                      <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-800">{p.stock} left</span>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
            <div className="lg:col-span-2">
              <Card title="My latest products" href="/dashboard/products" linkText="Manage">
                {mine.length === 0 ? (
                  <p className="text-gray-500">You have not added any product yet.</p>
                ) : (
                  <ul className="divide-y divide-gray-100">
                    {newest(mine).slice(0, 5).map((p) => (
                      <li key={p._id} className="flex items-center gap-4 py-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.imageUrl} alt={p.title} className="h-12 w-12 rounded-lg object-cover" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-bold">{p.title}</p>
                          <p className="text-sm text-gray-500">{p.category} · MOQ {p.moq}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{money(p.price)}</p>
                          <p className="text-xs text-gray-500">{p.stock} in stock</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          </>
        )}
      </div>

      {/* New in catalog (distributor + admin) */}
      {!isBrand && (
        <Card title="New in catalog" href="/dashboard/products" linkText="See all products">
          {products.length === 0 ? (
            <p className="text-gray-500">No products yet.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {newest(products).slice(0, 4).map((p) => (
                <Link key={p._id} href="/dashboard/products" className="overflow-hidden rounded-lg border border-gray-200 hover:shadow-md">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.imageUrl} alt={p.title} className="h-32 w-full object-cover" />
                  <div className="p-3">
                    <p className="text-xs font-bold uppercase text-red-700">{p.category}</p>
                    <p className="truncate font-bold">{p.title}</p>
                    <p className="text-sm text-gray-500">{money(p.price)} · MOQ {p.moq}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Card>
      )}
    </div>
  );
}