import type { AttendanceDay } from "./types"

/** Demo month: May 2026 — a week of sample punches for a few employees */
export const attendanceSeed: AttendanceDay[] = [
  {
    date: "2026-05-12",
    employeeId: "emp-3",
    checkIn: "09:02",
    checkOut: "18:04",
    minutesWorked: 542,
  },
  {
    date: "2026-05-12",
    employeeId: "emp-7",
    checkIn: "08:55",
    checkOut: "17:58",
    minutesWorked: 543,
  },
  {
    date: "2026-05-13",
    employeeId: "emp-3",
    checkIn: "09:10",
    checkOut: "18:12",
    minutesWorked: 542,
  },
  {
    date: "2026-05-13",
    employeeId: "emp-1",
    checkIn: "08:40",
    checkOut: "18:30",
    minutesWorked: 590,
  },
  {
    date: "2026-05-13",
    employeeId: "emp-7",
    checkIn: null,
    checkOut: null,
    minutesWorked: null,
  },
]
