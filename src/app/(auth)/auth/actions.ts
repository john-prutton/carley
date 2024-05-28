"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"

import { Cookie } from "lucia"

import { urlFromBase } from "@/lib/utils"
import { signin, signup } from "@/use-cases/auth"

const setCookieOrRedirect =
  (formAction: (formData: FormData) => Promise<Cookie>, signUp: boolean) =>
  async (formData: FormData) => {
    try {
      const sessionCookie = await formAction(formData)

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      )
    } catch (error) {
      const searchParams = new URLSearchParams(
        headers().get("referer")!.split("?")[1]
      )
      searchParams.set("error", `Fatal: ${error}`)

      if (!signUp) searchParams.delete("signUp")

      return redirect(
        urlFromBase("/auth?" + searchParams.toString()).toString()
      )
    }

    const redirectUrl = urlFromBase(
      new URLSearchParams(headers().get("referer")!.split("?")[1]).get(
        "redirect"
      ) ?? "/home"
    ).toString()

    return redirect(redirectUrl)
  }

export const trySignup = setCookieOrRedirect(signup, true)
export const tryLogin = setCookieOrRedirect(signin, false)
