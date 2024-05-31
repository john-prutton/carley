import { cookies } from "next/headers"

import { User } from "lucia"

import { lucia } from "@/lib/auth"

export const withUser = async <T>(f: (user: User) => T) => {
  const sessionCookie = cookies().get(lucia.sessionCookieName)
  if (!sessionCookie)
    throw new Error("Unauthenticated: No session cookie found")

  const { session, user } = await lucia.validateSession(sessionCookie.value)
  if (!session) throw new Error("Unauthenticated: Invalid session")

  return f(user)
}

export const safeWithUser = async <T>(f: (user: User) => T) => {
  try {
    return {
      user: await withUser(f)
    }
  } catch (error) {
    return {
      error: `${error}`
    }
  }
}
