// ============================================================
// BOTEXIUM Dashboard — Shared Types
// Central type definitions for the complete future dashboard
// ============================================================

/* ============================================================
   USER / ACCOUNT
   ============================================================ */

export interface DashboardUser {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  role?: string;
  status: string;
  createdAt?: string;
  avatarUrl?: string;
}


/* ============================================================
   REFERRALS / NETWORK
   ============================================================ */

export interface ReferralMember {
  id: string;
  name: string;
  email: string;
  referralCode: string;
  role: string;
  status: string;
  points: number;
  createdAt: string;
}

export interface ReferralData {
  totalReferrals: number;
  referrals: ReferralMember[];
}


/* ============================================================
   POINTS / REWARDS
   ============================================================ */

export interface PointsSummary {
  totalPoints: number;
  availablePoints: number;
  usedPoints: number;
  pendingPoints: number;
}

export interface Reward {
  id: string;
  title: string;
  description?: string;
  points: number;
  tokenAmount?: number;
  status: "pending" | "available" | "claimed" | "expired";
  createdAt: string;
  claimedAt?: string;
}

export interface RewardSummary {
  totalRewards: number;
  pendingRewards: number;
  claimedRewards: number;
  totalTokenRewards: number;
}


/* ============================================================
   LEVEL / ACHIEVEMENTS
   ============================================================ */

export interface UserLevel {
  level: number;
  name: string;
  currentPoints: number;
  requiredPoints: number;
  progress: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon?: string;
  unlocked: boolean;
  unlockedAt?: string;
}


/* ============================================================
   WALLET
   ============================================================ */

export type WalletStatus =
  | "connected"
  | "disconnected"
  | "connecting"
  | "wrong-network";

export interface ConnectedWallet {
  address: string;
  shortAddress?: string;
  network: string;
  chainId?: number;
  status: WalletStatus;
  provider?: string;
}

export interface WalletBalance {
  symbol: string;
  name: string;
  balance: number;
  usdValue?: number;
  logoUrl?: string;
}

export interface WalletSummary {
  wallet: ConnectedWallet | null;
  balances: WalletBalance[];
  totalUsdValue: number;
}


/* ============================================================
   TOKEN / ASSETS
   ============================================================ */

export interface TokenAsset {
  symbol: string;
  name: string;
  balance: number;
  availableBalance: number;
  lockedBalance: number;
  rewardBalance: number;
  usdValue?: number;
  price?: number;
}

export interface PortfolioSummary {
  totalValueUsd: number;
  change24h?: number;
  change24hPercent?: number;
  assets: TokenAsset[];
}


/* ============================================================
   DEPOSIT
   ============================================================ */

export interface Deposit {
  id: string;
  asset: string;
  amount: number;
  network: string;
  txHash?: string;
  status:
    | "pending"
    | "confirmed"
    | "failed"
    | "cancelled";
  createdAt: string;
  confirmedAt?: string;
}


/* ============================================================
   WITHDRAW
   ============================================================ */

export interface Withdrawal {
  id: string;
  asset: string;
  amount: number;
  fee?: number;
  network: string;
  destinationAddress: string;
  txHash?: string;
  status:
    | "pending"
    | "processing"
    | "completed"
    | "failed"
    | "cancelled";
  createdAt: string;
  completedAt?: string;
}


/* ============================================================
   SWAP
   ============================================================ */

export interface SwapQuote {
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  priceImpact?: number;
  networkFee?: number;
  minimumReceived?: number;
  expiresAt?: string;
}

export interface SwapTransaction {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  rate?: number;
  fee?: number;
  txHash?: string;
  status:
    | "pending"
    | "confirmed"
    | "failed"
    | "cancelled";
  createdAt: string;
}


/* ============================================================
   ITO / TOKEN SALE
   ============================================================ */

export interface ITOPhase {
  id: string;
  name: string;
  status: "upcoming" | "active" | "ended";
  price: number;
  tokenSymbol: string;
  startDate?: string;
  endDate?: string;
  allocation?: number;
}

export interface ITOPurchase {
  id: string;
  phaseId: string;
  paymentAsset: string;
  paymentAmount: number;
  tokenAmount: number;
  price: number;
  txHash?: string;
  status:
    | "pending"
    | "confirmed"
    | "failed"
    | "cancelled";
  createdAt: string;
}

