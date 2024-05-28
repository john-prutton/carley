import { Scrypt } from "lucia"

import { getUserByUsername } from "@/data-access/queries/users"
import { lucia } from "@/lib/auth"

export async function signin(formData: FormData) {
  const username = formData.get("username")
  if (typeof username !== "string") throw new Error("Invalid username")

  const password = formData.get("password")
  if (typeof password !== "string") throw new Error("Invalid password")

  const user = await getUserByUsername(username)

  if (!(await new Scrypt().verify(user.hashedPassword, password)))
    throw new Error("Invalid password")

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  return sessionCookie
}
