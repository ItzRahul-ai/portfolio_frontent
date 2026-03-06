
import { motion as Motion } from "framer-motion";
import logo from "../../assets/logo.jpg";

const LoadingScreen = ({ inline = false }) => {
  const wrapperClass = inline
    ? "min-h-[40vh] flex items-center justify-center"
    : "fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg)]";

  return (
    <div className={wrapperClass}>
      <div className="flex flex-col items-center gap-5">
        <div className="relative flex items-center justify-center">
          <Motion.div
            className="absolute h-24 w-24 rounded-full bg-cyan-400/20 blur-xl"
            animate={{ scale: [0.9, 1.2, 0.9], opacity: [0.35, 0.7, 0.35] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          <Motion.img
            src={logo}
            alt="Logo"
            className="h-16 w-16 rounded-full border-2 border-cyan-400/50 bg-white/10 object-contain shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            style={{ boxShadow: "0 0 32px 0 #37e2ff44" }}
          />
          <Motion.div
            className="absolute h-20 w-20 rounded-full border-2 border-cyan-400/30 border-t-cyan-200 opacity-60"
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
        </div>
        <div className="flex items-center gap-2">
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--muted)]">Loading dipCoder</p>
          <Motion.span
            className="text-cyan-300"
            animate={{ opacity: [0.2, 1, 0.2] }}
            transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          >
            ...
          </Motion.span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

