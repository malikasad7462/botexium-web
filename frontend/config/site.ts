/**
 * ============================================================
 * BOTEXIUM MASTER SITE CONFIGURATION
 * ============================================================
 *
 * IMPORTANT:
 * BOTEXIUM is currently a temporary working brand name.
 *
 * When the permanent brand/domain is finalized, most public
 * identity changes should be made from this file instead of
 * editing individual components.
 *
 * ============================================================
 */

export const siteConfig = {
  /*
  |--------------------------------------------------------------------------
  | Brand Identity
  |--------------------------------------------------------------------------
  */

  brand: {
    name: "BOTEXIUM",

    shortName: "BOTEXIUM",

    ecosystemName: "BOTEXIUM Ecosystem",

    legalName: "BOTEXIUM",

    tagline: "Building the Future of Digital Ecosystems",

    shortTagline:
      "Software • AI • Education • Business • Blockchain",

    description:
      "A global digital ecosystem connecting Software, Artificial Intelligence, Business, Education, Marketplace and Blockchain into one powerful platform.",
  },

  /*
  |--------------------------------------------------------------------------
  | Website / Application
  |--------------------------------------------------------------------------
  */

  website: {
    name: "BOTEXIUM Ecosystem",

    appName: "BOTEXIUM Dashboard",

    domain: "example.com",

    url: "https://example.com",

    environment: "development" as
      | "development"
      | "staging"
      | "production",
  },

  /*
  |--------------------------------------------------------------------------
  | Logo / Branding Assets
  |--------------------------------------------------------------------------
  |
  | These paths can be updated later when the permanent SVG logo
  | is created.
  |
  */

  branding: {
    logo: "/logo.svg",

    logoLight: "/logo.svg",

    logoDark: "/logo.svg",

    favicon: "/favicon.ico",

    mark: "/logo-mark.svg",
  },

  /*
  |--------------------------------------------------------------------------
  | Contact
  |--------------------------------------------------------------------------
  */

  contact: {
    email: "support@example.com",

    supportEmail: "support@example.com",

    businessEmail: "info@example.com",
  },

  /*
  |--------------------------------------------------------------------------
  | Social Media
  |--------------------------------------------------------------------------
  */

  social: {
    facebook: "",

    instagram: "",

    twitter: "",

    youtube: "",

    telegram: "",

    whatsapp: "",

    discord: "",
  },

  /*
  |--------------------------------------------------------------------------
  | SEO
  |--------------------------------------------------------------------------
  */

  seo: {
    title: "BOTEXIUM Ecosystem",

    description:
      "Building the future of global digital ecosystems.",

    keywords: [
      "BOTEXIUM",
      "BOTEXIUM Ecosystem",
      "Blockchain",
      "Artificial Intelligence",
      "Software",
      "Marketplace",
      "Digital Ecosystem",
      "Business",
      "Education",
      "Web3",
    ],
  },

  /*
  |--------------------------------------------------------------------------
  | Legal / Public Pages
  |--------------------------------------------------------------------------
  */

  legal: {
    privacyUrl: "/privacy",

    termsUrl: "/terms",

    disclaimerUrl: "/disclaimer",
  },
} as const;

/*
|--------------------------------------------------------------------------
| Convenience Exports
|--------------------------------------------------------------------------
|
| These make frequently used values easy to import without having
| to repeatedly write siteConfig.brand.name etc.
|
*/

export const brandName = siteConfig.brand.name;

export const ecosystemName =
  siteConfig.brand.ecosystemName;

export const appName =
  siteConfig.website.appName;

export const websiteUrl =
  siteConfig.website.url;