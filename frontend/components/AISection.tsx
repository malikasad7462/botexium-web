import Reveal from "./Reveal";

import { Brain, Bot, Cpu, Sparkles, BadgeCheck } from "lucide-react";

export default function AISection() {
  return (
    <Reveal>
    <section
      id="artificialintelligence"
      className="py-28 px-6 bg-[#081021] text-white"
    >

      <div className="max-w-7xl mx-auto">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}

          <div>

            <span className="uppercase tracking-[4px] text-cyan-400 text-sm font-semibold">
              Artificial Intelligence
            </span>

            <h2 className="text-5xl font-extrabold mt-5 leading-tight">
              AI Powered
              <span className="text-cyan-400">
                {" "}Future Ecosystem
              </span>
            </h2>

            <p className="text-gray-400 text-lg leading-8 mt-8">
              BOTEXIUM integrates Artificial Intelligence into software,
              business, education and digital services to help
              individuals and organizations work smarter,
              faster and more efficiently.
            </p>

            <div className="grid grid-cols-2 gap-5 mt-10">

            <div className="rounded-3xl glass-card p-8 text-center">
              <Bot className="text-cyan-400" size={28} />
              <h3 className="text-cyan-400 font-bold">AI Automation</h3>
            </div>

           <div className="rounded-3xl glass-card p-8 text-center">
             <Cpu className="text-cyan-400" size={28} />
             <h3 className="text-cyan-400 font-bold">Smart Assistants</h3>
           </div>

           <div className="rounded-3xl glass-card p-8 text-center">
             <Sparkles className="text-cyan-400" size={28} />
             <h3 className="text-cyan-400 font-bold">Business Intelligence</h3>
           </div>

           <div className="rounded-3xl glass-card p-8 text-center">
             <BadgeCheck className="text-cyan-400" size={28} />
             <h3 className="text-cyan-400 font-bold">AI Learning</h3>
           </div>

            </div>

          </div>

          {/* Right */}

          <div className="rounded-3xl glass-card p-8 text-center">

            <div className="text-center">

              <div className="flex justify-center mb-6 text-cyan-400">
                <Brain size={80} strokeWidth={1.5} />
             </div>

              <h3 className="text-3xl font-bold text-cyan-400">
                AI Core
              </h3>

              <p className="text-gray-400 mt-6 leading-8">
                The intelligent engine powering the future of
                BOTEXIUM Software, Education, Marketplace and
                Business Ecosystem.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
    </Reveal>
  );
}