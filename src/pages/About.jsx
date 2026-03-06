import { motion as Motion } from "framer-motion";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { developer } from "../data/siteData";

const About = () => (
  <>
    <Seo title="About | dipCoder" description="Know Dip Bag, full-stack developer behind dipCoder." />
    <PageContainer>
      <SectionTitle
        eyebrow="About Dip"
        title="Developer focused on clean architecture and client-first execution."
        subtitle="1 year of hands-on experience building modern websites and full-stack apps with secure backend systems."
      />

      <div className="grid gap-5 md:grid-cols-2">
        <Motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <GlassCard className="h-full">
            <h3 className="font-display text-2xl font-bold">{developer.name}</h3>
            <p className="mt-4 text-sm text-[var(--muted)]">
              I help founders and businesses build high-quality websites that combine speed, strong visual identity, and
              conversion-focused structure.
            </p>
            <p className="mt-4 text-sm text-[var(--muted)]">
              My workflow prioritizes production-ready architecture, secure APIs, and responsive experiences that look
              premium on both desktop and mobile.
            </p>
          </GlassCard>
        </Motion.div>

        <Motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <GlassCard className="h-full">
            <h3 className="font-display text-2xl font-bold">Quick Facts</h3>
            <ul className="mt-4 space-y-3 text-sm text-[var(--muted)]">
              <li>
                <span className="text-cyan-300">Brand:</span> {developer.brand}
              </li>
              <li>
                <span className="text-cyan-300">Experience:</span> {developer.experience}
              </li>
              <li>
                <span className="text-cyan-300">Email:</span> {developer.email}
              </li>
              <li>
                <span className="text-cyan-300">Phone:</span> {developer.phone}
              </li>
            </ul>
          </GlassCard>
        </Motion.div>
      </div>
    </PageContainer>
  </>
);

export default About;


