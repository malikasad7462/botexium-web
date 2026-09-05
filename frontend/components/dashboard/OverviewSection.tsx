"use client";

import {
  ArrowUpRight,
  Coins,
  Gift,
  Users,
  Sparkles,
  Wallet,
  TrendingUp,
  Clock3,
  ChevronRight,
} from "lucide-react";

import { GlassCard } from "./GlassCard";
import WalletConnect from "@/components/WalletConnect";

interface StatCardProps {
  label: string;
  value: string;
  subtitle: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
}

function StatCard({
  label,
  value,
  subtitle,
  icon: Icon,
}: StatCardProps) {
  return (
    <GlassCard className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
            {label}
          </div>

          <div className="mt-3 text-2xl font-bold tracking-tight text-white">
            {value}
          </div>

          <div className="mt-1 text-xs text-gray-500">
            {subtitle}
          </div>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.05] text-cyan-300">
          <Icon size={18} strokeWidth={1.8} />
        </div>
      </div>
    </GlassCard>
  );
}

interface QuickActionProps {
  title: string;
  description: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  comingSoon?: boolean;
}

function QuickAction({
  title,
  description,
  icon: Icon,
  comingSoon = false,
}: QuickActionProps) {
  return (
    <button
      type="button"
      disabled={comingSoon}
      className={`group flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300 ${
        comingSoon
          ? "cursor-default border-white/[0.05] bg-white/[0.015] opacity-55"
          : "cursor-pointer border-white/[0.06] bg-white/[0.025] hover:border-cyan-400/20 hover:bg-cyan-400/[0.035]"
      }`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
        <Icon size={17} strokeWidth={1.8} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="text-sm font-medium text-gray-200">
          {title}
        </div>

        <div className="mt-1 text-[11px] text-gray-600">
          {description}
        </div>
      </div>

      {comingSoon ? (
        <span className="shrink-0 rounded-full border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[8px] font-semibold uppercase tracking-[0.08em] text-gray-600">
          Soon
        </span>
      ) : (
        <ChevronRight
          size={16}
          className="shrink-0 text-gray-600 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-cyan-300"
        />
      )}
    </button>
  );
}

export default function OverviewSection() {
  return (
    <div className="space-y-6">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <section>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="BOTEXIUM-label">
              BOTEXIUM DASHBOARD
            </div>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Overview
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Your central view of community activity,
              points, rewards and the BOTEXIUM Web3 ecosystem.
            </p>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-green-400/10 bg-green-400/[0.03] px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-green-400 shadow-[0_0_10px_rgba(74,222,128,.6)]" />

            <span className="text-[9px] font-semibold uppercase tracking-[0.12em] text-gray-500">
              Account Active
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          PRIMARY STATS
      ===================================================== */}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="BOTEXIUM Points"
          value="0"
          subtitle="Available community points"
          icon={Sparkles}
        />

        <StatCard
          label="BOTEXIUM Balance"
          value="0"
          subtitle="Token balance"
          icon={Coins}
        />

        <StatCard
          label="Referrals"
          value="0"
          subtitle="Total referred members"
          icon={Users}
        />

        <StatCard
          label="Rewards"
          value="0"
          subtitle="Total earned rewards"
          icon={Gift}
        />
      </section>

      {/* =====================================================
          WALLET + COMMUNITY
      ===================================================== */}

      <section className="grid gap-6 xl:grid-cols-3">
        {/* Wallet */}

        <GlassCard className="p-6 xl:col-span-2">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Wallet
                  size={17}
                  className="text-cyan-300"
                  strokeWidth={1.8}
                />

                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
                  Web3 Wallet
                </span>
              </div>

              <h2 className="mt-3 text-xl font-semibold text-white">
                Connect your wallet
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-gray-400">
                Connect your supported wallet to access
                token purchases, ITO, swap, staking,
                deposits, withdrawals and other Web3
                features when they become available.
              </p>
            </div>

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
              <Wallet size={20} strokeWidth={1.7} />
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            
            <WalletConnect />

            <button
              type="button"
              disabled
              className="BOTEXIUM-btn-secondary cursor-default px-6 py-3 text-xs opacity-45"
            >
              Wallet Details
            </button>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "ITO",
              "Swap",
              "Deposit",
              "Withdraw",
              "Staking",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/[0.05] bg-white/[0.02] px-3 py-1.5 text-[9px] uppercase tracking-[0.08em] text-gray-600"
              >
                {item} · Soon
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Community Progress */}

        <GlassCard className="p-6">
          <div className="flex items-center gap-2">
            <TrendingUp
              size={17}
              className="text-cyan-300"
              strokeWidth={1.8}
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gray-500">
              Community Progress
            </span>
          </div>

          <h2 className="mt-3 text-xl font-semibold text-white">
            New Member
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            Continue participating in the BOTEXIUM community
            to earn points and unlock future rewards.
          </p>

          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-[0.1em] text-gray-600">
                Next Level
              </span>

              <span className="text-[10px] font-semibold text-cyan-400">
                0%
              </span>
            </div>

            <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
              <div className="h-full w-0 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-500" />
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-[10px] text-gray-600">
            <Clock3 size={13} />
            Progress tracking will activate with community data.
          </div>
        </GlassCard>
      </section>

      {/* =====================================================
          QUICK ACTIONS
      ===================================================== */}

      <section>
        <div className="mb-4">
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
            Quick Access
          </div>

          <h2 className="mt-2 text-xl font-semibold text-white">
            Ecosystem Actions
          </h2>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          <QuickAction
            title="My Network"
            description="View your community network"
            icon={Users}
          />

          <QuickAction
            title="Points & Rewards"
            description="Track points and earned rewards"
            icon={Gift}
          />

          <QuickAction
            title="Referral Program"
            description="Manage your referral activity"
            icon={ArrowUpRight}
          />

          <QuickAction
            title="ITO / Token Sale"
            description="Purchase BOTEXIUM tokens during ITO"
            icon={Coins}
            comingSoon
          />

          <QuickAction
            title="BOTEXIUM Swap"
            description="Swap supported ecosystem assets"
            icon={ArrowUpRight}
            comingSoon
          />

          <QuickAction
            title="Staking"
            description="Stake BOTEXIUM tokens and manage positions"
            icon={TrendingUp}
            comingSoon
          />
        </div>
      </section>

      {/* =====================================================
          RECENT ACTIVITY
      ===================================================== */}

      <section>
        <GlassCard className="p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                Activity
              </div>

              <h2 className="mt-2 text-xl font-semibold text-white">
                Recent Activity
              </h2>
            </div>

            <span className="text-[9px] uppercase tracking-[0.12em] text-gray-600">
              Live data will appear here
            </span>
          </div>

          <div className="mt-6 flex min-h-[150px] items-center justify-center rounded-xl border border-dashed border-white/[0.06] bg-white/[0.015]">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.06] bg-white/[0.025] text-gray-600">
                <Clock3 size={17} />
              </div>

              <p className="mt-3 text-xs text-gray-500">
                No activity yet
              </p>

              <p className="mt-1 text-[10px] text-gray-700">
                Your ecosystem activity will appear here.
              </p>
            </div>
          </div>
        </GlassCard>
      </section>
    </div>
  );
}