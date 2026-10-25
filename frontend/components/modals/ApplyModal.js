"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { Field, Select, Button } from "@/components/ui/Field";
import { useAuth } from "@/context/AuthContext";

export default function ApplyModal({ onClose, defaultRole = ""  }) {
  const { signup } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", role: defaultRole, password: "", confirm: "" });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const next = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) return setError("Passwords do not match");
    setBusy(true);
    setError("");
    try {
      await signup({ name: form.name, email: form.email, password: form.password, role: form.role });
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  const dot = (n) =>
    `flex h-11 w-11 items-center justify-center rounded-full font-bold ${step >= n ? "bg-red-700 text-white" : "bg-gray-200 text-gray-700"}`;

  return (
    <Modal title="Apply To Become A" highlight="Partner"
      subtitle="Complete the application below and our team will review your profile and reach out with the next steps."
      onClose={onClose}>
      <div className="mb-6 flex items-center justify-center">
        <span className={dot(1)}>1</span>
        <span className="h-[3px] w-36 bg-gray-200" />
        <span className={dot(2)}>2</span>
      </div>

      {step === 1 ? (
        <form onSubmit={next} className="flex flex-col gap-4">
          <Field label="Full Name" required placeholder="Full name" value={form.name} onChange={set("name")} />
          <Field label="Email Address" type="email" required placeholder="Enter your email address" value={form.email} onChange={set("email")} />
          <Select label="I am a" required options={["Brand", "Distributor"]} value={form.role} onChange={set("role")} />
          <Button type="submit">Next</Button>
        </form>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Password" type="password" required minLength={6} placeholder="Create a password" value={form.password} onChange={set("password")} />
          <Field label="Confirm Password" type="password" required placeholder="Re-enter password" value={form.confirm} onChange={set("confirm")} />
          {error && <p className="text-sm font-medium text-red-700">{error}</p>}
          <div className="flex gap-3">
            <button type="button" onClick={() => setStep(1)} className="min-h-12 rounded-full border border-gray-300 px-8 font-bold">Back</button>
            <Button type="submit" disabled={busy}>{busy ? "Creating account..." : "Create Account"}</Button>
          </div>
        </form>
      )}
    </Modal>
  );
}