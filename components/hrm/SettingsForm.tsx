"use client"

import * as React from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"

const STORAGE_KEY = "hrm_template_settings_v1"

type SettingsState = {
  companyName: string
  emailPayroll: boolean
  emailLeave: boolean
  digestWeekly: boolean
}

const defaultState: SettingsState = {
  companyName: "SoNothing Demo Co.",
  emailPayroll: true,
  emailLeave: true,
  digestWeekly: false,
}

function load(): SettingsState {
  if (typeof window === "undefined") return defaultState
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return defaultState
    return { ...defaultState, ...JSON.parse(raw) } as SettingsState
  } catch {
    return defaultState
  }
}

function save(state: SettingsState) {
  if (typeof window === "undefined") return
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function SettingsForm() {
  const [state, setState] = React.useState<SettingsState>(defaultState)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setState(load())
    setMounted(true)
  }, [])

  function patch(p: Partial<SettingsState>) {
    setState((s) => {
      const next = { ...s, ...p }
      save(next)
      return next
    })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <h3 className="text-sm font-semibold text-zinc-100">Company</h3>
          <p className="text-[12px] text-zinc-500">Stored in sessionStorage for this tab (demo only).</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-[12px] text-zinc-500">Display name</label>
            <Input
              value={state.companyName}
              disabled={!mounted}
              onChange={(e) => patch({ companyName: e.target.value })}
            />
          </div>
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              sessionStorage.removeItem(STORAGE_KEY)
              setState(defaultState)
            }}
          >
            Reset demo values
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h3 className="text-sm font-semibold text-zinc-100">Notifications</h3>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          {(
            [
              ["emailPayroll", "Payroll emails", "Notify managers when a run completes."],
              ["emailLeave", "Leave approvals", "Ping approvers for pending requests."],
              ["digestWeekly", "Weekly digest", "Send a Monday summary to admins."],
            ] as const
          ).map(([key, title, body]) => (
            <label key={key} className="flex cursor-pointer items-start gap-3 rounded-lg border border-white/[0.06] p-3 hover:bg-white/[0.02]">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5"
                checked={state[key]}
                disabled={!mounted}
                onChange={(e) => patch({ [key]: e.target.checked } as Partial<SettingsState>)}
              />
              <span>
                <span className="font-medium text-zinc-200">{title}</span>
                <span className="mt-0.5 block text-[12px] text-zinc-500">{body}</span>
              </span>
            </label>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
