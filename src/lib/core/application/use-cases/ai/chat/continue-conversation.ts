import "server-only"

import {
  AIResponse,
  IAIService,
  UserInput
} from "@/lib/core/services/IAIService"
import { AIService as DefaultAIService } from "@/lib/infrastructure/services"

type Signature = (
  inputs: {
    userInput: UserInput
  },
  dependencies?: {
    AIService: IAIService
  }
) => Promise<
  | { response: Promise<AIResponse>; error?: undefined }
  | { response?: undefined; error: string }
>

export const continueConversation: Signature = async (
  { userInput },
  { AIService } = {
    AIService: DefaultAIService
  }
) => {
  const response = AIService.generateAIResponse(userInput)
  return { response: response }
}