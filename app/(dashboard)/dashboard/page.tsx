import Link from "next/link"
import { getActivityFeed, getDashboardSummary, getEmployees, getEmployeeName } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
}

export default async function DashboardPage() {
  const [summary, activity, employees] = await Promise.all([
    getDashboardSummary(),
    getActivityFeed(6),
    getEmployees(),
  ])

  const maxTrend = Math.max(...summary.headcountTrend.map((t) => t.value), 1)

  return (
    <div>
      <PageHeader
        title="Overview"
        description="Snapshot of your mock workforce. Replace `lib/mock-api` with live endpoints when you wire a backend."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardContent className="!pt-5">
            <p className="text-[12px] font-medium uppercase tracking-wide text-zinc-500">Headcount</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-50">{summary.headcount}</p>
            <p className="mt-1 text-[12px] text-zinc-500">Active employees in seed data</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="!pt-5">
            <p className="text-[12px] font-medium uppercase tracking-wide text-zinc-500">On leave</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-50">{summary.onLeaveToday}</p>
            <p className="mt-1 text-[12px] text-zinc-500">Statuses marked on leave</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="!pt-5">
            <p className="text-[12px] font-medium uppercase tracking-wide text-zinc-500">Open roles</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-50">{summary.openRoles}</p>
            <p className="mt-1 text-[12px] text-zinc-500">Mock job openings</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="!pt-5">
            <p className="text-[12px] font-medium uppercase tracking-wide text-zinc-500">Pending leave</p>
            <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-50">{summary.pendingLeaveRequests}</p>
            <p className="mt-1 text-[12px] text-zinc-500">Awaiting approval in demo data</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-sm font-semibold text-zinc-100">Headcount trend</h3>
            <p className="text-[12px] text-zinc-500">Static series for chart placeholder</p>
          </CardHeader>
          <CardContent>
            <div className="flex h-40 items-end gap-2">
              {summary.headcountTrend.map((point) => (
                <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full max-w-[48px] rounded-md bg-gradient-to-t from-cyan-500/30 to-violet-500/40"
                    style={{ height: `${(point.value / maxTrend) * 100}%`, minHeight: "12%" }}
                    title={`${point.label}: ${point.value}`}
                  />
                  <span className="text-[10px] text-zinc-600">{point.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-zinc-100">By department</h3>
          </CardHeader>
          <CardContent className="space-y-3">
            {summary.departmentHeadcount.map((row) => (
              <div key={row.departmentId} className="flex items-center justify-between text-sm">
                <span className="text-zinc-400">{row.name}</span>
                <span className="font-medium tabular-nums text-zinc-100">{row.count}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Recent activity</h3>
              <p className="text-[12px] text-zinc-500">Curated mock feed</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {activity.map((item) => (
              <div key={item.id} className="flex gap-3 border-b border-white/[0.04] pb-4 last:border-0 last:pb-0">
                <div className="mt-0.5 h-8 w-8 shrink-0 rounded-lg bg-white/[0.06] text-center text-[12px] leading-8 text-zinc-500">
                  {item.kind === "leave" ? "L" : item.kind === "hire" ? "H" : item.kind === "payroll" ? "P" : "R"}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-zinc-200">{item.title}</p>
                  <p className="text-[13px] text-zinc-500">{item.description}</p>
                  <p className="mt-1 text-[11px] text-zinc-600">{formatTime(item.at)}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Team spotlight</h3>
              <p className="text-[12px] text-zinc-500">Quick links into profiles</p>
            </div>
            <Link href="/employees" className="text-[12px] text-cyan-400 hover:text-cyan-300">
              View all
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {employees.slice(0, 5).map((e) => (
              <Link
                key={e.id}
                href={`/employees/${e.id}`}
                className="flex items-center justify-between rounded-lg border border-transparent px-2 py-2 transition hover:border-white/[0.08] hover:bg-white/[0.03]"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-200">{getEmployeeName(e)}</p>
                  <p className="text-[12px] text-zinc-500">{e.role}</p>
                </div>
                <Badge tone={e.status === "active" ? "success" : e.status === "on_leave" ? "warning" : "neutral"}>
                  {e.status.replace("_", " ")}
                </Badge>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
