/**
 * ============================================================
 * BOTEXIUM FEATURE CONTROL CENTER
 * ============================================================
 *
 * All major ecosystem modules are controlled from here.
 *
 * UI components should read these settings instead of
 * creating independent feature flags in different files.
 *
 * ============================================================
 */

export const features = {

  /*
  |--------------------------------------------------------------------------
  | Core Platform
  |--------------------------------------------------------------------------
  */

  platform: {
    enabled: true,

    dashboard: true,

    profile: true,

    notifications: true,

    settings: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Community
  |--------------------------------------------------------------------------
  */

  community: {
    enabled: true,

    members: true,

    activities: true,

    announcements: true,

    leaderboard: true,

    referralSystem: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Rewards
  |--------------------------------------------------------------------------
  */

  rewards: {
    enabled: true,

    points: true,

    referralRewards: true,

    activityRewards: true,

    tokenRewards: true,

    leaderboardRewards: true,

    rewardHistory: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Wallet / Web3
  |--------------------------------------------------------------------------
  */

  wallet: {
    enabled: true,

    connectWallet: true,

    walletBalance: true,

    transactionHistory: true,

    networkDetection: true,

    networkSwitching: true,
  },


  /*
  |--------------------------------------------------------------------------
  | ITO
  |--------------------------------------------------------------------------
  */

  ito: {
    enabled: false,

    sale: false,

    purchase: false,

    allocation: false,

    vesting: false,

    claim: false,

    transactionHistory: false,
  },


  /*
  |--------------------------------------------------------------------------
  | Token
  |--------------------------------------------------------------------------
  */

  token: {
    enabled: true,

    balance: true,

    transfer: false,

    burn: false,

    claim: false,

    vesting: false,
  },


  /*
  |--------------------------------------------------------------------------
  | Swap
  |--------------------------------------------------------------------------
  */

  swap: {
    enabled: false,

    tokenSwap: false,

    tokenSelection: true,

    slippage: true,

    priceImpact: true,

    transactionPreview: true,

    transactionHistory: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Staking
  |--------------------------------------------------------------------------
  */

  staking: {
    enabled: false,

    stake: false,

    unstake: false,

    claimRewards: false,

    stakingPools: false,

    lockPeriods: false,

    stakingHistory: false,
  },


  /*
  |--------------------------------------------------------------------------
  | Deposit / Withdraw
  |--------------------------------------------------------------------------
  */

  payments: {
    enabled: false,

    deposit: false,

    withdraw: false,

    transactionHistory: false,

    paymentMethods: false,
  },


  /*
  |--------------------------------------------------------------------------
  | Marketplace
  |--------------------------------------------------------------------------
  */

  marketplace: {
    enabled: true,

    products: true,

    orders: true,

    cart: true,

    checkout: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Education
  |--------------------------------------------------------------------------
  */

  education: {
    enabled: true,

    courses: true,

    lessons: true,

    progressTracking: true,

    certificates: false,
  },


  /*
  |--------------------------------------------------------------------------
  | AI
  |--------------------------------------------------------------------------
  */

  ai: {
    enabled: true,

    assistant: true,

    recommendations: true,

    analytics: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Business
  |--------------------------------------------------------------------------
  */

  business: {
    enabled: true,

    services: true,

    solutions: true,

    partners: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Analytics
  |--------------------------------------------------------------------------
  */

  analytics: {
    enabled: true,

    dashboardStats: true,

    portfolio: true,

    transactions: true,

    rewards: true,

    referrals: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Security
  |--------------------------------------------------------------------------
  */

  security: {
    enabled: true,

    twoFactorAuthentication: false,

    emailVerification: true,

    walletVerification: true,

    transactionConfirmation: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Notifications
  |--------------------------------------------------------------------------
  */

  notifications: {
    enabled: true,

    email: false,

    inApp: true,

    transactionAlerts: true,

    rewardAlerts: true,

    communityAlerts: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Maintenance
  |--------------------------------------------------------------------------
  */

  maintenance: {
    enabled: false,

    message:
      "BOTEXIUM services are temporarily unavailable. Please try again later.",
  },

} as const;


/*
|--------------------------------------------------------------------------
| Convenient exports
|--------------------------------------------------------------------------
*/

export const platformFeatures = features.platform;

export const communityFeatures = features.community;

export const rewardFeatures = features.rewards;

export const walletFeatures = features.wallet;

export const itoFeatures = features.ito;

export const tokenFeatures = features.token;

export const swapFeatures = features.swap;

export const stakingFeatures = features.staking;

export const paymentFeatures = features.payments;

export const marketplaceFeatures = features.marketplace;

export const educationFeatures = features.education;

export const aiFeatures = features.ai;

export const businessFeatures = features.business;

export const analyticsFeatures = features.analytics;

export const securityFeatures = features.security;

export const notificationFeatures = features.notifications;