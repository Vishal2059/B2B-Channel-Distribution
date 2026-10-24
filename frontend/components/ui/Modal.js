"use client";
import { useEffect } from "react";

export default function Modal({ title, highlight, subtitle, onClose, children }) {
  // Esc dabane par band ho
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-gray-900/55 p-4"
      onClick={onClose}
    >
      <div
        className="relative my-6 w-full max-w-[650px] rounded-2xl bg-white p-7 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="mb-2 text-2xl font-bold tracking-tight sm:text-[28px]">
              {title} <span className="text-red-700">{highlight}</span>
            </h2>
            {subtitle && <p className="leading-relaxed text-gray-500">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-11 w-11 shrink-0 items-center justify-center text-red-700"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M5 5l14 14M19 5L5 19" />
            </svg>
          </button>
        </div>
        <div className="my-5 h-px bg-gray-200" />
        {children}
      </div>
    </div>
  );
}