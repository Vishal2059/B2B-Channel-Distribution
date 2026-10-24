export default function Hero({ onOpen }) {
  return (
    <section className="mx-auto max-w-5xl px-6 pb-12 pt-20 text-center">
      <span className="inline-block rounded-full border-2 border-red-700 px-8 py-3 text-sm font-medium tracking-wide text-red-700">
        THE B2B CHANNEL DISTRIBUTION NETWORK
      </span>
      <h1 className="mx-auto mb-6 mt-8 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
        Reaching every shelf shouldn&apos;t mean going alone.{" "}
        <span className="text-red-700">Join ours.</span>
      </h1>
      <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-gray-500">
        Connect food and consumer brands with regional supermarket and convenience
        store distributors, with technology and support in one ecosystem.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => onOpen("contact")} className="min-h-12 rounded-[10px] border border-gray-200 px-7 font-bold hover:bg-gray-50">
          Get in Touch
        </button>
        <button onClick={() => onOpen("apply")} className="min-h-12 rounded-[10px] bg-red-700 px-7 font-bold text-white hover:bg-red-800">
          Become a Partner
        </button>
      </div>
    </section>
  );
}