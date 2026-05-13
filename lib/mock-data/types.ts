export type EmploymentStatus = "active" | "on_leave" | "terminated"

export type Employee = {
  id: string
  firstName: string
  lastName: string
  email: string
  role: string
  departmentId: string
  avatarUrl: string | null
  joinedAt: string
  status: EmploymentStatus
  location: string
  managerId: string | null
}

export type Department = {
  id: string
  name: string
  headId: string | null
  parentId: string | null
  description: string
}

export type LeaveType = "annual" | "sick" | "personal"

export type LeaveRequest = {
  id: string
  employeeId: string
  type: LeaveType
  startDate: string
  endDate: string
  days: number
  status: "pending" | "approved" | "rejected"
  reason: string
}

export type LeaveBalance = {
  employeeId: string
  annual: number
  sick: number
  personal: number
}

export type AttendanceDay = {
  date: string
  employeeId: string
  checkIn: string | null
  checkOut: string | null
  minutesWorked: number | null
}

export type Payslip = {
  id: string
  employeeId: string
  periodLabel: string
  gross: number
  deductions: number
  net: number
  paidAt: string
}

export type PipelineStage = "applied" | "screen" | "interview" | "offer"

export type JobOpening = {
  id: string
  title: string
  departmentId: string
  location: string
  openedAt: string
}

export type Candidate = {
  id: string
  jobOpeningId: string
  name: string
  email: string
  stage: PipelineStage
  appliedAt: string
}

export type ActivityItem = {
  id: string
  title: string
  description: string
  at: string
  kind: "leave" | "hire" | "review" | "payroll"
}

export type DashboardSummary = {
  headcount: number
  onLeaveToday: number
  openRoles: number
  pendingLeaveRequests: number
  headcountTrend: { label: string; value: number }[]
  departmentHeadcount: { departmentId: string; name: string; count: number }[]
}
