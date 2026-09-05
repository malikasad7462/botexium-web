"use client";

import {
  Megaphone,
  Bell,
  CalendarDays,
  Pin,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

export default function AnnouncementsSection() {
  return (
    <section className="BOTEXIUM-dashboard-section">
      {/* Header */}
      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">
          BOTEXIUM UPDATES
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Announcements
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          Stay informed about important BOTEXIUM ecosystem updates,
          releases and announcements.
        </p>
      </div>

      {/* Featured Announcement */}
      <GlassCard className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
            <Megaphone size={20} strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.04] px-2.5 py-1 text-[9px] font-semibold tracking-[0.12em] text-cyan-300">
                SYSTEM
              </span>

              <span className="text-[10px] text-gray-600">
                BOTEXIUM
              </span>
            </div>

            <h2 className="mt-3 text-lg font-semibold text-white">
              Welcome to the BOTEXIUM Dashboard
            </h2>

            <p className="mt-2 text-sm leading-7 text-gray-500">
              The BOTEXIUM dashboard is being prepared as the central
              control center for your profile, community activity,
              rewards and future Web3 ecosystem features.
            </p>

            <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-600">
              <CalendarDays size={13} strokeWidth={1.7} />
              <span>System announcement</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Announcement Feed */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Bell
            size={18}
            strokeWidth={1.8}
            className="text-cyan-300"
          />

          <h2 className="text-base font-semibold text-white">
            Latest Updates
          </h2>
        </div>

        <div className="mt-5 space-y-3">
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4">
            <div className="flex items-start gap-3">
              <Pin
                size={16}
                strokeWidth={1.8}
                className="mt-0.5 shrink-0 text-gray-600"
              />

              <div>
                <p className="text-sm font-medium text-gray-500">
                  No new announcements
                </p>

                <p className="mt-1 text-xs leading-6 text-gray-600">
                  New BOTEXIUM announcements will appear here as they
                  are published.
                </p>
              </div>
            </div>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}