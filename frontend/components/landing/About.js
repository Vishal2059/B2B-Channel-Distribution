const brands = [
  "List products with price, MOQ and stock",
  "Receive orders from distributors in one place",
  "Update the status of every order",
  "Stock reduces automatically on each order",
];
const distributors = [
  "Browse the full product catalog",
  "See wholesale price, MOQ and available stock",
  "Place bulk orders with a delivery address",
  "Track every order from Pending to Delivered",
];

function Card({ title, subtitle, items }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-7">
      <h3 className="text-xl font-bold text-red-700">{title}</h3>
      <p className="mb-4 mt-1 text-gray-500">{subtitle}</p>
      <ul className="space-y-3">
        {items.map((t) => (
          <li key={t} className="flex gap-3">
            <svg className="mt-1 shrink-0" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="3" aria-hidden="true">
              <path d="M5 12l5 5L20 7" />
            </svg>
            <span>{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-bold tracking-[0.12em] text-red-700">ABOUT THE PLATFORM</p>
        <h2 className="mx-auto mb-4 mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Wholesale buying and selling, made simple
        </h2>
        <p className="mx-auto mb-12 max-w-3xl text-center text-lg leading-relaxed text-gray-500">
          Getting products from a brand to regional supermarkets and convenience stores usually means calls,
          spreadsheets and follow-ups. Our platform brings brands and distributors together so product
          discovery, ordering and tracking all happen in one place.
        </p>
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="For Brands" subtitle="Reach distributors without the legwork" items={brands} />
          <Card title="For Distributors" subtitle="Find and order products with confidence" items={distributors} />
        </div>
      </div>
    </section>
  );
}