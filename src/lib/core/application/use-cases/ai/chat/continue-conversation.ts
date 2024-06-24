import "server-only"

import { UserEntity } from "@/lib/core/domain/entities/User"
import {
  AIResponse,
  IAIService,
  UserInput
} from "@/lib/core/services/IAIService"
import { AIService as DefaultAIService } from "@/lib/infrastructure/services"

type Signature = (
  inputs: {
    userInput: UserInput
    userId: UserEntity["id"]
  },
  dependencies?: {
    AIService: IAIService
  }
) => Promise<
  | { response: AIResponse; error?: undefined }
  | { response?: undefined; error: string }
>

export const continueConversation: Signature = async (
  { userInput, userId },
  { AIService } = {
    AIService: DefaultAIService
  }
) => {
  const response = await AIService.generateAIResponse(userInput, userId)
  return { response }
}
