import "server-only"

import { db } from "../db"
import { userTable } from "../schema"

export const getAllUsers = async () => {
  const res = await db.select().from(userTable)

  return res.map((u) => ({
    id: u.id
  }))
}
