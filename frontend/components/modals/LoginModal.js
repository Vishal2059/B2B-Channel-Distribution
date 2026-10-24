"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { Field, Button } from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";

export default function LoginModal({ onClose, onSwitch }) {
  const { login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault(); // page reload roko
    setBusy(true);
    setError("");
    try {
      await login(form.email, form.password);
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  return (
    <Modal title="Login to the" highlight="Partner Portal" onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-4">
        <Field label="Email Address" type="email" required placeholder="Enter your partner email address"
          value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        <Field label="Password" type="password" required placeholder="Enter your password"
          value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
        {error && <p className="text-sm font-medium text-red-700">{error}</p>}
        <Button type="submit" disabled={busy}>{busy ? "Logging in..." : "Login"}</Button>
        <p className="text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <button type="button" onClick={() => onSwitch("apply")} className="font-bold text-red-700">Register here</button>
        </p>
      </form>
    </Modal>
  );
}