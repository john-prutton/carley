import "server-only"

type UserInput = { textInput?: string; fileInput?: File }
type ChatResponse = {
  id: string
  role: "user" | "assistant"
  display: React.ReactNode
}
type Signature = (
  inputs: {
    userInput: UserInput
  },
  dependencies: {
    generateChatResponse: (userInput: UserInput) => Promise<ChatResponse>
  }
) => Promise<
  | { response: Promise<ChatResponse>; error?: undefined }
  | { response?: undefined; error: string }
>

export const continueConversation: Signature = async (
  { userInput },
  { generateChatResponse }
) => {
  const response = generateChatResponse(userInput)
  return { response: response }
}
