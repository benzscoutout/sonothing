import type { ButtonHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "secondary" | "ghost" | "danger"

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-cyan-500 to-violet-500 text-[#0a0a0a] font-semibold shadow-sm hover:opacity-95 active:opacity-90",
  secondary:
    "border border-white/15 bg-white/5 text-zinc-100 hover:bg-white/10",
  ghost: "text-zinc-400 hover:text-zinc-100 hover:bg-white/5",
  danger: "bg-red-500/15 text-red-200 border border-red-500/30 hover:bg-red-500/25",
}

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm transition disabled:opacity-40",
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
