const features = [
  ["Centralized Lead Generation", "Receive brand and retailer inquiries through one platform and focus on closing deals."],
  ["Complete Operational Support", "Get help with orders, logistics and workflows so you can run your channel with confidence."],
  ["Technology-Powered Platform", "Manage products, distributors, orders and performance from a single dashboard."],
  ["Training & Business Development", "Structured onboarding and learning resources built for partner growth."],
  ["Marketing & Brand Support", "Promotional campaigns and brand assets to strengthen your regional presence."],
  ["Dedicated Partner Success Team", "A support team that resolves blockers and helps you scale efficiently."],
];

export default function Features() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <p className="text-center text-sm font-bold tracking-[0.12em] text-red-700">WHY US</p>
      <h2 className="mx-auto mb-4 mt-3 max-w-3xl text-center text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
        Everything You Need To Build A Successful Distribution Business
      </h2>
      <p className="mx-auto mb-12 max-w-2xl text-center text-lg leading-relaxed text-gray-500">
        Launch, manage and grow your channel with a complete ecosystem, from technology and training to marketing and operations.
      </p>
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {features.map(([title, text]) => (
          <div key={title} className="text-center">
            <div className="mx-auto flex h-[70px] w-[70px] items-center justify-center rounded-full bg-red-50">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#B91C1C" strokeWidth="2" aria-hidden="true">
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <path d="M4 12h16M12 4v16" />
              </svg>
            </div>
            <h3 className="mb-2 mt-4 text-lg font-bold">{title}</h3>
            <p className="leading-relaxed text-gray-500">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}