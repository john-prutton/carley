"use client"

import Link from "next/link"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { HiddenInput } from "@/components/hidden-input"
import { Spinner } from "@/components/spinner"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { trySignin, trySignup } from "../actions"
import { signinSchema, SignupArguments, signupSchema } from "../schema"

export function AuthForm({
  initialValues,
  signup
}: {
  signup: boolean
  initialValues?: SignupArguments
}) {
  const form = useForm<SignupArguments>({
    resolver: zodResolver(signup ? signupSchema : signinSchema),
    defaultValues: initialValues
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const result = signup ? await trySignup(values) : await trySignin(values)

    if (result?.error)
      form.setError(
        "root",
        { type: "custom", message: result.error },
        { shouldFocus: true }
      )
  })

  return (
    <Form {...form}>
      <Card className="w-5/6 max-w-96">
        {!form.formState.isSubmitSuccessful ? (
          <>
            <CardHeader>
              <CardTitle>Sit tight!</CardTitle>

              <CardDescription>
                You need to sign {!signup ? "in" : "up"} to continue.
                Afterwards, you&apos;ll be redirected to where you want to go.
              </CardDescription>
            </CardHeader>
            <form onSubmit={onSubmit}>
              <fieldset
                disabled={
                  form.formState.isSubmitting ||
                  form.formState.isSubmitSuccessful
                }
              >
                <CardContent>
                  {form.formState.isSubmitSuccessful && (
                    <div className="animate-pulse rounded bg-green-100 p-2 text-green-500">
                      You&apos;ve successfully signed {signup ? "up" : "in"}!
                    </div>
                  )}
                  {form.formState.errors.root && (
                    <div className="duration-[5_000] rounded bg-red-100 p-2 text-red-500 fade-out-0">
                      {form.formState.errors.root.message}
                    </div>
                  )}

                  <FormField
                    name="username"
                    control={form.control}
                    defaultValue={initialValues?.username}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Username</FormLabel>

                        <FormControl>
                          <Input {...field} placeholder="john.doe" />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="password"
                    control={form.control}
                    defaultValue={initialValues?.password}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Password</FormLabel>

                        <FormControl>
                          <HiddenInput {...field} />
                        </FormControl>
                        <FormDescription />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {signup && (
                    <FormField
                      name="passwordConfirmation"
                      control={form.control}
                      defaultValue={initialValues?.passwordConfirmation}
                      render={({ field }) => (
                        <FormItem className="space-y-1">
                          <FormLabel>Password Confirmation</FormLabel>

                          <FormControl>
                            <HiddenInput {...field} />
                          </FormControl>
                          <FormDescription />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </CardContent>

                <CardFooter className="flex-col gap-2">
                  <Button type="submit" className="w-full">
                    Sign{form.formState.isSubmitting && "ing"}{" "}
                    {signup ? "up" : "in"}
                    {form.formState.isSubmitting && "..."}
                    {form.formState.isSubmitting && (
                      <Spinner className="ml-2" />
                    )}
                  </Button>

                  <Button variant="ghost" asChild>
                    <Link href={`/auth?signup=${!signup}`}>
                      Sign {signup ? "in" : "up"} instead
                    </Link>
                  </Button>
                </CardFooter>
              </fieldset>
            </form>
          </>
        ) : (
          <div className="flex flex-row">
            <CardHeader>
              <CardTitle>Success!</CardTitle>
              <CardDescription>Redirecting...</CardDescription>
            </CardHeader>
            <Spinner size={40} className="m-auto text-green-500" />
          </div>
        )}
      </Card>
    </Form>
  )
}
