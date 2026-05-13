import { getDepartments, getEmployees, getEmployeeName } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"

export default async function OrganizationPage() {
  const [departments, employees] = await Promise.all([getDepartments(), getEmployees()])

  const byDept = departments.map((d) => ({
    dept: d,
    members: employees.filter((e) => e.departmentId === d.id && e.status !== "terminated"),
  }))

  return (
    <div>
      <PageHeader
        title="Organization"
        description="Departments from mock data with headcount and optional department lead."
      />
      <div className="space-y-4">
        {byDept.map(({ dept, members }) => {
          const head = dept.headId ? employees.find((e) => e.id === dept.headId) : null
          return (
            <Card key={dept.id}>
              <CardHeader>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-100">{dept.name}</h3>
                    <p className="text-[12px] text-zinc-500">{dept.description}</p>
                  </div>
                  <p className="text-[12px] text-zinc-500">
                    {members.length} people
                    {head ? (
                      <>
                        {" "}
                        · Lead{" "}
                        <span className="text-zinc-300">{getEmployeeName(head)}</span>
                      </>
                    ) : null}
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="flex flex-wrap gap-2">
                  {members.map((m) => (
                    <li
                      key={m.id}
                      className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[12px] text-zinc-300"
                    >
                      {getEmployeeName(m)}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
