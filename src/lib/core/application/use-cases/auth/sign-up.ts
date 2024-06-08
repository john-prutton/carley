import { generateIdFromEntropySize, Scrypt } from "lucia"

import { IUserRepository } from "@/lib/core/domain/repositories/IUserRepository"
import { IAuthService } from "@/lib/core/services/IAuthService"
import { UserRepository as DefaultUserRepository } from "@/lib/infrastructure/data-access/repositories"
import { AuthService as DefaultAuthService } from "@/lib/infrastructure/services"

import { AuthActionSignature } from "."

type SignupSignature = AuthActionSignature<
  {
    username: string
    password: string
    passwordConfirmation: string
  },
  {
    AuthService: IAuthService
    UserRepository: IUserRepository
  }
>

export const signup: SignupSignature = async (
  { username, password, passwordConfirmation: _pwd2 },
  { AuthService, UserRepository } = {
    AuthService: DefaultAuthService,
    UserRepository: DefaultUserRepository
  }
) => {
  const hashedPassword = await new Scrypt().hash(password)

  const user = await UserRepository.createUser({
    id: generateIdFromEntropySize(32),
    username,
    hashedPassword
  })

  console.log(`created user: ${user}`)

  const session = await AuthService.createSession(user.id, {})
  const sessionCookie = AuthService.createSessionCookie(session.id)

  return sessionCookie
}
