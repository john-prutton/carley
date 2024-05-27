import "server-only"

import { z } from "zod"

import { mealBreakdownSchema } from "../schema"

export function MealBreakdown({
  mealBreakdown
}: {
  mealBreakdown: z.infer<typeof mealBreakdownSchema>
}) {
  return (
    <div>
      <h2 className="font-semibold">{mealBreakdown.description}</h2>

      <div>
        {mealBreakdown.foodItems.map((foodItem, index) => (
          <div key={index}>
            <h3>{foodItem.description}</h3>
            <div>Calories: {foodItem.calories}</div>
            <div>Protein: {foodItem.proteins}</div>
            <div>Carbs: {foodItem.carbohydrates}</div>
            <div>Fat: {foodItem.fats}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
