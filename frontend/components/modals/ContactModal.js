"use client";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { Field, Select, TextArea, Button } from "@/components/ui/Field";

export default function ContactModal({ onClose }) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", email: "", occupation: "", city: "", state: "", message: "" });
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    // TODO: backend mein /api/contact banne ke baad yahan api() call lagayenge
    console.log("Contact form:", form);
    setSent(true);
  };

  return (
    <Modal title="Let's Talk About Your" highlight="Business Goals"
      subtitle="Tell us a little about yourself and our partner team will help you explore the right opportunity."
      onClose={onClose}>
      {sent ? (
        <div className="py-8 text-center">
          <p className="text-xl font-bold">Thank you!</p>
          <p className="mt-2 text-gray-500">We have received your inquiry and will reach out soon.</p>
        </div>
      ) : (
        <form onSubmit={submit} className="flex flex-col gap-4">
          <Field label="Full Name" required placeholder="Full name" value={form.name} onChange={set("name")} />
          <Field label="Mobile Number" type="tel" required placeholder="Mobile number" value={form.mobile} onChange={set("mobile")} />
          <Field label="Email Address" type="email" required placeholder="Enter your email address" value={form.email} onChange={set("email")} />
          <Select label="Occupation" required value={form.occupation} onChange={set("occupation")}
            options={["Brand / Manufacturer", "Wholesale Broker", "Distributor", "Supermarket / Retailer", "Other"]} />
          <div className="flex flex-wrap gap-4">
            <Field label="City" required className="min-w-[200px] flex-1" placeholder="Enter your city" value={form.city} onChange={set("city")} />
            <Field label="State" required className="min-w-[200px] flex-1" placeholder="Enter your state" value={form.state} onChange={set("state")} />
          </div>
          <TextArea label="Additional Message" placeholder="Any special query" value={form.message} onChange={set("message")} />
          <Button type="submit">Submit Inquiry</Button>
        </form>
      )}
    </Modal>
  );
}