import { motion as Motion, useScroll, useTransform } from "framer-motion";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";

const categories = [
  { title: "Frontend", tech: ["React", "JavaScript", "Tailwind CSS", "HTML", "CSS"] },
  { title: "Backend", tech: ["Node.js", "Express.js", "JWT", "Bcrypt"] },
  { title: "Database", tech: ["MongoDB", "MySQL"] },
  { title: "Animation & UI", tech: ["Framer Motion", "Three.js", "Responsive Design"] },
];

const Technologies = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <>
      <Seo title="Technologies | dipCoder" description="Technology ecosystem used by dipCoder for client projects." />
      <PageContainer>
        <SectionTitle
          eyebrow="Technology Stack"
          title="Tools selected for speed, scale, and maintainability."
          subtitle="Modern architecture with practical technology choices aligned to project goals."
        />
        <Motion.div style={{ y }} className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <Motion.div
              key={category.title}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
              style={{ transformStyle: "preserve-3d" }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
            >
              <GlassCard className="h-full">
                <h3 className="font-display text-2xl font-bold">{category.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {category.tech.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-100"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Motion.div>
          ))}
        </Motion.div>
      </PageContainer>
    </>
  );
};

export default Technologies;


