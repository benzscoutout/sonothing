import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type Tone = "neutral" | "success" | "warning" | "danger" | "info"

const tones: Record<Tone, string> = {
  neutral: "border-white/10 bg-white/[0.06] text-zinc-300",
  success: "border-emerald-500/25 bg-emerald-500/10 text-emerald-200",
  warning: "border-amber-500/25 bg-amber-500/10 text-amber-200",
  danger: "border-red-500/25 bg-red-500/10 text-red-200",
  info: "border-cyan-500/25 bg-cyan-500/10 text-cyan-200",
}

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide",
        tones[tone],
        className,
      )}
      {...props}
    />
  )
}
