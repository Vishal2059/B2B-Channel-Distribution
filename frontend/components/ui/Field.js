"use client";
import { useId } from "react";

const inputCls =
  "w-full min-h-12 rounded-[10px] border border-gray-200 bg-white px-4 py-3 text-base text-gray-900 placeholder:text-gray-500 focus:border-red-700 focus:outline-none focus:ring-2 focus:ring-red-700/20";

export function Field({ label, required, className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-bold">
        {label} {required && <span className="text-red-700">*</span>}
      </label>
      <input id={id} required={required} className={inputCls} {...props} />
    </div>
  );
}

export function TextArea({ label, ...props }) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-2 block font-bold">{label}</label>
      <textarea id={id} rows={3} className={inputCls} {...props} />
    </div>
  );
}

export function Select({ label, required, options, className = "", ...props }) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-bold">
        {label} {required && <span className="text-red-700">*</span>}
      </label>
      <select id={id} required={required} className={inputCls} {...props}>
        <option value="">Select</option>
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}

export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`min-h-12 w-full rounded-full bg-red-700 px-6 font-bold text-white hover:bg-red-800 disabled:opacity-60 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}