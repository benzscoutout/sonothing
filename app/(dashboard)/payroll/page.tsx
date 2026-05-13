import Link from "next/link"
import { getEmployeeById, getEmployeeName, getPayslips } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Card, CardContent } from "@/components/ui/Card"

function money(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

export default async function PayrollPage() {
  const payslips = await getPayslips()
  const rows = await Promise.all(
    payslips.map(async (p) => {
      const emp = await getEmployeeById(p.employeeId)
      return { p, emp }
    }),
  )

  return (
    <div>
      <PageHeader
        title="Payroll"
        description="Sample payslips with static totals — replace with your payroll provider integration."
      />
      <Card>
        <CardContent className="!p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead className="border-b border-white/[0.06] text-[11px] uppercase tracking-wide text-zinc-500">
                <tr>
                  <th className="px-4 py-3 font-medium">Employee</th>
                  <th className="px-4 py-3 font-medium">Period</th>
                  <th className="px-4 py-3 font-medium">Gross</th>
                  <th className="px-4 py-3 font-medium">Net</th>
                  <th className="px-4 py-3 font-medium">Paid</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {rows.map(({ p, emp }) => (
                  <tr key={p.id} className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.02]">
                    <td className="px-4 py-3 text-zinc-200">{emp ? getEmployeeName(emp) : p.employeeId}</td>
                    <td className="px-4 py-3 text-zinc-400">{p.periodLabel}</td>
                    <td className="px-4 py-3 tabular-nums text-zinc-300">{money(p.gross)}</td>
                    <td className="px-4 py-3 tabular-nums text-zinc-100">{money(p.net)}</td>
                    <td className="px-4 py-3 text-zinc-500">{p.paidAt}</td>
                    <td className="px-4 py-3 text-right">
                      <Link href={`/payroll/${p.id}`} className="text-[12px] text-cyan-400 hover:text-cyan-300">
                        View
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
