"use client";

import Reveal from "./Reveal";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  const faqs = [
    {
      q: "What is BOTEXIUM?",
      a: "BOTEXIUM is a global Web3 business ecosystem connecting software, AI, education, blockchain and digital businesses.",
    },
    {
      q: "What is BOTEXIUM Token?",
      a: "BOTEXIUM Token powers payments, rewards, ecosystem services and future governance.",
    },
    {
      q: "Why should I use BOTEXIUM Token?",
      a: "Clients paying with BOTEXIUM Token receive exclusive discounts and ecosystem benefits.",
    },
    {
      q: "Which blockchain will BOTEXIUM use?",
      a: "BOTEXIUM will initially launch on BNB Smart Chain with future multi-chain expansion.",
    },
    {
      q: "Is BOTEXIUM only a cryptocurrency?",
      a: "No. BOTEXIUM is building a complete global ecosystem of businesses, software, AI and education.",
    },
    {
      q: "When might the BOTEXIUM token be listed on exchanges?",
      a: "The BOTEXIUM token is expected to be listed on exchanges in December 2028.",
    },
    {
      q: "What could be the listing price of the BOTEXIUM token?",
      a: "Based on the project's potential, its price could range from $1 to $2. However token prices in the  crypto market also depend on global conditions and market behavior; therefore, assuming a lower valuation the price could be as low as $0.2.",
    },
  ];

  return (
    <Reveal>
    <section id="faq" className="bg-[#050816] py-28 px-6">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-16">
          <h2 className="text-5xl font-black text-white">
            Frequently Asked Questions
          </h2>

          <p className="mt-5 text-gray-300">
            Everything you need to know about BOTEXIUM.
          </p>
        </div>

        <div className="space-y-5">

          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass-card overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="w-full flex items-center justify-between p-7 text-left"
              >
                <span className="text-xl font-bold text-cyan-400">
                  {faq.q}
                </span>

                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-7 pb-7 text-gray-300 leading-8">
                  {faq.a}
                </div>
              )}
            </div>
          ))}

        </div>

      </div>
    </section>
    </Reveal>
  );
}