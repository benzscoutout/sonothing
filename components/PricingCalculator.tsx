"use client"

import * as React from "react"
import { motion, animate } from "framer-motion"
import { settings } from "@/settings"

type Billing = "monthly" | "yearly"

function formatMoney(n: number) {
  return n.toLocaleString(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: n % 1 !== 0 ? 2 : 0,
  })
}

function interpolate(template: string, vars: Record<string, string | number>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  )
}

type PricingCalculatorProps = {
  /** Compact in-frame preview (e.g. portfolio); hides feature list and full-viewport chrome */
  variant?: "full" | "embed"
}

export function PricingCalculator({ variant = "full" }: PricingCalculatorProps) {
  const embed = variant === "embed"
  const {
    pricing,
    copy,
    brand,
    page,
    motion: motionSettings,
  } = settings

  const lo = Math.min(pricing.minSeats, pricing.maxSeats)
  const hi = Math.max(pricing.minSeats, pricing.maxSeats)
  const initialSeats = lo
  const discountMultiplier = 1 - pricing.yearlyDiscountPercent / 100
  const initialRaw = initialSeats * pricing.basePricePerSeat

  const [seats, setSeats] = React.useState(initialSeats)
  const [billing, setBilling] = React.useState<Billing>("monthly")
  const [displayPrice, setDisplayPrice] = React.useState(initialRaw)

  const rawMonthlyTotal = seats * pricing.basePricePerSeat
  const effectivePerMonth =
    billing === "yearly"
      ? rawMonthlyTotal * discountMultiplier
      : rawMonthlyTotal

  const priceFromRef = React.useRef(displayPrice)
  const skipBillingEntrance = React.useRef(true)
  React.useLayoutEffect(() => {
    skipBillingEntrance.current = false
  }, [])

  React.useEffect(() => {
    setSeats((s) => Math.min(hi, Math.max(lo, s)))
  }, [lo, hi])

  React.useEffect(() => {
    const from = priceFromRef.current
    const controls = animate(from, effectivePerMonth, {
      duration: motionSettings.priceCount.duration,
      ease: motionSettings.priceCount.ease,
      onUpdate: (v) => {
        priceFromRef.current = v
        setDisplayPrice(v)
      },
      onComplete: () => {
        priceFromRef.current = effectivePerMonth
      },
    })
    return () => controls.stop()
  }, [
    effectivePerMonth,
    motionSettings.priceCount.duration,
    motionSettings.priceCount.ease,
  ])

  const sliderPercent = hi > lo ? ((seats - lo) / (hi - lo)) * 100 : 0

  const pageBackground = [
    ...page.backgroundLayers,
    page.backgroundBase,
  ].join(", ")

  const subhead = interpolate(copy.subheadTemplate, {
    discount: pricing.yearlyDiscountPercent,
  })

  const yearlyCaption = interpolate(copy.perMonthYearlyCaptionTemplate, {
    discount: pricing.yearlyDiscountPercent,
  })

  const annualLine = interpolate(copy.annualTotalTemplate, {
    symbol: pricing.currencySymbol,
    amount: formatMoney(effectivePerMonth * 12),
  })

  return (
    <div
      className={
        embed
          ? "box-border flex w-full items-center justify-center py-3"
          : "box-border flex min-h-screen w-full items-center justify-center"
      }
      style={{
        minHeight: embed ? undefined : Math.max(page.minHeightPx, 480),
        padding: embed ? 12 : page.outerPaddingPx,
        fontFamily:
          'var(--font-geist-sans), "Inter", "SF Pro Display", system-ui, sans-serif',
        background: pageBackground,
      }}
    >
      <motion.div
        layout
        className={
          embed
            ? "w-full rounded-2xl border border-white/10 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_16px_40px_-12px_rgba(0,0,0,0.5)] backdrop-blur-xl backdrop-saturate-[160%]"
            : "w-full rounded-[20px] border border-white/10 p-7 shadow-[0_0_0_1px_rgba(255,255,255,0.03)_inset,0_24px_48px_-12px_rgba(0,0,0,0.55)] backdrop-blur-xl backdrop-saturate-[160%]"
        }
        style={{
          maxWidth: embed ? Math.min(page.cardMaxWidthPx, 360) : page.cardMaxWidthPx,
          background: "rgba(255, 255, 255, 0.04)",
        }}
      >
        <div
          className="mb-2 text-[13px] font-semibold uppercase tracking-[0.06em]"
          style={{
            background: `linear-gradient(90deg, ${brand.gradientFrom}, ${brand.gradientTo})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {pricing.productLabel}
        </div>
        <h2
          className={
            embed
              ? "m-0 text-lg font-bold tracking-[-0.02em] text-zinc-100"
              : "m-0 text-[22px] font-bold tracking-[-0.02em] text-zinc-100"
          }
        >
          {copy.headline}
        </h2>
        <p
          className={
            embed
              ? "mb-4 mt-1.5 text-[13px] leading-relaxed text-zinc-100/55"
              : "mb-6 mt-2 text-[14px] leading-relaxed text-zinc-100/55"
          }
        >
          {subhead}
        </p>

        <BillingToggle
          billing={billing}
          onChange={setBilling}
          gradientFrom={brand.gradientFrom}
          gradientTo={brand.gradientTo}
        />

        <div className={embed ? "mb-2 mt-4" : "mb-3 mt-7"}>
          <div className="mb-3.5 flex items-baseline justify-between">
            <span className="text-[14px] font-medium text-zinc-100/65">
              {copy.seatsLabel}
            </span>
            <motion.span
              key={seats}
              initial={{ opacity: 0.5, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={motionSettings.seatBadge}
              className="text-[15px] font-bold tabular-nums text-zinc-50"
            >
              {seats}
            </motion.span>
          </div>

          <SliderTrack
            min={lo}
            max={hi}
            value={seats}
            onChange={setSeats}
            gradientFrom={brand.gradientFrom}
            gradientTo={brand.gradientTo}
            sliderPercent={sliderPercent}
            springFill={motionSettings.sliderFill}
            springThumb={motionSettings.sliderThumb}
          />
        </div>

        <motion.div
          key={billing}
          initial={
            skipBillingEntrance.current
              ? false
              : { scale: 0.9, opacity: 0.88 }
          }
          animate={{ scale: 1, opacity: 1 }}
          transition={motionSettings.billingPanelPop}
          className={
            embed
              ? "mt-2 rounded-xl border border-white/10 bg-black/35 px-4 py-4"
              : "mt-2 rounded-2xl border border-white/10 bg-black/35 px-[18px] py-5"
          }
        >
          <div className="mb-1.5 text-[13px] text-zinc-100/50">
            {billing === "yearly" ? yearlyCaption : copy.perMonthCaption}
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-[20px] font-semibold text-zinc-100/45">
              {pricing.currencySymbol}
            </span>
            <motion.span
              className={
                embed
                  ? "text-[32px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
                  : "text-[42px] font-extrabold leading-none tracking-[-0.03em] tabular-nums"
              }
              style={{
                background: `linear-gradient(135deg, ${brand.gradientFrom}, ${brand.gradientTo})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {formatMoney(displayPrice)}
            </motion.span>
            <span className="text-[15px] font-medium text-zinc-100/40">
              {copy.priceSuffix}
            </span>
          </div>
          {billing === "yearly" && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={motionSettings.yearlyDetail}
              className="mt-2.5 text-[12px] text-zinc-100/45"
            >
              {annualLine}
            </motion.div>
          )}
        </motion.div>

        {!embed && (
          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-zinc-400">
              {settings.features.sectionTitle}
            </p>
            <ul className="space-y-2.5">
              {settings.features.items.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[13px] leading-snug text-zinc-300"
                >
                  <span
                    className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-zinc-950"
                    style={{
                      background: `linear-gradient(135deg, ${brand.gradientFrom}, ${brand.gradientTo})`,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function BillingToggle({
  billing,
  onChange,
  gradientFrom,
  gradientTo,
}: {
  billing: Billing
  onChange: (b: Billing) => void
  gradientFrom: string
  gradientTo: string
}) {
  const yearlyLabel = interpolate(settings.billing.yearlyLabelTemplate, {
    discount: settings.pricing.yearlyDiscountPercent,
  })

  return (
    <div className="relative flex rounded-[14px] border border-white/10 bg-black/40 p-1">
      <motion.div
        className="absolute bottom-1 left-1 top-1 w-[calc(50%-4px)] rounded-[11px]"
        style={{
          background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
          boxShadow: "0 4px 24px rgba(0, 0, 0, 0.35)",
        }}
        animate={{ x: billing === "monthly" ? 0 : "100%" }}
        transition={settings.motion.billingPill}
      />
      {(["monthly", "yearly"] as const).map((mode) => (
        <button
          key={mode}
          type="button"
          onClick={() => onChange(mode)}
          className={`relative z-[1] flex-1 cursor-pointer rounded-[11px] border-none bg-transparent px-3 py-2.5 text-[14px] font-semibold transition-colors duration-200 ${
            billing === mode
              ? "text-[#0a0a0f]"
              : "text-zinc-100/55 hover:text-zinc-200"
          }`}
        >
          {mode === "monthly"
            ? settings.billing.monthlyLabel
            : yearlyLabel}
        </button>
      ))}
    </div>
  )
}

function SliderTrack({
  min,
  max,
  value,
  onChange,
  gradientFrom,
  gradientTo,
  sliderPercent,
  springFill,
  springThumb,
}: {
  min: number
  max: number
  value: number
  onChange: (n: number) => void
  gradientFrom: string
  gradientTo: string
  sliderPercent: number
  springFill: (typeof settings.motion)["sliderFill"]
  springThumb: (typeof settings.motion)["sliderThumb"]
}) {
  const id = React.useId()
  return (
    <div className="relative pb-2 pt-1">
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
            boxShadow: "0 0 18px rgba(255, 255, 255, 0.1)",
          }}
          initial={false}
          animate={{ width: `${sliderPercent}%` }}
          transition={springFill}
        />
      </div>
      <motion.div
        className="pointer-events-none absolute top-1/2 h-7 w-7 -translate-y-1/2 rounded-full"
        style={{
          marginTop: -10,
          left: `calc(${sliderPercent}% - 14px)`,
          background: "linear-gradient(145deg, #fff, #e4e4e7)",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.5) inset",
        }}
        animate={{ left: `calc(${sliderPercent}% - 14px)` }}
        transition={springThumb}
      />
      <input
        id={`range-${id}`}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="absolute inset-0 -top-2 m-0 h-11 w-full cursor-pointer opacity-0"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-label={settings.copy.seatsLabel}
      />
    </div>
  )
}
