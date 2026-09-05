"use client";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  Gift,
  History,
  Sparkles,
  Users,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

interface ActivityItem {
  id: number;
  title: string;
  description: string;
  time: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}

const activities: ActivityItem[] = [
  {
    id: 1,
    title: "Welcome to BOTEXIUM",
    description: "Your BOTEXIUM dashboard has been activated.",
    time: "Just now",
    icon: Sparkles,
  },
  {
    id: 2,
    title: "Profile Created",
    description: "Your BOTEXIUM member profile was created successfully.",
    time: "Today",
    icon: Users,
  },
  {
    id: 3,
    title: "Points System",
    description: "Your points activity will appear here as you participate.",
    time: "Today",
    icon: Gift,
  },
  {
    id: 4,
    title: "Deposit",
    description: "Web3 deposit activity will appear here when enabled.",
    time: "Coming Soon",
    icon: ArrowDownToLine,
  },
  {
    id: 5,
    title: "Withdrawal",
    description: "Web3 withdrawal activity will appear here when enabled.",
    time: "Coming Soon",
    icon: ArrowUpFromLine,
  },
];

export default function ActivitySection() {
  return (
    <section className="BOTEXIUM-dashboard-section">
      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">ACCOUNT ACTIVITY</div>

        <div className="flex items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Activity
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              A central record of your activity across the BOTEXIUM ecosystem.
            </p>
          </div>

          <div className="hidden shrink-0 rounded-full border border-cyan-400/15 bg-cyan-400/[0.04] px-4 py-2 text-xs font-semibold tracking-wide text-cyan-300 sm:block">
            <History size={14} className="mr-2 inline-block" />
            ACTIVITY
          </div>
        </div>
      </div>

      <GlassCard className="p-0">
        <div className="border-b border-white/[0.06] px-5 py-4 sm:px-6">
          <h2 className="text-sm font-semibold text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Your latest BOTEXIUM account activity.
          </p>
        </div>

        <div className="divide-y divide-white/[0.05]">
          {activities.map((activity) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.id}
                className="flex items-center gap-4 px-5 py-5 transition-colors duration-300 hover:bg-white/[0.02] sm:px-6"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold text-gray-200">
                    {activity.title}
                  </div>

                  <div className="mt-1 truncate text-xs text-gray-500">
                    {activity.description}
                  </div>
                </div>

                <div className="shrink-0 text-[10px] font-medium tracking-wide text-gray-600">
                  {activity.time}
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>
    </section>
  );
}