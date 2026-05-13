"use client"

import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"
import { LivePricingPreview } from "@/components/LivePricingPreview"

// ─── Replace with your actual LemonSqueezy checkout URL ───────────────────────
const CHECKOUT_URL = "https://sonothing.lemonsqueezy.com/checkout/buy/your-product-id"
const PRODUCT_PRICE = "$49"
const PRODUCT_NAME = "SaaS Pricing Calculator"

// ─── Data ─────────────────────────────────────────────────────────────────────

const includedFiles = [
  { file: "PricingCalculator.tsx", desc: "Main component — fully configurable" },
  { file: "LivePricingPreview.tsx", desc: "Embed wrapper for any page" },
  { file: "settings.ts", desc: "Single config file — copy, pricing, motion, brand" },
  { file: "globals.css", desc: "Utility classes & hero glow tokens" },
  { file: "README.md", desc: "Setup guide, customisation docs" },
] as const

const featureCards = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-cyan-400">
        <path d="M10 2L12.5 7.5H18L13.5 11L15.5 17L10 13.5L4.5 17L6.5 11L2 7.5H7.5L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Production Ready",
    desc: "Clean Next.js 14 & TypeScript code — no hacks, no workarounds. Drop it into an existing App Router project in minutes.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-violet-400">
        <rect x="2" y="3" width="16" height="11" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M7 17h6M10 14v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Fully Responsive",
    desc: "Mobile-first layouts, fluid typography, and touch-friendly slider. Tested across every viewport from 320 px up.",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-emerald-400">
        <path d="M10 2C5.58 2 2 5.58 2 10s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 6v4l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Lifetime Updates",
    desc: "Buy once, own it forever. Every future version — new features, Framer Motion upgrades, Next.js compatibility — ships free.",
  },
] as const

const faqs = [
  {
    q: "What exactly do I receive after purchase?",
    a: "A ZIP file with 5 source files: the main PricingCalculator component, an embed wrapper, a single settings file, base CSS tokens, and a README. Everything is TypeScript — no compiled bundle.",
  },
  {
    q: "Which tech stack does this require?",
    a: "Next.js 14+ (App Router), React 18+, TypeScript, Tailwind CSS, and Framer Motion 11+. All are common in modern SaaS stacks.",
  },
  {
    q: "Can I use this in commercial client projects?",
    a: "Yes. The license covers unlimited personal and commercial use. You may not resell or redistribute the source files as a standalone product.",
  },
  {
    q: "Does it work outside of Next.js?",
    a: "The core component is plain React + Framer Motion. The Next.js-specific parts (font loading, App Router layout) are thin wrappers you can swap for any React framework.",
  },
  {
    q: "What if I need help with setup?",
    a: "Email support is included. Reach out and I'll help you integrate the component into your project.",
  },
] as const

