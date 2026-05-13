import type { Payslip } from "./types"

export const payslipsSeed: Payslip[] = [
  {
    id: "pay-1",
    employeeId: "emp-3",
    periodLabel: "April 2026",
    gross: 9200,
    deductions: 1380,
    net: 7820,
    paidAt: "2026-04-28",
  },
  {
    id: "pay-2",
    employeeId: "emp-1",
    periodLabel: "April 2026",
    gross: 14200,
    deductions: 2130,
    net: 12070,
    paidAt: "2026-04-28",
  },
  {
    id: "pay-3",
    employeeId: "emp-4",
    periodLabel: "April 2026",
    gross: 7800,
    deductions: 1170,
    net: 6630,
    paidAt: "2026-04-28",
  },
  {
    id: "pay-4",
    employeeId: "emp-7",
    periodLabel: "March 2026",
    gross: 6800,
    deductions: 1020,
    net: 5780,
    paidAt: "2026-03-28",
  },
]
