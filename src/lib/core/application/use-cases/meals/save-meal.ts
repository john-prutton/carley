import "server-only"

import {
  MealBreakdown,
  MealBreakdownEntity
} from "@/lib/core/domain/entities/MealBreakdown"
import { IMealRepository } from "@/lib/core/domain/repositories/IMealRepository"
import { MealRepository as DefaultMealRepository } from "@/lib/infrastructure/data-access/repositories"

type Signature = (
  inputs: {
    meal: MealBreakdown
    userId: string
  },
  dependencies?: {
    MealRepository: IMealRepository
  }
) => Promise<MealBreakdownEntity>

export const saveMeal: Signature = async (
  inputs,
  dependencies = {
    MealRepository: DefaultMealRepository
  }
) => {
  return await dependencies.MealRepository.createMeal(
    inputs.meal,
    inputs.userId
  )
}
