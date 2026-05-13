"use client"

import * as React from "react"
import type { LeaveBalance, LeaveRequest, LeaveType } from "@/lib/mock-data/types"
import { getEmployeeName } from "@/lib/mock-api"
import type { Employee } from "@/lib/mock-data/types"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"

function statusTone(s: LeaveRequest["status"]) {
  if (s === "approved") return "success" as const
  if (s === "rejected") return "danger" as const
  return "warning" as const
}

export function LeaveSection({
  initialRequests,
  balances,
  employees,
}: {
  initialRequests: LeaveRequest[]
  balances: LeaveBalance[]
  employees: Employee[]
}) {
  const [requests, setRequests] = React.useState(initialRequests)
  const [type, setType] = React.useState<LeaveType>("annual")
  const [employeeId, setEmployeeId] = React.useState(employees[0]?.id ?? "")
  const [start, setStart] = React.useState("2026-05-26")
  const [end, setEnd] = React.useState("2026-05-27")
  const [reason, setReason] = React.useState("Template demo request")

  const name = (id: string) => {
    const e = employees.find((x) => x.id === id)
    return e ? getEmployeeName(e) : id
  }

  function daysBetween(a: string, b: string) {
    const t0 = new Date(a).getTime()
    const t1 = new Date(b).getTime()
    if (Number.isNaN(t0) || Number.isNaN(t1) || t1 < t0) return 1
    return Math.max(1, Math.round((t1 - t0) / (24 * 3600 * 1000)) + 1)
  }

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!employeeId) return
    const id = `lr-local-${Date.now()}`
    const next: LeaveRequest = {
      id,
      employeeId,
      type,
      startDate: start,
      endDate: end,
      days: daysBetween(start, end),
      status: "pending",
      reason,
    }
    setRequests((r) => [next, ...r])
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <h3 className="text-sm font-semibold text-zinc-100">Requests</h3>
          <p className="text-[12px] text-zinc-500">New rows append in-memory for this session (no backend).</p>
        </CardHeader>
        <CardContent className="space-y-3">
          {requests.map((r) => (
            <div
              key={r.id}
              className="flex flex-col gap-2 rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="text-sm font-medium text-zinc-100">{name(r.employeeId)}</p>
                <p className="text-[12px] text-zinc-500">
                  {r.startDate} → {r.endDate} · {r.days} day{r.days === 1 ? "" : "s"} · {r.reason}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge tone="neutral">{r.type}</Badge>
                <Badge tone={statusTone(r.status)}>{r.status}</Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-zinc-100">Request leave (demo)</h3>
          </CardHeader>
          <CardContent>
            <form className="space-y-3" onSubmit={submit}>
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Employee</label>
                <Select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
                  {employees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {getEmployeeName(emp)}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Type</label>
                <Select value={type} onChange={(e) => setType(e.target.value as LeaveType)}>
                  <option value="annual">Annual</option>
                  <option value="sick">Sick</option>
                  <option value="personal">Personal</option>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="mb-1 block text-[12px] text-zinc-500">Start</label>
                  <Input type="date" value={start} onChange={(e) => setStart(e.target.value)} />
                </div>
                <div>
                  <label className="mb-1 block text-[12px] text-zinc-500">End</label>
                  <Input type="date" value={end} onChange={(e) => setEnd(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-[12px] text-zinc-500">Reason</label>
                <Input value={reason} onChange={(e) => setReason(e.target.value)} />
              </div>
              <Button type="submit" className="w-full">
                Submit (local only)
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-zinc-100">Balances (seed)</h3>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {balances.slice(0, 5).map((b) => (
              <div key={b.employeeId} className="flex justify-between border-b border-white/[0.04] py-2 last:border-0">
                <span className="text-zinc-400">{name(b.employeeId)}</span>
                <span className="tabular-nums text-zinc-200">
                  A{b.annual} · S{b.sick} · P{b.personal}
                </span>
              </div>
            ))}
            <p className="pt-2 text-[11px] text-zinc-600">Showing first five rows from mock seed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
