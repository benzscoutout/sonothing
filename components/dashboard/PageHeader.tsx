import type { ReactNode } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function PageHeader({
  title,
  description,
  breadcrumbs,
  action,
  className,
}: {
  title: string
  description?: string
  breadcrumbs?: { label: string; href?: string }[]
  action?: ReactNode
  className?: string
}) {
  return (
    <div className={cn("mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between", className)}>
      <div>
        {breadcrumbs?.length ? (
          <nav className="mb-2 flex flex-wrap items-center gap-1 text-[12px] text-zinc-500">
            {breadcrumbs.map((b, i) => (
              <span key={`${b.label}-${i}`} className="flex items-center gap-1">
                {i > 0 ? <span className="text-zinc-700">/</span> : null}
                {b.href ? (
                  <Link href={b.href} className="hover:text-zinc-300">
                    {b.label}
                  </Link>
                ) : (
                  <span className="text-zinc-400">{b.label}</span>
                )}
              </span>
            ))}
          </nav>
        ) : null}
        <h2 className="text-xl font-semibold tracking-tight text-zinc-50 sm:text-2xl">{title}</h2>
        {description ? <p className="mt-1 max-w-2xl text-sm text-zinc-500">{description}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
