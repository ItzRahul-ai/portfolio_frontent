import { Suspense, lazy, useState } from "react";
import { Link } from "react-router-dom";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { developer, services, projects } from "../data/siteData";

const HeroScene = lazy(() => import("../components/three/HeroScene"));

const Home = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 120]);
  const [enable3D] = useState(() => {
    if (typeof window === "undefined") return false;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSmallScreen = window.matchMedia("(max-width: 640px)").matches;
    return !reduceMotion && !isSmallScreen;
  });

  return (
    <>
      <Seo
        title="dipCoder | Futuristic Developer Portfolio & Client Management"
        description="Modern full-stack developer portfolio for Dip Bag. Build high-performance websites with secure client management."
      />
      <section className="relative min-h-screen overflow-hidden">
        <Motion.div className="absolute inset-0 opacity-80" style={{ y }}>
          {enable3D ? (
            <Suspense fallback={<div className="h-full w-full bg-gradient-to-br from-cyan-600/10 via-blue-600/10 to-violet-600/20" />}>
              <HeroScene />
            </Suspense>
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-cyan-600/10 via-blue-600/10 to-violet-600/20" />
          )}
        </Motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/65 to-[var(--bg)]" />
        <PageContainer className="relative flex min-h-screen items-center pt-36">
          <div className="grid w-full items-center gap-10 lg:grid-cols-[1.2fr,0.8fr]">
            <Motion.div
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-cyan-300">Futuristic Developer Studio</p>
              <h1 className="font-display text-4xl font-extrabold leading-tight sm:text-6xl">
                {developer.name}
                <span className="block text-cyan-300">Builds websites that win clients.</span>
              </h1>
              <p className="mt-5 max-w-2xl text-sm text-[var(--muted)] sm:text-lg">{developer.tagline}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/client-inquiry" className="button-primary">
                  Start Your Project
                </Link>
                <Link to="/portfolio" className="button-ghost">
                  Explore Portfolio
                </Link>
              </div>
            </Motion.div>
            <Motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75, delay: 0.15 }}
              className="grid grid-cols-2 gap-3"
            >
              {[
                { label: "Experience", value: "1 Year+" },
                { label: "Completed", value: "25+" },
                { label: "Avg. Speed", value: "3-5 Weeks" },
                { label: "Tech Stack", value: "MERN + Java" },
              ].map((item) => (
                <GlassCard key={item.label} className="min-h-[130px]">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">{item.label}</p>
                  <p className="mt-3 font-display text-2xl font-bold text-cyan-200">{item.value}</p>
                </GlassCard>
              ))}
            </Motion.div>
          </div>
        </PageContainer>
      </section>

      <PageContainer>
        <SectionTitle
          eyebrow="Services"
          title="Development services focused on business outcomes."
          subtitle="From portfolio websites to full client dashboards, each build is optimized for speed, security, and conversions."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {services.map((service) => (
            <Motion.div key={service.title} whileHover={{ y: -8 }} transition={{ duration: 0.2 }}>
              <GlassCard className="h-full">
                <h3 className="font-display text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm text-[var(--muted)]">{service.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.2em] text-cyan-300">{service.price}</p>
              </GlassCard>
            </Motion.div>
          ))}
        </div>
      </PageContainer>

      <PageContainer>
        <SectionTitle
          eyebrow="Featured Work"
          title="Recent projects with measurable impact."
          subtitle="Production-ready websites and web applications engineered for growth."
        />
        <div className="grid gap-4 md:grid-cols-3">
          {projects.map((project) => (
            <GlassCard key={project.title} className="h-full">
              <h3 className="font-display text-lg font-bold">{project.title}</h3>
              <p className="mt-2 text-sm text-[var(--muted)]">{project.summary}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">{project.outcome}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span key={tech} className="rounded-full border border-cyan-400/30 px-2 py-1 text-xs text-cyan-100">
                    {tech}
                  </span>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </PageContainer>
    </>
  );
};

export default Home;


