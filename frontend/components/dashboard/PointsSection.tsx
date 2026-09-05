"use client";

import {
  Sparkles,
  TrendingUp,
  History,
  Target,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

const stats = [
  {
    label: "TOTAL POINTS",
    value: "0",
    icon: Sparkles,
  },
  {
    label: "THIS MONTH",
    value: "0",
    icon: TrendingUp,
  },
  {
    label: "POINT ACTIVITIES",
    value: "0",
    icon: History,
  },
];

export default function PointsSection() {
  return (
    <section className="BOTEXIUM-dashboard-section">
      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">
          BOTEXIUM REWARDS SYSTEM
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Points
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          Track your BOTEXIUM points, earning activity and progress.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <GlassCard
              key={stat.label}
              className="p-5 sm:p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-gray-500">
                    {stat.label}
                  </p>

                  <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
                  <Icon size={18} strokeWidth={1.8} />
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Target
            size={18}
            strokeWidth={1.8}
            className="text-cyan-300"
          />

          <h2 className="text-base font-semibold text-white">
            Points Activity
          </h2>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-8 text-center">
          <Sparkles
            size={24}
            strokeWidth={1.6}
            className="mx-auto text-gray-600"
          />

          <p className="mt-3 text-sm font-medium text-gray-500">
            No points activity yet
          </p>

          <p className="mt-1 text-xs leading-6 text-gray-600">
            Your points earning history will appear here once the
            BOTEXIUM rewards system is connected.
          </p>
        </div>
      </GlassCard>

      <GlassCard className="mt-5 p-5 sm:p-6">
        <h2 className="text-base font-semibold text-white">
          How Points Work
        </h2>

        <p className="mt-3 text-sm leading-7 text-gray-500">
          BOTEXIUM points will be used to track community participation,
          ecosystem activity and future reward eligibility.
        </p>
      </GlassCard>
    </section>
  );
}