import Link from "next/link"
import { getDepartments, getEmployees, getEmployeeName } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

export default async function EmployeesPage() {
  const [employees, departments] = await Promise.all([getEmployees(), getDepartments()])
  const deptName = (id: string) => departments.find((d) => d.id === id)?.name ?? "—"

  return (
    <div>
      <PageHeader
        title="Employee directory"
        description="Filter and browse the mock roster. Detail pages pull the same facades."
      />
      <Card>
        <CardContent className="!p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="border-b border-white/[0.06] text-[11px] uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Location</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr key={e.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <p className="font-medium text-zinc-100">{getEmployeeName(e)}</p>
                      <p className="text-[12px] text-zinc-500">{e.email}</p>
                    </td>
                    <td className="px-4 py-3 text-zinc-400">{e.role}</td>
                    <td className="px-4 py-3 text-zinc-400">{deptName(e.departmentId)}</td>
                    <td className="px-4 py-3 text-zinc-400">{e.location}</td>
                    <td className="px-4 py-3">
                      <Badge tone={e.status === "active" ? "success" : e.status === "on_leave" ? "warning" : "neutral"}>
                        {e.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/employees/${e.id}`} className="text-[12px] text-cyan-400 hover:text-cyan-300">
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
