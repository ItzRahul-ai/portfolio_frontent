import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { pricingPlans } from "../data/siteData";

const Pricing = () => (
  <>
    <Seo title="Pricing | dipCoder" description="Website development pricing plans by dipCoder." />
    <PageContainer>
      <SectionTitle
        eyebrow="Pricing"
        title="Transparent packages designed for different project stages."
        subtitle="Choose a plan and submit your requirements. Final quote is adjusted based on scope."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {pricingPlans.map((plan) => (
          <GlassCard key={plan.name} className="h-full">
            <h3 className="font-display text-2xl font-bold">{plan.name}</h3>
            <p className="mt-2 text-2xl font-semibold text-cyan-300">{plan.price}</p>
            <p className="mt-3 text-sm text-[var(--muted)]">{plan.description}</p>
            <ul className="mt-4 space-y-2 text-sm text-[var(--muted)]">
              {plan.features.map((feature) => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
            <Link to="/client-inquiry" className="button-primary mt-6 inline-flex">
              Select Plan
            </Link>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  </>
);

export default Pricing;



