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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { tryLogin, trySignup } from "./actions"

export default async function Page({
  searchParams: { error, redirect, signUp }
}: {
  searchParams: {
    error?: string
    redirect?: string
    signUp?: "true"
  }
}) {
  return (
    <div className="flex h-svh flex-col items-center justify-center">
      <h1 className="hidden">Authentication page</h1>

      <SplashLogo className="mb-8" />

      <Card className="w-5/6 max-w-96">
        <CardHeader>
          <CardTitle>Log in to continue</CardTitle>

          <CardDescription>
            Sit tight! You need to log in to continue.
          </CardDescription>
        </CardHeader>

        <Tabs defaultValue={signUp ? "signup" : "signin"}>
          <TabsList className="grid grid-cols-2 gap-4 bg-white">
            <TabsTrigger value="signin">Sign In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signin">
            <form action={tryLogin}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" placeholder="john.doe" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="name">Password</Label>
                  <HiddenInput id="password" name="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton
                  content={"Sign in"}
                  pendingContent={"Signing in..."}
                  type="submit"
                  className="w-full"
                />
              </CardFooter>
            </form>
          </TabsContent>

          <TabsContent value="signup">
            <form action={trySignup}>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input id="username" name="username" placeholder="john.doe" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="name">Password</Label>
                  <HiddenInput id="password" name="password" type="password" />
                </div>

                <div className="space-y-1">
                  <Label htmlFor="name">Confirm password</Label>
                  <HiddenInput
                    id="password-confirmation"
                    name="passwordConfirmation"
                    type="password"
                  />
                </div>
              </CardContent>
              <CardFooter>
                <SubmitButton
                  content={"Sign up"}
                  pendingContent={"Signing up..."}
                  type="submit"
                  className="w-full"
                />
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>

      {error && (
        <div className="mt-8 rounded bg-red-100 p-2 text-red-500">{error}</div>
      )}
    </div>
  )
}
