"use client";

export default function Footer({ onOpen }) {
  return (
    <footer className="bg-[#C0392B] px-6 pb-8 pt-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-10">
          <div className="min-w-[260px] flex-1">
            <div className="mb-3 text-2xl font-bold">Ricoz Innovation</div>
            <p className="max-w-sm leading-relaxed">
              A B2B platform that connects brands with regional distributors for simple wholesale ordering.
            </p>
          </div>
          <ul className="min-w-[160px] space-y-3">
            <li className="font-bold">Explore</li>
            <li><a href="#about">About</a></li>
            <li><a href="#how-it-works">How it works</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
          <ul className="min-w-[160px] space-y-3">
            <li className="font-bold">Get involved</li>
            <li><button onClick={() => onOpen("apply", "Brand")}>Join as a Brand</button></li>
            <li><button onClick={() => onOpen("apply", "Distributor")}>Join as a Distributor</button></li>
            <li><button onClick={() => onOpen("login")}>Login</button></li>
            <li><button onClick={() => onOpen("contact")}>Get in Touch</button></li>
          </ul>
        </div>
        <p className="mt-10 border-t border-white/30 pt-6 text-sm text-white/80">
          © 2026 Ricoz Innovation. All rights reserved.
        </p>
      </div>
    </footer>
  );
}