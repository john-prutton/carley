import { generateIdFromEntropySize, Scrypt } from "lucia"

import { createUser } from "@/data-access/commands/auth"
import { lucia } from "@/lib/auth"

export async function signup(formData: FormData) {
  const username = formData.get("username")
  if (
    typeof username !== "string" ||
    username.length < 3 ||
    username.length > 31 ||
    !/^[a-z0-9_-]+$/.test(username)
  ) {
    throw new Error("Invalid username")
  }

  const password = formData.get("password")
  if (
    typeof password !== "string" ||
    password.length < 6 ||
    password.length > 255
  ) {
    throw new Error("Invalid password")
  }

  const passwordConfirmation = formData.get("passwordConfirmation")
  if (
    typeof passwordConfirmation !== "string" ||
    password !== passwordConfirmation
  ) {
    throw new Error("Passwords do not match")
  }

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
