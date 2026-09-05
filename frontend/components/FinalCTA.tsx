import Reveal from "./Reveal";

import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <Reveal>
      <section
        className="py-28 px-6 bg-[#081021] text-center"
      >
        <div className="max-w-5xl mx-auto">

          <h2 className="text-5xl font-black text-white">
            Ready To Build The Future?
          </h2>

          <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
            Join BOTEXIUM and become part of a global ecosystem powered by
            blockchain, artificial intelligence, software and real businesses.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">

            {/* 4A — Join Community */}
            <a
              href="#community"
              className="relative z-10 w-full sm:w-auto premium-btn inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Join Community</span>
              <ArrowRight
                size={18}
                className="pointer-events-none"
              />
            </a>

            {/* 4B — Explore Roadmap */}
            <a
              href="#roadmap"
              className="relative z-10 w-full sm:w-auto premium-btn inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Roadmap</span>
              <ArrowRight
                size={18}
                className="pointer-events-none"
              />
            </a>

          </div>

        </div>
      </section>
    </Reveal>
  );
}