export interface ITOSummary {
  activePhase?: ITOPhase;
  totalPurchased: number;
  totalInvested: number;
  purchases: ITOPurchase[];
}


/* ============================================================
   STAKING
   ============================================================ */

export interface StakingPool {
  id: string;
  name: string;
  tokenSymbol: string;
  apy: number;
  lockPeriodDays: number;
  minimumStake: number;
  status: "active" | "upcoming" | "closed";
}

export interface StakePosition {
  id: string;
  poolId: string;
  tokenSymbol: string;
  stakedAmount: number;
  pendingRewards: number;
  apy: number;
  startDate: string;
  unlockDate?: string;
  status: "active" | "unstaking" | "completed";
}


/* ============================================================
   TRANSACTIONS
   ============================================================ */

export type TransactionType =
  | "deposit"
  | "withdraw"
  | "swap"
  | "ito"
  | "reward"
  | "staking"
  | "unstaking"
  | "claim"
  | "transfer";

export type TransactionStatus =
  | "pending"
  | "processing"
  | "confirmed"
  | "completed"
  | "failed"
  | "cancelled";

export interface Transaction {
  id: string;
  type: TransactionType;
  asset?: string;
  amount?: number;
  fromAsset?: string;
  toAsset?: string;
  fromAmount?: number;
  toAmount?: number;
  fee?: number;
  txHash?: string;
  status: TransactionStatus;
  createdAt: string;
}


/* ============================================================
   CLAIMS
   ============================================================ */

export interface Claim {
  id: string;
  type: "reward" | "staking" | "token";
  tokenSymbol: string;
  amount: number;
  status:
    | "available"
    | "pending"
    | "claimed"
    | "expired";
  availableAt?: string;
  claimedAt?: string;
}


/* ============================================================
   ACTIVITY
   ============================================================ */

export type ActivityType =
  | "login"
  | "registration"
  | "referral"
  | "reward"
  | "wallet"
  | "deposit"
  | "withdraw"
  | "swap"
  | "ito"
  | "staking"
  | "claim";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description?: string;
  createdAt: string;
  status?: string;
}


/* ============================================================
   NOTIFICATIONS
   ============================================================ */

export type NotificationType =
  | "system"
  | "reward"
  | "transaction"
  | "security"
  | "announcement";

export interface NotificationItem {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}


/* ============================================================
   ANNOUNCEMENTS
   ============================================================ */

export interface Announcement {
  id: string;
  title: string;
  description: string;
  type?: "info" | "important" | "update" | "event";
  createdAt: string;
  expiresAt?: string;
}


/* ============================================================
   DASHBOARD SUMMARY
   ============================================================ */

export interface DashboardStats {
  totalReferrals: number;
  totalPoints: number;
  totalRewards: number;
  tokenBalance: number;
  stakedBalance: number;
  portfolioValueUsd: number;
}


/* ============================================================
   COMPLETE DASHBOARD DATA
   ============================================================ */

export interface DashboardData {
  user: DashboardUser;

  stats: DashboardStats;

  referrals: ReferralData;

  points: PointsSummary;

  rewards: RewardSummary;

  level?: UserLevel;

  achievements?: Achievement[];

  wallet: WalletSummary;

  portfolio: PortfolioSummary;

  deposits?: Deposit[];

  withdrawals?: Withdrawal[];

  swaps?: SwapTransaction[];

  ito?: ITOSummary;

  staking?: StakePosition[];

  claims?: Claim[];

  transactions?: Transaction[];

  activity?: ActivityItem[];

  notifications?: NotificationItem[];

  announcements?: Announcement[];
}


/* ============================================================
   FEATURE AVAILABILITY
   ============================================================ */

export interface FeatureAvailability {
  enabled: boolean;
  comingSoon?: boolean;
  requiresWallet?: boolean;
  requiresAuthentication?: boolean;
  requiresBackend?: boolean;
  requiresSmartContract?: boolean;
}


/* ============================================================
   DASHBOARD MODULE
   ============================================================ */

export interface DashboardModule {
  id: string;
  title: string;
  description?: string;
  path?: string;
  icon?: string;
  feature: FeatureAvailability;
}