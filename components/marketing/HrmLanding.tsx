"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"

const CHECKOUT_URL = "https://sonothing.lemonsqueezy.com/checkout/buy/your-product-id"
const PRODUCT_PRICE = "$79"
const PRODUCT_NAME = "SoNothing HRM Admin Template"

const dashboardBullets = [
  "Live KPI cards: headcount, people on leave, open roles, pending leave approvals.",
  "Headcount trend and department breakdown — chart-ready layout using mock series.",
  "Recent activity feed plus employee spotlight with deep links into profiles.",
] as const

const hrmFeatures = [
  {
    title: "Dashboard",
    href: "/dashboard",
    tag: "Overview",
    desc: "Executive snapshot with metrics, trends, and HR activity so stakeholders see signal at a glance.",
  },
  {
    title: "Employees",
    href: "/employees",
    tag: "Directory",
    desc: "Sortable directory, status badges, and rich profile pages for manager hierarchy and contact info.",
  },
  {
    title: "Organization",
    href: "/organization",
    tag: "Structure",
    desc: "Department cards with descriptions, headcount, and member chips — ideal for org planning demos.",
  },
  {
    title: "Leave",
    href: "/leave",
    tag: "Time off",
    desc: "Balance readouts, request form, and approval list patterns with local-only mutations for walkthroughs.",
  },
  {
    title: "Attendance",
    href: "/attendance",
    tag: "Time",
    desc: "Monthly grid with check-in/out controls wired to client state — swap for your clocking API later.",
  },
  {
    title: "Payroll",
    href: "/payroll",
    tag: "Compensation",
    desc: "Payslip table and detail breakdown screens with currency formatting (illustrative numbers only).",
  },
  {
    title: "Recruiting",
    href: "/recruiting",
    tag: "Hiring",
    desc: "Stage-based pipeline with role filter and per-candidate stage controls for hiring manager UX.",
  },
  {
    title: "Settings",
    href: "/settings",
    tag: "Workspace",
    desc: "Company profile fields and notification toggles persisted in sessionStorage to show preferences UI.",
  },
] as const

const highlights = [
  {
    title: "Mock-first architecture",
    body: "Typed seeds and async facades in `lib/mock-api` — swap in your REST or GraphQL client without rewiring the UI.",
  },
  {
    title: "Next.js 14 App Router",
    body: "Route groups for marketing, auth shell, and the dashboard. Production `next build` ready for Lemon Squeezy delivery.",
  },
  {
    title: "Polished UI kit",
    body: "Tailwind primitives, sidebar shell, tables, and Framer Motion page transitions tuned for template demos.",
  },
] as const

