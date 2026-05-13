"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"

export default function LoginPage() {
  const router = useRouter()
  const [pending, setPending] = React.useState(false)

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setPending(true)
    window.setTimeout(() => {
      router.push("/dashboard")
      setPending(false)
    }, 400)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-md"
    >
      <Card>
        <CardHeader>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Demo sign-in</p>
          <h1 className="mt-1 text-lg font-semibold text-zinc-50">Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-500">
            This template has no backend. Submit any email and password to enter the mock dashboard.
          </p>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={onSubmit}>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-zinc-400" htmlFor="email">
                Work email
              </label>
              <Input id="email" name="email" type="email" autoComplete="username" placeholder="you@company.com" required />
            </div>
            <div>
              <label className="mb-1.5 block text-[12px] font-medium text-zinc-400" htmlFor="password">
                Password
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Signing in…" : "Continue to dashboard"}
            </Button>
          </form>
          <p className="mt-4 text-center text-[12px] text-zinc-600">
            <Link href="/" className="text-zinc-400 underline-offset-4 hover:text-zinc-200 hover:underline">
              ← Back to marketing
            </Link>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}
