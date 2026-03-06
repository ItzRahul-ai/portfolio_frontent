import { useCallback, useEffect, useMemo, useState } from "react";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { adminApi } from "../api/client";

const statusOptions = ["Pending", "In Progress", "Completed"];

const AdminPanel = () => {
  const [metrics, setMetrics] = useState({
    totalClients: 0,
    completedProjects: 0,
    pendingProjects: 0,
    totalRevenue: 0,
  });
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [drafts, setDrafts] = useState({});
  const [savingId, setSavingId] = useState("");

  const hydrateDrafts = (items) => {
    const nextDrafts = {};
    items.forEach((item) => {
      nextDrafts[item.id] = {
        status: item.status,
        price: item.price || 0,
        projectDetails: item.projectDetails || "",
        projectLinks: item.projectLinks?.join(", ") || "",
        progressMessage: "",
      };
    });
    setDrafts(nextDrafts);
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [metricsRes, inquiriesRes] = await Promise.all([
        adminApi.metrics(),
        adminApi.inquiries({ status: statusFilter || undefined, search: search || undefined }),
      ]);

      setMetrics(metricsRes.data);
      setInquiries(inquiriesRes.data.inquiries || []);
      hydrateDrafts(inquiriesRes.data.inquiries || []);
    } catch (loadError) {
      setError(loadError?.response?.data?.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((item) => {
      const matchesSearch = search
        ? [item.name, item.email, item.projectType].join(" ").toLowerCase().includes(search.toLowerCase())
        : true;
      const matchesStatus = statusFilter ? item.status === statusFilter : true;
      return matchesSearch && matchesStatus;
    });
  }, [inquiries, search, statusFilter]);

  const updateDraft = (id, field, value) => {
    setDrafts((current) => ({
      ...current,
      [id]: {
        ...current[id],
        [field]: value,
      },
    }));
  };

  const handleSave = async (id) => {
    const draft = drafts[id];
    if (!draft) return;

    setSavingId(id);
    try {
      const payload = {
        status: draft.status,
        price: Number(draft.price || 0),
        projectDetails: draft.projectDetails,
        projectLinks: draft.projectLinks
          .split(",")
          .map((link) => link.trim())
          .filter(Boolean),
      };

      if (draft.progressMessage.trim()) {
        payload.progressMessage = draft.progressMessage.trim();
      }

      const response = await adminApi.updateInquiry(id, payload);
      const updatedInquiry = response.data.inquiry;

      setInquiries((current) => current.map((item) => (item.id === id ? updatedInquiry : item)));
      setDrafts((current) => ({
        ...current,
        [id]: {
          ...current[id],
          status: updatedInquiry.status,
          price: updatedInquiry.price,
          projectDetails: updatedInquiry.projectDetails || "",
          projectLinks: updatedInquiry.projectLinks?.join(", ") || "",
          progressMessage: "",
        },
      }));

      const metricsResponse = await adminApi.metrics();
      setMetrics(metricsResponse.data);
    } catch (saveError) {
      setError(saveError?.response?.data?.message || "Update failed");
    } finally {
      setSavingId("");
    }
  };

  return (
    <>
      <Seo title="Admin Panel | dipCoder" description="Secure admin dashboard to manage all client inquiries and project progress." />
      <PageContainer>
        <SectionTitle
          eyebrow="Admin Panel"
          title="Client management and project tracking dashboard."
          subtitle="View all inquiries, update statuses, set pricing, and upload project delivery links."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Total Clients</p>
            <p className="mt-2 font-display text-3xl font-bold text-cyan-200">{metrics.totalClients}</p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Completed</p>
            <p className="mt-2 font-display text-3xl font-bold text-emerald-200">{metrics.completedProjects}</p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Pending</p>
            <p className="mt-2 font-display text-3xl font-bold text-amber-200">{metrics.pendingProjects}</p>
          </GlassCard>
          <GlassCard>
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--muted)]">Revenue</p>
            <p className="mt-2 font-display text-3xl font-bold text-violet-200">INR {metrics.totalRevenue}</p>
          </GlassCard>
        </div>

        <GlassCard className="mt-6">
          <div className="grid gap-3 md:grid-cols-[1fr,220px,150px]">
            <input
              className="input-field"
              placeholder="Search by name, email, or project"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="input-field"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option value="">All Statuses</option>
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
            <button type="button" className="button-primary" onClick={loadData}>
              Refresh
            </button>
          </div>
        </GlassCard>

        {loading ? <p className="mt-4 text-sm text-[var(--muted)]">Loading admin data...</p> : null}
        {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}

        <div className="mt-6 space-y-4">
          {filteredInquiries.map((inquiry) => {
            const draft = drafts[inquiry.id] || {};
            return (
              <GlassCard key={inquiry.id}>
                <div className="grid gap-4 lg:grid-cols-[1fr,1fr]">
                  <div>
                    <h3 className="font-display text-xl font-bold">{inquiry.name}</h3>
                    <p className="mt-1 text-sm text-[var(--muted)]">{inquiry.email}</p>
                    <p className="text-sm text-[var(--muted)]">{inquiry.phone}</p>
                    <p className="mt-4 text-sm text-[var(--muted)]">{inquiry.requirements}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <p>
                        <span className="text-[var(--muted)]">Project:</span> {inquiry.projectType}
                      </p>
                      <p>
                        <span className="text-[var(--muted)]">Budget:</span> {inquiry.budget}
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2">
                    <select
                      className="input-field"
                      value={draft.status || inquiry.status}
                      onChange={(event) => updateDraft(inquiry.id, "status", event.target.value)}
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <input
                      className="input-field"
                      type="number"
                      min="0"
                      placeholder="Project Price"
                      value={draft.price ?? 0}
                      onChange={(event) => updateDraft(inquiry.id, "price", event.target.value)}
                    />
                    <textarea
                      className="input-field min-h-24 sm:col-span-2"
                      placeholder="Project details"
                      value={draft.projectDetails || ""}
                      onChange={(event) => updateDraft(inquiry.id, "projectDetails", event.target.value)}
                    />
                    <input
                      className="input-field sm:col-span-2"
                      placeholder="Completed project links (comma separated)"
                      value={draft.projectLinks || ""}
                      onChange={(event) => updateDraft(inquiry.id, "projectLinks", event.target.value)}
                    />
                    <input
                      className="input-field sm:col-span-2"
                      placeholder="Progress update message"
                      value={draft.progressMessage || ""}
                      onChange={(event) => updateDraft(inquiry.id, "progressMessage", event.target.value)}
                    />
                    <button
                      type="button"
                      className="button-primary sm:col-span-2"
                      onClick={() => handleSave(inquiry.id)}
                      disabled={savingId === inquiry.id}
                    >
                      {savingId === inquiry.id ? "Saving..." : "Save Update"}
                    </button>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </PageContainer>
    </>
  );
};

export default AdminPanel;

