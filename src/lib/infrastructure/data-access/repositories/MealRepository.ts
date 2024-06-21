import { and, eq, gte } from "drizzle-orm"

import { IMealRepository } from "@/lib/core/domain/repositories/IMealRepository"

import { db } from "../db"
import { mealTable } from "../db/schema"

export const MealRepository: IMealRepository = {
  createMeal: async (meal, userId) => {
    const [insertedMeal] = await db
      .insert(mealTable)
      .values({ ...meal, userId })
      .returning()

    return insertedMeal
  },

  getUserMealsInTimeFrame: async (userId, cutoff) => {
    const meals = await db
      .select()
      .from(mealTable)
      .where(
        and(eq(mealTable.userId, userId), gte(mealTable.createdAt, cutoff))
      )

    return meals
  }
}
