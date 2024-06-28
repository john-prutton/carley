import { Metadata } from "next"

import { SplashLogo } from "@/components/layout/splash-logo"

import { AuthForm } from "./components/form"

export const metadata: Metadata = {
  title: "Sign In"
}

export default function Page({
  searchParams: { redirect: _redirect, signup }
}: {
  searchParams: {
    redirect?: string
    signup?: "true" | "false"
  }
}) {
  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <h1 className="hidden">Authentication page</h1>
      <SplashLogo className="mb-8" />

      <AuthForm signup={!!signup && signup === "true"} />
    </div>
  )
}
