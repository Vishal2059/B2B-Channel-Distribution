
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    name: "Food & Beverages",
    image:
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Personal Care",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Home & Kitchen",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Health & Wellness",
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Snacks & Confectionery",
    image:
      "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Cleaning & Household",
    image:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Baby Care",
    image:
      "https://images.unsplash.com/photo-1604917877934-07d8d248d396?auto=format&fit=crop&w=500&q=80",
  },
  {
    name: "Others",
    image:
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=500&q=80",
  },
];

export default function Categories() {
  return (
    <section
      id="categories"
      className="mx-auto max-w-7xl px-5 py-10"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white sm:text-3xl">
          Browse By Category
        </h2>

        <Link
          href="/signup"
          className="shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          View All →
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
        {categories.map((category) => (
          <Link
            href="/signup"
            key={category.name}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="relative h-28 overflow-hidden bg-slate-100 dark:bg-slate-800">
              <Image
                src={category.image}
                alt={category.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 12vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>

            <div className="flex min-h-[68px] items-center justify-center px-2 py-3 text-center">
              <h3 className="text-xs font-bold leading-5 text-slate-800 dark:text-slate-100 sm:text-sm">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
