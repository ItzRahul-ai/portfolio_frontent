import { useEffect, useState } from "react";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { inquiryApi } from "../api/client";
import { useAuth } from "../contexts/AuthContext";

const initialForm = {
  name: "",
  phone: "",
  email: "",
  projectType: "",
  budget: "",
  requirements: "",
  timeline: "",
};

const ClientInquiry = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    setFormData((current) => ({
      ...current,
      name: current.name || user.name || "",
      email: current.email || user.email || "",
      phone: current.phone || user.phone || "",
    }));
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    setFeedback("");

    try {
      const response = await inquiryApi.create(formData);
      setFeedback(response.data.message || "Inquiry submitted successfully.");
      setFormData((current) => ({
        ...initialForm,
        name: user?.name || current.name,
        email: user?.email || current.email,
        phone: user?.phone || current.phone,
      }));
    } catch (submitError) {
      const nextError =
        submitError?.response?.data?.errors?.join(", ") ||
        submitError?.response?.data?.message ||
        "Unable to submit inquiry. Please try again.";
      setError(nextError);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Seo
        title="Client Inquiry | dipCoder"
        description="Submit your website project request to dipCoder. Get confirmation by email and admin follow-up."
      />
      <PageContainer>
        <SectionTitle
          eyebrow="Client Inquiry"
          title="Share your project requirements."
          subtitle="After submission, your details are securely stored and a confirmation email is sent."
        />
        <GlassCard>
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
            <input
              className="input-field"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              placeholder="Project Type"
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              placeholder="Budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              required
            />
            <input
              className="input-field"
              placeholder="Timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              required
            />
            <textarea
              className="input-field md:col-span-2 min-h-36"
              placeholder="Website Requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              required
            />
            <button type="submit" className="button-primary md:col-span-2" disabled={submitting}>
              {submitting ? "Submitting..." : "Submit Inquiry"}
            </button>
          </form>
          {feedback ? <p className="mt-4 text-sm text-emerald-300">{feedback}</p> : null}
          {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
        </GlassCard>
      </PageContainer>
    </>
  );
};

export default ClientInquiry;

