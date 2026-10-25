export default function Cta({ onOpen }) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20 text-center">
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get started?</h2>
      <p className="mx-auto mb-8 mt-3 max-w-xl text-lg text-gray-500">
        Create your free account in two minutes and reach your dashboard right away.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <button onClick={() => onOpen("apply", "Brand")} className="min-h-12 rounded-[10px] bg-red-700 px-7 font-bold text-white hover:bg-red-800">
          Join as a Brand
        </button>
        <button onClick={() => onOpen("apply", "Distributor")} className="min-h-12 rounded-[10px] border-2 border-red-700 px-7 font-bold text-red-700 hover:bg-red-50">
          Join as a Distributor
        </button>
      </div>
    </section>
  );
}