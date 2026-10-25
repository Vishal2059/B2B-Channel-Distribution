export default function Hero({ onOpen }) {
  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-16 pt-16 text-center sm:pt-20">
      <span className="inline-block rounded-full border-2 border-red-700 px-6 py-2.5 text-sm font-medium tracking-wide text-red-700">
        B2B WHOLESALE &amp; CHANNEL DISTRIBUTION PLATFORM
      </span>
      <h1 className="mx-auto mb-6 mt-8 max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl">
        One platform where <span className="text-red-700">brands meet distributors.</span>
      </h1>
      <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-gray-500">
        Brands list their food and consumer products. Distributors browse the catalog, place bulk orders
        and track every order, all from one simple dashboard.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => onOpen("apply", "Brand")} className="min-h-12 rounded-[10px] bg-red-700 px-7 font-bold text-white hover:bg-red-800">
          Join as a Brand
        </button>
        <button onClick={() => onOpen("apply", "Distributor")} className="min-h-12 rounded-[10px] border-2 border-red-700 px-7 font-bold text-red-700 hover:bg-red-50">
          Join as a Distributor
        </button>
      </div>
      <p className="mt-4 text-sm text-gray-500">
        Already a partner?{" "}
        <button onClick={() => onOpen("login")} className="font-bold text-red-700">Login</button>
      </p>
    </section>
  );
}