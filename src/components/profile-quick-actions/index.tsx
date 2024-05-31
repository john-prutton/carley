import { Suspense } from "react"

import { ProfileIcon } from "./profile-icon"
import { ProfileQuickActionsAsync } from "./profile-quick-actions-async"

export function ProfileQuickActions() {
  return (
    <Suspense fallback={<ProfileIcon className="animate-pulse" />}>
      <ProfileQuickActionsAsync />
    </Suspense>
  )
}
