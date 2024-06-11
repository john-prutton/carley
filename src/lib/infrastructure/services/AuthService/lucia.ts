import { Lucia } from "lucia"

import { UserEntity } from "@/lib/core/domain/entities/User"

import { AuthRepository } from "../../data-access/repositories"

export const lucia = new Lucia(AuthRepository, {
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
    DatabaseUserAttributes: UserEntity
  }
}
