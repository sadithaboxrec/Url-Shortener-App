function Features() {
  const features = [
    {
      icon: "⚡",
      title: "Fast Redirects",
      description: "Instantly redirect users to their destination.",
    },
    {
      icon: "📈",
      title: "Analytics",
      description: "Track clicks and monitor link performance.",
    },
    {
      icon: "🔒",
      title: "Secure",
      description: "Built with secure authentication and protected links.",
    },
    {
      icon: "📱",
      title: "QR Codes",
      description: "Generate QR codes for easy sharing.",
    },
  ];

  return (
    <section className="py-16">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Features
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border p-6 text-center shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 text-5xl">{feature.icon}</div>
              <h3 className="mb-2 text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;