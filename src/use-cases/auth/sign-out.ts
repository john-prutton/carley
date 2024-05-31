import { lucia } from "@/lib/auth"

export async function signout(sessionToken: string) {
  await lucia.invalidateSession(sessionToken)
  return lucia.createBlankSessionCookie()
}
