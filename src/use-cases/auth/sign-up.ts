import { generateIdFromEntropySize, Scrypt } from "lucia"

import { createUser } from "@/data-access/commands/auth"
import { lucia } from "@/lib/auth"

export async function signup({
  username,
  password,
  passwordConfirmation
}: {
  username: string
  password: string
  passwordConfirmation: string
}) {
  const passwordHash = await new Scrypt().hash(password)

  const user = await createUser({
    id: generateIdFromEntropySize(32),
    username,
    password: passwordHash
  })

  console.log(`created user: ${user}`)

  const session = await lucia.createSession(user.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)

  return sessionCookie
}
