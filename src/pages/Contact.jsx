import { useState } from "react";
import Seo from "../components/common/Seo";
import PageContainer from "../components/layout/PageContainer";
import SectionTitle from "../components/common/SectionTitle";
import GlassCard from "../components/common/GlassCard";
import { developer } from "../data/siteData";

const Contact = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailUrl = `mailto:${developer.email}?subject=Project Inquiry for ${developer.brand}&body=${encodeURIComponent(message)}`;
    window.location.href = emailUrl;
  };

  return (
    <>
      <Seo title="Contact | dipCoder" description="Contact Dip Bag for website development projects." />
      <PageContainer>
        <SectionTitle
          eyebrow="Contact"
          title="Let’s discuss your website requirements."
          subtitle="Reach out directly or submit the client inquiry form for detailed planning."
        />

        <div className="grid gap-4 md:grid-cols-2">
          <GlassCard>
            <h3 className="font-display text-xl font-bold">Direct Contact</h3>
            <p className="mt-4 text-sm text-[var(--muted)]">Email: {developer.email}</p>
            <p className="mt-2 text-sm text-[var(--muted)]">Phone: {developer.phone}</p>
            <a
              href={`https://wa.me/${developer.phone.replace(/[^\d+]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="button-primary mt-6 inline-flex"
            >
              Chat on WhatsApp
            </a>
          </GlassCard>

          <GlassCard>
            <h3 className="font-display text-xl font-bold">Quick Message</h3>
            <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
              <textarea
                className="input-field min-h-32"
                placeholder="Write your project idea..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                required
              />
              <button type="submit" className="button-primary w-full">
                Send via Email
              </button>
            </form>
          </GlassCard>
        </div>
      </PageContainer>
    </>
  );
};

export default Contact;


