import { developer } from "../../data/siteData";

const FloatingWhatsApp = () => {
  const phone = developer.phone.replace(/[^\d+]/g, "");
  const message = encodeURIComponent("Hi Dip, I want to discuss a website project.");

  return (
    <a
      href={`https://wa.me/${phone}?text=${message}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-5 right-5 z-40 rounded-full bg-emerald-500 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition-transform hover:scale-105"
      aria-label="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
};

export default FloatingWhatsApp;


