"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"
import { cn } from "@/lib/utils"

const nav = [
  { href: "/dashboard", label: "Overview", icon: "◆" },
  { href: "/employees", label: "Employees", icon: "◎" },
  { href: "/organization", label: "Organization", icon: "◇" },
  { href: "/leave", label: "Leave", icon: "○" },
  { href: "/attendance", label: "Attendance", icon: "◈" },
  { href: "/payroll", label: "Payroll", icon: "▣" },
  { href: "/recruiting", label: "Recruiting", icon: "▤" },
  { href: "/settings", label: "Settings", icon: "⚙" },
] as const

export function AppSidebar({
  mobileOpen,
  onNavigate,
}: {
  mobileOpen: boolean
  onNavigate?: () => void
}) {
  const pathname = usePathname()

  const linkClass = (href: string) =>
    cn(
      "flex items-center gap-3 rounded-lg px-3 py-2 text-[13px] transition",
      pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
        ? "bg-white/10 text-zinc-50"
        : "text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200",
    )

  const inner = (
    <>
      <div className="px-3 pb-6 pt-2">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-100"
          onClick={onNavigate}
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-[#0a0a0a]"
            style={{
              background: "linear-gradient(135deg, #22d3ee, #a855f7)",
            }}
          >
            HR
          </span>
          <span>
            SoNothing<span className="text-zinc-600">.</span>
            <span className="block text-[10px] font-normal uppercase tracking-[0.2em] text-zinc-500">
              HRM Template
            </span>
          </span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col gap-0.5 px-2 pb-4">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className={linkClass(item.href)} onClick={onNavigate}>
            <span className="w-5 text-center text-zinc-600">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto border-t border-white/[0.06] p-3">
        <Link
          href="/pricing"
          className="block rounded-lg px-3 py-2 text-[12px] text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-300"
          onClick={onNavigate}
        >
          Template pricing
        </Link>
        <Link
          href="/login"
          className="mt-1 block rounded-lg px-3 py-2 text-[12px] text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-300"
          onClick={onNavigate}
        >
          Sign out (demo)
        </Link>
      </div>
    </>
  )

  return (
    <>
      <aside className="hidden h-full w-56 shrink-0 flex-col border-r border-white/[0.06] bg-[#080809] md:flex">
        {inner}
      </aside>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            key="mobile-sidebar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 md:hidden"
            aria-hidden
          />
        ) : null}
      </AnimatePresence>
      <AnimatePresence>
        {mobileOpen ? (
          <motion.aside
            key="drawer"
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
            className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/[0.08] bg-[#080809] shadow-2xl md:hidden"
          >
            {inner}
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  )
}
