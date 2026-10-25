const steps = [
  ["Create your account", "Sign up in two quick steps and choose whether you are a Brand or a Distributor."],
  ["Set up your side", "Brands add products with images, price, MOQ and stock. Distributors browse the catalog."],
  ["Place and receive orders", "Distributors order in bulk with a delivery address. Brands see the order instantly."],
  ["Track to delivery", "Brands update the order status and distributors follow it from Pending to Delivered."],
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-20">
      <p className="text-center text-sm font-bold tracking-[0.12em] text-red-700">HOW IT WORKS</p>
      <h2 className="mx-auto mb-12 mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
        Get started in four simple steps
      </h2>
      <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map(([title, text], i) => (
          <li key={title} className="text-center">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-red-700 text-xl font-bold text-white">{i + 1}</span>
            <h3 className="mb-2 mt-4 text-lg font-bold">{title}</h3>
            <p className="leading-relaxed text-gray-500">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}