import type { SelectHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

export function Select({ className, children, ...props }: SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cn(
        "w-full rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-zinc-100 outline-none ring-cyan-500/40 focus:border-cyan-500/40 focus:ring-2",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  )
}
