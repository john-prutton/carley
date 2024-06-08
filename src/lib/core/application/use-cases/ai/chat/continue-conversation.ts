import "server-only"

import { generateChatResponse } from "@/app/(app)/home/lib/actions/generate-chat-response"
import {
  ChatResponse,
  IChatService,
  UserInput
} from "@/lib/core/services/IChatService"

type Signature = (
  inputs: {
    userInput: UserInput
  },
  dependencies?: {
    ChatService: IChatService
  }
) => Promise<
  | { response: Promise<ChatResponse>; error?: undefined }
  | { response?: undefined; error: string }
>

export const continueConversation: Signature = async (
  { userInput },
  { ChatService } = {
    ChatService: {
      generateChatResponse
    }
  }
) => {
  const response = ChatService.generateChatResponse(userInput)
  return { response: response }
}
