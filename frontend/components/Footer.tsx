import Reveal from "./Reveal";

import {
  FaTelegram,
  FaDiscord,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Footer() {
  return (
    <Reveal>
      <footer className="bg-[#050816] text-white py-16 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}

          <div>
            <h2 className="text-3xl font-extrabold text-cyan-400">
              BOTEXIUM
            </h2>

            <p className="text-gray-400 mt-6 leading-7">
              Building a borderless global ecosystem powered by
              software, artificial intelligence, education,
              innovation and blockchain technology.
            </p>
          </div>


          {/* Ecosystem */}

          <div>
            <h3 className="text-xl font-bold mb-5">
              Ecosystem
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a
                  href="#software"
                  className="hover:text-cyan-400 transition"
                >
                  Software
                </a>
              </li>

              <li>
                <a
                  href="#artificialintelligence"
                  className="hover:text-cyan-400 transition"
                >
                  Artificial Intelligence
                </a>
              </li>

              <li>
                <a
                  href="#marketplace"
                  className="hover:text-cyan-400 transition"
                >
                  Marketplace
                </a>
              </li>

            </ul>
          </div>


          {/* Company */}

          <div>
            <h3 className="text-xl font-bold mb-5">
              Company
            </h3>

            <ul className="space-y-3 text-gray-400">

              <li>
                <a
                  href="#about"
                  className="hover:text-cyan-400 transition"
                >
                  About
                </a>
              </li>

              <li>
                <a
                  href="#vision"
                  className="hover:text-cyan-400 transition"
                >
                  Vision
                </a>
              </li>

              <li>
                <a
                  href="#mission"
                  className="hover:text-cyan-400 transition"
                >
                  Mission
                </a>
              </li>

              <li>
                <a
                  href="#roadmap"
                  className="hover:text-cyan-400 transition"
                >
                  Roadmap
                </a>
              </li>

              <li>
                <a
                  href="#community"
                  className="hover:text-cyan-400 transition"
                >
                  Community
                </a>
              </li>

            </ul>
          </div>


          {/* Contact */}

          <div>

            <h3 className="text-xl font-bold mb-5">
              Contact
            </h3>

            <p className="text-gray-400">
              info@botexium.com
            </p>

            <p className="text-gray-400 mt-3">
              Global Digital Ecosystem
            </p>

            <div className="flex gap-5 mt-6 text-2xl text-cyan-400">

              <a
                href="#"
                aria-label="Telegram"
                className="hover:scale-110 transition"
              >
                <FaTelegram />
              </a>

              <a
                href="#"
                aria-label="Discord"
                className="hover:scale-110 transition"
              >
                <FaDiscord />
              </a>

              <a
                href="#"
                aria-label="LinkedIn"
                className="hover:scale-110 transition"
              >
                <FaLinkedin />
              </a>

              <a
                href="#"
                aria-label="X"
                className="hover:scale-110 transition"
              >
                <FaXTwitter />
              </a>

            </div>

          </div>

        </div>


        {/* Bottom */}

        <div className="max-w-7xl mx-auto border-t border-cyan-500/10 mt-16 pt-8 flex flex-col md:flex-row justify-between gap-6 text-gray-400">

          <p>
            © 2026 BOTEXIUM. All Rights Reserved.
          </p>

          <div className="flex gap-6">

            <a
              href="#"
              className="hover:text-cyan-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="hover:text-cyan-400 transition"
            >
              Terms of Service
            </a>

          </div>

        </div>

      </footer>
    </Reveal>
  );
}