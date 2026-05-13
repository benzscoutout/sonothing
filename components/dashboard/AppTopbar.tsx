"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"

export function AppTopbar({
  title,
  subtitle,
  onMenuClick,
  actions,
}: {
  title: string
  subtitle?: string
  onMenuClick: () => void
  actions?: React.ReactNode
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-4 border-b border-white/[0.06] bg-[#0a0a0a]/90 px-4 backdrop-blur-md md:px-6">
      <Button
        type="button"
        variant="ghost"
        className="md:hidden -ml-1 px-2"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <span className="text-lg leading-none">☰</span>
      </Button>
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-sm font-semibold text-zinc-100 md:text-base">{title}</h1>
        {subtitle ? <p className="truncate text-[12px] text-zinc-500">{subtitle}</p> : null}
      </div>
      {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
    </header>
  )
}
