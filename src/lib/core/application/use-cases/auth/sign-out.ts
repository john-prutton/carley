import { IAuthService } from "@/lib/core/services/IAuthService"
import { AuthService as DefaultAuthService } from "@/lib/infrastructure/services"

import { AuthActionSignature } from "."

type SignoutSignature = AuthActionSignature<
  { sessionId: string },
  { AuthService: IAuthService }
>

export const signout: SignoutSignature = async (
  { sessionId },
  { AuthService } = { AuthService: DefaultAuthService }
) => {
  await AuthService.invalidateSession(sessionId)
  return AuthService.createBlankSessionCookie()
}
