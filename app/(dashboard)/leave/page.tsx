import { getEmployees, getLeaveBalances, getLeaveRequests } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { LeaveSection } from "@/components/hrm/LeaveSection"

export default async function LeavePage() {
  const [requests, balances, employees] = await Promise.all([
    getLeaveRequests(),
    getLeaveBalances(),
    getEmployees(),
  ])

  return (
    <div>
      <PageHeader
        title="Leave management"
        description="Balances from mock seeds; new requests stay in the browser for this demo."
      />
      <LeaveSection initialRequests={requests} balances={balances} employees={employees} />
    </div>
  )
}
