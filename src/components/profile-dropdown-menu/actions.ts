"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

import { signout } from "@/lib/core/application/use-cases/auth/sign-out"
import { AuthService } from "@/lib/infrastructure/services"

export async function trySignout() {
  const sessionId = AuthService.readSessionCookie(cookies().toString())
  if (!!sessionId) cookies().set(await signout({ sessionId }, { AuthService }))

  redirect("/")
}
