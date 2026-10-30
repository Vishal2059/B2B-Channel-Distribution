
const steps = [
  {
    number: "01",
    icon: "▦",
    title: "Brands list products",
    description:
      "Manufacturers add products, set pricing and minimum order quantities.",
  },
  {
    number: "02",
    icon: "⌕",
    title: "Distributors discover",
    description:
      "Search and explore products from brands that match your business needs.",
  },
  {
    number: "03",
    icon: "🛒",
    title: "Place orders or send inquiries",
    description:
      "Place bulk orders or request quotations directly from suppliers.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mx-auto max-w-7xl px-5 py-12"
    >
      <div className="mb-8 text-center">
        <span className="text-sm font-bold uppercase tracking-widest text-blue-600">
          Simple process
        </span>

        <h2 className="mt-2 text-2xl font-extrabold text-slate-950 dark:text-white sm:text-3xl">
          How LeadMarket Works
        </h2>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
          Connect brands and distributors through a simple wholesale
          buying process.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {steps.map((step) => (
          <div
            key={step.number}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:hover:border-blue-700"
          >
            <div className="flex items-center justify-between">
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-50 text-2xl text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white dark:bg-blue-950 dark:text-blue-400">
                {step.icon}
              </div>

              <span className="text-3xl font-extrabold text-slate-100 dark:text-slate-800">
                {step.number}
              </span>
            </div>

            <h3 className="mt-5 text-lg font-bold text-slate-950 dark:text-white">
              {step.title}
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
