import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion as Motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollProgress from "../common/ScrollProgress";
import FloatingWhatsApp from "../common/FloatingWhatsApp";
import CursorTrail from "../common/CursorTrail";
import LoadingScreen from "../common/LoadingScreen";
import SiteWideHighlights from "../common/SiteWideHighlights";

const MainLayout = () => {
  const location = useLocation();
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setBootLoading(false), 900);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
      <div className="page-bg" aria-hidden />
      {bootLoading ? <LoadingScreen /> : null}
      <ScrollProgress />
      <CursorTrail />
      <Navbar />
      <AnimatePresence mode="wait">
        <Motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <Outlet />
        </Motion.div>
      </AnimatePresence>
      <SiteWideHighlights />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default MainLayout;


