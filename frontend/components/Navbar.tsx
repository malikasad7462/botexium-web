"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log(entry.target.id);
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "-90px 0px -45% 0px",
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Roadmap", href: "#roadmap" },
    { name: "Community", href: "#community" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#050816]/80 backdrop-blur-xl border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 py-5">

        <a
          href="#home"
          className="text-3xl font-black tracking-[6px] text-cyan-400"
        >
          BOTEXIUM
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`transition ${
                activeSection === link.href.replace("#", "")
                  ? "text-cyan-400 font-semibold"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Desktop Buttons - Updated */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="/login"
            className="text-sm text-gray-300 hover:text-cyan-400 transition px-3 py-2"
          >
            Sign In
          </a>
          <a
            href="/register"
            className="premium-btn"
          >
            Sign Up
          </a>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-cyan-400"
        >
          {menuOpen ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu - Updated */}
      {menuOpen && (
        <div className="md:hidden bg-[#081021] border-t border-cyan-500/10">
          <nav className="flex flex-col p-6 gap-5">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`transition ${
                  activeSection === link.href.replace("#", "")
                    ? "text-cyan-400 font-semibold"
                    : "text-gray-300 hover:text-cyan-400"
                }`}
              >
                {link.name}
              </a>
            ))}

            {/* Mobile Buttons - Updated */}
            <a
              href="/login"
              onClick={() => setMenuOpen(false)}
              className="text-center text-sm text-gray-300 hover:text-cyan-400 transition py-2"
            >
              Sign In
            </a>
            <a
              href="/register"
              onClick={() => setMenuOpen(false)}
              className="premium-btn text-center"
            >
              Sign Up
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}