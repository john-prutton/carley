import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

import { MealBreakdownEntity } from "@/lib/core/domain/entities/MealBreakdown"

import { userTable } from "./auth"

export const mealTable = sqliteTable("meals", {
  id: integer("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  description: text("description").notNull(),
  foodItems: text("food_items", { mode: "json" })
    .notNull()
    .$type<MealBreakdownEntity["foodItems"]>()
})

const _: MealBreakdownEntity = {} as typeof mealTable.$inferSelect
