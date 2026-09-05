/**
 * ============================================================
 * BOTEXIUM NAVIGATION CONFIGURATION
 * ============================================================
 *
 * Central navigation/menu configuration for the BOTEXIUM platform.
 *
 * Dashboard components should read navigation from this file
 * instead of creating separate menu definitions.
 *
 * ============================================================
 */

export type NavigationItem = {
  id: string;
  label: string;
  href: string;
  description?: string;

  /*
   * Used for future permission / authentication control.
   */
  requiresAuth?: boolean;

  /*
   * Feature key allows the UI to hide a module when its
   * corresponding feature is disabled.
   */
  feature?: string;

  /*
   * Optional badge shown in navigation.
   */
  badge?: string;

  /*
   * Visual grouping.
   */
  group: "main" | "ecosystem" | "finance" | "account";
};


/*
|--------------------------------------------------------------------------
| Main Navigation
|--------------------------------------------------------------------------
*/

export const mainNavigation: NavigationItem[] = [

  {
    id: "overview",
    label: "Overview",
    href: "/dashboard",
    description: "Your BOTEXIUM dashboard overview.",
    requiresAuth: true,
    group: "main",
  },

  {
    id: "community",
    label: "Community",
    href: "/dashboard/community",
    description: "BOTEXIUM community and ecosystem activity.",
    requiresAuth: true,
    feature: "community.enabled",
    group: "main",
  },

  {
    id: "referrals",
    label: "Referrals",
    href: "/dashboard/referrals",
    description: "Manage your referral network.",
    requiresAuth: true,
    feature: "community.referralSystem",
    group: "main",
  },

  {
    id: "rewards",
    label: "Rewards",
    href: "/dashboard/rewards",
    description: "View points and ecosystem rewards.",
    requiresAuth: true,
    feature: "rewards.enabled",
    group: "main",
  },
];


/*
|--------------------------------------------------------------------------
| Ecosystem Navigation
|--------------------------------------------------------------------------
*/

export const ecosystemNavigation: NavigationItem[] = [

  {
    id: "token",
    label: "BOTEXIUM Token",
    href: "/dashboard/token",
    description: "View your BOTEXIUM token information and balance.",
    requiresAuth: true,
    feature: "token.enabled",
    group: "ecosystem",
  },

  {
    id: "ito",
    label: "ITO",
    href: "/dashboard/ito",
    description: "BOTEXIUM Initial Token Offering.",
    requiresAuth: true,
    feature: "ito.enabled",
    group: "ecosystem",
  },

  {
    id: "staking",
    label: "Staking",
    href: "/dashboard/staking",
    description: "Stake BOTEXIUM tokens and manage staking positions.",
    requiresAuth: true,
    feature: "staking.enabled",
    group: "ecosystem",
  },

  {
    id: "swap",
    label: "Swap",
    href: "/dashboard/swap",
    description: "Swap supported digital assets.",
    requiresAuth: true,
    feature: "swap.enabled",
    group: "ecosystem",
  },

  {
    id: "marketplace",
    label: "Marketplace",
    href: "/dashboard/marketplace",
    description: "Explore the BOTEXIUM marketplace.",
    requiresAuth: true,
    feature: "marketplace.enabled",
    group: "ecosystem",
  },

  {
    id: "education",
    label: "Education",
    href: "/dashboard/education",
    description: "BOTEXIUM education and learning resources.",
    requiresAuth: true,
    feature: "education.enabled",
    group: "ecosystem",
  },

  {
    id: "ai",
    label: "AI",
    href: "/dashboard/ai",
    description: "BOTEXIUM artificial intelligence services.",
    requiresAuth: true,
    feature: "ai.enabled",
    group: "ecosystem",
  },
];


/*
|--------------------------------------------------------------------------
| Finance Navigation
|--------------------------------------------------------------------------
*/

export const financeNavigation: NavigationItem[] = [

  {
    id: "wallet",
    label: "Wallet",
    href: "/dashboard/wallet",
    description: "Connect and manage your Web3 wallet.",
    requiresAuth: true,
    feature: "wallet.enabled",
    group: "finance",
  },

  {
    id: "deposit",
    label: "Deposit",
    href: "/dashboard/deposit",
    description: "Deposit supported assets.",
    requiresAuth: true,
    feature: "payments.deposit",
    group: "finance",
  },

  {
    id: "withdraw",
    label: "Withdraw",
    href: "/dashboard/withdraw",
    description: "Withdraw supported assets.",
    requiresAuth: true,
    feature: "payments.withdraw",
    group: "finance",
  },

  {
    id: "transactions",
    label: "Transactions",
    href: "/dashboard/transactions",
    description: "View your transaction history.",
    requiresAuth: true,
    feature: "wallet.transactionHistory",
    group: "finance",
  },

  {
    id: "portfolio",
    label: "Portfolio",
    href: "/dashboard/portfolio",
    description: "View your digital asset portfolio.",
    requiresAuth: true,
    feature: "analytics.portfolio",
    group: "finance",
  },
];


/*
|--------------------------------------------------------------------------
| Account Navigation
|--------------------------------------------------------------------------
*/

export const accountNavigation: NavigationItem[] = [

  {
    id: "profile",
    label: "Profile",
    href: "/dashboard/profile",
    description: "Manage your BOTEXIUM profile.",
    requiresAuth: true,
    group: "account",
  },

  {
    id: "settings",
    label: "Settings",
    href: "/dashboard/settings",
    description: "Manage account settings.",
    requiresAuth: true,
    group: "account",
  },
];


/*
|--------------------------------------------------------------------------
| Complete Dashboard Navigation
|--------------------------------------------------------------------------
*/

export const dashboardNavigation: NavigationItem[] = [
  ...mainNavigation,
  ...ecosystemNavigation,
  ...financeNavigation,
  ...accountNavigation,
];


/*
|--------------------------------------------------------------------------
| Navigation Groups
|--------------------------------------------------------------------------
*/

export const navigationGroups = {
  main: mainNavigation,
  ecosystem: ecosystemNavigation,
  finance: financeNavigation,
  account: accountNavigation,
};


/*
|--------------------------------------------------------------------------
| Helper
|--------------------------------------------------------------------------
*/

export function getNavigationItem(
  id: string
): NavigationItem | undefined {
  return dashboardNavigation.find(
    (item) => item.id === id
  );
}