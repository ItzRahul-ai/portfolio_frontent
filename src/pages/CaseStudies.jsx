import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { caseStudies } from "../data/siteData";

const CaseStudies = () => (
  <>
    <Seo title="Case Studies | dipCoder" description="How dipCoder solves real client website challenges." />
    <PageContainer>
      <SectionTitle
        eyebrow="Case Studies"
        title="Challenge-to-solution execution with measurable outcomes."
        subtitle="Approach centered around solving business bottlenecks, not just shipping visuals."
      />
      <div className="space-y-4">
        {caseStudies.map((study, idx) => (
          <GlassCard key={study.challenge}>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">Case {idx + 1}</p>
            <h3 className="mt-2 font-display text-xl font-bold">Challenge</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{study.challenge}</p>
            <h3 className="mt-5 font-display text-xl font-bold">Solution</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">{study.solution}</p>
            <h3 className="mt-5 font-display text-xl font-bold">Result</h3>
            <p className="mt-2 text-sm text-cyan-200">{study.result}</p>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  </>
);

export default CaseStudies;


