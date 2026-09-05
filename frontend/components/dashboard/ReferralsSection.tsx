"use client";

import { useEffect, useState } from "react";
import {
  Copy,
  Gift,
  Link2,
  Users,
  UserPlus,
  Sparkles,
  Check,
  ShieldCheck,
  RefreshCw,
} from "lucide-react";

import { GlassCard } from "./GlassCard";

import { API_URL } from "@/lib/api";

interface ReferralMember {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  role: string;
  status: string;
  points: number;
  createdAt: string;
}

interface ReferralData {
  id: string;
  name: string;
  email: string;
  referralCode: string;
}

interface ReferralsResponse {
  success: boolean;
  referrer: ReferralData;
  totalReferrals: number;
  referrals: ReferralMember[];
  message?: string;
}

export default function ReferralsSection() {
  const [data, setData] = useState<ReferralsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function loadReferrals(isRefresh = false) {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      /*
       * IMPORTANT:
       * User identity comes from the HTTP-only BOTEXIUM_token cookie.
       * The frontend does NOT send a referral code to identify the user.
       */
      const response = await fetch(
        `${API_URL}/api/auth/my-referrals`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      const result: ReferralsResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load referral information"
        );
      }

      setData(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load referral information"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadReferrals();
  }, []);

  async function copyReferralLink() {
    if (!data?.referrer.referralCode) {
      return;
    }

    const link = `${window.location.origin}/register?ref=${encodeURIComponent(
      data.referrer.referralCode
    )}`;

    try {
      await navigator.clipboard.writeText(link);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1800);
    } catch {
      setCopied(false);
    }
  }

  if (loading) {
    return (
      <section className="BOTEXIUM-dashboard-section space-y-6">
        <div>
          <div className="BOTEXIUM-label mb-3">
            COMMUNITY GROWTH
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Referrals
          </h1>

          <p className="mt-2 text-sm leading-7 text-gray-400">
            Loading your referral network...
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <GlassCard
              key={item}
              className="p-6"
            >
              <div className="animate-pulse space-y-4">
                <div className="h-3 w-32 rounded bg-white/10" />
                <div className="h-9 w-20 rounded bg-white/10" />
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 w-40 rounded bg-white/10" />
            <div className="h-11 w-full rounded-xl bg-white/5" />
          </div>
        </GlassCard>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="BOTEXIUM-dashboard-section space-y-6">
        <div>
          <div className="BOTEXIUM-label mb-3">
            COMMUNITY GROWTH
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Referrals
          </h1>

          <p className="mt-2 text-sm leading-7 text-gray-400">
            Invite people to the BOTEXIUM ecosystem and track your
            referral activity.
          </p>
        </div>

        <GlassCard className="p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <ShieldCheck
                size={20}
                className="mt-0.5 shrink-0 text-red-300"
              />

              <div>
                <h2 className="text-sm font-semibold text-white">
                  Referral information unavailable
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {error ||
                    "Unable to load your referral information."}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => loadReferrals(true)}
              disabled={refreshing}
              className="premium-btn inline-flex items-center justify-center gap-2 px-5 py-3 text-xs disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                className={
                  refreshing ? "animate-spin" : ""
                }
              />
              TRY AGAIN
            </button>
          </div>
        </GlassCard>
      </section>
    );
  }

  const activeReferrals = data.referrals.filter(
    (member) => member.status === "ACTIVE"
  ).length;

  const rewardsEarned = data.referrals.reduce(
    (total, member) => total + member.points,
    0
  );

  const referralLink = `${window.location.origin}/register?ref=${encodeURIComponent(
    data.referrer.referralCode
  )}`;

  return (
    <section className="BOTEXIUM-dashboard-section">
      {/* =========================================================
          HEADER
      ========================================================= */}

      <div className="mb-8">
        <div className="BOTEXIUM-label mb-3">
          COMMUNITY GROWTH
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="hero-title text-3xl font-extrabold tracking-tight sm:text-4xl">
              Referrals
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
              Invite people to the BOTEXIUM ecosystem and track
              your referral network.
            </p>
          </div>

          <button
            type="button"
            onClick={() => loadReferrals(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold tracking-wide text-gray-300 transition hover:border-cyan-400/20 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={14}
              className={
                refreshing ? "animate-spin" : ""
              }
            />
            REFRESH
          </button>
        </div>
      </div>

      {/* =========================================================
          STATS
      ========================================================= */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-gray-500">
                TOTAL REFERRALS
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                {data.totalReferrals}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
              <Users
                size={18}
                strokeWidth={1.8}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-gray-500">
                ACTIVE REFERRALS
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                {activeReferrals}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
              <UserPlus
                size={18}
                strokeWidth={1.8}
              />
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-5 sm:p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.16em] text-gray-500">
                REFERRAL POINTS
              </p>

              <p className="mt-3 text-3xl font-bold tracking-tight text-white">
                {rewardsEarned}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
              <Gift
                size={18}
                strokeWidth={1.8}
              />
            </div>
          </div>
        </GlassCard>
      </div>

      {/* =========================================================
          REFERRAL LINK
      ========================================================= */}

      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
            <Link2
              size={20}
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="text-base font-semibold text-white">
              Your Referral Link
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Share this personal link to invite new members
              into the BOTEXIUM ecosystem.
            </p>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <div className="flex min-h-11 min-w-0 flex-1 items-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.025] px-4">
                <span className="truncate text-xs text-cyan-300">
                  {referralLink}
                </span>
              </div>

              <button
                type="button"
                onClick={copyReferralLink}
                className="premium-btn inline-flex min-h-11 items-center justify-center gap-2 px-5 text-xs"
              >
                {copied ? (
                  <>
                    <Check
                      size={15}
                      strokeWidth={1.8}
                    />
                    COPIED
                  </>
                ) : (
                  <>
                    <Copy
                      size={15}
                      strokeWidth={1.8}
                    />
                    COPY
                  </>
                )}
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-gray-500">
              <span>Referral Code:</span>

              <span className="font-mono tracking-[1.5px] text-cyan-300">
                {data.referrer.referralCode}
              </span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* =========================================================
          REFERRAL MEMBERS
      ========================================================= */}

      <div className="mt-8">
        <div className="mb-4">
          <div className="BOTEXIUM-label">
            YOUR NETWORK
          </div>

          <h2 className="mt-2 text-xl font-bold text-white">
            Referred Members
          </h2>
        </div>

        {data.referrals.length === 0 ? (
          <GlassCard className="p-8 text-center">
            <Users
              size={28}
              className="mx-auto text-gray-600"
              strokeWidth={1.6}
            />

            <h3 className="mt-4 text-base font-semibold text-white">
              No referrals yet
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
              Share your referral link with your community.
              Your referred members will appear here
              automatically.
            </p>
          </GlassCard>
        ) : (
          <div className="space-y-3">
            {data.referrals.map((member) => (
              <GlassCard
                key={member.id}
                className="p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/10 bg-cyan-400/[0.04] text-cyan-300">
                    {member.name?.charAt(0)?.toUpperCase() ||
                      "A"}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {member.name}
                      </h3>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold tracking-wide ${
                          member.status === "ACTIVE"
                            ? "border-green-400/20 bg-green-400/[0.07] text-green-300"
                            : "border-white/10 bg-white/[0.03] text-gray-500"
                        }`}
                      >
                        {member.status}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-sm text-gray-500">
                      {member.email}
                    </p>

                    <p className="mt-1 font-mono text-[10px] tracking-[1px] text-gray-700">
                      {member.referralCode}
                    </p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-[10px] font-semibold tracking-[1.4px] text-gray-600">
                        POINTS
                      </span>

                      <p className="mt-1 font-semibold text-white">
                        {member.points}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-semibold tracking-[1.4px] text-gray-600">
                        ROLE
                      </span>

                      <p className="mt-1 text-sm font-semibold text-gray-300">
                        {member.role}
                      </p>
                    </div>

                    <div className="hidden md:block">
                      <span className="text-[10px] font-semibold tracking-[1.4px] text-gray-600">
                        JOINED
                      </span>

                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(
                          member.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>

      {/* =========================================================
          REWARDS
      ========================================================= */}

      <GlassCard className="mt-5 p-5 sm:p-6">
        <div className="flex items-center gap-3">
          <Sparkles
            size={17}
            strokeWidth={1.8}
            className="text-cyan-300"
          />

          <span className="text-sm font-semibold text-gray-300">
            Referral Rewards
          </span>
        </div>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          Your referral network currently represents{" "}
          <span className="font-semibold text-cyan-300">
            {rewardsEarned}
          </span>{" "}
          referral points. Detailed reward rules and reward
          history will be connected to the BOTEXIUM rewards engine
          when those rules are activated.
        </p>
      </GlassCard>
    </section>
  );
}