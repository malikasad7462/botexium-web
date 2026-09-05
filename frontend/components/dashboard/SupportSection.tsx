"use client";

import {
  LifeBuoy,
  MessageCircle,
  BookOpen,
  ShieldQuestion,
  ChevronRight,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

const supportItems = [
  {
    title: "Help Center",
    description:
      "Find answers and guidance for using the BOTEXIUM dashboard.",
    icon: BookOpen,
  },
  {
    title: "Community Support",
    description:
      "Get help with community features and account activity.",
    icon: MessageCircle,
  },
  {
    title: "Frequently Asked Questions",
    description:
      "Review common questions about the BOTEXIUM ecosystem.",
    icon: ShieldQuestion,
  },
];

export default function SupportSection() {
  return (
    <section className="BOTEXIUM-dashboard-section">
      {/* Header */}
      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">
          BOTEXIUM SUPPORT
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Help & Support
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          Find help, guidance and support for your BOTEXIUM account and
          ecosystem experience.
        </p>
      </div>

      {/* Support Options */}
      <div className="grid gap-4 md:grid-cols-3">
        {supportItems.map((item) => {
          const Icon = item.icon;

          return (
            <GlassCard
              key={item.title}
              className="p-5 sm:p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
                <Icon size={19} strokeWidth={1.8} />
              </div>

              <h2 className="mt-5 text-base font-semibold text-white">
                {item.title}
              </h2>

              <p className="mt-2 text-sm leading-7 text-gray-500">
                {item.description}
              </p>

              <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold tracking-[0.12em] text-gray-600">
                <span>AVAILABLE SOON</span>

                <ChevronRight
                  size={13}
                  strokeWidth={1.8}
                />
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Contact Support */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
              <LifeBuoy size={19} strokeWidth={1.8} />
            </div>

            <div>
              <h2 className="text-base font-semibold text-white">
                Need Assistance?
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-7 text-gray-500">
                Direct BOTEXIUM support and ticket management will be
                connected when the support backend is activated.
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled
            className="BOTEXIUM-btn-secondary shrink-0 px-5 py-2.5 text-xs font-semibold opacity-50"
          >
            Contact Support
          </button>
        </div>
      </GlassCard>

      {/* Status */}
      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
            <LifeBuoy size={18} strokeWidth={1.8} />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">
              Support System
            </h2>

            <p className="mt-2 text-sm leading-7 text-gray-500">
              The BOTEXIUM support center is being prepared for account
              assistance, technical guidance and ecosystem support.
            </p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}