"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Field, Button } from "@/components/ui/Field";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function OrderModal({ product, onClose, onDone }) {
  const { token } = useAuth();
  const [qty, setQty] = useState(product.moq);
  const [addr, setAddr] = useState({ address: "", city: "", postalCode: "", country: "India" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setAddr({ ...addr, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      await api("/api/orders", {
        method: "POST",
        token,
        body: { orderItems: [{ product: product._id, quantity: Number(qty) }], shippingAddress: addr },
      });
      onDone();
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title="Place order for" highlight={product.title} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label={`Quantity (min ${product.moq}, stock ${product.stock})`} type="number" required
          min={product.moq} max={product.stock} value={qty} onChange={(e) => setQty(e.target.value)} />
        <p className="font-bold">Total: ₹{(product.price * qty).toLocaleString("en-IN")}</p>
        <Field label="Address" required value={addr.address} onChange={set("address")} />
        <div className="flex flex-wrap gap-4">
          <Field label="City" required className="min-w-[160px] flex-1" value={addr.city} onChange={set("city")} />
          <Field label="Postal Code" required className="min-w-[160px] flex-1" value={addr.postalCode} onChange={set("postalCode")} />
        </div>
        <Field label="Country" required value={addr.country} onChange={set("country")} />
        {error && <p className="text-sm font-medium text-red-700">{error}</p>}
        <Button type="submit" disabled={busy}>{busy ? "Placing..." : "Place Order"}</Button>
      </form>
    </Modal>
  );
}