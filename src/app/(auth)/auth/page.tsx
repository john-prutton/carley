"use client"

import { useState } from "react"

import { useFormState } from "react-dom"

import { HiddenInput } from "@/components/hidden-input"
import { SplashLogo } from "@/components/layout/splash-logo"
import { SubmitButton } from "@/components/submit-button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { trySignin, trySignup } from "./actions"

export default function Page({
  searchParams: { redirect, signUp }
}: {
  searchParams: {
    redirect?: string
    signUp?: "true"
  }
}) {
  const [isSignup, setIsSignup] = useState(!!signUp)

  const handleAction = async (previousState: any, formData: FormData) =>
    isSignup
      ? trySignup(previousState, formData)
      : trySignin(previousState, formData)

  const [formState, formAction] = useFormState(handleAction, undefined)

  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <h1 className="hidden">Authentication page</h1>

      <SplashLogo className="mb-8" />

      <Card className="w-5/6 max-w-96">
        <CardHeader>
          <CardTitle>Sit tight!</CardTitle>

          <CardDescription>
            You need to sign {!isSignup ? "in" : "up"} to continue. Afterwards,
            you&apos;ll be redirected to where you want to go.
          </CardDescription>
        </CardHeader>

        <form action={formAction}>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                name="username"
                defaultValue={`${formState?.initialValues.username ?? ""}`}
                placeholder="john.doe"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="name">Password</Label>
              <HiddenInput
                id="password"
                name="password"
                type="password"
                defaultValue={formState?.initialValues.password}
              />
            </div>

            {isSignup && (
              <div className="space-y-1">
                <Label htmlFor="name">Confirm password</Label>
                <HiddenInput
                  id="password-confirmation"
                  name="passwordConfirmation"
                  type="password"
                  defaultValue={formState?.initialValues.passwordConfirmation}
                />
              </div>
            )}
          </CardContent>

          <CardFooter className="flex-col">
            <SubmitButton
              content={"Sign in"}
              pendingContent={"Signing in..."}
              type="submit"
              className="w-full"
            />
            <span
              tabIndex={0}
              onClick={() => setIsSignup((isSignup) => !isSignup)}
              onKeyDown={(event) => {
                if (event.key === "Enter") setIsSignup((isSignup) => !isSignup)
              }}
              className="mt-2 inline-block text-primary decoration-primary hover:underline focus:underline focus:outline-none"
            >
              Sign {isSignup ? "in" : "up"} instead
            </span>
          </CardFooter>
        </form>
      </Card>

      {formState?.error && (
        <div className="mt-8 rounded bg-red-100 p-2 text-red-500">
          {formState.error}
        </div>
      )}
    </div>
  )
}
