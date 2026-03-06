import { motion as Motion } from "framer-motion";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { services } from "../data/siteData";

const processSteps = [
  "Discovery & requirement mapping",
  "Design direction + wireframe",
  "Full-stack implementation",
  "QA, optimization and delivery",
];

const Services = () => (
  <>
    <Seo title="Services | dipCoder" description="Website development services by dipCoder for businesses and creators." />
    <PageContainer>
      <SectionTitle
        eyebrow="Services"
        title="From first idea to deployed product."
        subtitle="Flexible packages for portfolio websites, client portals, and complete full-stack systems."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {services.map((service) => (
          <Motion.div key={service.title} whileHover={{ y: -8 }}>
            <GlassCard className="h-full">
              <h3 className="font-display text-xl font-bold">{service.title}</h3>
              <p className="mt-3 text-sm text-[var(--muted)]">{service.description}</p>
              <p className="mt-5 text-xs uppercase tracking-[0.2em] text-cyan-300">{service.price}</p>
            </GlassCard>
          </Motion.div>
        ))}
      </div>

      <div className="mt-10">
        <SectionTitle eyebrow="Workflow" title="Clear delivery process for predictable results." />
        <div className="grid gap-3 md:grid-cols-2">
          {processSteps.map((step, idx) => (
            <GlassCard key={step}>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Step {idx + 1}</p>
              <p className="mt-2 text-sm text-[var(--muted)]">{step}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </PageContainer>
  </>
);

export default Services;


