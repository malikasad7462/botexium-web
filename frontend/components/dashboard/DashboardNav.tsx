"use client";

import {
  LayoutDashboard,
  User,
  Users,
  Gift,
  Trophy,
  Wallet,
  Coins,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  ShoppingBag,
  Layers3,
  History,
  Bell,
  Settings,
  LifeBuoy,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  Blocks,
  LogOut,
  Rocket,
  ArrowUpDown,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface DashboardNavProps {
  activeSection?: string;
  onSectionChange?: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{
    size?: number;
    strokeWidth?: number;
    className?: string;
  }>;
  badge?: string;
  comingSoon?: boolean;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

/*
|--------------------------------------------------------------------------
| BOTEXIUM Dashboard Navigation
|--------------------------------------------------------------------------
*/

const navigationGroups: NavGroup[] = [
  {
    title: "MAIN",
    items: [
      {
        id: "overview",
        label: "Overview",
        icon: LayoutDashboard,
      },
      {
        id: "profile",
        label: "My Profile",
        icon: User,
      },
      {
        id: "activity",
        label: "Activity",
        icon: History,
      },
    ],
  },

  {
    title: "TRADING", // ✅ New Group
    items: [
      {
        id: "swap",
        label: "Swap",
        icon: ArrowUpDown,
      },
      {
        id: "token-launch",
        label: "Token Launch",
        icon: Rocket,
      },
    ],
  },

  {
    title: "COMMUNITY",
    items: [
      {
        id: "network",
        label: "My Network",
        icon: Users,
      },
      {
        id: "referrals",
        label: "Referrals",
        icon: Users,
      },
      {
        id: "points",
        label: "Points",
        icon: Sparkles,
      },
      {
        id: "rewards",
        label: "Rewards",
        icon: Gift,
      },
      {
        id: "levels",
        label: "Levels & Achievements",
        icon: Trophy,
      },
    ],
  },

  {
    title: "WEB3",
    items: [
      {
        id: "wallet",
        label: "Wallet",
        icon: Wallet,
        comingSoon: true,
      },
      {
        id: "portfolio",
        label: "Portfolio",
        icon: Coins,
        comingSoon: true,
      },
      {
        id: "deposit",
        label: "Deposit",
        icon: ArrowDownToLine,
        comingSoon: true,
      },
      {
        id: "withdraw",
        label: "Withdraw",
        icon: ArrowUpFromLine,
        comingSoon: true,
      },
      
      {
        id: "token",
        label: "BOTEXIUM Token",
        icon: Coins,
        comingSoon: true,
      },
      {
        id: "ito",
        label: "ITO / Token Sale",
        icon: Blocks,
        comingSoon: true,
      },
      {
        id: "staking",
        label: "Staking",
        icon: Layers3,
        comingSoon: true,
      },
      {
        id: "transactions",
        label: "Transactions",
        icon: History,
        comingSoon: true,
      },
    ],
  },

  {
    title: "ECOSYSTEM",
    items: [
      {
        id: "community",
        label: "Community",
        icon: Users,
        comingSoon: true,
      },
      {
        id: "marketplace",
        label: "Marketplace",
        icon: ShoppingBag,
        comingSoon: true,
      },
      {
        id: "ai",
        label: "AI Services",
        icon: Sparkles,
        comingSoon: true,
      },
      {
        id: "software",
        label: "Software Services",
        icon: Blocks,
        comingSoon: true,
      },
    ],
  },

  {
    title: "SYSTEM",
    items: [
      {
        id: "announcements",
        label: "Announcements",
        icon: Megaphone,
      },
      {
        id: "notifications",
        label: "Notifications",
        icon: Bell,
      },
      {
        id: "support",
        label: "Help & Support",
        icon: LifeBuoy,
      },
      {
        id: "settings",
        label: "Settings",
        icon: Settings,
      },
    ],
  },
];

const API_URL = "http://localhost:5000";

export default function DashboardNav({
  activeSection = "overview",
  onSectionChange,
}: DashboardNavProps) {
  const router = useRouter();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  function handleNavigation(
    id: string,
    comingSoon?: boolean
  ) {
    if (comingSoon) {
      return;
    }

    onSectionChange?.(id);
    setMobileOpen(false);
  }

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    try {
      setLoggingOut(true);

      const response = await fetch(
        `${API_URL}/api/auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.error(
          "Logout request failed:",
          response.status
        );
      }
    } catch (error) {
      console.error("LOGOUT ERROR:", error);
    } finally {
      router.replace("/login");
    }
  }

  return (
    <>
      {/* ============================================================
          Mobile Menu Button
      ============================================================ */}

      <button
        type="button"
        onClick={() => setMobileOpen(true)}
        aria-label="Open dashboard navigation"
        className="
          fixed left-4 top-4 z-50
          flex h-10 w-10
          items-center justify-center
          rounded-xl
          border border-cyan-400/15
          bg-[#07101f]/90
          text-gray-300
          shadow-[0_0_25px_rgba(34,211,238,.08)]
          backdrop-blur-xl
          transition-all duration-300
          hover:border-cyan-400/40
          hover:text-cyan-300
          lg:hidden
        "
      >
        <Menu size={19} />
      </button>

      {/* ============================================================
          Mobile Overlay
      ============================================================ */}

      {mobileOpen && (
        <button
          type="button"
          aria-label="Close dashboard navigation"
          onClick={() => setMobileOpen(false)}
          className="
            fixed inset-0 z-40
            bg-black/60
            backdrop-blur-sm
            lg:hidden
          "
        />
      )}

      {/* ============================================================
          Navigation
      ============================================================ */}

      <aside
        className={`
          fixed left-0 top-0 z-50
          flex h-screen flex-col
          border-r border-cyan-400/10
          bg-[#060b18]/95
          backdrop-blur-2xl
          transition-all duration-300
          lg:sticky lg:z-30

          ${collapsed ? "w-[82px]" : "w-[280px]"}

          ${
            mobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >
        {/* ========================================================
            Brand
        ======================================================== */}

        <div
          className={`
            flex h-[88px] shrink-0 items-center
            border-b border-white/[0.06]
            px-5
            ${collapsed ? "justify-center" : "justify-between"}
          `}
        >
          <div
            className={`
              flex items-center
              ${collapsed ? "" : "gap-3"}
            `}
          >
            <div
              className="
                relative
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-xl
                border border-cyan-400/25
                bg-cyan-400/[0.04]
                text-xl font-extrabold
                text-cyan-300
                shadow-[0_0_25px_rgba(34,211,238,.10)]
              "
            >
              B
            </div>

            {!collapsed && (
              <div>
                <div className="font-extrabold tracking-[4px] text-white">
                  BOTEXIUM
                </div>

                <div className="mt-1 text-[8px] tracking-[2.5px] text-gray-500">
                  DIGITAL ECOSYSTEM
                </div>
              </div>
            )}
          </div>

          {/* Mobile Close */}

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation"
            className="
              flex h-8 w-8
              items-center justify-center
              rounded-lg
              text-gray-500
              transition-colors
              hover:text-cyan-300
              lg:hidden
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* ========================================================
            Navigation Scroll Area
        ======================================================== */}

        <nav
          className="
            flex-1
            overflow-y-auto
            px-3 py-5
            scrollbar-thin
            scrollbar-track-transparent
            scrollbar-thumb-cyan-400/10
          "
        >
          {navigationGroups.map((group) => (
            <div
              key={group.title}
              className="mb-6"
            >
              {!collapsed && (
                <div
                  className="
                    mb-2 px-3
                    text-[9px]
                    font-semibold
                    tracking-[2.5px]
                    text-gray-600
                  "
                >
                  {group.title}
                </div>
              )}

              {collapsed && (
                <div className="mx-auto mb-2 h-px w-7 bg-white/[0.06]" />
              )}

              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;

                  const isActive =
                    activeSection === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() =>
                        handleNavigation(
                          item.id,
                          item.comingSoon
                        )
                      }
                      title={
                        collapsed
                          ? item.comingSoon
                            ? `${item.label} — Coming Soon`
                            : item.label
                          : undefined
                      }
                      className={`
                        group relative flex w-full
                        items-center
                        rounded-xl
                        px-3 py-3
                        text-left
                        transition-all duration-300

                        ${collapsed ? "justify-center" : "gap-3"}

                        ${
                          item.comingSoon
                            ? "cursor-default"
                            : "cursor-pointer"
                        }

                        ${
                          isActive
                            ? `
                              border
                              border-cyan-400/15
                              bg-cyan-400/[0.07]
                              text-cyan-300
                              shadow-[0_0_25px_rgba(34,211,238,.06)]
                            `
                            : item.comingSoon
                              ? `
                                border
                                border-transparent
                                text-gray-400
                                hover:border-cyan-400/10
                                hover:bg-white/[0.035]
                                hover:text-gray-200
                              `
                              : `
                                border
                                border-transparent
                                text-gray-500
                                hover:border-cyan-400/10
                                hover:bg-white/[0.025]
                                hover:text-gray-200
                              `
                        }
                      `}
                    >
                      {isActive && (
                        <span
                          className="
                            absolute left-0 top-1/2
                            h-5 w-[2px]
                            -translate-y-1/2
                            rounded-r-full
                            bg-cyan-300
                            shadow-[0_0_10px_rgba(34,211,238,.8)]
                          "
                        />
                      )}

                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        className={`
                          shrink-0
                          transition-all duration-300

                          ${
                            isActive
                              ? "text-cyan-300"
                              : item.comingSoon
                                ? "text-gray-500 group-hover:text-cyan-300"
                                : "text-gray-600 group-hover:text-cyan-300"
                          }
                        `}
                      />

                      {!collapsed && (
                        <>
                          <span
                            className="
                              min-w-0 flex-1
                              truncate
                              text-[12px]
                              font-medium
                              tracking-wide
                            "
                          >
                            {item.label}
                          </span>

                          {item.comingSoon && (
                            <span
                              className="
                                shrink-0
                                rounded-full
                                border border-white/[0.09]
                                bg-white/[0.035]
                                px-1.5 py-0.5
                                text-[7px]
                                font-semibold
                                tracking-[0.8px]
                                text-gray-500
                              "
                            >
                              SOON
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* ========================================================
            Logout
        ======================================================== */}

        <div className="shrink-0 px-3 pb-2">
          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            aria-label="Logout"
            title={
              collapsed
                ? loggingOut
                  ? "Logging out..."
                  : "Logout"
                : undefined
            }
            className={`
              group flex w-full
              items-center
              rounded-xl
              border border-transparent
              px-3 py-3
              text-left
              text-gray-500
              transition-all duration-300
              hover:border-red-400/10
              hover:bg-red-400/[0.04]
              hover:text-red-300
              disabled:cursor-not-allowed
              disabled:opacity-60

              ${collapsed ? "justify-center" : "gap-3"}
            `}
          >
            <LogOut
              size={18}
              strokeWidth={1.8}
              className="
                shrink-0
                transition-colors
                group-hover:text-red-300
              "
            />
            {!collapsed && (
              <span className="text-[12px] font-medium tracking-wide">
                {loggingOut
                  ? "Logging out..."
                  : "Logout"}
              </span>
            )}
          </button>
        </div>

        {/* ========================================================
            Bottom Status
        ======================================================== */}

        <div
          className="
            shrink-0
            border-t border-white/[0.06]
            p-3
          "
        >
          <div
            className={`
              rounded-xl
              border border-cyan-400/10
              bg-cyan-400/[0.025]
              px-3 py-3
              ${collapsed ? "flex justify-center" : ""}
            `}
          >
            {collapsed ? (
              <span
                className="
                  h-2 w-2
                  rounded-full
                  bg-green-400
                  shadow-[0_0_10px_rgba(74,222,128,.7)]
                "
                title="System operational"
              />
            ) : (
              <div className="flex items-center gap-2">
                <span
                  className="
                    h-2 w-2
                    rounded-full
                    bg-green-400
                    shadow-[0_0_10px_rgba(74,222,128,.7)]
                  "
                />
                <span
                  className="
                    text-[9px]
                    tracking-[1.5px]
                    text-gray-500
                  "
                >
                  SYSTEM OPERATIONAL
                </span>
              </div>
            )}
          </div>
        </div>

        {/* ========================================================
            Collapse Button
        ======================================================== */}

        <button
          type="button"
          onClick={() =>
            setCollapsed((value) => !value)
          }
          aria-label={
            collapsed
              ? "Expand dashboard navigation"
              : "Collapse dashboard navigation"
          }
          className="
            absolute -right-3 top-[96px]
            hidden h-7 w-7
            items-center justify-center
            rounded-full
            border border-cyan-400/20
            bg-[#07101f]
            text-gray-500
            shadow-[0_0_15px_rgba(34,211,238,.08)]
            transition-all duration-300
            hover:border-cyan-400/40
            hover:text-cyan-300
            lg:flex
          "
        >
          {collapsed ? (
            <ChevronRight size={14} />
          ) : (
            <ChevronLeft size={14} />
          )}
        </button>
      </aside>
    </>
  );
}