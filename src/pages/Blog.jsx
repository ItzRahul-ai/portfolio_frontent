import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { blogPosts } from "../data/siteData";

const Blog = () => (
  <>
    <Seo title="Blog | dipCoder" description="Technical insights by dipCoder on performance, security, and web development." />
    <PageContainer>
      <SectionTitle
        eyebrow="Blog"
        title="Engineering notes from real client projects."
        subtitle="Practical articles on performance optimization, security, and modern web architecture."
      />
      <div className="grid gap-4 md:grid-cols-3">
        {blogPosts.map((post) => (
          <GlassCard key={post.slug} className="h-full">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">
              {post.date} | {post.readTime}
            </p>
            <h3 className="mt-3 font-display text-xl font-bold">{post.title}</h3>
            <p className="mt-3 text-sm text-[var(--muted)]">{post.excerpt}</p>
          </GlassCard>
        ))}
      </div>
    </PageContainer>
  </>
);

export default Blog;


