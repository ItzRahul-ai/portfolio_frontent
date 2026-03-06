import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { testimonials } from "../data/siteData";

const Testimonials = () => (
  <>
    <Seo title="Testimonials | dipCoder" description="Client testimonials for dipCoder development services." />
    <PageContainer>
      <SectionTitle
        eyebrow="Client Voices"
        title="What clients say about working with dipCoder."
        subtitle="Reliable execution, responsive communication, and practical solutions."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <GlassCard key={testimonial.name} className="h-full">
            <p className="text-sm text-[var(--muted)]">"{testimonial.quote}"</p>
            <p className="mt-4 font-display text-lg font-semibold">{testimonial.name}</p>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{testimonial.company}</p>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  </>
);

export default Testimonials;


