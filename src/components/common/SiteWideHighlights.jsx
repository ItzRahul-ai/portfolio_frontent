import GlassCard from "./GlassCard";

const highlights = [
  {
    title: "Client-Focused Planning",
    description:
      "Every project starts with clear scope, timeline, and outcome goals so you know exactly what is being built and why.",
  },
  {
    title: "Large Modern Interfaces",
    description:
      "Layouts are optimized for readability with bigger sections, strong spacing, and responsive structure across desktop and mobile.",
  },
  {
    title: "Secure Full-Stack Delivery",
    description:
      "JWT auth, role-based access, validation, and scalable architecture built for production-grade usage.",
  },
];

const SiteWideHighlights = () => (
  <section className="mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-10">
    <div className="mb-6">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-300">Platform Highlights</p>
      <h2 className="font-display mt-2 text-3xl font-bold sm:text-4xl">Built to help you convert visitors into clients.</h2>
      <p className="mt-3 max-w-3xl text-base text-[var(--muted)] sm:text-lg">
        dipCoder combines portfolio storytelling, inquiry capture, and project tracking in one streamlined experience.
      </p>
    </div>
    <div className="grid gap-4 md:grid-cols-3">
      {highlights.map((item) => (
        <GlassCard key={item.title} className="h-full">
          <h3 className="font-display text-2xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-base text-[var(--muted)]">{item.description}</p>
        </GlassCard>
      ))}
    </div>
  </section>
);

export default SiteWideHighlights;

