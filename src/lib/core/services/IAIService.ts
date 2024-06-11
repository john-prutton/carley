export type UserInput = { textInput?: string; fileInput?: File }
export type AIResponse = {
  id: string
  role: "assistant"
  display: React.ReactNode
}

export interface IAIService {
  generateAIResponse: (userInput: UserInput) => Promise<AIResponse>
}
