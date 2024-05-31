"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { lucia } from "@/lib/auth"
import { signout } from "@/use-cases/auth/sign-out"

export async function trySignout() {
  const sessionCookie = await cookies().get(lucia.sessionCookieName)
  if (!!sessionCookie) cookies().set(await signout(sessionCookie.value))

  redirect("/")
}
