import type { ActivityItem, DashboardSummary } from "./types"
import { departmentsSeed } from "./departments"
import { employeesSeed } from "./employees"
import { jobOpeningsSeed } from "./recruiting"
import { leaveRequestsSeed } from "./leave"

function countByDepartment(): { departmentId: string; name: string; count: number }[] {
  const map = new Map<string, number>()
  for (const e of employeesSeed) {
    if (e.status === "terminated") continue
    map.set(e.departmentId, (map.get(e.departmentId) ?? 0) + 1)
  }
  return departmentsSeed.map((d) => ({
    departmentId: d.id,
    name: d.name,
    count: map.get(d.id) ?? 0,
  }))
}

export function buildDashboardSummary(): DashboardSummary {
  const active = employeesSeed.filter((e) => e.status !== "terminated")
  const onLeaveToday = active.filter((e) => e.status === "on_leave").length
  return {
    headcount: active.length,
    onLeaveToday,
    openRoles: jobOpeningsSeed.length,
    pendingLeaveRequests: leaveRequestsSeed.filter((l) => l.status === "pending").length,
    headcountTrend: [
      { label: "Jan", value: 5 },
      { label: "Feb", value: 5 },
      { label: "Mar", value: 6 },
      { label: "Apr", value: 6 },
      { label: "May", value: active.length },
    ],
    departmentHeadcount: countByDepartment(),
  }
}

export const activityFeedSeed: ActivityItem[] = [
  {
    id: "act-1",
    title: "Leave approved",
    description: "Aisha Khan · 10 days annual",
    at: "2026-05-11T14:20:00",
    kind: "leave",
  },
  {
    id: "act-2",
    title: "New hire start date",
    description: "Chris Okonkwo · Engineering",
    at: "2026-05-09T09:00:00",
    kind: "hire",
  },
  {
    id: "act-3",
    title: "Payroll run completed",
    description: "April 2026 · 7 payslips",
    at: "2026-04-28T18:05:00",
    kind: "payroll",
  },
  {
    id: "act-4",
    title: "Review cycle opened",
    description: "H1 2026 · Self assessments due May 30",
    at: "2026-05-01T08:00:00",
    kind: "review",
  },
]
