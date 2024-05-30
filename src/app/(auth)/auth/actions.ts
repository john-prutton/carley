"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import { Cookie } from "lucia"

import { urlFromBase } from "@/lib/utils"
import { signin, signup } from "@/use-cases/auth"

import {
  SigninArguments,
  signinSchema,
  SignupArguments,
  signupSchema
} from "./schema"

const handleAuthAction =
  <TData = SignupArguments | SigninArguments>(
    authAction: (data: TData) => Promise<Cookie>,
    schema: typeof signupSchema | typeof signinSchema
  ) =>
  async (data: TData): Promise<{ error: string } | undefined> => {
    if (!schema.safeParse(data).success)
      return {
        error: "Invalid data"
      }

    try {
      const sessionCookie = await authAction(data)
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

export const trySignup = handleAuthAction(signup, signupSchema)
export const trySignin = handleAuthAction(signin, signinSchema)
