import { z } from "zod"

export const messageSchema = z
  .object({
    textInput: z
      .string()
      .min(1)
      .max(1000)
      .optional()
      .or(z.string().transform((t) => (t === "" ? undefined : t)))
      .describe("the user's text input"),

    fileInput: z
      .any()
      .transform((file) =>
        file instanceof File && file.size > 0 ? file : undefined
      )
      .optional()
      .refine(
        (file: File | undefined) =>
          !!file ? file.type.startsWith("image/") : true,
        "Must be an image"
      )
      .describe("the user's file input")
  })
  .refine(
    (message) => message.textInput || message.fileInput,
    "Must have text or file input"
  )

export type Message = z.infer<typeof messageSchema>
