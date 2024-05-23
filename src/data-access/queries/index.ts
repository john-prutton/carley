import "server-only"

import { db } from "../db"
import { users } from "../schema"

export const getAllUsers = async () => {
  const res = await db.select().from(users)

  return res.map((u) => ({
    id: u.id
  }))
}
