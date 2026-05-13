import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function EmptyState({
  title,
  description,
  className,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-white/[0.02] px-6 py-16 text-center",
        className,
      )}
    >
      <p className="text-sm font-medium text-zinc-200">{title}</p>
      <p className="mt-2 max-w-sm text-sm text-zinc-500">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
