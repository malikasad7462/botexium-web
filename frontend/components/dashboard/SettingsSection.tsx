"use client";

import {
  Settings,
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  ChevronRight,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

const settingsItems = [
  {
    title: "Profile Settings",
    description: "Manage your personal profile information.",
    icon: User,
  },
  {
    title: "Notification Preferences",
    description: "Control how you receive BOTEXIUM notifications.",
    icon: Bell,
  },
  {
    title: "Security",
    description: "Account security and authentication settings.",
    icon: Shield,
    href: "/dashboard/settings/security",
  },
  {
    title: "Appearance",
    description: "Manage the visual preferences of your dashboard.",
    icon: Palette,
  },
  {
    title: "Language & Region",
    description: "Choose your preferred language and regional settings.",
    icon: Globe,
  },
];

export default function SettingsSection() {
  return (
    <section className="space-y-6">
      {/* Header */}
      <div>
        <div className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
          BOTEXIUM CONTROL CENTER
        </div>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Settings
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          Manage your account, preferences, security and dashboard
          settings.
        </p>
      </div>

      {/* Settings Overview */}
      <GlassCard className="p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Settings
            size={19}
            strokeWidth={1.8}
            className="text-cyan-300"
          />
          <h2 className="text-base font-semibold text-white">
            Account Settings
          </h2>
        </div>

        <div className="mt-5 divide-y divide-white/[0.06]">
          {settingsItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.title}
                type="button"
                onClick={() => {
                  if (item.href) {
                    window.location.href = item.href;
                  }
                }}
                className="group flex w-full items-center gap-4 py-4 text-left transition-colors hover:bg-white/[0.015]"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300 transition-all duration-300 group-hover:border-cyan-400/20 group-hover:bg-cyan-400/[0.07]">
                  <Icon size={18} strokeWidth={1.8} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-gray-200">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs leading-6 text-gray-600">
                    {item.description}
                  </p>
                </div>

                <ChevronRight
                  size={16}
                  strokeWidth={1.7}
                  className="shrink-0 text-gray-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
                />
              </button>
            );
          })}
        </div>
      </GlassCard>

      {/* Account Status */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
            <Shield size={18} strokeWidth={1.8} />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">
              Account Security
            </h2>
            <p className="mt-2 text-sm leading-7 text-gray-500">
              Advanced authentication, wallet security and account
              protection features will be connected as the BOTEXIUM
              backend develops.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Future Settings */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Settings
            size={18}
            strokeWidth={1.8}
            className="text-cyan-300"
          />
          <h2 className="text-base font-semibold text-white">
            Advanced Settings
          </h2>
        </div>
        <p className="mt-3 text-sm leading-7 text-gray-500">
          Additional ecosystem controls and advanced preferences
          will become available as new BOTEXIUM services are activated.
        </p>
      </GlassCard>
    </section>
  );
}