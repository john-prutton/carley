import { MealBreakdownEntity } from "@/lib/core/domain/entities/MealBreakdown"
import { UserEntity } from "@/lib/core/domain/entities/User"
import { IMealRepository } from "@/lib/core/domain/repositories/IMealRepository"
import { MealRepository as DefaultMealRepository } from "@/lib/infrastructure/data-access/repositories"

type Signature = (
  inputs: { userId: UserEntity["id"]; cutoff: Date },
  dependencies?: { MealRepository: IMealRepository }
) => Promise<MealBreakdownEntity[]>

export const getMealsInTimeFrame: Signature = async (
  { userId, cutoff },
  { MealRepository } = { MealRepository: DefaultMealRepository }
) => {
  return MealRepository.getUserMealsInTimeFrame(userId, cutoff)
}
