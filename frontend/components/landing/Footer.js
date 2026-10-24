const cols = [
  ["Become a Partner", "Business Models", "Partner Benefits", "Application Process"],
  ["About Us", "Contact Us", "Careers", "FAQs"],
  ["Privacy Policy", "Terms & Conditions", "Refund Policy", "Partner Agreement"],
];

export default function Footer() {
  return (
    <footer className="bg-[#C0392B] px-6 pb-12 pt-14 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap gap-12">
          <div className="min-w-[260px] flex-1">
            <div className="mb-4 text-2xl font-bold">ChannelLink</div>
            <p className="leading-relaxed">
              Empowering brands and distributors with technology, operational support and business opportunities.
            </p>
          </div>
          {cols.map((col, i) => (
            <ul key={i} className="min-w-[160px] flex-1 space-y-3">
              {col.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ))}
        </div>
        <div className="mt-10 rounded-3xl bg-white p-9 text-center text-gray-900">
          <h3 className="mb-2 text-2xl font-bold">Stay Updated</h3>
          <p className="mb-5 text-gray-500">Get network updates and growth opportunities in your inbox.</p>
          <div className="mx-auto flex max-w-lg gap-2 rounded-full border border-gray-200 p-1.5">
            <input aria-label="Email" placeholder="Enter your email" className="min-w-0 flex-1 rounded-full px-5 outline-none" />
            <button className="min-h-11 rounded-full bg-red-700 px-7 font-bold text-white hover:bg-red-800">Subscribe</button>
          </div>
        </div>
      </div>
    </footer>
  );
}