// ─── Fade-up animation helper ─────────────────────────────────────────────────
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
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── Buy button (reused in multiple places) ───────────────────────────────────
function BuyButton({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const sizeClasses = {
    sm: "px-5 py-2.5 text-[13px]",
    md: "px-7 py-3.5 text-[14px]",
    lg: "px-9 py-4 text-[15px]",
  }
  return (
    <a
      href={CHECKOUT_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full font-semibold text-[#0a0a0a] transition-all duration-300 ${sizeClasses[size]}`}
      style={{
        background: "linear-gradient(135deg, #22d3ee, #a855f7)",
        boxShadow: "0 0 0 0 rgba(34,211,238,0)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        el.style.boxShadow = "0 0 32px 6px rgba(34,211,238,0.35), 0 0 64px 16px rgba(168,85,247,0.2)"
        el.style.transform = "translateY(-1px)"
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.boxShadow = "0 0 0 0 rgba(34,211,238,0)"
        el.style.transform = "translateY(0)"
      }}
    >
      <span className="absolute inset-0 bg-white/0 transition-colors duration-200 group-hover:bg-white/10" />
      <span className="relative">Buy on LemonSqueezy</span>
      <span className="relative font-bold opacity-80">— {PRODUCT_PRICE}</span>
      <span className="relative transition-transform duration-200 group-hover:translate-x-0.5">→</span>
    </a>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function Showcase() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(null)

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-zinc-100"
      style={{ fontFamily: 'var(--font-geist-sans), "Inter", system-ui, sans-serif' }}
    >
      {/* Subtle grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.3]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      {/* ── Sticky Header ──────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
          <span className="text-sm font-semibold tracking-tight text-zinc-200">
            SoNothing<span className="text-zinc-600">.</span>
          </span>

          <nav className="hidden items-center gap-7 text-[13px] text-zinc-400 sm:flex">
            <Link href="#demo" className="transition-colors hover:text-zinc-100">Demo</Link>
            <Link href="#includes" className="transition-colors hover:text-zinc-100">What&apos;s Included</Link>
            <Link href="#faq" className="transition-colors hover:text-zinc-100">FAQ</Link>
          </nav>

          <BuyButton size="sm" />
        </div>
      </header>

      <main className="relative z-10">

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-6 pb-32 pt-24 sm:px-10 sm:pb-40 sm:pt-32 lg:px-16">
          {/* Ambient glows */}
          <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[min(100vw,900px)] -translate-x-1/2 rounded-full bg-cyan-400/[0.09] blur-[160px]" />
          <div className="pointer-events-none absolute right-[5%] top-48 h-80 w-80 rounded-full bg-violet-500/[0.07] blur-[120px]" />
          <div className="pointer-events-none absolute bottom-0 left-[10%] h-60 w-60 rounded-full bg-cyan-400/[0.05] blur-[100px]" />

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto max-w-4xl text-center"
          >
            {/* One-time badge */}
            <div className="mb-8 flex justify-center">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-4 py-1.5 text-[12px] font-medium text-zinc-400 backdrop-blur-sm"
                style={{ boxShadow: "0 0 20px rgba(34,211,238,0.06)" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                One-time purchase · Instant download · Lifetime updates
              </span>
            </div>

            <h1
              className="text-4xl font-semibold leading-[1.07] tracking-[-0.045em] text-balance sm:text-5xl lg:text-[3.75rem]"
              style={{
                background: "linear-gradient(160deg, #ffffff 35%, #71717a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              The Interactive Pricing Calculator for SaaS Products
            </h1>

            <p className="mx-auto mt-7 max-w-xl text-[15px] leading-relaxed text-zinc-500">
              A production-grade Framer Motion component — seat slider, billing toggle,
              animated price counter — wired to a single config file. Drop it into any
              Next.js 14 project in under ten minutes.
            </p>

            {/* Price + CTAs */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <BuyButton size="lg" />
              <Link
                href="#demo"
                className="text-[14px] text-zinc-500 transition-colors hover:text-zinc-300"
              >
                Try live demo ↓
              </Link>
            </div>

            {/* Social proof micro-line */}
            <p className="mt-8 text-[12px] text-zinc-600">
              Secure checkout via LemonSqueezy · Instant ZIP delivery · No subscription
            </p>
          </motion.div>
        </section>

        {/* ── Live Demo ──────────────────────────────────────────────────────── */}
        <section
          id="demo"
          className="scroll-mt-20 border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-3xl">
            <FadeUp className="mb-10 text-center">
              {/* Featured badge */}
              <div className="mb-5 flex justify-center">
                <span
                  className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-400"
                  style={{ boxShadow: "0 0 20px rgba(34,211,238,0.1)" }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                  Featured Product
                </span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Try it right now — live, not a video
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-zinc-500">
                Drag the seat slider, flip the billing toggle, watch the price animate
                in real-time. This is exactly the component you receive after purchase.
              </p>
            </FadeUp>

            <FadeUp delay={0.08}>
              <div className="relative">
                {/* Outer ambient glow */}
                <div
                  className="absolute -inset-6 rounded-3xl opacity-50 blur-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(34,211,238,0.2), rgba(168,85,247,0.14), transparent)",
                  }}
                />
                <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-cyan-500/20 via-transparent to-violet-500/15 opacity-70 blur-sm" />

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
            </FadeUp>
          </div>
        </section>

        {/* ── What's Included ────────────────────────────────────────────────── */}
        <section
          id="includes"
          className="scroll-mt-20 border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-5xl">
            <FadeUp className="mb-12 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                In the box
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                What&apos;s included after purchase
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-zinc-500">
                A clean ZIP with 5 source files. No build step, no CLI, no
                account. Download → copy into your project → configure in one file.
              </p>
            </FadeUp>

            <div className="grid gap-3 sm:grid-cols-1 lg:grid-cols-1">
              {includedFiles.map((item, i) => (
                <FadeUp key={item.file} delay={i * 0.06}>
                  <div
                    className="flex items-center gap-4 rounded-xl border px-5 py-4"
                    style={{ background: "#0f0f0f", borderColor: "#ffffff10" }}
                  >
                    {/* Checkmark */}
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-[#0a0a0a]"
                      style={{ background: "linear-gradient(135deg, #22d3ee, #a855f7)" }}
                    >
                      ✓
                    </span>
                    <span className="font-mono text-[13px] font-medium text-zinc-200">
                      {item.file}
                    </span>
                    <span className="ml-auto text-[13px] text-zinc-500">{item.desc}</span>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Feature Cards ──────────────────────────────────────────────────── */}
        <section className="border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-5xl">
            <FadeUp className="mb-12 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                Product Details
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Built for teams that ship
              </h2>
            </FadeUp>

            <div className="grid gap-4 sm:grid-cols-3">
              {featureCards.map((card, i) => (
                <FadeUp key={card.title} delay={i * 0.08}>
                  <div
                    className="group rounded-2xl border p-7 transition-colors duration-300 hover:border-white/[0.15]"
                    style={{ background: "#0f0f0f", borderColor: "#ffffff10" }}
                  >
                    <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03]">
                      {card.icon}
                    </div>
                    <h3 className="text-[15px] font-semibold text-zinc-100">{card.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-zinc-500">{card.desc}</p>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ────────────────────────────────────────────────────────────── */}
        <section
          id="faq"
          className="scroll-mt-20 border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-2xl">
            <FadeUp className="mb-12 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                FAQ
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Common questions
              </h2>
            </FadeUp>

            <div className="space-y-2">
              {faqs.map((item, i) => (
                <FadeUp key={i} delay={i * 0.05}>
                  <div
                    className="overflow-hidden rounded-xl border transition-colors duration-200"
                    style={{
                      background: "#0f0f0f",
                      borderColor: openFaq === i ? "#ffffff18" : "#ffffff10",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                    >
                      <span className="text-[14px] font-medium text-zinc-200">{item.q}</span>
                      <span
                        className="shrink-0 text-zinc-500 transition-transform duration-200"
                        style={{ transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          key="answer"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-5 text-[14px] leading-relaxed text-zinc-500">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </section>

        {/* ── Final CTA ──────────────────────────────────────────────────────── */}
        <section className="border-t border-white/[0.06] px-6 py-24 sm:px-10 lg:px-16">
          <div className="mx-auto max-w-2xl">
            <FadeUp>
              <div
                className="relative overflow-hidden rounded-3xl border border-white/[0.08] px-10 py-16 text-center"
                style={{ background: "#0d0d0d" }}
              >
                {/* Background glow */}
                <div className="pointer-events-none absolute inset-0">
                  <div
                    className="absolute inset-0 opacity-40"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(34,211,238,0.12), transparent 60%), radial-gradient(ellipse 60% 50% at 100% 100%, rgba(168,85,247,0.1), transparent)",
                    }}
                  />
                </div>

                <div className="relative">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
                    Ready to ship?
                  </p>
                  <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                    Get {PRODUCT_NAME}
                  </h2>
                  <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-zinc-500">
                    One-time payment. No subscriptions. Instant download.
                    Commercial license included.
                  </p>

                  {/* Price display */}
                  <div className="my-8 flex items-baseline justify-center gap-2">
                    <span
                      className="text-[48px] font-extrabold leading-none tracking-[-0.04em]"
                      style={{
                        background: "linear-gradient(135deg, #22d3ee, #a855f7)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      {PRODUCT_PRICE}
                    </span>
                    <span className="text-[16px] text-zinc-500">one-time</span>
                  </div>

                  <BuyButton size="lg" />

                  {/* Trust line */}
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[12px] text-zinc-600">
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✓</span> Secure payment via LemonSqueezy
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✓</span> Instant ZIP download
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="text-emerald-500">✓</span> Personal &amp; commercial license
                    </span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </section>

      </main>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-14 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center gap-5 text-center">
            <p className="text-[14px] font-semibold text-zinc-300">
              Vorapong Paiboonplayoi
            </p>
            <p className="max-w-sm text-[13px] leading-relaxed text-zinc-600">
              Building high-performance web tools for modern startups.
            </p>

            <nav className="flex items-center gap-6 text-[13px] text-zinc-500">
              <a
                href="https://x.com/vorapong"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-300"
              >
                X
              </a>
              <a
                href="https://linkedin.com/in/vorapong"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-zinc-300"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/vorapong"
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
