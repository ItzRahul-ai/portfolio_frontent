import { Link } from "react-router-dom";
import PageContainer from "../components/layout/PageContainer";
import GlassCard from "../components/common/GlassCard";
import Seo from "../components/common/Seo";

const NotFound = () => (
  <>
    <Seo title="404 | dipCoder" description="Page not found." />
    <PageContainer className="max-w-xl">
      <GlassCard>
        <h1 className="font-display text-4xl font-extrabold">404</h1>
        <p className="mt-3 text-sm text-[var(--muted)]">This page does not exist.</p>
        <Link to="/" className="button-primary mt-6 inline-flex">
          Back to Home
        </Link>
      </GlassCard>
    </PageContainer>
  </>
);

export default NotFound;


