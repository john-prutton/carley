import type { Lucia } from "lucia"

import { IAuthRepository } from "../domain/repositories/IAuthRepository"

export interface IAuthService {
  readSessionCookie: Lucia["readSessionCookie"]
  createSession: Lucia["createSession"]
  createSessionCookie: Lucia["createSessionCookie"]
  invalidateSession: Lucia["invalidateSession"]
  createBlankSessionCookie: Lucia["createBlankSessionCookie"]
  validateSession: Lucia["validateSession"]
}

export type AuthServiceFactory = (
  authRepository: IAuthRepository
) => IAuthService
