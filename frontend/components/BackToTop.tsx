"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Dashboard ka main content container
    const mainContent = document.querySelector("main.flex-1.overflow-y-auto");
    
    // Agar dashboard nahi hai toh window scroll use karo
    const scrollTarget = mainContent || window;

    const handleScroll = () => {
      if (mainContent) {
        setVisible(mainContent.scrollTop > 300);
      } else {
        setVisible(window.scrollY > 300);
      }
    };

    scrollTarget.addEventListener("scroll", handleScroll);
    return () => scrollTarget.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    const mainContent = document.querySelector("main.flex-1.overflow-y-auto");
    if (mainContent) {
      mainContent.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-cyan-500 text-white shadow-lg shadow-cyan-500/30 hover:bg-cyan-400 transition-all duration-300"
      aria-label="Back to top"
    >
      <ChevronUp size={24} />
    </button>
  );
}