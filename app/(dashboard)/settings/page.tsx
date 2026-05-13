import { PageHeader } from "@/components/dashboard/PageHeader"
import { SettingsForm } from "@/components/hrm/SettingsForm"

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Workspace settings"
        description="Client-side toggles illustrate UX patterns — persist to your API when you go live."
      />
      <SettingsForm />
    </div>
  )
}
