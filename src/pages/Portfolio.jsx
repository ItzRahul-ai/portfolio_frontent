import { motion as Motion } from "framer-motion";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { projects } from "../data/siteData";

const Portfolio = () => (
  <>
    <Seo title="Portfolio | dipCoder" description="Selected client projects by dipCoder." />
    <PageContainer>
      <SectionTitle
        eyebrow="Portfolio"
        title="Projects built with performance, security, and visual polish."
        subtitle="Each project below represents a production-oriented build tailored to business goals."
      />
      <div className="space-y-4">
        {projects.map((project, index) => (
          <Motion.div
            key={project.title}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <GlassCard>
              <div className="grid gap-4 md:grid-cols-[1.2fr,0.8fr] md:items-start">
                <div>
                  <h3 className="font-display text-2xl font-semibold">{project.title}</h3>
                  <p className="mt-3 text-sm text-[var(--muted)]">{project.summary}</p>
                  <p className="mt-4 text-sm font-semibold text-cyan-300">{project.outcome}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Stack Used</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="rounded-full border border-white/15 px-3 py-1 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </Motion.div>
        ))}
      </div>
    </PageContainer>
  </>
);

export default Portfolio;


