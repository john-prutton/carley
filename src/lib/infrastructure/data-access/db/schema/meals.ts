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
    .$type<MealBreakdownEntity["foodItems"]>(),
  createdAt: integer("created_at", { mode: "timestamp_ms" })
    .notNull()
    .$default(() => new Date())
})

const _: MealBreakdownEntity = {} as typeof mealTable.$inferSelect
