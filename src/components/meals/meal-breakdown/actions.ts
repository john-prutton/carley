"use server"

import { saveMeal } from "@/lib/core/application/use-cases/meals/save-meal"
import { MealBreakdown } from "@/lib/core/domain/entities/MealBreakdown"
import { withUser } from "@/lib/utils/auth"

export async function trySaveMeal({
  mealBreakdown
}: {
  mealBreakdown: MealBreakdown
}): Promise<
  { error: string; result: undefined } | { result: true; error: undefined }
> {
  try {
    const userId = await withUser((user) => user.id)
    await saveMeal({ meal: mealBreakdown, userId })

    return { result: true, error: undefined }
  } catch (error) {
    return { error: `${error}`, result: undefined }
  }
}
