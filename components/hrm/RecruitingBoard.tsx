"use client"

import * as React from "react"
import type { Candidate, JobOpening, PipelineStage } from "@/lib/mock-data/types"
import { Card, CardContent, CardHeader } from "@/components/ui/Card"
import { Select } from "@/components/ui/Select"
import { Badge } from "@/components/ui/Badge"

const stages: PipelineStage[] = ["applied", "screen", "interview", "offer"]

const stageLabel: Record<PipelineStage, string> = {
  applied: "Applied",
  screen: "Screen",
  interview: "Interview",
  offer: "Offer",
}

export function RecruitingBoard({
  openings,
  initialCandidates,
}: {
  openings: JobOpening[]
  initialCandidates: Candidate[]
}) {
  const [candidates, setCandidates] = React.useState(initialCandidates)
  const [jobId, setJobId] = React.useState(openings[0]?.id ?? "")

  const filtered = candidates.filter((c) => c.jobOpeningId === jobId)

  function move(id: string, stage: PipelineStage) {
    setCandidates((all) => all.map((c) => (c.id === id ? { ...c, stage } : c)))
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="!py-4">
          <label className="mb-1 block text-[11px] uppercase tracking-wide text-zinc-500">Role</label>
          <Select value={jobId} onChange={(e) => setJobId(e.target.value)}>
            {openings.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title} · {j.location}
              </option>
            ))}
          </Select>
        </CardContent>
      </Card>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {stages.map((stage) => (
          <Card key={stage} className="min-h-[280px]">
            <CardHeader className="py-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-400">{stageLabel[stage]}</h3>
                <Badge tone="neutral">{filtered.filter((c) => c.stage === stage).length}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 !pt-0">
              {filtered
                .filter((c) => c.stage === stage)
                .map((c) => (
                  <div key={c.id} className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3">
                    <p className="text-sm font-medium text-zinc-100">{c.name}</p>
                    <p className="text-[11px] text-zinc-500">{c.email}</p>
                    <div className="mt-2">
                      <Select
                        className="text-[11px]"
                        value={c.stage}
                        onChange={(e) => move(c.id, e.target.value as PipelineStage)}
                      >
                        {stages.map((s) => (
                          <option key={s} value={s}>
                            {stageLabel[s]}
                          </option>
                        ))}
                      </Select>
                    </div>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
