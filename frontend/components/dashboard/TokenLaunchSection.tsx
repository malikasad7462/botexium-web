"use client";

import { useState } from "react";
import { Rocket, Coins, Clock, Zap, Shield, Bot } from "lucide-react";
import { GlassCard } from "./GlassCard";

export default function TokenLaunchSection() {
  const [totalSupply] = useState(1000000000);

  const phases = [
    { name: "Phase 1", price: "$0.01", allocation: "300M", status: "active" },
    { name: "Phase 2", price: "$0.02", allocation: "200M", status: "upcoming" },
    { name: "Phase 3", price: "$0.03", allocation: "100M", status: "upcoming" },
  ];

  return (
    <section className="relative overflow-hidden bg-[#050816] py-20 sm:py-24 lg:py-32">
      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2.5 text-xs font-medium uppercase tracking-[3px] text-cyan-300 sm:text-sm">
            <Rocket size={16} />
            Token Launch
          </span>
        </div>

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            BOTEXIUM
            <br />
            <span className="hero-title hero-glow">Token Launch</span>
          </h2>
          <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg sm:leading-8 max-w-2xl mx-auto">
            The BOTEXIUM token is no ordinary token; it is a life changing opportunity.
          </p>
        </div>

        {/* Subtitle */}
        <div className="text-center mt-4">
          <span className="text-cyan-400 text-sm font-semibold tracking-widest uppercase">
            The wait is over
          </span>
          <p className="text-green-400 text-sm mt-2">
            The initial token offer is now live
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 max-w-2xl mx-auto mt-10">
          <GlassCard className="p-6 text-center border border-cyan-500/10 hover:border-cyan-500/30 transition">
            <Coins size={28} className="mx-auto text-cyan-400" />
            <p className="text-2xl font-bold text-white mt-3">
              {totalSupply.toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">Total Supply</p>
          </GlassCard>
          <GlassCard className="p-6 text-center border border-cyan-500/10 hover:border-cyan-500/30 transition">
            <Rocket size={28} className="mx-auto text-cyan-400" />
            <p className="text-2xl font-bold text-white mt-3">
              ${phases[0].price}
            </p>
            <p className="text-sm text-gray-500">Current Price</p>
          </GlassCard>
        </div>

        {/* ITO Phases */}
        <div className="max-w-3xl mx-auto mt-10">
          <GlassCard className="p-6 border border-cyan-500/10">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">ITO Phases</h2>
            <div className="space-y-3">
              {phases.map((phase) => (
                <div
                  key={phase.name}
                  className="flex items-center justify-between p-4 rounded-xl bg-[#050816]/50 border border-cyan-500/5"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{phase.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        phase.status === "active" ? "bg-green-400/10 text-green-400" :
                        phase.status === "completed" ? "bg-gray-400/10 text-gray-400" :
                        "bg-cyan-400/10 text-cyan-400"
                      }`}>
                        {phase.status === "active" ? "LIVE" :
                         phase.status === "completed" ? "SOLD OUT" : "UPCOMING"}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">Price: {phase.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-400">{phase.allocation}</p>
                    <p className="text-xs text-gray-600">Allocation</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <a
            href="#community"
            className="inline-flex items-center gap-2 premium-btn px-8 py-4 text-sm font-semibold"
          >
            Join the Whitelist
            <Rocket size={18} />
          </a>
          <p className="text-gray-500 text-sm mt-4">
            Be among the first to access BOTEXIUM tokens
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-6 border-t border-cyan-500/10">
          <p className="text-gray-600 text-xs">
            www.botexium.com | @botexium
          </p>
        </div>
      </div>
    </section>
  );
}