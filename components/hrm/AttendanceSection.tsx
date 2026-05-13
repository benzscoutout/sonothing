"use client"

import * as React from "react"
import type { AttendanceDay, Employee } from "@/lib/mock-data/types"
import { getEmployeeName } from "@/lib/mock-api"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Select } from "@/components/ui/Select"

const MAY_2026 = Array.from({ length: 31 }, (_, i) => {
  const day = String(i + 1).padStart(2, "0")
  return `2026-05-${day}`
})

function mondayStartPadding(firstDate: string) {
  const d = new Date(`${firstDate}T12:00:00`)
  const sun = d.getDay()
  return (sun + 6) % 7
}

export function AttendanceSection({
  initialRows,
  employees,
}: {
  initialRows: AttendanceDay[]
  employees: Employee[]
}) {
  const [rows, setRows] = React.useState(initialRows)
  const [employeeId, setEmployeeId] = React.useState(employees[0]?.id ?? "")

  const rowMap = React.useMemo(() => {
    const m = new Map<string, AttendanceDay>()
    for (const r of rows) {
      if (r.employeeId === employeeId) m.set(r.date, r)
    }
    return m
  }, [rows, employeeId])

  function punch(date: string, mode: "in" | "out") {
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, "0")
    const mm = String(now.getMinutes()).padStart(2, "0")
    const t = `${hh}:${mm}`
    setRows((prev) => {
      const others = prev.filter((p) => !(p.employeeId === employeeId && p.date === date))
      const cur = prev.find((p) => p.employeeId === employeeId && p.date === date)
      const next: AttendanceDay = {
        date,
        employeeId,
        checkIn: mode === "in" ? t : cur?.checkIn ?? null,
        checkOut: mode === "out" ? t : cur?.checkOut ?? null,
        minutesWorked:
          mode === "out" && (cur?.checkIn ?? null)
            ? 480
            : cur?.minutesWorked ?? null,
      }
      return [...others, next]
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-zinc-100">May 2026</h3>
          <p className="text-[12px] text-zinc-500">Check-in/out updates local component state only.</p>
        </div>
        <div className="w-full sm:w-56">
          <label className="mb-1 block text-[11px] uppercase tracking-wide text-zinc-500">Employee</label>
          <Select value={employeeId} onChange={(e) => setEmployeeId(e.target.value)}>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>
                {getEmployeeName(e)}
              </option>
            ))}
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid max-h-[480px] grid-cols-7 gap-1 overflow-auto text-[11px] sm:text-xs">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <div key={d} className="p-2 text-center font-medium text-zinc-500">
              {d}
            </div>
          ))}
          {Array.from({ length: mondayStartPadding(MAY_2026[0]!) }).map((_, i) => (
            <div key={`pad-${i}`} />
          ))}
          {MAY_2026.map((date) => {
            const r = rowMap.get(date)
            const weekend = [5, 6, 0].includes(new Date(date + "T12:00:00").getDay())
            return (
              <div
                key={date}
                className={`min-h-[88px] rounded-lg border p-2 ${
                  weekend ? "border-white/[0.04] bg-white/[0.01]" : "border-white/[0.08] bg-white/[0.02]"
                }`}
              >
                <p className="font-medium tabular-nums text-zinc-300">{date.slice(8)}</p>
                <p className="mt-1 text-[10px] text-zinc-500">
                  {r?.checkIn ?? "—"} / {r?.checkOut ?? "—"}
                </p>
                <div className="mt-2 flex gap-1">
                  <Button type="button" variant="secondary" className="flex-1 px-1 py-1 text-[10px]" onClick={() => punch(date, "in")}>
                    In
                  </Button>
                  <Button type="button" variant="ghost" className="flex-1 px-1 py-1 text-[10px]" onClick={() => punch(date, "out")}>
                    Out
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
