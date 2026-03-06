import { motion as Motion } from "framer-motion";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { developer } from "../data/siteData";

const skillLevels = [
  { name: "React", level: 88 },
  { name: "Node.js", level: 84 },
  { name: "MongoDB", level: 78 },
  { name: "JavaScript", level: 86 },
  { name: "Tailwind CSS", level: 90 },
  { name: "Java Core", level: 72 },
];

const Skills = () => (
  <>
    <Seo title="Skills | dipCoder" description="Dip Bag technical skillset: Java, React, Node.js, MongoDB and more." />
    <PageContainer>
      <SectionTitle
        eyebrow="Skill Matrix"
        title="Technology stack aligned for real-world projects."
        subtitle="Balanced frontend, backend, and database strengths for complete web delivery."
      />

      <div className="grid gap-4 md:grid-cols-2">
        <GlassCard>
          <h3 className="font-display text-xl font-semibold">Core Skills</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {developer.skills.map((skill) => (
              <span key={skill} className="rounded-full border border-cyan-400/30 px-3 py-1 text-xs text-cyan-100">
                {skill}
              </span>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="font-display text-xl font-semibold">Proficiency</h3>
          <div className="mt-4 space-y-4">
            {skillLevels.map((skill) => (
              <div key={skill.name}>
                <div className="mb-2 flex justify-between text-xs text-[var(--muted)]">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <Motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </PageContainer>
  </>
);

export default Skills;


