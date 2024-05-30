import { HiddenInput } from "@/components/hidden-input"
import { SubmitButton } from "@/components/submit-button"
import { Button } from "@/components/ui/button"
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
    <div className="grid h-svh place-content-center">
      <h1 className="mb-16 text-6xl font-black">Authenticate</h1>

      <Tabs defaultValue={signUp ? "signup" : "signin"} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2 bg-white">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <Card>
            <form action={tryLogin}>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Sign in to your account to continue.
                </CardDescription>
              </CardHeader>
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
          </Card>
        </TabsContent>

        <TabsContent value="signup">
          <Card>
            <form action={trySignup}>
              <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>
                  Sign up for an account to continue.
                </CardDescription>
              </CardHeader>
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
          </Card>
        </TabsContent>
      </Tabs>

      {error && (
        <div className="mt-8 rounded bg-red-100 p-2 text-red-500">{error}</div>
      )}
    </div>
  )
}
