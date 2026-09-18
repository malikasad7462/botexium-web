"use client";

import Reveal from "./Reveal";
import {
  FaTelegram,
  FaDiscord,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <Reveal>
      <footer className="bg-[#050816] border-t border-cyan-500/10 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <h3 className="text-2xl font-black tracking-[6px] text-cyan-400">BOTEXIUM</h3>
              <p className="text-gray-400 text-sm mt-4">
                Connecting the digital economy through AI, software, and blockchain.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="/" className="hover:text-cyan-400 transition">Home</a></li>
                <li><a href="/dashboard" className="hover:text-cyan-400 transition">Dashboard</a></li>
                <li><a href="/login" className="hover:text-cyan-400 transition">Login</a></li>
                <li><a href="/register" className="hover:text-cyan-400 transition">Register</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="flex items-center gap-2">
                  <FaEnvelope size={16} className="text-cyan-400" />
                  <a href="mailto:info@botexium.com" className="hover:text-cyan-400 transition">
                    info@botexium.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">🌐</span>
                  <span>Global Ecosystem</span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Follow Us</h4>
              <div className="flex gap-4">
                <a
                  href="https://x.com/BOTEXIUM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition text-gray-400 hover:text-cyan-400"
                  aria-label="X"
                >
                  <FaXTwitter size={20} />
                </a>
                <a
                  href="https://t.me/BOTEXIUM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition text-gray-400 hover:text-cyan-400"
                  aria-label="Telegram"
                >
                  <FaTelegram size={20} />
                </a>
                <a
                  href="https://discord.gg/BOTEXIUM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition text-gray-400 hover:text-cyan-400"
                  aria-label="Discord"
                >
                  <FaDiscord size={20} />
                </a>
                <a
                  href="https://linkedin.com/company/botexium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition text-gray-400 hover:text-cyan-400"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://youtube.com/@botexium"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full border border-cyan-500/20 hover:border-cyan-400 hover:bg-cyan-400/10 transition text-gray-400 hover:text-cyan-400"
                  aria-label="YouTube"
                >
                  <FaYoutube size={20} />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 pt-8 border-t border-cyan-500/10 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} BOTEXIUM. All rights reserved.
          </div>

          <div className="flex gap-4 text-sm text-gray-500 justify-center mt-4">
            <a href="/privacy-policy" className="hover:text-cyan-400 transition">Privacy Policy</a>
            <a href="/terms-of-service" className="hover:text-cyan-400 transition">Terms of Service</a>
          </div>
        </div>
      </footer>
    </Reveal>
  );
}