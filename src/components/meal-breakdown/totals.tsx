import { FoodItem } from "@/lib/infrastructure/services/AIService/schemas"

export function Totals({ foodItemTotals }: { foodItemTotals: FoodItem }) {
  return (
    <>
      {Object.entries(foodItemTotals)
        .filter(([_, value]) => typeof value === "number")
        .map(([key, value]) => {
          const [firstLetter, ...rest] = key.split("")
          const label = `${firstLetter.toUpperCase()}${rest.join("")}`

          return (
            <span key={key}>
              {label}: {(value as number).toFixed(1)}g
            </span>
          )
        })}
    </>
  )
}
