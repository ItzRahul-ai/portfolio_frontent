import { motion as Motion } from "framer-motion";

const SectionTitle = ({ eyebrow = "", title, subtitle = "" }) => (
  <Motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.5 }}
    className="mb-10"
  >
    {eyebrow ? (
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">{eyebrow}</p>
    ) : null}
    <h2 className="font-display text-4xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
    {subtitle ? <p className="mt-5 max-w-3xl text-base text-[var(--muted)] sm:text-lg">{subtitle}</p> : null}
  </Motion.div>
);

export default SectionTitle;


