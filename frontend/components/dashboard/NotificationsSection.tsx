"use client";

import {
  Bell,
  CheckCheck,
  Info,
  AlertCircle,
  Sparkles,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

const notificationTypes = [
  {
    title: "System Updates",
    description:
      "Important system and dashboard notifications will appear here.",
    icon: Info,
  },
  {
    title: "Community Activity",
    description:
      "Updates related to your network and community activity will appear here.",
    icon: Sparkles,
  },
  {
    title: "Important Alerts",
    description:
      "Important account and ecosystem alerts will appear here.",
    icon: AlertCircle,
  },
];

export default function NotificationsSection() {
  return (
    <section className="BOTEXIUM-dashboard-section">
      {/* Header */}
      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">
          BOTEXIUM NOTIFICATIONS
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Notifications
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          View your latest BOTEXIUM account, community and ecosystem
          notifications.
        </p>
      </div>

      {/* Notification Summary */}
      <div className="grid gap-4 sm:grid-cols-2">
        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-gray-500">
                UNREAD
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                0
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
              <Bell size={18} strokeWidth={1.8} />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-gray-500">
                TOTAL NOTIFICATIONS
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                0
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
              <CheckCheck size={18} strokeWidth={1.8} />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Notification Center */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Bell
            size={18}
            strokeWidth={1.8}
            className="text-cyan-300"
          />

          <h2 className="text-base font-semibold text-white">
            Notification Center
          </h2>
        </div>

        <div className="mt-5 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 py-10 text-center">
          <Bell
            size={26}
            strokeWidth={1.5}
            className="mx-auto text-gray-600"
          />

          <p className="mt-3 text-sm font-medium text-gray-500">
            No notifications yet
          </p>

          <p className="mx-auto mt-1 max-w-md text-xs leading-6 text-gray-600">
            Your latest account and ecosystem notifications will
            appear here.
          </p>
        </div>
      </GlassCard>

      {/* Notification Categories */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {notificationTypes.map((item) => {
          const Icon = item.icon;

          return (
            <GlassCard
              key={item.title}
              className="p-5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
                <Icon size={18} strokeWidth={1.8} />
              </div>

              <h3 className="mt-4 text-sm font-semibold text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-xs leading-6 text-gray-600">
                {item.description}
              </p>
            </GlassCard>
          );
        })}
      </div>
    </section>
  );
}