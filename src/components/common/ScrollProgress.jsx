import { motion as Motion, useScroll } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <Motion.div
      className="fixed left-0 top-0 z-50 h-1 w-full origin-left bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

export default ScrollProgress;


