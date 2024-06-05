import { z } from "zod"

const foodItemSchema = z.object({
  description: z.string().describe("description of the food item"),
  weight: z
    .number()
    .describe("an estimate of the amount of this food in grams"),
  calories: z.number().describe("calories in the food item"),
  carbohydrates: z.number().describe("carbohydrates in the food item in grams"),
  proteins: z.number().describe("proteins in the food item in grams"),
  fats: z.number().describe("fats in the food item in grams")
})
export type FoodItem = z.infer<typeof foodItemSchema>

export const mealBreakdownSchema = z.object({
  description: z.string().describe("description of the meal"),
  foodItems: z.array(foodItemSchema).describe("the food items in the meal")
})

export type MealBreakdown = z.infer<typeof mealBreakdownSchema>

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
      .describe("the user's image input")
  })
  .refine(
    (message) => message.textInput || message.fileInput,
    "Must have text or image input"
  )

export type Message = z.infer<typeof messageSchema>
