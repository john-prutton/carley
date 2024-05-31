import { Cookie } from "lucia"

import { lucia } from "@/lib/auth"

export async function signin({ cookie }: { cookie: Cookie }) {
  await lucia.invalidateSession(cookie.value)
  return lucia.createBlankSessionCookie()
}
