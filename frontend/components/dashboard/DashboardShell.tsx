"use client";

import { ReactNode, useState } from "react";
import DashboardNav from "./DashboardNav";
import OverviewSection from "./OverviewSection";
import ProfileSection from "./ProfileSection";
import ActivitySection from "./ActivitySection";
import NetworkSection from "./NetworkSection";
import ReferralsSection from "./ReferralsSection";
import PointsSection from "./PointsSection";
import RewardsSection from "./RewardsSection";
import LevelsSection from "./LevelsSection";
import AnnouncementsSection from "./AnnouncementsSection";
import NotificationsSection from "./NotificationsSection";
import SettingsSection from "./SettingsSection";
import SupportSection from "./SupportSection";
import SwapSection from "./SwapSection";
import TokenLaunchSection from "./TokenLaunchSection";
import WalletConnect from "@/components/WalletConnect";

interface DashboardShellProps {
  children?: ReactNode;
}

function ComingSoonSection({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <section className="space-y-6">
      <div className="glass-card-static p-8 sm:p-10">
        <div className="text-xs font-semibold tracking-[0.16em] text-gray-500 uppercase mb-3">
          BOTEXIUM ECOSYSTEM
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          {title}
        </h2>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
          {description}
        </p>
        <div className="mt-6 inline-flex rounded-full border border-cyan-400/15 bg-cyan-400/[0.05] px-4 py-2 text-xs font-semibold tracking-wide text-cyan-300">
          COMING SOON
        </div>
      </div>
    </section>
  );
}

export default function DashboardShell({
  children,
}: DashboardShellProps) {
  const [activeSection, setActiveSection] =
    useState("overview");

  function renderSection() {
    switch (activeSection) {
      case "overview":
        return <OverviewSection />;
      case "profile":
        return <ProfileSection />;
      case "activity":
        return <ActivitySection />;
      case "network":
        return <NetworkSection />;
      case "referrals":
        return <ReferralsSection />;
      case "points":
        return <PointsSection />;
      case "rewards":
        return <RewardsSection />;
      case "levels":
        return <LevelsSection />;
      case "announcements":
        return <AnnouncementsSection />;
      case "notifications":
        return <NotificationsSection />;
      case "settings":
        return <SettingsSection />;
      case "support":
        return <SupportSection />;
      case "swap":
        return <SwapSection />;
      case "token-launch":
        return <TokenLaunchSection />;
      default:
        return <OverviewSection />;
    }
  }

  // Agar children hain (page route se aaye hain) toh children render karo
  if (children) {
    return (
      <div className="min-h-screen bg-[#050816] text-white">
        <div className="flex min-h-screen">
          <DashboardNav
            activeSection={activeSection}
            onSectionChange={setActiveSection}
          />
          <main className="min-w-0 flex-1">
            <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              {/* Top Bar with WalletConnect */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  BOTEXIUM Ecosystem
                </h1>
                <WalletConnect />
              </div>
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="flex min-h-screen">
        <DashboardNav
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <main className="min-w-0 flex-1">
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            {/* Top Bar with WalletConnect */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-xl md:text-2xl font-bold text-white">
                BOTEXIUM Ecosystem
              </h1>
              <WalletConnect />
            </div>
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
}