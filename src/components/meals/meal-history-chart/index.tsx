import { eachDayOfInterval } from "date-fns/eachDayOfInterval"
import { format } from "date-fns/format"
import { formatDistanceToNow } from "date-fns/formatDistanceToNow"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FoodItemTotals } from "@/lib/core/domain/entities/MealBreakdown"

import { Chart } from "./chart"

export function MealHistoryChart({
  cutoffDate,
  mealTotals
}: {
  cutoffDate: Date
  mealTotals: Map<number, FoodItemTotals>
}) {
  const data = eachDayOfInterval({ start: cutoffDate, end: new Date() })
    .map((date) => {
      const totals = mealTotals.get(date.getTime()) ?? {
        weight: 0,
        calories: 0,
        carbohydrates: 0,
        proteins: 0,
        fats: 0
      }

      return { date, ...totals }
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .map(({ date, ...totals }) => ({
      date: format(date, "dd/MM/yyyy"),
      ...totals
    }))

  return (
    <Card>
      <CardHeader>
        <CardTitle>Meal History</CardTitle>

        <span className="text-muted-foreground">
          From {formatDistanceToNow(cutoffDate, { addSuffix: true })}
        </span>
      </CardHeader>

      <CardContent className="aspect-square sm:aspect-video">
        <Chart data={data} />
      </CardContent>
    </Card>
  )
}