const faqs = [
  {
    q: "Does this include a backend?",
    a: "No. All HR data is static mock content for UI demonstration. You connect your own API by replacing the mock facades.",
  },
  {
    q: "Can I resell the template?",
    a: "The license shipped with the product governs use. Typically personal and client projects are allowed; redistributing the source as a competing template is not.",
  },
  {
    q: "What stack is required?",
    a: "Next.js 14+, React 18, TypeScript, Tailwind CSS, and Framer Motion — the same modern defaults as most SaaS admin apps.",
  },
] as const

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function DashboardMockup() {
  const bars = [40, 65, 55, 72, 88].map((h, i) => (
    <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
      <div
        className="w-full max-w-[20px] rounded-sm bg-gradient-to-t from-cyan-500/40 to-violet-500/50"
        style={{ height: `${h}%` }}
      />
      <span className="text-[8px] text-zinc-600">{["J", "F", "M", "A", "M"][i]}</span>
    </div>
  ))

  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/[0.12] shadow-2xl"
      style={{
        background: "linear-gradient(165deg, #111113 0%, #0a0a0c 50%, #0d0d10 100%)",
        boxShadow: "0 0 0 1px rgba(255,255,255,0.04), 0 24px 80px rgba(0,0,0,0.55)",
      }}
    >
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-10 h-48 w-48 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative flex h-[min(420px,70vw)] max-h-[440px] min-h-[320px]">
        {/* Sidebar */}
        <div className="hidden w-[22%] max-w-[140px] shrink-0 flex-col border-r border-white/[0.06] bg-[#080809] sm:flex">
          <div className="flex items-center gap-2 border-b border-white/[0.06] px-3 py-3">
            <span
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[10px] font-bold text-[#0a0a0a]"
              style={{ background: "linear-gradient(135deg, #22d3ee, #a855f7)" }}
            >
              HR
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-1 p-2">
            {["Overview", "People", "Org", "Leave", "Time"].map((label, i) => (
              <div
                key={label}
                className={`rounded-md px-2 py-1.5 text-[10px] font-medium ${
                  i === 0 ? "bg-white/10 text-zinc-100" : "text-zinc-600"
                }`}
              >
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Main */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-10 items-center justify-between border-b border-white/[0.06] bg-[#0a0a0a]/80 px-3 sm:px-4">
            <span className="truncate text-[11px] font-medium text-zinc-400">Dashboard</span>
            <div className="flex gap-1.5">
              <span className="h-2 w-2 rounded-full bg-zinc-700" />
              <span className="h-2 w-2 rounded-full bg-zinc-700" />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-3 overflow-hidden p-3 sm:gap-4 sm:p-4">
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
              {[
                { label: "Headcount", value: "7", sub: "active" },
                { label: "On leave", value: "1", sub: "today" },
                { label: "Open roles", value: "3", sub: "hiring" },
                { label: "Pending leave", value: "2", sub: "approvals" },
              ].map((k) => (
                <div
                  key={k.label}
                  className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-2 sm:px-3 sm:py-2.5"
                >
                  <p className="text-[9px] font-medium uppercase tracking-wide text-zinc-500">{k.label}</p>
                  <p className="mt-0.5 text-lg font-semibold tabular-nums text-zinc-100 sm:text-xl">{k.value}</p>
                  <p className="text-[9px] text-zinc-600">{k.sub}</p>
                </div>
              ))}
            </div>
            <div className="grid min-h-0 flex-1 gap-3 lg:grid-cols-5">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 lg:col-span-3">
                <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Headcount trend</p>
                <div className="mt-3 flex h-24 items-end gap-1 sm:h-28">{bars}</div>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 lg:col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">Activity</p>
                <ul className="mt-3 space-y-2">
                  {["Leave approved · Aisha", "Payroll run · April", "Review cycle opened"].map((t) => (
                    <li key={t} className="flex gap-2 text-[10px] text-zinc-400">
                      <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                      <span className="leading-snug">{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BuyButton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "px-4 py-2 text-[12px]",
    md: "px-6 py-3 text-[13px]",
    lg: "px-8 py-3.5 text-[14px]",
  }
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group inline-flex items-center gap-2 rounded-full font-semibold text-[#0a0a0a] transition hover:opacity-95 ${sizeClasses[size]}`}
      style={{
        background: "linear-gradient(135deg, #22d3ee, #a855f7)",
        boxShadow: "0 0 0 0 rgba(34,211,238,0)",
      }}
    >
      Buy on Lemon Squeezy
      <span className="opacity-80">— {PRODUCT_PRICE}</span>
      <span className="transition-transform group-hover:translate-x-0.5">→</span>
    </a>
  )
}

export function HrmLanding() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <div className="relative min-h-screen" style={{ fontFamily: "var(--font-geist-sans), Inter, system-ui, sans-serif" }}>
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.28]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
          <Link href="/" className="text-sm font-semibold text-zinc-200">
            SoNothing<span className="text-zinc-600">.</span>
            <span className="ml-2 text-[11px] font-normal uppercase tracking-[0.18em] text-zinc-500">HRM</span>
          </Link>
          <nav className="hidden items-center gap-6 text-[13px] text-zinc-400 sm:flex">
            <Link href="#dashboard" className="hover:text-zinc-100">
              Dashboard
            </Link>
            <Link href="#features" className="hover:text-zinc-100">
              HRM features
            </Link>
            <Link href="#modules" className="hover:text-zinc-100">
              For devs
            </Link>
            <Link href="#faq" className="hover:text-zinc-100">
              FAQ
            </Link>
            <Link href="/pricing" className="hover:text-zinc-100">
              Seat calculator
            </Link>
            <Link href="/login" className="hover:text-zinc-100">
              Live demo
            </Link>
          </nav>
          <BuyButton size="sm" />
        </div>
      </header>

      <main className="relative z-10">
        <section className="relative overflow-hidden px-5 pb-24 pt-20 sm:px-10 sm:pb-32 sm:pt-28">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(100vw,820px)] -translate-x-1/2 rounded-full bg-cyan-400/[0.08] blur-[140px]" />
          <div className="pointer-events-none absolute right-[8%] top-40 h-72 w-72 rounded-full bg-violet-500/[0.06] blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Mock data · No backend · Ship-ready UI
            </div>
            <h1
              className="text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.04em] sm:text-5xl"
              style={{
                background: "linear-gradient(160deg, #ffffff 30%, #71717a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              HRM admin template for Next.js — sell it on Lemon Squeezy
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-zinc-500">
              A complete dashboard shell with employees, leave, attendance, payroll views, and recruiting columns.
              Everything runs on typed mock data so buyers can preview the experience instantly.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <BuyButton size="lg" />
              <Link
                href="/login"
                className="text-[14px] text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline"
              >
                Open interactive demo →
              </Link>
            </div>
            <p className="mt-6 text-[12px] text-zinc-600">Secure checkout · ZIP / repo handoff · Documentation included</p>
            <p className="mt-10 text-[12px] text-zinc-600">
              <Link href="#dashboard" className="text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline">
                Preview the dashboard layout ↓
              </Link>
            </p>
          </motion.div>
        </section>

        <section id="dashboard" className="scroll-mt-16 border-t border-white/[0.06] px-5 py-20 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <FadeUp className="mb-10 text-center lg:mb-12">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Product preview</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-50 sm:text-3xl">Dashboard your buyers recognize</h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-500">
                The live app ships the same shell: sidebar navigation, sticky top bar, and overview widgets driven by
                mock APIs. Below is a stylized preview; open the demo for real data and navigation.
              </p>
            </FadeUp>

            <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-12">
              <FadeUp className="lg:col-span-5" delay={0.05}>
                <ul className="space-y-4 text-left">
                  {dashboardBullets.map((line) => (
                    <li key={line} className="flex gap-3 text-sm text-zinc-400">
                      <span
                        className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-[#0a0a0a]"
                        style={{ background: "linear-gradient(135deg, #22d3ee, #a855f7)" }}
                      >
                        ✓
                      </span>
                      <span className="leading-relaxed">{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-5 py-2.5 text-[13px] font-semibold text-zinc-100 transition hover:bg-white/[0.1]"
                  >
                    Open live dashboard
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center text-[13px] text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline"
                  >
                    Start from sign-in screen →
                  </Link>
                </div>
              </FadeUp>
              <FadeUp className="lg:col-span-7" delay={0.1}>
                <DashboardMockup />
              </FadeUp>
            </div>
          </div>
        </section>

        <section id="features" className="scroll-mt-16 border-t border-white/[0.06] px-5 py-20 sm:px-10">
          <div className="mx-auto max-w-6xl">
            <FadeUp className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">Full HRM surface area</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-50 sm:text-3xl">Every core module, mocked and linked</h2>
              <p className="mx-auto mt-2 max-w-2xl text-sm text-zinc-500">
                Eight first-class routes mirror what teams expect from an HR admin product. Click through on the hosted
                demo — no backend required for the UI pass.
              </p>
            </FadeUp>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {hrmFeatures.map((f, i) => (
                <FadeUp key={f.title} delay={i * 0.04}>
                  <Link
                    href={f.href}
                    className="group flex h-full flex-col rounded-2xl border border-white/[0.08] bg-[#0c0c0d] p-5 transition hover:border-cyan-500/25 hover:bg-[#0e0e10]"
                  >
                    <span className="inline-flex w-fit rounded-md border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-300/90">
                      {f.tag}
                    </span>
                    <h3 className="mt-3 text-[15px] font-semibold text-zinc-100 group-hover:text-white">{f.title}</h3>
                    <p className="mt-2 flex-1 text-[13px] leading-relaxed text-zinc-500">{f.desc}</p>
                    <span className="mt-4 text-[12px] font-medium text-cyan-400/90 group-hover:text-cyan-300">
                      View in app →
                    </span>
                  </Link>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section id="modules" className="scroll-mt-16 border-t border-white/[0.06] px-5 py-20 sm:px-10">
          <div className="mx-auto max-w-5xl">
            <FadeUp className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">For developers</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-50 sm:text-3xl">How the template is built</h2>
              <p className="mx-auto mt-2 max-w-lg text-sm text-zinc-500">
                Ship-time ergonomics: typed mock data, async facades, and UI primitives you can extend or replace when
                you connect a real HRIS or internal API.
              </p>
            </FadeUp>
            <div className="grid gap-4 md:grid-cols-3">
              {highlights.map((h, i) => (
                <FadeUp key={h.title} delay={i * 0.06}>
                  <div
                    className="h-full rounded-2xl border border-white/[0.08] p-6"
                    style={{ background: "#0c0c0d" }}
                  >
                    <h3 className="text-[15px] font-semibold text-zinc-100">{h.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-zinc-500">{h.body}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="scroll-mt-16 border-t border-white/[0.06] px-5 py-20 sm:px-10">
          <div className="mx-auto max-w-xl">
            <FadeUp className="mb-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-500">FAQ</p>
              <h2 className="mt-2 text-2xl font-semibold text-zinc-50">Selling templates</h2>
            </FadeUp>
            <div className="space-y-2">
              {faqs.map((item, i) => (
                <FadeUp key={item.q} delay={i * 0.05}>
                  <div
                    className="overflow-hidden rounded-xl border transition-colors"
                    style={{
                      background: "#0c0c0d",
                      borderColor: openFaq === i ? "#ffffff18" : "#ffffff0c",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                    >
                      <span className="text-[14px] font-medium text-zinc-200">{item.q}</span>
                      <span className="text-zinc-500">{openFaq === i ? "−" : "+"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i ? (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-[13px] leading-relaxed text-zinc-500">{item.a}</p>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-white/[0.06] px-5 py-16 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <FadeUp>
              <h2 className="text-xl font-semibold text-zinc-50 sm:text-2xl">Ship your listing with confidence</h2>
              <p className="mt-2 text-sm text-zinc-500">
                {PRODUCT_NAME} — {PRODUCT_PRICE} one-time. Includes README guidance for replacing mock data with your API.
              </p>
              <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
                <BuyButton size="md" />
                <Link href="/pricing" className="text-sm text-zinc-400 hover:text-zinc-200">
                  View pricing calculator demo →
                </Link>
              </div>
            </FadeUp>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] px-5 py-10 text-center text-[12px] text-zinc-600 sm:px-10">
        <p>© {new Date().getFullYear()} Vorapong Paiboonplayoi. HRM template preview.</p>
      </footer>
    </div>
  )
}
