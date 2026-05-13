import type { Candidate, JobOpening } from "./types"

export const jobOpeningsSeed: JobOpening[] = [
  {
    id: "job-1",
    title: "Staff Engineer",
    departmentId: "dept-eng",
    location: "Remote · APAC",
    openedAt: "2026-04-01",
  },
  {
    id: "job-2",
    title: "Product Designer",
    departmentId: "dept-product",
    location: "Bangkok",
    openedAt: "2026-04-18",
  },
  {
    id: "job-3",
    title: "People Ops Coordinator",
    departmentId: "dept-people",
    location: "Singapore",
    openedAt: "2026-05-02",
  },
]

export const candidatesSeed: Candidate[] = [
  {
    id: "cand-1",
    jobOpeningId: "job-1",
    name: "Priya Nair",
    email: "priya.nair@example.com",
    stage: "interview",
    appliedAt: "2026-04-28",
  },
  {
    id: "cand-2",
    jobOpeningId: "job-1",
    name: "Tomás Silva",
    email: "tomas.silva@example.com",
    stage: "screen",
    appliedAt: "2026-05-03",
  },
  {
    id: "cand-3",
    jobOpeningId: "job-2",
    name: "Hana Suzuki",
    email: "hana.suzuki@example.com",
    stage: "applied",
    appliedAt: "2026-05-10",
  },
  {
    id: "cand-4",
    jobOpeningId: "job-3",
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    stage: "offer",
    appliedAt: "2026-04-12",
  },
]
