import { db } from "@/data-access/db"
import { userTable } from "@/data-access/schema"

import "server-only"

export const createUser = async (newUser: {
  id: string
  username: string
  password: string
}) => {
  try {
    const [user] = await db
      .insert(userTable)
      .values({
        id: newUser.id,
        username: newUser.username,
        hashedPassword: newUser.password
      })
      .returning()

    return user
  } catch (error) {
    throw new Error(`Failed to create user: ${error}`)
  }
}
