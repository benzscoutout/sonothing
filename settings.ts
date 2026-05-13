/**
 * Single source of truth for marketing copy, pricing math, motion tuning, and theme.
 * Edit values here — the Pricing Calculator reads everything from this file.
 */

export const settings = {
  meta: {
    title: "Premium Web Assets — Modern Startup Templates",
    description:
      "High-performance React & Next.js templates with Framer Motion — including an interactive SaaS pricing calculator.",
  },

  pricing: {
    /** Shown as the small gradient label above the headline */
    productLabel: "Team seats",
    basePricePerSeat: 12,
    minSeats: 1,
    maxSeats: 50,
    /** Applied as: perMonth × (1 − yearlyDiscountPercent / 100) when yearly is on */
    yearlyDiscountPercent: 20,
    currencySymbol: "$",
  },

  copy: {
    headline: "Estimate your bill",
    /** `{discount}` is replaced with `pricing.yearlyDiscountPercent` */
    subheadTemplate:
      "Drag to set seats. Toggle yearly for {discount}% off.",
    seatsLabel: "Seats",
    perMonthCaption: "Per month",
    /** `{discount}` → yearly discount percent */
    perMonthYearlyCaptionTemplate:
      "Per month (billed yearly · {discount}% off)",
    /** `{symbol}` and `{amount}` are filled in the UI */
    annualTotalTemplate: "Annual total: {symbol}{amount} / year",
    priceSuffix: "/mo",
  },

  billing: {
    monthlyLabel: "Monthly",
    /** `{discount}` → yearly discount (shown as −{discount}%) */
    yearlyLabelTemplate: "Yearly (−{discount}%)",
  },

  brand: {
    gradientFrom: "#22d3ee",
    gradientTo: "#a855f7",
  },

  /** Full-viewport backdrop behind the card (stacked bottom → top, then base color) */
  page: {
    minHeightPx: 420,
    outerPaddingPx: 28,
    cardMaxWidthPx: 400,
    backgroundLayers: [
      "radial-gradient(120% 80% at 50% -20%, rgba(34, 211, 238, 0.12), transparent)",
      "radial-gradient(80% 60% at 100% 100%, rgba(168, 85, 247, 0.1), transparent)",
    ],
    backgroundBase: "#07080d",
  },

  features: {
    sectionTitle: "Included at every tier",
    items: [
      "Unlimited projects & API access",
      "Priority chat & email support",
      "SOC2-ready infrastructure",
      "Custom SSO & audit logs (50+ seats)",
    ],
  },

  motion: {
    priceCount: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
    billingPanelPop: {
      type: "spring" as const,
      stiffness: 520,
      damping: 22,
      mass: 0.85,
    },
    billingPill: {
      type: "spring" as const,
      stiffness: 420,
      damping: 30,
    },
    sliderFill: {
      type: "spring" as const,
      stiffness: 120,
      damping: 20,
    },
    sliderThumb: {
      type: "spring" as const,
      stiffness: 400,
      damping: 28,
    },
    seatBadge: {
      type: "spring" as const,
      stiffness: 500,
      damping: 35,
    },
    yearlyDetail: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
} as const

export type AppSettings = typeof settings
