"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import {
  AuthActionSignature,
  signin,
  signup
} from "@/lib/core/application/use-cases/auth"
import { UserRepository } from "@/lib/infrastructure/data-access/repositories"
import { AuthService } from "@/lib/infrastructure/services"
import { urlFromBase } from "@/lib/utils/url-from-base"

type AuthActionHandler = <TInputs, TDependencies>(
  authAction: AuthActionSignature<TInputs, TDependencies>,
  dependencies?: TDependencies
) => (inputs: TInputs) => Promise<void | { error: string }>

const handleAuthAction: AuthActionHandler =
  (authAction, _dependencies) => async (inputs) => {
    // if (!schema.safeParse(data).success)
    //   return {
    //     error: "Invalid data"
    //   }
    try {
      const sessionCookie = await authAction(inputs)
      cookies().set(sessionCookie)
    } catch (error) {
      return {
        error: `${error}`
      }
    }

    const redirectUrl = urlFromBase(
      new URLSearchParams(headers().get("referer")!.split("?")[1]).get(
        "redirect"
      ) ?? "/home"
    ).toString()
    redirect(redirectUrl)
  }

export const trySignup = handleAuthAction(signup, {
  AuthService,
  UserRepository
})
export const trySignin = handleAuthAction(signin, {
  AuthService,
  UserRepository
})
