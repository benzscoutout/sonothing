import type { LeaveBalance, LeaveRequest } from "./types"

export const leaveRequestsSeed: LeaveRequest[] = [
  {
    id: "lr-1",
    employeeId: "emp-4",
    type: "annual",
    startDate: "2026-05-12",
    endDate: "2026-05-23",
    days: 10,
    status: "approved",
    reason: "Family travel",
  },
  {
    id: "lr-2",
    employeeId: "emp-3",
    type: "sick",
    startDate: "2026-05-14",
    endDate: "2026-05-14",
    days: 1,
    status: "pending",
    reason: "Medical appointment",
  },
  {
    id: "lr-3",
    employeeId: "emp-7",
    type: "personal",
    startDate: "2026-05-20",
    endDate: "2026-05-21",
    days: 2,
    status: "pending",
    reason: "Moving day",
  },
]

export const leaveBalancesSeed: LeaveBalance[] = [
  { employeeId: "emp-1", annual: 18, sick: 10, personal: 4 },
  { employeeId: "emp-2", annual: 22, sick: 10, personal: 5 },
  { employeeId: "emp-3", annual: 14, sick: 10, personal: 3 },
  { employeeId: "emp-4", annual: 8, sick: 9, personal: 2 },
  { employeeId: "emp-5", annual: 20, sick: 10, personal: 5 },
  { employeeId: "emp-6", annual: 16, sick: 10, personal: 4 },
  { employeeId: "emp-7", annual: 12, sick: 10, personal: 3 },
]
