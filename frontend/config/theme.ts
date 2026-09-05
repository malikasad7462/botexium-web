/**
 * ============================================================
 * BOTEXIUM MASTER DESIGN THEME
 * ============================================================
 *
 * This file is the central visual configuration for BOTEXIUM.
 *
 * IMPORTANT:
 * Do not create random colors, shadows, radiuses or typography
 * values inside individual components unless there is a genuine
 * component-specific reason.
 *
 * ============================================================
 */

export const theme = {
  /*
  |--------------------------------------------------------------------------
  | Brand Colors
  |--------------------------------------------------------------------------
  */

  colors: {
    primary: "#22d3ee",
    primaryHover: "#67e8f9",
    primaryDark: "#0891b2",

    secondary: "#06b6d4",

    accent: "#00d4ff",

    background: "#050816",
    backgroundSecondary: "#07101f",
    backgroundTertiary: "#0a1020",

    surface: "rgba(255, 255, 255, 0.05)",
    surfaceLight: "rgba(255, 255, 255, 0.07)",
    surfaceDark: "rgba(255, 255, 255, 0.025)",

    border: "rgba(34, 211, 238, 0.12)",
    borderStrong: "rgba(34, 211, 238, 0.25)",
    borderSubtle: "rgba(255, 255, 255, 0.06)",

    text: "#ffffff",
    textPrimary: "#f8fafc",
    textSecondary: "#d1d5db",
    textMuted: "#9ca3af",
    textSubtle: "#6b7280",
    textDisabled: "#4b5563",

    success: "#4ade80",
    warning: "#facc15",
    danger: "#f87171",
    info: "#38bdf8",

    black: "#000000",
    white: "#ffffff",
  },

  /*
  |--------------------------------------------------------------------------
  | Typography
  |--------------------------------------------------------------------------
  |
  | Geist is already loaded globally through Next.js.
  |
  */

  typography: {
    fontFamily: {
      sans: "var(--font-geist-sans)",
      mono: "var(--font-geist-mono)",
    },

    weight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },

    size: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
      "6xl": "3.75rem",
    },

    tracking: {
      tight: "-0.025em",
      normal: "0",
      wide: "0.025em",
      label: "0.15em",
      uppercase: "0.25em",
      brand: "0.25em",
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Border Radius
  |--------------------------------------------------------------------------
  */

  radius: {
    sm: "0.5rem",
    md: "0.75rem",
    lg: "1rem",
    xl: "1.25rem",
    "2xl": "1.5rem",
    pill: "9999px",
    card: "24px",
    button: "9999px",
  },

  /*
  |--------------------------------------------------------------------------
  | Glass / Card System
  |--------------------------------------------------------------------------
  */

  card: {
    background: "rgba(255, 255, 255, 0.05)",

    backgroundHover:
      "rgba(255, 255, 255, 0.065)",

    backdropBlur: "18px",

    border:
      "1px solid rgba(0, 212, 255, 0.12)",

    borderHover:
      "1px solid #22d3ee",

    radius: "24px",

    padding: "2rem",

    transition:
      "all 0.35s ease",

    hoverTransform:
      "translateY(-10px) scale(1.02)",
  },

  /*
  |--------------------------------------------------------------------------
  | Glow System
  |--------------------------------------------------------------------------
  */

  glow: {
    primary:
      "0 0 25px rgba(34, 211, 238, 0.10)",

    primaryStrong:
      "0 0 35px rgba(34, 211, 238, 0.20)",

    card:
      "0 15px 40px rgba(0, 212, 255, 0.15), 0 0 35px rgba(0, 212, 255, 0.08)",

    button:
      "0 10px 30px rgba(34, 211, 238, 0.25)",

    buttonHover:
      "0 18px 45px rgba(34, 211, 238, 0.35), 0 0 25px rgba(34, 211, 238, 0.20)",

    text:
      "0 0 30px rgba(34, 211, 238, 0.18), 0 0 60px rgba(34, 211, 238, 0.10)",
  },

  /*
  |--------------------------------------------------------------------------
  | Shadows
  |--------------------------------------------------------------------------
  */

  shadow: {
    sm:
      "0 4px 15px rgba(0, 0, 0, 0.15)",

    md:
      "0 10px 30px rgba(0, 0, 0, 0.20)",

    lg:
      "0 20px 50px rgba(0, 0, 0, 0.25)",

    card:
      "0 15px 40px rgba(0, 212, 255, 0.15)",

    button:
      "0 10px 30px rgba(34, 211, 238, 0.25)",
  },

  /*
  |--------------------------------------------------------------------------
  | Button System
  |--------------------------------------------------------------------------
  */

  button: {
    primary: {
      background:
        "linear-gradient(135deg, #22d3ee, #06b6d4)",

      color: "#000000",

      fontWeight: 700,

      borderRadius: "9999px",

      padding:
        "14px 32px",

      transition:
        "all 0.35s ease",

      shadow:
        "0 10px 30px rgba(34, 211, 238, 0.25)",

      hoverShadow:
        "0 18px 45px rgba(34, 211, 238, 0.35), 0 0 25px rgba(34, 211, 238, 0.20)",
    },

    secondary: {
      background:
        "rgba(255, 255, 255, 0.04)",

      color: "#e5e7eb",

      border:
        "1px solid rgba(34, 211, 238, 0.15)",

      borderHover:
        "1px solid rgba(34, 211, 238, 0.40)",

      borderRadius: "9999px",

      transition:
        "all 0.35s ease",
    },
  },

  /*
  |--------------------------------------------------------------------------
  | Gradients
  |--------------------------------------------------------------------------
  */

  gradients: {
    brand:
      "linear-gradient(90deg, #ffffff, #67e8f9, #22d3ee)",

    primary:
      "linear-gradient(135deg, #22d3ee, #06b6d4)",

    background:
      "radial-gradient(circle at top right, rgba(0,212,255,0.08), transparent 35%), radial-gradient(circle at bottom left, rgba(0,153,255,0.07), transparent 35%)",
  },

  /*
  |--------------------------------------------------------------------------
  | Animation / Transition
  |--------------------------------------------------------------------------
  */

  transition: {
    fast: "0.2s ease",
    normal: "0.35s ease",
    slow: "0.8s ease",

    hover:
      "all 0.35s ease",
  },

  /*
  |--------------------------------------------------------------------------
  | Layout
  |--------------------------------------------------------------------------
  */

  layout: {
    maxWidth:
      "1280px",

    contentPadding:
      "1.5rem",

    sectionSpacing:
      "6rem",

    dashboardSidebar:
      "280px",

    dashboardSidebarCollapsed:
      "82px",
  },
} as const;

/*
|--------------------------------------------------------------------------
| Convenient exports
|--------------------------------------------------------------------------
*/

export const colors = theme.colors;

export const typography = theme.typography;

export const radius = theme.radius;

export const cardTheme = theme.card;

export const glow = theme.glow;

export const shadows = theme.shadow;

export const buttons = theme.button;

export const gradients = theme.gradients;