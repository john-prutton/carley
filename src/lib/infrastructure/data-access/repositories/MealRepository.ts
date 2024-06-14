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
  }
}
