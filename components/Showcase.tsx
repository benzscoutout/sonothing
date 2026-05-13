import Link from "next/link"
import { LivePricingPreview } from "@/components/LivePricingPreview"

const techFeatures = [
  { label: "React / Next.js 14", detail: "App Router, TypeScript, production-ready" },
  { label: "Framer Motion", detail: "Spring physics, counting animations, micro-interactions" },
  { label: "Fully Responsive", detail: "Mobile-first layouts, fluid type & spacing" },
] as const

const footerLinks = [
  { href: "#featured", label: "Featured" },
  { href: "#preview", label: "Live preview" },
  { href: "#about", label: "About" },
  { href: "/pricing", label: "Full calculator" },
  { href: "https://github.com", label: "GitHub", external: true },
  { href: "https://vercel.com", label: "Deploy", external: true },
] as const

export function Showcase() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-zinc-100">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
        }}
      />

      <header className="relative z-10 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6 sm:px-8">
          <span className="text-sm font-medium tracking-tight text-zinc-200">
            Studio<span className="text-zinc-500">.</span>
          </span>
          <nav className="flex items-center gap-6 text-sm text-zinc-400">
            <Link
              href="#featured"
              className="transition-colors hover:text-zinc-100"
            >
              Product
            </Link>
            <Link
              href="#preview"
              className="transition-colors hover:text-zinc-100"
            >
              Preview
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
        {/* Hero */}
        <section className="relative overflow-hidden px-6 pb-24 pt-20 sm:px-10 sm:pb-28 sm:pt-28 lg:px-16">
          <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[min(100vw,720px)] -translate-x-1/2 rounded-full bg-cyan-400/[0.12] blur-[120px]" />
          <div className="pointer-events-none absolute right-[10%] top-32 h-64 w-64 rounded-full bg-violet-500/[0.1] blur-[100px]" />

          <p className="relative text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-zinc-500">
            Templates & components
          </p>
          <h1 className="hero-glow-text relative mx-auto mt-8 max-w-4xl text-center text-4xl font-semibold leading-[1.08] tracking-[-0.04em] text-balance text-zinc-50 sm:text-5xl lg:text-[3.25rem]">
            Premium Web Assets for Modern Startups
          </h1>
          <p className="relative mx-auto mt-6 max-w-xl text-center text-[15px] leading-relaxed text-zinc-500">
            Ship landing pages and product UI faster — opinionated structure,
            motion you can feel, and code written for real products.
          </p>
        </section>

        {/* Featured product */}
        <section
          id="featured"
          className="scroll-mt-24 border-t border-white/[0.06] px-6 py-20 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-6xl">
            <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-16">
              <div className="max-w-lg shrink-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-400/90">
                  Featured template
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl">
                  SaaS Landing Page Template
                </h2>
                <p className="mt-4 text-[15px] leading-relaxed text-zinc-500">
                  A complete marketing surface: hero, social proof, pricing
                  patterns, and conversion-focused sections — wired for
                  customization without fighting the codebase.
                </p>
                <ul className="mt-8 space-y-3">
                  {techFeatures.map((f) => (
                    <li
                      key={f.label}
                      className="flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                    >
                      <span className="font-mono text-[13px] font-medium text-zinc-200">
                        {f.label}
                      </span>
                      <span className="mt-1 text-[13px] text-zinc-500 sm:mt-0 sm:text-right">
                        {f.detail}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="min-w-0 flex-1">
                <TemplateScreenshotPlaceholder />
                <p className="mt-3 text-center text-[12px] text-zinc-600">
                  Replace with your export: add{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">
                    public/template-preview.png
                  </code>{" "}
                  and swap the placeholder in{" "}
                  <code className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[11px] text-zinc-400">
                    Showcase.tsx
                  </code>
                  .
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Live pricing calculator */}
        <section
          id="preview"
          className="scroll-mt-24 border-t border-white/[0.06] px-6 py-20 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-3xl">
            <div className="mb-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-violet-400/90">
                Interactive
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
                Live preview — pricing calculator
              </h2>
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-zinc-500">
                Same Framer Motion logic as the standalone page: drag seats,
                flip billing, watch the total animate. This is the component
                from your capture — running in production code, not a video.
              </p>
            </div>
            <div className="relative">
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
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="scroll-mt-24 border-t border-white/[0.06] px-6 py-20 sm:px-10 lg:px-16"
        >
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl">
              About the author
            </h2>
            <div className="mx-auto mt-8 flex max-w-xl flex-col items-center gap-6 sm:flex-row sm:text-left">
              <div
                className="h-20 w-20 shrink-0 rounded-2xl border border-white/[0.08] bg-gradient-to-br from-zinc-800 to-zinc-950 shadow-inner"
                aria-hidden
              />
              <div>
                <p className="text-[15px] font-medium text-zinc-200">
                  Full-stack Developer & Product Manager
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-500">
                  I build high-performance web templates and internal tools
                  where UX, performance, and maintainability meet. Every asset
                  is structured so your team can extend it without a rewrite.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 sm:flex-row">
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-zinc-500">
            {footerLinks.map((item) =>
              "external" in item && item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-zinc-300"
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  className="transition-colors hover:text-zinc-300"
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>
          <p className="text-center text-[13px] text-zinc-600">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

/** Large screenshot placeholder — swap for `next/image` when `public/template-preview.png` exists. */
function TemplateScreenshotPlaceholder() {
  return (
    <div
      className="group relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-white/[0.08] bg-zinc-950 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.85)]"
      role="img"
      aria-label="SaaS landing page template screenshot placeholder"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-10%,rgba(34,211,238,0.15),transparent_55%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(139,92,246,0.12),transparent)]" />
      <div className="absolute inset-x-0 top-0 flex h-9 items-center gap-1.5 border-b border-white/[0.06] bg-black/40 px-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
        <div className="ml-3 flex-1 rounded-md bg-white/[0.04] py-1 text-center font-mono text-[10px] text-zinc-600">
          app.yourproduct.com
        </div>
      </div>
      <div className="absolute inset-0 top-9 flex flex-col p-6 sm:p-10">
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
            Screenshot placeholder
          </p>
          <p className="mt-3 text-lg font-medium tracking-tight text-zinc-400 transition-colors group-hover:text-zinc-300 sm:text-xl">
            SaaS Landing Page
          </p>
          <p className="mt-2 max-w-sm text-sm text-zinc-600">
            Drop a PNG export here for a polished product shot — layout is
            ready for a 16∶10 asset.
          </p>
        </div>
        <div className="mt-auto flex justify-center gap-2 pb-2">
          <span className="h-1 w-8 rounded-full bg-white/10" />
          <span className="h-1 w-2 rounded-full bg-white/5" />
          <span className="h-1 w-2 rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  )
}
