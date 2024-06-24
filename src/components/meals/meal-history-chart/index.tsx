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
  const data = Array.from(mealTotals.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([date, totals]) => ({
      date: format(new Date(date), "dd/MM/yyyy"),
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
