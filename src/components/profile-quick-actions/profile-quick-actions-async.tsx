import { safeWithUser } from "@/lib/auth/helpers"

import { ProfileIcon } from "./profile-icon"

export async function ProfileQuickActionsAsync() {
  const { user } = await safeWithUser((user) => user)

  return !!user ? <ProfileIcon className="animate-in zoom-in-0" /> : null
}
