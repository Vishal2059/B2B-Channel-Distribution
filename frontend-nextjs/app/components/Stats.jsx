const stats = [
  { number: "500+", label: "Verified Brands", icon: "✦" },
  { number: "10,000+", label: "Products", icon: "▣" },
  { number: "1,200+", label: "Distributors", icon: "♧" },
  { number: "20+", label: "Categories", icon: "◈" },
];

export default function Stats() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-8">
      <div className="grid grid-cols-2 gap-4 rounded-2xl border border-blue-100 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 md:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex items-center gap-4 px-2 py-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-blue-50 text-xl text-blue-600 dark:bg-blue-950">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-extrabold text-slate-950 dark:text-white">{stat.number}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}