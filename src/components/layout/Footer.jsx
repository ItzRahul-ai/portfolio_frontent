import { Link } from "react-router-dom";
import { developer } from "../../data/siteData";
import logo from "../../assets/logo.jpg";

const Footer = () => (
  <footer className="border-t border-white/10 pb-20 pt-10">
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6 md:flex-row md:items-end md:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <img
            src={logo}
            alt={`${developer.brand} logo`}
            className="h-10 w-10 rounded-full border border-cyan-300/40 object-cover shadow-md"
          />
          <p className="font-display text-xl font-bold text-cyan-200">{developer.brand}</p>
        </div>
        <p className="mt-2 max-w-lg text-sm text-[var(--muted)]">{developer.tagline}</p>
        <p className="mt-4 text-sm text-[var(--muted)]">
          {developer.email} | {developer.phone}
        </p>
      </div>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link className="button-ghost" to="/client-inquiry">
          Start a Project
        </Link>
        <Link className="button-ghost" to="/contact">
          Contact
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;


