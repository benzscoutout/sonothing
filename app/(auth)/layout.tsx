import type { ReactNode } from "react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-12 text-zinc-100">
      {children}
    </div>
  )
}
