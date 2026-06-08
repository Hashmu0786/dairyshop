const steps = [
  {
    step: "01",
    title: "Search & Discover",
    description: "Browse 20+ dairy products from verified suppliers across India. Filter by category or search by name.",
    icon: "🔍",
  },
  {
    step: "02",
    title: "Compare & Review",
    description: "View detailed product specs, pricing, minimum orders, and supplier ratings before making a decision.",
    icon: "📋",
  },
  {
    step: "03",
    title: "Connect Directly",
    description: "Send an inquiry to suppliers instantly. Discuss bulk pricing, delivery schedules, and payment terms.",
    icon: "🤝",
  },
  {
    step: "04",
    title: "Grow Your Business",
    description: "Build long-term partnerships with reliable dairy suppliers and scale your food business with confidence.",
    icon: "📈",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How It Works</h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Source quality dairy products in four simple steps — no middlemen, no hassle.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item) => (
            <div key={item.step} className="relative rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6">
              <span className="text-3xl">{item.icon}</span>
              <span className="mt-4 block text-xs font-bold uppercase tracking-widest text-emerald-600">
                Step {item.step}
              </span>
              <h3 className="mt-2 text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
