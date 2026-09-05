"use client";

import { motion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left"
      style={{
        scaleX: scrollYProgress,
        background:
          "linear-gradient(to right,#06b6d4,#22d3ee,#67e8f9)",
      }}
    />
  );
}