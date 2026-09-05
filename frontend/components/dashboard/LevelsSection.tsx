"use client";

import {
  Trophy,
  Star,
  Target,
  Award,
  Lock,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

const stats = [
  {
    label: "CURRENT LEVEL",
    value: "1",
    icon: Trophy,
  },
  {
    label: "TOTAL XP",
    value: "0",
    icon: Star,
  },
  {
    label: "ACHIEVEMENTS",
    value: "0",
    icon: Award,
  },
];

export default function LevelsSection() {
  return (
    <section className="BOTEXIUM-dashboard-section">
      {/* Header */}
      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">
          BOTEXIUM PROGRESSION
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Levels & Achievements
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          Track your BOTEXIUM progress, levels, milestones and achievements.
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

      {/* Current Level */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
            <Trophy size={21} strokeWidth={1.7} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.16em] text-gray-500">
                  CURRENT LEVEL
                </p>

                <h2 className="mt-1 text-xl font-bold text-white">
                  Level 1
                </h2>
              </div>

              <span className="w-fit rounded-full border border-cyan-400/10 bg-cyan-400/[0.04] px-3 py-1 text-[9px] font-semibold tracking-[0.12em] text-cyan-300">
                BEGINNER
              </span>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] text-gray-500">
                  Progress to Level 2
                </span>

                <span className="text-[11px] font-semibold text-gray-400">
                  0 / 100 XP
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                <div className="h-full w-0 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600" />
              </div>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Achievements */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Award
            size={18}
            strokeWidth={1.8}
            className="text-cyan-300"
          />

          <h2 className="text-base font-semibold text-white">
            Achievements
          </h2>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "First Steps",
            "Community Builder",
            "Early Member",
          ].map((achievement) => (
            <div
              key={achievement}
              className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.02] text-gray-600">
                  <Lock size={16} strokeWidth={1.7} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-500">
                    {achievement}
                  </p>

                  <p className="mt-1 text-[10px] text-gray-600">
                    Locked
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Next Milestone */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
            <Target size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">
              Next Milestone
            </h2>

            <p className="mt-2 text-sm leading-7 text-gray-500">
              Your next milestone and achievement requirements will
              become available when the BOTEXIUM progression system is
              connected to the backend.
            </p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}