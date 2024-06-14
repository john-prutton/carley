import { MealBreakdown, MealBreakdownEntity } from "../entities/MealBreakdown"
import { UserEntity } from "../entities/User"

export interface IMealRepository {
  createMeal: (
    meal: MealBreakdown,
    userId: UserEntity["id"]
  ) => Promise<MealBreakdownEntity>
}
