import Link from "next/link"
import { notFound } from "next/navigation"
import { getEmployeeById, getEmployeeName, getPayslipById } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"

type Props = { params: Promise<{ id: string }> }

function money(n: number) {
  return n.toLocaleString(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 })
}

export default async function PayslipDetailPage({ params }: Props) {
  const { id } = await params
  const payslip = await getPayslipById(id)
  if (!payslip) notFound()
  const employee = await getEmployeeById(payslip.employeeId)

  return (
    <div>
      <PageHeader
        title={`Payslip · ${payslip.periodLabel}`}
        description={employee ? getEmployeeName(employee) : payslip.employeeId}
        breadcrumbs={[
          { label: "Payroll", href: "/payroll" },
          { label: payslip.periodLabel },
        ]}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-zinc-100">Summary</h3>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-white/[0.06] py-2">
              <span className="text-zinc-500">Gross</span>
              <span className="tabular-nums text-zinc-100">{money(payslip.gross)}</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.06] py-2">
              <span className="text-zinc-500">Deductions</span>
              <span className="tabular-nums text-zinc-300">−{money(payslip.deductions)}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-zinc-400">Net pay</span>
              <span className="text-lg font-semibold tabular-nums text-zinc-50">{money(payslip.net)}</span>
            </div>
            <p className="text-[12px] text-zinc-600">Paid on {payslip.paidAt} (mock)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <h3 className="text-sm font-semibold text-zinc-100">Line items (illustrative)</h3>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-zinc-400">
            <p>Base salary — {money(payslip.gross * 0.82)}</p>
            <p>Benefits — {money(payslip.gross * 0.08)}</p>
            <p>Bonus — {money(payslip.gross * 0.1)}</p>
            <p className="pt-4 text-[12px] text-zinc-600">
              This breakdown is fictional template content. Wire your payroll engine to render real lines.
            </p>
            <Link href="/payroll" className="inline-block text-sm text-cyan-400 hover:text-cyan-300">
              ← Back to payroll
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
