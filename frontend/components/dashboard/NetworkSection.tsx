"use client";

import {
  Network,
  Users,
  UserPlus,
  TrendingUp,
  Sparkles,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

const stats = [
  {
    label: "TOTAL NETWORK",
    value: "0",
    icon: Users,
  },
  {
    label: "DIRECT REFERRALS",
    value: "0",
    icon: UserPlus,
  },
  {
    label: "ACTIVE MEMBERS",
    value: "0",
    icon: TrendingUp,
  },
];

export default function NetworkSection() {
  return (
    <section className="BOTEXIUM-dashboard-section">
      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">COMMUNITY NETWORK</div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          My Network
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          Manage and explore your growing BOTEXIUM community network.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <GlassCard key={stat.label} className="p-5 sm:p-6">
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
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
            <Network size={20} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">
              Your BOTEXIUM Network
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Network data and member relationships will appear here as the
              BOTEXIUM community system becomes active.
            </p>
          </div>
        </div>
      </GlassCard>

      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Sparkles
            size={17}
            strokeWidth={1.8}
            className="text-cyan-300"
          />

          <span className="text-sm font-semibold text-gray-300">
            Network intelligence
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Advanced network insights, member statistics and community growth
          tools will be connected to the BOTEXIUM backend later.
        </p>
      </GlassCard>
    </section>
  );
}