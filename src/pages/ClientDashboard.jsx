import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { inquiryApi } from "../api/client";
import { useAuth } from "../contexts/AuthContext";

const statusClassMap = {
  Pending: "bg-amber-500/20 text-amber-200",
  "In Progress": "bg-blue-500/20 text-blue-200",
  Completed: "bg-emerald-500/20 text-emerald-200",
};

const ClientDashboard = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [inquiries, setInquiries] = useState([]);

  useEffect(() => {
    const loadInquiries = async () => {
      try {
        const response = await inquiryApi.mine();
        setInquiries(response.data.inquiries || []);
      } catch (loadError) {
        setError(loadError?.response?.data?.message || "Unable to load inquiries");
      } finally {
        setLoading(false);
      }
    };

    loadInquiries();
  }, []);

  return (
    <>
      <Seo title="Client Dashboard | dipCoder" description="Track inquiry status, pricing, and project updates." />
      <PageContainer>
        <SectionTitle
          eyebrow="Client Dashboard"
          title={`Welcome${user?.name ? `, ${user.name}` : ""}`}
          subtitle="Track your project status, budget updates, and delivered links in one place."
        />

        {loading ? <p className="text-sm text-[var(--muted)]">Loading your inquiries...</p> : null}
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}

        {!loading && !error && inquiries.length === 0 ? (
          <GlassCard>
            <p className="text-sm text-[var(--muted)]">No inquiry found yet.</p>
            <Link className="button-primary mt-4 inline-flex" to="/client-inquiry">
              Submit New Inquiry
            </Link>
          </GlassCard>
        ) : null}

        <div className="space-y-4">
          {inquiries.map((inquiry) => (
            <GlassCard key={inquiry.id}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-xl font-bold">{inquiry.projectType}</h3>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusClassMap[inquiry.status] || ""}`}>
                  {inquiry.status}
                </span>
              </div>
              <p className="mt-3 text-sm text-[var(--muted)]">{inquiry.requirements}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Budget</p>
                  <p className="text-sm">{inquiry.budget}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Quoted Price</p>
                  <p className="text-sm">{inquiry.price ? `INR ${inquiry.price}` : "Pending"}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Timeline</p>
                  <p className="text-sm">{inquiry.timeline}</p>
                </div>
              </div>
              {inquiry.projectDetails ? (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Project Details</p>
                  <p className="text-sm text-[var(--muted)]">{inquiry.projectDetails}</p>
                </div>
              ) : null}
              {inquiry.progressUpdates?.length ? (
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Progress Updates</p>
                  {inquiry.progressUpdates.map((update, index) => (
                    <div key={`${inquiry.id}-update-${index}`} className="rounded-xl border border-white/10 p-3 text-sm text-[var(--muted)]">
                      {update.message}
                    </div>
                  ))}
                </div>
              ) : null}
              {inquiry.projectLinks?.length ? (
                <div className="mt-4 space-y-2">
                  <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Completed Links</p>
                  {inquiry.projectLinks.map((link) => (
                    <a
                      key={link}
                      href={link}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-sm text-cyan-300 hover:text-cyan-200"
                    >
                      {link}
                    </a>
                  ))}
                </div>
              ) : null}
            </GlassCard>
          ))}
        </div>
      </PageContainer>
    </>
  );
};

export default ClientDashboard;

