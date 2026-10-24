"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { Field, TextArea, Button } from "@/components/ui/Field";
import OrderModal from "@/components/dashboard/OrderModal";

const empty = { title: "", description: "", category: "", price: "", moq: 1, stock: 0 };

export default function Products() {
  const { user, token } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [orderFor, setOrderFor] = useState(null);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const load = () => api("/api/products").then(setProducts).catch((e) => setError(e.message));
  useEffect(() => { load(); }, []);

  const addProduct = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      // File bhejni ho to JSON nahi, FormData use hota hai
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      fd.append("image", image);
      await api("/api/products", { method: "POST", token, body: fd, isForm: true });
      setForm(empty);
      setImage(null);
      e.target.reset();
      await load();
    } catch (err) {
      setError(err.message);
    }
    setBusy(false);
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold">Products</h1>
      {msg && <p className="mb-4 rounded-lg bg-green-100 p-3 font-medium text-green-800">{msg}</p>}

      {user.role === "Brand" && (
        <form onSubmit={addProduct} className="mb-8 grid gap-4 rounded-xl border border-gray-200 bg-white p-5 sm:grid-cols-2">
          <h2 className="text-xl font-bold sm:col-span-2">Add product</h2>
          <Field label="Title" required value={form.title} onChange={set("title")} />
          <Field label="Category" required value={form.category} onChange={set("category")} />
          <Field label="Wholesale price (₹)" type="number" required min={0} value={form.price} onChange={set("price")} />
          <Field label="MOQ (min order qty)" type="number" required min={1} value={form.moq} onChange={set("moq")} />
          <Field label="Stock" type="number" required min={0} value={form.stock} onChange={set("stock")} />
          <div>
            <label className="mb-2 block font-bold">Image <span className="text-red-700">*</span></label>
            <input type="file" accept="image/*" required onChange={(e) => setImage(e.target.files[0])} className="min-h-12 w-full" />
          </div>
          <div className="sm:col-span-2">
            <TextArea label="Description" required value={form.description} onChange={set("description")} />
          </div>
          {error && <p className="text-sm font-medium text-red-700 sm:col-span-2">{error}</p>}
          <div className="sm:col-span-2"><Button type="submit" disabled={busy}>{busy ? "Uploading..." : "Add Product"}</Button></div>
        </form>
      )}

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((p) => (
          <div key={p._id} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.imageUrl} alt={p.title} className="h-44 w-full object-cover" />
            <div className="p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-red-700">{p.category}</p>
              <h3 className="text-lg font-bold">{p.title}</h3>
              <p className="mb-2 text-sm text-gray-500">by {p.brand?.name}</p>
              <p className="text-xl font-bold">₹{p.price.toLocaleString("en-IN")}</p>
              <p className="mb-3 text-sm text-gray-500">MOQ {p.moq} · Stock {p.stock}</p>
              {user.role === "Distributor" && (
                <button onClick={() => setOrderFor(p)} disabled={p.stock < p.moq}
                  className="min-h-11 w-full rounded-lg bg-red-700 font-bold text-white hover:bg-red-800 disabled:opacity-50">
                  {p.stock < p.moq ? "Out of stock" : "Order"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {products.length === 0 && <p className="text-gray-500">No products yet.</p>}

      {orderFor && (
        <OrderModal product={orderFor} onClose={() => setOrderFor(null)}
          onDone={() => { setOrderFor(null); setMsg("Order placed successfully."); load(); }} />
      )}
    </div>
  );
}