"use client";

import {
  Gift,
  Trophy,
  Sparkles,
  History,
  Lock,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

const stats = [
  {
    label: "TOTAL REWARDS",
    value: "0",
    icon: Gift,
  },
  {
    label: "AVAILABLE",
    value: "0",
    icon: Sparkles,
  },
  {
    label: "CLAIMED",
    value: "0",
    icon: History,
  },
];

export default function RewardsSection() {
  return (
    <section className="BOTEXIUM-dashboard-section">
      {/* Header */}
      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">
          BOTEXIUM REWARDS
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Rewards
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          View your BOTEXIUM rewards, available benefits and reward history.
        </p>
      </div>

      {/* Stats */}
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

      {/* Available Rewards */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Trophy
            size={18}
            strokeWidth={1.8}
            className="text-cyan-300"
          />

          <h2 className="text-base font-semibold text-white">
            Available Rewards
          </h2>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-10 text-center">
          <Gift
            size={26}
            strokeWidth={1.5}
            className="mx-auto text-gray-600"
          />

          <p className="mt-3 text-sm font-medium text-gray-500">
            No rewards available yet
          </p>

          <p className="mx-auto mt-1 max-w-md text-xs leading-6 text-gray-600">
            Your eligible BOTEXIUM rewards will appear here when the
            rewards system is connected.
          </p>
        </div>
      </GlassCard>

      {/* Reward History */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <History
            size={18}
            strokeWidth={1.8}
            className="text-cyan-300"
          />

          <h2 className="text-base font-semibold text-white">
            Reward History
          </h2>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-8 text-center">
          <History
            size={24}
            strokeWidth={1.5}
            className="mx-auto text-gray-600"
          />

          <p className="mt-3 text-sm font-medium text-gray-500">
            No reward history yet
          </p>
        </div>
      </GlassCard>

      {/* Coming System Notice */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
            <Lock size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">
              Reward System
            </h2>

            <p className="mt-2 text-sm leading-7 text-gray-500">
              Reward eligibility, claiming and distribution will be
              activated when the BOTEXIUM rewards backend is connected.
            </p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}