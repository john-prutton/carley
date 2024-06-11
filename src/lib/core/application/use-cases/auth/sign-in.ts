import { Scrypt } from "lucia"

import { UserEntity } from "@/lib/core/domain/entities/User"
import { IUserRepository } from "@/lib/core/domain/repositories/IUserRepository"
import { IAuthService } from "@/lib/core/services/IAuthService"
import { UserRepository as DefaultUserRepository } from "@/lib/infrastructure/data-access/repositories"
import { AuthService as DefaultAuthService } from "@/lib/infrastructure/services"

import { AuthActionSignature } from "."

type SigninSignature = AuthActionSignature<
  { username: UserEntity["username"]; password: string },
  { AuthService: IAuthService; UserRepository: IUserRepository }
>

export const signin: SigninSignature = async (
  { username, password },
  { AuthService, UserRepository } = {
    AuthService: DefaultAuthService,
    UserRepository: DefaultUserRepository
  }
) => {
  const user = await UserRepository.getUserByUsername(username)

  if (!(await new Scrypt().verify(user.hashedPassword, password)))
    throw new Error("Invalid password")

  const session = await AuthService.createSession(user.id, {})
  const sessionCookie = AuthService.createSessionCookie(session.id)
  console.log("next")

  return sessionCookie
}
