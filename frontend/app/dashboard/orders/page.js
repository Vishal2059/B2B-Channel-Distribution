"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import StatusBadge from "@/components/dashboard/StatusBadge";

const STATUSES = ["Pending", "Processing", "Delivered", "Cancelled"];
const money = (n) => `₹${n.toLocaleString("en-IN")}`;
const date = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

export default function Orders() {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);

  const isBrand = user.role === "Brand";
  const isAdmin = user.role === "Admin";
  const canChange = isBrand || isAdmin;

  useEffect(() => {
    const path = isAdmin ? "/api/orders" : isBrand ? "/api/orders/brand-orders" : "/api/orders/myorders";
    api(path, { token })
      .then((data) => setOrders([...data].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))))
      .catch((e) => setError(e.message))
      .finally(() => setLoaded(true));
  }, [isAdmin, isBrand, token]);

  const changeStatus = async (id, status) => {
    setError("");
    try {
      await api(`/api/orders/${id}/status`, { method: "PUT", token, body: { status } });
      setOrders((list) => list.map((o) => (o._id === id ? { ...o, status } : o)));
    } catch (err) {
      setError(err.message);
    }
  };

  const total = (o) => (isBrand ? o.brandTotal : o.totalAmount);

  return (
    <div>
      <h1 className="mb-1 text-3xl font-bold">Orders</h1>
      <p className="mb-6 text-gray-500">
        {isBrand ? "Orders received for your products." : isAdmin ? "All orders on the platform." : "Orders you have placed."}
      </p>
      {error && <p className="mb-4 font-medium text-red-700">{error}</p>}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[760px] text-left">
          <thead className="text-sm text-gray-500">
            <tr>
              <th className="p-4">Order</th>
              {canChange && <th className="p-4">Distributor</th>}
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              {isBrand && <th className="p-4">Ship to</th>}
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o._id} className="border-t border-gray-200 align-top">
                <td className="p-4 font-bold">#{o._id.slice(-6)}</td>
                {canChange && (
                  <td className="p-4">
                    <p className="font-medium">{o.distributor?.name}</p>
                    <p className="text-sm text-gray-500">{o.distributor?.email}</p>
                  </td>
                )}
                <td className="p-4">
                  {o.orderItems.map((i) => (
                    <div key={i._id}>{i.product?.title} × {i.quantity}</div>
                  ))}
                </td>
                <td className="p-4">{money(total(o))}</td>
                {isBrand && (
                  <td className="p-4 text-sm">
                    {o.shippingAddress?.address}, {o.shippingAddress?.city} {o.shippingAddress?.postalCode}
                  </td>
                )}
                <td className="p-4 text-gray-500">{date(o.createdAt)}</td>
                <td className="p-4">
                  {canChange ? (
                    <select value={o.status} onChange={(e) => changeStatus(o._id, e.target.value)}
                      className="min-h-10 rounded-lg border border-gray-300 px-2">
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  ) : (
                    <StatusBadge status={o.status} />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loaded && orders.length === 0 && <p className="p-5 text-gray-500">No orders yet.</p>}
      </div>
    </div>
  );
}