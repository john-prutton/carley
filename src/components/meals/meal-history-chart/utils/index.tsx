import { FoodItemTotals } from "@/lib/core/domain/entities/MealBreakdown"

export const colorMap = new Map<
  keyof FoodItemTotals,
  { topColor: string; bottomColor: string }
>([
  ["calories", { topColor: "text-orange-500", bottomColor: "text-orange-100" }],
  ["fats", { topColor: "text-yellow-500", bottomColor: "text-yellow-100" }],
  [
    "carbohydrates",
    { topColor: "text-green-500", bottomColor: "text-green-100" }
  ],
  ["proteins", { topColor: "text-blue-500", bottomColor: "text-blue-100" }]
  // ["sugars", { topColor: "text-pink-500", bottomColor: "text-pink-100" }],
  // ["fiber", { topColor: "text-purple-500", bottomColor: "text-purple-100" }],
  // ["sodium", { topColor: "text-indigo-500", bottomColor: "text-indigo-100" }],
  // ["cholesterol", { topColor: "text-orange-500", bottomColor: "text-orange-100" }],
  // ["saturated", { topColor: "text-teal-500", bottomColor: "text-teal-100" }],
  // ["unsaturated", { topColor: "text-cyan-500", bottomColor: "text-cyan-100" }],
  // ["monounsaturated", { topColor: "text-lime-500", bottomColor: "text-lime-100" }],
  // ["polyunsaturated", { topColor: "text-rose-500", bottomColor: "text-rose-100" }],
])
