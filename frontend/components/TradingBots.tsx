"use client";

import { ArrowRight, Bot, BarChart3, ShieldCheck, Zap } from "lucide-react";
import Image from "next/image";

const tradingBots = [
  {
    title: "Crypto Trading Bots",
    description:
      "Automated trading solutions designed for crypto markets, exchanges and multiple trading strategies.",
    image: "/images/trading-bots/crypto-bot.png",
    tags: ["Crypto", "Automation", "24/7"],
  },
  {
    title: "Forex Trading Bots",
    description:
      "Algorithmic trading software built for Forex strategies, market analysis and automated execution.",
    image: "/images/trading-bots/forex-bot.png",
    tags: ["Forex", "Algorithmic", "MT5"],
  },
  {
    title: "Stock Trading Bots",
    description:
      "Automation tools for systematic stock-market strategies, analysis and rule-based execution.",
    image: "/images/trading-bots/stock-bot.png",
    tags: ["Stocks", "Strategy", "Automation"],
  },
  {
    title: "Futures Trading Bots",
    description:
      "Advanced automation for futures strategies with configurable risk and execution logic.",
    image: "/images/trading-bots/futures-bot.png",
    tags: ["Futures", "Risk Control", "Advanced"],
  },
  {
    title: "Arbitrage Bots",
    description:
      "Bots designed to identify price differences between supported markets and execute predefined arbitrage strategies.",
    image: "/images/trading-bots/arbitrage-bot.png",
    tags: ["Arbitrage", "Multi-Market", "Smart"],
  },
  {
    title: "Grid & DCA Bots",
    description:
      "Automated Grid and DCA strategies with configurable parameters for different market conditions.",
    image: "/images/trading-bots/grid-dca-bot.png",
    tags: ["Grid", "DCA", "Automation"],
  },
];

export default function TradingBots() {
  return (
    <section
      id="trading-bots"
      className="relative overflow-hidden bg-[#050816] py-20 sm:py-24 lg:py-32"
    >
      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-40 top-20 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute -right-40 bottom-10 h-[450px] w-[450px] rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-5 py-2.5 text-xs font-medium uppercase tracking-[3px] text-cyan-300 sm:text-sm">
            <Bot size={16} />
            Trading Automation
          </span>

          <h2 className="mt-5 text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Intelligent Trading Bots
            <br />
            <span className="hero-title hero-glow">
              Built For Every Market
            </span>
          </h2>

          <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg sm:leading-8">
            BOTEXIUM develops automated trading solutions for different
            markets and strategies. Rent a bot, purchase a bot, or explore
            custom automation solutions built for your trading requirements.
          </p>
        </div>

        {/* Features */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <Zap size={21} />
            </div>

            <h3 className="mt-3 font-semibold text-white">
              Automated Execution
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Rule-based automation designed to reduce manual execution.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-blue-400/10 text-blue-300">
              <BarChart3 size={21} />
            </div>

            <h3 className="mt-3 font-semibold text-white">
              Multiple Strategies
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Different bots for different markets and trading approaches.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
              <ShieldCheck size={21} />
            </div>

            <h3 className="mt-3 font-semibold text-white">
              Configurable Controls
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Adjustable settings designed around each bot's strategy.
            </p>
          </div>
        </div>

        {/* Bot Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tradingBots.map((bot) => (
            <article
              key={bot.title}
              className="group glass-card overflow-hidden rounded-3xl border border-white/10 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:shadow-[0_0_35px_rgba(34,211,238,0.08)]"
            >
              {/* Bot Image */}
              <div className="relative aspect-[16/10] overflow-hidden bg-[#08101f]">
                <Image
                  src={bot.image}
                  alt={bot.title}
                  fill
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent opacity-80" />

                <div className="absolute left-4 top-4 rounded-full border border-cyan-400/20 bg-[#050816]/70 px-3 py-1.5 text-xs font-medium text-cyan-300 backdrop-blur-md">
                  BOTEXIUM
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">
                  {bot.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-gray-400">
                  {bot.description}
                </p>

                {/* Tags */}
                <div className="mt-5 flex flex-wrap gap-2">
                  {bot.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-6 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/5 px-4 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                  >
                    Rent Bot
                  </button>

                  <button
                    type="button"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  >
                    Buy Bot
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-400">
            Need a strategy designed specifically for your requirements?
          </p>

          <a
            href="#community"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
          >
            Explore Custom Trading Solutions
            <ArrowRight size={17} />
          </a>
        </div>
      </div>
    </section>
  );
}