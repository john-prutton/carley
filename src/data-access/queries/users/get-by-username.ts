import { eq } from "drizzle-orm"

import { db } from "@/data-access/db"
import { userTable } from "@/data-access/schema"

export const getUserByUsername = async (username: string) => {
  const [user] = await db
    .select()
    .from(userTable)
    .where(eq(userTable.username, username))
    .limit(1)

  if (!user) {
    throw new Error("User not found")
  }

  return user
}
