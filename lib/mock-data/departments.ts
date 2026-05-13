import type { Department } from "./types"

export const departmentsSeed: Department[] = [
  {
    id: "dept-eng",
    name: "Engineering",
    headId: "emp-1",
    parentId: null,
    description: "Product development and infrastructure.",
  },
  {
    id: "dept-product",
    name: "Product",
    headId: "emp-2",
    parentId: null,
    description: "Discovery, roadmap, and delivery.",
  },
  {
    id: "dept-people",
    name: "People & Culture",
    headId: "emp-5",
    parentId: null,
    description: "Talent, engagement, and workplace.",
  },
  {
    id: "dept-ops",
    name: "Operations",
    headId: null,
    parentId: null,
    description: "Finance, legal, and business operations.",
  },
]
