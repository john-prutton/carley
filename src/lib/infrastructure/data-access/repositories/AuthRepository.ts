import { eq, lte } from "drizzle-orm"

import { IAuthRepository } from "@/lib/core/domain/repositories/IAuthRepository"

import { db, schema } from "../db"

export const AuthRepository: IAuthRepository = {
  deleteExpiredSessions: async () => {
    try {
      await db
        .delete(schema.sessionTable)
        .where(lte(schema.sessionTable.expiresAt, new Date()))
    } catch (error) {
      console.log(`Error deleting expired sessions: ${error}`)
    }
  },

  deleteSession: async (sessionId) => {
    try {
      await db
        .delete(schema.sessionTable)
        .where(eq(schema.sessionTable.id, sessionId))
    } catch (error) {
      console.log(`Error deleting session: ${error}`)
    }
  },

  deleteUserSessions: async (userId) => {
    try {
      await db
        .delete(schema.sessionTable)
        .where(eq(schema.sessionTable.userId, userId))
    } catch (error) {
      console.log(`Error deleting user sessions: ${error}`)
    }
  },

  getSessionAndUser: async (sessionId) => {
    try {
      const [session] = await db
        .select()
        .from(schema.sessionTable)
        .where(eq(schema.sessionTable.id, sessionId))
        .limit(1)

      if (!session) return [null, null]

      const [user] = await db
        .select()
        .from(schema.userTable)
        .where(eq(schema.userTable.id, session.userId))
        .limit(1)

      return [
        { ...session, attributes: {} },
        { attributes: user, id: user.id }
      ]
    } catch (error) {
      console.log(`Error getting session and user: ${error}`)
      return [null, null]
    }
  },

  getUserSessions: async (userId) => {
    try {
      const sessions = await db
        .select()
        .from(schema.sessionTable)
        .where(eq(schema.sessionTable.userId, userId))

      return sessions.map((session) => ({
        ...session,
        attributes: {}
      }))
    } catch (error) {
      console.log(`Error getting user sessions: ${error}`)
      return []
    }
  },

  setSession: async (session) => {
    try {
      await db.insert(schema.sessionTable).values(session)
    } catch (error) {
      console.log(`Error setting session: ${error}`)
    }
  },

  updateSessionExpiration: async (sessionId) => {
    try {
      await db
        .update(schema.sessionTable)
        .set({ expiresAt: new Date(Date.now() + 60 * 60 * 24) })
        .where(eq(schema.sessionTable.id, sessionId))
    } catch (error) {
      console.log(`Error updating session expiration: ${error}`)
    }
  }
}
