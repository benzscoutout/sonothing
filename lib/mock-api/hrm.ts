import { delay } from "./delay"
import {
  activityFeedSeed,
  attendanceSeed,
  buildDashboardSummary,
  candidatesSeed,
  departmentsSeed,
  employeesSeed,
  jobOpeningsSeed,
  leaveBalancesSeed,
  leaveRequestsSeed,
  payslipsSeed,
} from "@/lib/mock-data"
import type {
  ActivityItem,
  AttendanceDay,
  Candidate,
  DashboardSummary,
  Department,
  Employee,
  JobOpening,
  LeaveBalance,
  LeaveRequest,
  Payslip,
} from "@/lib/mock-data/types"

export async function getDashboardSummary(): Promise<DashboardSummary> {
  await delay()
  return buildDashboardSummary()
}

export async function getActivityFeed(limit = 8): Promise<ActivityItem[]> {
  await delay(120)
  return activityFeedSeed.slice(0, limit)
}

export async function getEmployees(): Promise<Employee[]> {
  await delay()
  return [...employeesSeed]
}

export async function getEmployeeById(id: string): Promise<Employee | null> {
  await delay(120)
  return employeesSeed.find((e) => e.id === id) ?? null
}

export async function getDepartments(): Promise<Department[]> {
  await delay(120)
  return [...departmentsSeed]
}

export async function getDepartmentById(id: string): Promise<Department | null> {
  await delay(80)
  return departmentsSeed.find((d) => d.id === id) ?? null
}

export async function getLeaveRequests(): Promise<LeaveRequest[]> {
  await delay()
  return [...leaveRequestsSeed]
}

export async function getLeaveBalances(): Promise<LeaveBalance[]> {
  await delay(100)
  return [...leaveBalancesSeed]
}

export async function getAttendanceForMonth(
  year: number,
  month: number,
): Promise<AttendanceDay[]> {
  await delay()
  const prefix = `${year}-${String(month).padStart(2, "0")}`
  return attendanceSeed.filter((a) => a.date.startsWith(prefix))
}

export async function getPayslips(): Promise<Payslip[]> {
  await delay()
  return [...payslipsSeed]
}

export async function getPayslipById(id: string): Promise<Payslip | null> {
  await delay(80)
  return payslipsSeed.find((p) => p.id === id) ?? null
}

export async function getJobOpenings(): Promise<JobOpening[]> {
  await delay(100)
  return [...jobOpeningsSeed]
}

export async function getCandidates(): Promise<Candidate[]> {
  await delay(100)
  return [...candidatesSeed]
}

export function getEmployeeName(employee: Pick<Employee, "firstName" | "lastName">): string {
  return `${employee.firstName} ${employee.lastName}`
}
