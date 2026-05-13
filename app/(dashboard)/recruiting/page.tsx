import { getCandidates, getJobOpenings } from "@/lib/mock-api"
import { PageHeader } from "@/components/dashboard/PageHeader"
import { RecruitingBoard } from "@/components/hrm/RecruitingBoard"

export default async function RecruitingPage() {
  const [openings, candidates] = await Promise.all([getJobOpenings(), getCandidates()])

  return (
    <div>
      <PageHeader
        title="Recruiting pipeline"
        description="Kanban-style columns with client-side stage updates for demo walkthroughs."
      />
      <RecruitingBoard openings={openings} initialCandidates={candidates} />
    </div>
  )
}
