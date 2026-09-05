/**
 * ============================================================
 * BOTEXIUM TOKEN MASTER CONFIGURATION
 * ============================================================
 *
 * Central configuration for the future BOTEXIUM token ecosystem.
 *
 * IMPORTANT:
 * This file contains FRONTEND configuration only.
 *
 * Actual token contract addresses, blockchain transactions,
 * balances and smart-contract rules will eventually come
 * from the Web3 / backend layer.
 *
 * ============================================================
 */

export const token = {

  /*
  |--------------------------------------------------------------------------
  | Basic Identity
  |--------------------------------------------------------------------------
  */

  name: "BOTEXIUM Token",

  symbol: "APX",

  decimals: 18,

  /*
  |--------------------------------------------------------------------------
  | Display
  |--------------------------------------------------------------------------
  */

  display: {
    name: "BOTEXIUM Token",

    shortName: "APX",

    symbol: "APX",

    currencySymbol: "APX",

    logo: "/logo.svg",
  },


  /*
  |--------------------------------------------------------------------------
  | Token Status
  |--------------------------------------------------------------------------
  */

  status: {
    enabled: true,

    tradingEnabled: false,

    itoEnabled: false,

    stakingEnabled: false,

    rewardsEnabled: true,

    swapEnabled: false,
  },


  /*
  |--------------------------------------------------------------------------
  | Supply
  |--------------------------------------------------------------------------
  |
  | Keep these values configurable.
  |
  | IMPORTANT:
  | These are display/configuration values.
  | Final supply must match the deployed smart contract.
  |
  */

  supply: {

    total: "1000000000",

    displayTotal: "1 Billion",

    max: "1000000000",

    mintable: false,

    burnable: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Blockchain Networks
  |--------------------------------------------------------------------------
  |
  | We keep network information centralized so that adding
  | another chain later does not require rewriting the UI.
  |
  */

  networks: {

    ethereum: {
      id: 1,
      name: "Ethereum",
      enabled: false,
      contractAddress: "",
    },

    bnbSmartChain: {
      id: 56,
      name: "BNB Smart Chain",
      enabled: false,
      contractAddress: "",
    },

    polygon: {
      id: 137,
      name: "Polygon",
      enabled: false,
      contractAddress: "",
    },

    base: {
      id: 8453,
      name: "Base",
      enabled: false,
      contractAddress: "",
    },

    arbitrum: {
      id: 42161,
      name: "Arbitrum",
      enabled: false,
      contractAddress: "",
    },
  },


  /*
  |--------------------------------------------------------------------------
  | Default Network
  |--------------------------------------------------------------------------
  */

  defaultNetwork: "bnbSmartChain",


  /*
  |--------------------------------------------------------------------------
  | ITO / Token Sale
  |--------------------------------------------------------------------------
  |
  | These values are placeholders for the frontend architecture.
  | Final pricing and allocation should be decided before launch.
  |
  */

  ito: {

    enabled: false,

    name: "BOTEXIUM Initial Token Offering",

    price: "0",

    currency: "USDT",

    minimumPurchase: "0",

    maximumPurchase: "0",

    startDate: "",

    endDate: "",

    hardCap: "0",

    softCap: "0",

    tokensForSale: "0",

    vestingEnabled: false,

    vestingPeriod: "0",

    claimEnabled: false,
  },


  /*
  |--------------------------------------------------------------------------
  | Staking
  |--------------------------------------------------------------------------
  */

  staking: {

    enabled: false,

    minimumStake: "0",

    lockPeriods: [
      {
        days: 30,
        rewardRate: "0",
      },
      {
        days: 90,
        rewardRate: "0",
      },
      {
        days: 180,
        rewardRate: "0",
      },
      {
        days: 365,
        rewardRate: "0",
      },
    ],

    earlyWithdrawalEnabled: false,
  },


  /*
  |--------------------------------------------------------------------------
  | Rewards
  |--------------------------------------------------------------------------
  |
  | Points and token rewards will eventually be connected
  | to the backend/reward engine.
  |
  */

  rewards: {

    enabled: true,

    pointsName: "BOTEXIUM Points",

    pointsSymbol: "PTS",

    tokenRewardEnabled: true,

    conversionRate: {
      points: 100,
      tokens: 1,
    },

    referralRewardEnabled: true,

    activityRewardEnabled: true,

    stakingRewardEnabled: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Swap
  |--------------------------------------------------------------------------
  */

  swap: {

    enabled: false,

    provider: "",

    defaultSlippage: "0.5",

    supportedTokens: [
      "APX",
      "USDT",
      "USDC",
      "BNB",
    ],
  },


  /*
  |--------------------------------------------------------------------------
  | Wallet
  |--------------------------------------------------------------------------
  */

  wallet: {

    connectEnabled: true,

    supportedWallets: [
      "MetaMask",
      "Trust Wallet",
      "WalletConnect",
    ],

    autoNetworkSwitch: true,
  },


  /*
  |--------------------------------------------------------------------------
  | Explorer
  |--------------------------------------------------------------------------
  */

  explorer: {

    name: "Blockchain Explorer",

    baseUrl: "",

    tokenPath: "/token/",
  },


  /*
  |--------------------------------------------------------------------------
  | Future Token Utilities
  |--------------------------------------------------------------------------
  |
  | Reserved architecture for future modules.
  |
  */

  utilities: {

    transfer: true,

    burn: true,

    lock: false,

    vesting: false,

    claim: false,

    bridge: false,

    liquidity: false,
  },

} as const;


/*
|--------------------------------------------------------------------------
| Convenient exports
|--------------------------------------------------------------------------
*/

export const tokenName = token.name;

export const tokenSymbol = token.symbol;

export const tokenDecimals = token.decimals;

export const tokenNetworks = token.networks;

export const tokenITO = token.ito;

export const tokenStaking = token.staking;

export const tokenRewards = token.rewards;

export const tokenSwap = token.swap;

export const tokenWallet = token.wallet;