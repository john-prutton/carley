import { Scrypt } from "lucia"

import { getUserByUsername } from "@/data-access/queries/users"
import { lucia } from "@/lib/auth"

export async function signin({
  username,
  password
}: {
  username: string
  password: string
}) {
  const user = await getUserByUsername(username)

  if (!(await new Scrypt().verify(user.hashedPassword, password)))
    throw new Error("Invalid password")

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  return sessionCookie
}
