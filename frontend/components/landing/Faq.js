const faqs = [
  ["Who can join the platform?", "Brands and manufacturers who want to sell in bulk, and distributors who want to source products for supermarkets and convenience stores."],
  ["How do I get started?", "Click Get Started, choose Brand or Distributor, and create your account in two quick steps. You land on your dashboard right away."],
  ["What is MOQ?", "MOQ means Minimum Order Quantity. It is the smallest quantity of a product that a distributor can order."],
  ["Can I see what stock is available before I order?", "Yes. Every product shows its wholesale price, MOQ and the stock currently available."],
  ["How do I track my order?", "Open the Orders page in your dashboard. Each order shows its status: Pending, Processing, Delivered or Cancelled."],
  ["Is my account secure?", "Yes. Passwords are stored in encrypted form and every request to the server is protected with a login token."],
];

export default function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 bg-gray-50 py-20">
      <div className="mx-auto max-w-3xl px-6">
        <p className="text-center text-sm font-bold tracking-[0.12em] text-red-700">FAQ</p>
        <h2 className="mb-10 mt-3 text-center text-3xl font-bold tracking-tight sm:text-4xl">Common questions</h2>
        <div className="space-y-3">
          {faqs.map(([q, a]) => (
            <details key={q} className="group rounded-xl border border-gray-200 bg-white px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold">
                {q}
                <span className="text-xl text-red-700 group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 leading-relaxed text-gray-600">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}