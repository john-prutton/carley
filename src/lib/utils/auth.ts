import { cookies } from "next/headers"

import { User } from "lucia"

import { AuthService } from "../infrastructure/services/AuthService"

export const withUser = async <T>(f: (user: User) => T) => {
  console.log("withUser")
  const sessionId = AuthService.readSessionCookie(cookies().toString())
  console.log("sessionId", sessionId)
  if (!sessionId) throw new Error("Unauthenticated: No session cookie found")

  const { session, user } = await AuthService.validateSession(sessionId)
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
