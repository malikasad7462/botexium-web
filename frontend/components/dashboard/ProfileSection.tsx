"use client";

import { useEffect, useState } from "react";
import {
  User,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
  Copy,
  Check,
  RefreshCw,
} from "lucide-react";
import { GlassCard } from "./GlassCard";

import { API_URL } from "@/lib/api";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  referredById?: string | null;
  role: string;
  status: string;
  points: number;
  createdAt?: string;
}

interface ProfileResponse {
  success: boolean;
  user: ProfileData;
  message?: string;
}

export default function ProfileSection() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  async function loadProfile(isRefresh = false) {
    try {
      setError("");

      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const response = await fetch(`${API_URL}/api/auth/me`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      const result: ProfileResponse = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to load profile information"
        );
      }

      setProfile(result.user);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load profile information"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function copyReferralCode() {
    if (!profile?.referralCode) return;

    try {
      await navigator.clipboard.writeText(profile.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  async function copyReferralLink() {
    if (!profile?.referralCode) return;

    const link = `${window.location.origin}/register?ref=${profile.referralCode}`;

    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  if (loading) {
    return (
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
            ACCOUNT
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white">
            My Profile
          </h1>
          <p className="mt-2 text-sm text-gray-400">
            Loading your BOTEXIUM profile...
          </p>
        </div>
        <GlassCard className="p-8">
          <div className="animate-pulse space-y-5">
            <div className="h-5 w-40 rounded bg-white/10" />
            <div className="h-4 w-64 rounded bg-white/10" />
            <div className="h-4 w-52 rounded bg-white/10" />
            <div className="h-12 w-full rounded-xl bg-white/5" />
          </div>
        </GlassCard>
      </section>
    );
  }

  if (error || !profile) {
    return (
      <section className="space-y-6">
        <div>
          <span className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
            ACCOUNT
          </span>
          <h1 className="mt-2 text-3xl font-bold text-white">
            My Profile
          </h1>
        </div>
        <GlassCard className="p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 text-red-300">
              <ShieldCheck size={20} />
              <span>
                {error || "Profile information is unavailable."}
              </span>
            </div>
            <button
              type="button"
              onClick={() => loadProfile(true)}
              disabled={refreshing}
              className="premium-btn inline-flex items-center justify-center gap-2 px-5 py-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />
              TRY AGAIN
            </button>
          </div>
        </GlassCard>
      </section>
    );
  }

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <div>
        <span className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
          ACCOUNT
        </span>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl text-white">
              My Profile
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-400">
              Manage and view your BOTEXIUM ecosystem account information.
            </p>
          </div>
          <button
            type="button"
            onClick={() => loadProfile(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.025] px-4 py-2.5 text-xs font-semibold tracking-wide text-gray-300 transition hover:border-cyan-400/20 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={14}
              className={refreshing ? "animate-spin" : ""}
            />
            REFRESH
          </button>
        </div>
      </div>

      {/* PROFILE HERO */}
      <GlassCard className="p-5 sm:p-7">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06] text-3xl font-extrabold text-cyan-300 shadow-[0_0_30px_rgba(34,211,238,.10)]">
            {profile.name?.charAt(0)?.toUpperCase() || "A"}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-2xl font-bold text-white">
                {profile.name}
              </h2>
              <span className="rounded-full border border-green-400/20 bg-green-400/[0.07] px-3 py-1 text-[10px] font-semibold tracking-[1.5px] text-green-300">
                {profile.status}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-sm text-gray-400">
              <Mail size={15} />
              <span className="truncate">{profile.email}</span>
            </div>
            <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
              <ShieldCheck size={14} />
              <span>{profile.role}</span>
              <span className="text-gray-700">•</span>
              <span>BOTEXIUM Member</span>
            </div>
          </div>
        </div>
      </GlassCard>

      {/* ACCOUNT INFORMATION */}
      <div>
        <div className="mb-4">
          <span className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
            ACCOUNT INFORMATION
          </span>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <GlassCard className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/[0.06] text-cyan-300">
                <User size={19} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold tracking-[1.5px] text-gray-600">
                  FULL NAME
                </span>
                <p className="mt-1 truncate text-base font-semibold text-white">
                  {profile.name}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/[0.06] text-cyan-300">
                <Mail size={19} />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-semibold tracking-[1.5px] text-gray-600">
                  EMAIL ADDRESS
                </span>
                <p className="mt-1 truncate text-base font-semibold text-white">
                  {profile.email}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/[0.06] text-cyan-300">
                <ShieldCheck size={19} />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-[1.5px] text-gray-600">
                  ACCOUNT ROLE
                </span>
                <p className="mt-1 text-base font-semibold text-white">
                  {profile.role}
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-400/[0.06] text-cyan-300">
                <Sparkles size={19} />
              </div>
              <div>
                <span className="text-[10px] font-semibold tracking-[1.5px] text-gray-600">
                  BOTEXIUM POINTS
                </span>
                <p className="mt-1 text-xl font-bold text-white">
                  {profile.points}
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* =========================================================
          REFERRAL LINK & CODE - ✅ ADDED
      ========================================================= */}
      <div>
        <div className="mb-4">
          <span className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase">
            REFERRAL NETWORK
          </span>
        </div>
        <GlassCard className="p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-400">Your Referral Link</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-cyan-400 text-sm bg-[#050816] px-3 py-1.5 rounded-lg border border-cyan-500/10 truncate max-w-[200px] sm:max-w-xs">
                  {`${window.location.origin}/register?ref=${profile?.referralCode || ''}`}
                </code>
                <button
                  onClick={copyReferralLink}
                  className="p-2 rounded-lg hover:bg-cyan-400/10 transition text-gray-400 hover:text-cyan-400"
                >
                  {copied ? <Check size={18} className="text-green-400" /> : <Copy size={18} />}
                </button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Referral Code</p>
              <p className="text-xl font-bold text-cyan-400">{profile?.referralCode || 'N/A'}</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}