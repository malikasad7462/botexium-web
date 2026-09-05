/**
 * ============================================================
 * BOTEXIUM BRAND & PROJECT CONFIGURATION
 * ============================================================
 *
 * Central configuration for:
 * - Brand identity
 * - Website identity
 * - Token identity
 * - Community identity
 * - Web3 configuration
 * - ITO configuration
 * - Social links
 *
 * IMPORTANT:
 * Keep project-wide identity values here instead of
 * hard-coding them inside individual components.
 *
 * ============================================================
 */

export const brandConfig = {
  /*
  |--------------------------------------------------------------------------
  | Brand Identity
  |--------------------------------------------------------------------------
  */

  brand: {
    name: "BOTEXIUM",

    shortName: "BOTEXIUM",

    tagline: "Digital Ecosystem",

    description:
      "A next-generation digital ecosystem connecting community, Web3, AI and software services.",

    logoText: "A",

    foundedYear: 2026,
  },

  /*
  |--------------------------------------------------------------------------
  | Website
  |--------------------------------------------------------------------------
  */

  website: {
    name: "BOTEXIUM",

    title:
      "BOTEXIUM — Digital Ecosystem",

    description:
      "Explore the BOTEXIUM digital ecosystem, community, Web3 services, token ecosystem and future decentralized applications.",

    url: "",

    dashboardName: "BOTEXIUM Dashboard",

    supportEmail: "",

    contactEmail: "",
  },

  /*
  |--------------------------------------------------------------------------
  | Token
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  | These are identity/configuration values only.
  | Real token contract information will be added during
  | the blockchain integration phase.
  |
  */

  token: {
    name: "BOTEXIUM Token",

    symbol: "BOTEXIUM",

    decimals: 18,

    contractAddress: "",

    network: "",

    chainId: "",

    explorerUrl: "",

    logo: "/images/BOTEXIUM-token.png",
  },

  /*
  |--------------------------------------------------------------------------
  | Community
  |--------------------------------------------------------------------------
  */

  community: {
    name: "BOTEXIUM Community",

    memberLabel: "BOTEXIUM Member",

    referralLabel: "Referral",

    pointsName: "BOTEXIUM Points",

    rewardsName: "BOTEXIUM Rewards",

    levelsName: "Levels & Achievements",
  },

  /*
  |--------------------------------------------------------------------------
  | Web3
  |--------------------------------------------------------------------------
  */

  web3: {
    walletConnectionEnabled: false,

    swapEnabled: false,

    depositEnabled: false,

    withdrawEnabled: false,

    stakingEnabled: false,

    itoEnabled: false,
  },

  /*
  |--------------------------------------------------------------------------
  | ITO / Token Sale
  |--------------------------------------------------------------------------
  */

  ito: {
    name: "BOTEXIUM Token Sale",

    shortName: "ITO",

    enabled: false,

    tokenPrice: "",

    minimumPurchase: "",

    maximumPurchase: "",

    startDate: "",

    endDate: "",

    paymentToken: "",

    network: "",
  },

  /*
  |--------------------------------------------------------------------------
  | Social Media
  |--------------------------------------------------------------------------
  */

  social: {
    website: "",

    telegram: "",

    whatsapp: "",

    twitter: "",

    discord: "",

    youtube: "",

    instagram: "",

    facebook: "",
  },

  /*
  |--------------------------------------------------------------------------
  | Navigation / Product Names
  |--------------------------------------------------------------------------
  */

  products: {
    ecosystem: "BOTEXIUM Ecosystem",

    marketplace: "BOTEXIUM Marketplace",

    aiServices: "BOTEXIUM AI Services",

    softwareServices: "BOTEXIUM Software Services",

    staking: "BOTEXIUM Staking",

    swap: "BOTEXIUM Swap",

    ito: "BOTEXIUM ITO",
  },
} as const;


/*
|--------------------------------------------------------------------------
| Convenient exports
|--------------------------------------------------------------------------
*/

export const brand = brandConfig.brand;

export const website = brandConfig.website;

export const token = brandConfig.token;

export const community = brandConfig.community;

export const web3 = brandConfig.web3;

export const ito = brandConfig.ito;

export const social = brandConfig.social;

export const products = brandConfig.products;


/*
|--------------------------------------------------------------------------
| Default export
|--------------------------------------------------------------------------
*/

export default brandConfig;