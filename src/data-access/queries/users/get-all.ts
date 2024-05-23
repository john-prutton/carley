import { db } from "@/data-access/db"
import { userTable } from "@/data-access/schema"

export const getAllUsers = async () => {
  const users = await db.select().from(userTable)

  return users
}
