import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { motion as Motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../common/ThemeToggle";
import { developer } from "../../data/siteData";
import { useAuth } from "../../contexts/AuthContext";
import logo from "../../assets/logo.jpg";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/portfolio", label: "Projects" },
  { to: "/pricing", label: "Pricing" },
  { to: "/blog", label: "Blog" },
  { to: "/client-inquiry", label: "Inquiry" },
  { to: "/contact", label: "Contact" },
];

const getNavClass = ({ isActive }) =>
  `text-xs uppercase tracking-[0.2em] transition-colors ${
    isActive ? "text-cyan-300" : "text-[var(--muted)] hover:text-[var(--text)]"
  }`;

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  return (
    <header className="fixed top-0 z-40 w-full px-4 py-4 sm:px-6">
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3 backdrop-blur-xl">
        <Link to="/" className="flex items-center gap-2">
          <img
            src={logo}
            alt={`${developer.brand} logo`}
            className="h-9 w-9 rounded-full border border-cyan-300/40 object-cover shadow-md"
          />
          <span className="font-display text-lg font-bold tracking-[0.2em] text-cyan-200">{developer.brand}</span>
        </Link>

        <div className="hidden items-center gap-4 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={getNavClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          {!isAuthenticated ? (
            <>
              <Link className="button-ghost" to="/login">
                Login
              </Link>
              <Link className="button-primary" to="/register">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link className="button-ghost" to={isAdmin ? "/admin" : "/client-dashboard"}>
                {isAdmin ? "Admin" : "Dashboard"}
              </Link>
              <button type="button" onClick={logout} className="button-primary">
                Logout
              </button>
            </>
          )}
        </div>

        <button
          type="button"
          className="button-ghost lg:hidden"
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 top-0 h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                open ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 rounded-full bg-current transition-opacity duration-300 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[14px] h-0.5 w-6 rounded-full bg-current transition-transform duration-300 ${
                open ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open ? (
          <Motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="mx-auto mt-3 w-full max-w-6xl rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-3">
              {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={getNavClass} onClick={() => setOpen(false)}>
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2">
              <ThemeToggle />
              {!isAuthenticated ? (
                <>
                  <Link className="button-ghost" to="/login" onClick={() => setOpen(false)}>
                    Login
                  </Link>
                  <Link className="button-primary" to="/register" onClick={() => setOpen(false)}>
                    Sign Up
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    className="button-ghost"
                    to={isAdmin ? "/admin" : "/client-dashboard"}
                    onClick={() => setOpen(false)}
                  >
                    {isAdmin ? "Admin" : "Dashboard"}
                  </Link>
                  <button type="button" onClick={logout} className="button-primary">
                    Logout
                  </button>
                </>
              )}
            </div>
            {user ? <p className="mt-3 text-xs text-[var(--muted)]">Signed in as {user.email}</p> : null}
          </Motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;


