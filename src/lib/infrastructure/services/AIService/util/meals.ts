import { startOfDay } from "date-fns"

import {
  FoodItemTotals,
  MealBreakdownEntity
} from "@/lib/core/domain/entities/MealBreakdown"

export const getMealTotalsByDate = (meals: MealBreakdownEntity[]) => {
  const totals = new Map<number, FoodItemTotals>()

  meals.forEach((meal) => {
    const date = startOfDay(meal.createdAt).getTime()

    const existingTotals: FoodItemTotals = totals.get(date) ?? {
      calories: 0,
      carbohydrates: 0,
      fats: 0,
      proteins: 0,
      weight: 0
    }

    const mealTotals = getMealTotals(meal)

    totals.set(date, {
      calories: existingTotals.calories + mealTotals.calories,
      carbohydrates: existingTotals.carbohydrates + mealTotals.carbohydrates,
      fats: existingTotals.fats + mealTotals.fats,
      proteins: existingTotals.proteins + mealTotals.proteins,
      weight: existingTotals.weight + mealTotals.weight
    })
  })

  return totals
}

const getMealTotals = (meal: MealBreakdownEntity) =>
  meal.foodItems.reduce<FoodItemTotals>(
    (acc, foodItem) => ({
      calories: acc.calories + foodItem.calories,
      carbohydrates: acc.carbohydrates + foodItem.carbohydrates,
      fats: acc.fats + foodItem.fats,
      proteins: acc.proteins + foodItem.proteins,
      weight: acc.weight + foodItem.weight
    }),
    {
      calories: 0,
      proteins: 0,
      carbohydrates: 0,
      fats: 0,
      weight: 0
    }
  )
