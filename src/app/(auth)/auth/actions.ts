"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import { Cookie } from "lucia"

import { urlFromBase } from "@/lib/utils"
import { signin, signup } from "@/use-cases/auth"

type AuthActionState =
  | {
      error: string
      initialValues: {
        username: string
        password: string
        passwordConfirmation: string
      }
    }
  | undefined

const setCookieOrRedirect =
  (formAction: (formData: FormData) => Promise<Cookie>, signUp: boolean) =>
  async (
    previousState: AuthActionState,
    formData: FormData
  ): Promise<AuthActionState> => {
    try {
      const sessionCookie = await formAction(formData)
      cookies().set(sessionCookie)
    } catch (error) {
      return {
        error: `${error}`,
        initialValues: {
          username: formData.get("username") as string,
          password: formData.get("password") as string,
          passwordConfirmation: formData.get("passwordConfirmation") as string
        }
      }
    }

    const redirectUrl = urlFromBase(
      new URLSearchParams(headers().get("referer")!.split("?")[1]).get(
        "redirect"
      ) ?? "/home"
    ).toString()

    redirect(redirectUrl)
  }

export const trySignup = setCookieOrRedirect(signup, true)
export const trySignin = setCookieOrRedirect(signin, false)
