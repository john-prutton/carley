import { eq } from "drizzle-orm"

import { IUserRepository } from "@/lib/core/domain/repositories/IUserRepository"

import { db, schema } from "../db"

export const UserRepository: IUserRepository = {
  getAllUsers: async () => {
    try {
      return db.select().from(schema.userTable)
    } catch (error) {
      throw new Error(`Failed to get all users: ${error}`)
    }
  },

  getUserByUsername: async (username) => {
    try {
      const [user] = await db
        .select()
        .from(schema.userTable)
        .where(eq(schema.userTable.username, username))
        .limit(1)

      return user
    } catch (error) {
      throw new Error(`Failed to get user by username: ${error}`)
    }
  },

  createUser: async (user) => {
    try {
      const [newUser] = await db
        .insert(schema.userTable)
        .values({
          id: user.id,
          username: user.username,
          hashedPassword: user.hashedPassword
        })
        .returning()

      return newUser
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`)
    }
  }
}
