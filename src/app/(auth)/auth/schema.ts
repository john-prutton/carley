import { z } from "zod"

export const signinSchema = z.object({
  username: z.string().min(3).max(12),
  password: z.string().min(8).max(32)
})
export type SigninArguments = z.infer<typeof signinSchema>

export const signupSchema = signinSchema
  .extend({
    passwordConfirmation: z.string().min(8).max(32)
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation)
      ctx.addIssue({
        code: "custom",
        path: ["passwordConfirmation"],
        message: "Passwords must match"
      })
  })
export type SignupArguments = z.infer<typeof signupSchema>
