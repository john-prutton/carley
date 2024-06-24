import { UserEntity } from "../domain/entities/User"

export type UserInput = { textInput?: string; fileInput?: ArrayBuffer }
export type AIResponse = {
  id: string
  role: "assistant"
  display: React.ReactNode
}

export interface IAIService {
  generateAIResponse: (
    userInput: UserInput,
    userId: UserEntity["id"]
  ) => Promise<AIResponse>
}
