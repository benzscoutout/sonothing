"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { AppSidebar } from "@/components/dashboard/AppSidebar"
import { AppTopbar } from "@/components/dashboard/AppTopbar"

const titles: Record<string, { title: string; subtitle?: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Headcount, leave, and payroll signals (mock data)." },
  "/employees": { title: "Employees", subtitle: "Directory sourced from mock API facades." },
  "/organization": { title: "Organization", subtitle: "Departments and leadership (demo)." },
  "/leave": { title: "Leave", subtitle: "Balances and requests — UI only, no persistence." },
  "/attendance": { title: "Attendance", subtitle: "May 2026 demo grid with local check-in state." },
  "/payroll": { title: "Payroll", subtitle: "Sample payslips for template preview." },
  "/recruiting": { title: "Recruiting", subtitle: "Pipeline cards with mock candidates." },
  "/settings": { title: "Settings", subtitle: "Toggles stored in session for this browser tab." },
}

function titleForPath(pathname: string | null) {
  if (!pathname) return { title: "HRM", subtitle: undefined }
  if (titles[pathname]) return titles[pathname]
  if (pathname.startsWith("/employees/")) {
    return { title: "Employee profile", subtitle: "Read-only mock profile." }
  }
  if (pathname.startsWith("/payroll/")) {
    return { title: "Payslip", subtitle: "Mock totals for demonstration." }
  }
  return { title: "HRM", subtitle: undefined }
}

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const { title, subtitle } = titleForPath(pathname)

  React.useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] text-zinc-100">
      <AppSidebar
        mobileOpen={mobileOpen}
        onNavigate={() => setMobileOpen(false)}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <AppTopbar
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileOpen((o) => !o)}
        />
        <motion.main
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="flex-1 overflow-auto px-4 py-6 md:px-8"
        >
          {children}
        </motion.main>
      </div>
    </div>
  )
}
