import { z } from "zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { mealBreakdownSchema } from "@/lib/infrastructure/services/AIService/schemas"

import { FoodItemList } from "./food-item-list"
import { Totals } from "./totals"

export function MealBreakdown({
  mealBreakdown
}: {
  mealBreakdown: z.infer<typeof mealBreakdownSchema>
}) {
  const totals = mealBreakdown.foodItems.reduce((acc, foodItem) => {
    return {
      description: "",
      weight: acc.weight + foodItem.weight,
      calories: acc.calories + foodItem.calories,
      proteins: acc.proteins + foodItem.proteins,
      carbohydrates: acc.carbohydrates + foodItem.carbohydrates,
      fats: acc.fats + foodItem.fats
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>{mealBreakdown.description}</CardTitle>
        <CardDescription className="flex flex-row flex-wrap gap-2 text-xs">
          <Totals foodItemTotals={totals} />
        </CardDescription>
      </CardHeader>

      <CardContent>
        <FoodItemList foodItems={mealBreakdown.foodItems} />
      </CardContent>
    </Card>
  )
}
