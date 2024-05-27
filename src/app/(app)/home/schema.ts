import { DeepPartial } from "ai"
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

export const mealBreakdownSchema = z.object({
  description: z.string().describe("description of the meal"),
  foodItems: z.array(foodItemSchema).describe("the food items in the meal")
})

export type MealBreakdown = DeepPartial<typeof mealBreakdownSchema>
