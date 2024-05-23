import { cookies } from "next/headers"

import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle"
import { Lucia, User } from "lucia"

import { db } from "@/data-access/db"
import { sessionTable, userTable } from "@/data-access/schema"

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    // this sets cookies with super long expiration
    // since Next.js doesn't allow Lucia to extend cookie expiration when rendering pages
    expires: false,
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === "production"
    }
  },
  getUserAttributes: (attributes) => {
    return {
      // attributes has the type of DatabaseUserAttributes
      username: attributes.username
    }
  }
})

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: typeof userTable.$inferSelect
  }
}

export const withUser = async <T>(f: (user: User) => T) => {
  const sessionCookie = cookies().get(lucia.sessionCookieName)
  if (!sessionCookie)
    throw new Error("Unauthenticated: No session cookie found")

  const { session, user } = await lucia.validateSession(sessionCookie.value)
  if (!session) throw new Error("Unauthenticated: Invalid session")

  return f(user)
}
