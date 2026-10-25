const features = [
  ["Role-based dashboards", "Brands, distributors and admins each get a dashboard built for what they need to do."],
  ["Product catalog with MOQ and stock", "Every product shows wholesale price, minimum order quantity and live stock."],
  ["Easy product uploads", "Brands add products with images in a simple form. Images are stored securely in the cloud."],
  ["Safe order placement", "Order totals are calculated on the server from real prices, and stock is checked before an order is accepted."],
  ["Live order tracking", "Every order moves through Pending, Processing and Delivered so nobody has to chase updates."],
  ["Secure login", "Passwords are encrypted and every request is protected with token-based authentication."],
];

export default function Features() {
  return (
    <section id="features" className="scroll-mt-20 bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm font-bold tracking-[0.12em] text-red-700">FEATURES</p>
        <h2 className="mx-auto mb-12 mt-3 max-w-3xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to trade in bulk
        </h2>
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
      </div>
    </section>
  );
}