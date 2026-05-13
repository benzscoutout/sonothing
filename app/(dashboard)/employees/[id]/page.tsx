import Link from "next/link"
import { notFound } from "next/navigation"
import { getDepartmentById, getEmployeeById, getEmployeeName, getEmployees } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

type Props = { params: Promise<{ id: string }> }

export default async function EmployeeDetailPage({ params }: Props) {
  const { id } = await params
  const employee = await getEmployeeById(id)
  if (!employee) notFound()

  const [department, all] = await Promise.all([
    getDepartmentById(employee.departmentId),
    getEmployees(),
  ])
  const manager = employee.managerId ? all.find((e) => e.id === employee.managerId) : null

  return (
    <div>
      <PageHeader
        title={getEmployeeName(employee)}
        description={employee.role}
        breadcrumbs={[
          { label: "Employees", href: "/employees" },
          { label: getEmployeeName(employee) },
        ]}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <h3 className="text-sm font-semibold text-zinc-100">Profile</h3>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">Email</p>
              <p className="mt-1 text-sm text-zinc-200">{employee.email}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">Department</p>
              <p className="mt-1 text-sm text-zinc-200">{department?.name ?? "—"}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">Location</p>
              <p className="mt-1 text-sm text-zinc-200">{employee.location}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">Joined</p>
              <p className="mt-1 text-sm text-zinc-200">{employee.joinedAt}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">Manager</p>
              <p className="mt-1 text-sm text-zinc-200">
                {manager ? (
                  <Link href={`/employees/${manager.id}`} className="text-cyan-400 hover:text-cyan-300">
                    {getEmployeeName(manager)}
                  </Link>
                ) : (
                  "—"
                )}
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wide text-zinc-500">Status</p>
              <div className="mt-2">
                <Badge tone={employee.status === "active" ? "success" : employee.status === "on_leave" ? "warning" : "neutral"}>
                  {employee.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-zinc-100">Notes</h3>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-zinc-500">
              This profile is read-only mock content. Extend with tabs for documents, performance, or equipment when you
              connect a backend.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
