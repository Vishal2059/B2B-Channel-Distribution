import Link from "next/link";

const brandFeatures = [
  "List and manage your products",
  "Set wholesale pricing and MOQ",
  "Receive and manage distributor requests",
  "Track orders and grow your network",
];

const distributorFeatures = [
  "Discover verified brands and products",
  "Browse by category and price",
  "Place bulk orders or send inquiries",
  "Track orders and manage purchases",
];

function BusinessCard({ title, description, features, image, href, button, icon }) {
  return (
    <div className="grid overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 md:grid-cols-[1.2fr_0.8fr]">
      <div className="p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-full bg-blue-100 text-xl text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            {icon}
          </span>
          <h3 className="text-lg font-bold text-slate-950 dark:text-white">{title}</h3>
        </div>
        <p className="mb-4 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
        <ul className="space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex gap-2 text-sm text-slate-700 dark:text-slate-300">
              <span className="font-bold text-blue-600">✓</span>{feature}
            </li>
          ))}
        </ul>
        <Link href={href} className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          {button} <span className="ml-2">→</span>
        </Link>
      </div>
      <img src={image} alt={title} className="h-52 w-full object-cover md:h-full" />
    </div>
  );
}

export default function BusinessCards() {
  return (
    <section id="brands" className="mx-auto max-w-7xl px-5 py-10">
      <h2 className="mb-8 text-center text-3xl font-extrabold text-slate-950 dark:text-white">
        One marketplace. Two ways to grow.
      </h2>
      <div className="grid gap-5 lg:grid-cols-2">
        <BusinessCard
          title="For Brand Owner / Manufacturer"
          description="Expand your reach and manage your wholesale business from one place."
          features={brandFeatures}
          image="https://images.unsplash.com/photo-1607082349566-187342175e2f?auto=format&fit=crop&w=700&q=80"
          href="/signup?role=brand"
          button="Join as a Brand"
          icon="▦"
        />
        <div id="distributors">
          <BusinessCard
            title="For Distributor / Wholesaler"
            description="Find reliable suppliers and manage your bulk purchases with ease."
            features={distributorFeatures}
            image="https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=700&q=80"
            href="/signup?role=distributor"
            button="Join as a Distributor"
            icon="▣"
          />
        </div>
      </div>
    </section>
  );
}