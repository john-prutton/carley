"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { signup } from "@/use-cases/auth/signup"

export const trySignup = async (formData: FormData) => {
  try {
    const sessionCookie = await signup(formData)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
  } catch (error) {
    return redirect(
      "/signup?" + new URLSearchParams({ error: `Fatal: ${error}` }).toString()
    )
  }

  return redirect("/home")
}
