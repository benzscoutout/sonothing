"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { LivePricingPreview } from "@/components/LivePricingPreview"

const productDetails = [
  {
    title: "Production Ready",
    desc: "Clean Next.js 14 & TypeScript code built for real products.",
    icon: "⚡",
  },
  {
    title: "Fully Responsive",
    desc: "Optimized for all devices — mobile-first, fluid type & spacing.",
    icon: "📱",
  },
  {
    title: "Lifetime Updates",
    desc: "Free access to future versions. Buy once, stay current forever.",
    icon: "♾️",
  },
] as const

export function Showcase() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100" style={{ fontFamily: 'var(--font-geist-sans), "Inter", system-ui, sans-serif' }}>
      {/* Grid overlay */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* Header */}
      <header className="relative z-10 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
          <span className="text-sm font-medium tracking-tight text-zinc-200">
            Studio<span className="text-zinc-500">.</span>
          </span>
          <nav className="flex items-center gap-6 text-sm text-zinc-400">
            <Link href="#featured" className="transition-colors hover:text-zinc-100">
              Product
            </Link>
            <Link href="#details" className="transition-colors hover:text-zinc-100">
              Details
            </Link>
            <Link
              href="/pricing"
              className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-zinc-200 transition-colors hover:border-white/20 hover:bg-white/[0.07]"
            >
              Calculator
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden px-6 pb-32 pt-28 sm:px-10 sm:pb-40 sm:pt-36 lg:px-16">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[min(100vw,800px)] -translate-x-1/2 rounded-full bg-cyan-400/[0.1] blur-[140px]" />
          <div className="pointer-events-none absolute right-[8%] top-40 h-72 w-72 rounded-full bg-violet-500/[0.08] blur-[110px]" />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-4xl text-center"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Templates & Components
            </p>

            <h1
              className="mt-8 text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-balance sm:text-5xl lg:text-[3.5rem]"
              style={{
                background: "linear-gradient(160deg, #ffffff 40%, #6b7280 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Premium Framer & Next.js Assets for Tech Teams
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-zinc-500">
              Ship landing pages and product UI faster — opinionated structure,
              motion you can feel, and code written for real products.
            </p>

            {/* Glassmorphism CTA */}
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                href="#featured"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-white/[0.14] bg-white/[0.06] px-7 py-3 text-[14px] font-semibold text-zinc-100 backdrop-blur-md transition-all duration-300 hover:border-white/25 hover:bg-white/[0.1]"
                style={{
                  boxShadow: "0 0 0 0 rgba(34,211,238,0)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 0 28px 4px rgba(34,211,238,0.18), 0 0 60px 12px rgba(168,85,247,0.1)"
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                    "0 0 0 0 rgba(34,211,238,0)"
                }}
              >
                <span
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.08), transparent)",
                  }}
                />
                <span className="relative">Browse Assets</span>
                <span className="relative text-zinc-400 transition-transform duration-200 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>

              <Link
                href="/pricing"
                className="text-[14px] text-zinc-500 transition-colors hover:text-zinc-300"
              >
                See pricing
              </Link>
            </div>
          </motion.div>
        </section>

        {/* ── Featured Pricing Calculator ── */}
        <section
          id="featured"
          className="scroll-mt-24 border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Featured badge */}
              <div className="mb-6 flex justify-center">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/25 bg-cyan-400/[0.07] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400"
                  style={{
                    boxShadow: "0 0 18px rgba(34,211,238,0.12)",
                  }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Featured
                </span>
              </div>

              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-400/90">
                  Interactive
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                  Live preview — pricing calculator
                </h2>
                <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-zinc-500">
                  Same Framer Motion logic as the standalone page: drag seats,
                  flip billing, watch the total animate. Running in production
                  code, not a video.
                </p>
              </div>

              {/* Outer glow wrapper */}
              <div className="relative mt-10">
                <div
                  className="absolute -inset-4 rounded-3xl opacity-60 blur-xl"
                  style={{
                    background:
                      "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(34,211,238,0.18), rgba(168,85,247,0.12), transparent)",
                  }}
                />
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-500/20 via-transparent to-violet-500/15 opacity-80 blur-sm" />
                <div className="relative">
                  <div className="mb-3 flex items-center justify-between px-1">
                    <span className="inline-flex items-center gap-2 text-[12px] font-medium text-zinc-400">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60 opacity-75" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      Live preview
                    </span>
                    <Link
                      href="/pricing"
                      className="text-[12px] text-zinc-500 underline-offset-4 transition-colors hover:text-zinc-300 hover:underline"
                    >
                      Open full page →
                    </Link>
                  </div>
                  <LivePricingPreview />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Product Details / Trust Signals ── */}
        <section
          id="details"
          className="scroll-mt-24 border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="mb-12 text-center"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Product Details
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Built for teams that ship
              </h2>
            </motion.div>

            <div className="grid gap-4 sm:grid-cols-3">
              {productDetails.map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: i * 0.08,
                  }}
                  className="rounded-2xl border p-6"
                  style={{
                    background: "#0f0f0f",
                    borderColor: "#ffffff10",
                  }}
                >
                  <span className="text-2xl">{card.icon}</span>
                  <h3 className="mt-4 text-[15px] font-semibold text-zinc-100">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">
                    {card.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-6 text-center">
            <p className="text-[13px] font-medium text-zinc-400">
              Vorapong Paiboonplayoi
            </p>

            <p className="max-w-sm text-[13px] leading-relaxed text-zinc-600">
              Building high-performance web tools for modern startups.
            </p>

            <nav className="flex items-center gap-6 text-[13px] text-zinc-500">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-300"
              >
                X (Twitter)
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-300"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-300"
              >
                GitHub
              </a>
            </nav>

            <p className="text-[12px] text-zinc-700">
              © 2026 Vorapong Paiboonplayoi. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
