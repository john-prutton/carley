"use server"

import { continueConversation } from "@/use-cases/ai/chat"

import { MessageBubble } from "../components/message-bubble"
import { Message } from "../schema"
import { ClientMessage } from "../types"
import { generateChatResponse } from "./generate-chat-response"

export async function tryContinueConversation(
  userInput: Message
): Promise<ClientMessage> {
  const { response, error } = await continueConversation(
    { userInput },
    { generateChatResponse }
  )

  if (error)
    return {
      id: `error@${Date.now()}`,
      role: "assistant",
      display: MessageBubble({ role: "assistant", children: error })
    }

  return response!
}
