function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for getting started.",
    },
    {
      name: "Premium",
      price: "$9/mo",
      description: "More links, analytics, and custom features.",
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for teams and businesses.",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Pricing Preview
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="rounded-xl border p-8 text-center shadow-sm transition hover:shadow-md"
            >
              <h3 className="mb-2 text-2xl font-semibold">
                {plan.name}
              </h3>

              <p className="mb-4 text-4xl font-bold">
                {plan.price}
              </p>

              <p className="text-gray-600">
                {plan.description}
              </p>

              <button className="mt-6 rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Pricing;