import { getAttendanceForMonth, getEmployees } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { AttendanceSection } from "@/components/hrm/AttendanceSection"

export default async function AttendancePage() {
  const [rows, employees] = await Promise.all([getAttendanceForMonth(2026, 5), getEmployees()])

  return (
    <div>
      <PageHeader
        title="Attendance"
        description="Demo month grid seeded with a few punches; buttons layer on ephemeral state."
      />
      <AttendanceSection initialRows={rows} employees={employees} />
    </div>
  )
}
