"use client"

import { PricingCalculator } from "@/components/PricingCalculator"

/** In-page interactive preview of the glass pricing calculator (same code as /pricing). */
export function LivePricingPreview() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#07080d] shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset,0_24px_64px_-16px_rgba(0,0,0,0.75)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(34,211,238,0.12),transparent)]" />
      <div className="relative max-h-[min(520px,70vh)] overflow-y-auto overflow-x-hidden">
        <PricingCalculator variant="embed" />
      </div>
    </div>
  )
}
