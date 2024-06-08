"use server"

import { continueConversation } from "@/lib/core/application/use-cases/ai/chat"

import { MessageBubble } from "../components/message-bubble"
import { Message } from "../schema"
import { ClientMessage } from "../types"

export async function tryContinueConversation(
  userInput: Message
): Promise<ClientMessage> {
  const { response, error } = await continueConversation({ userInput })

  if (error)
    return {
      id: `error@${Date.now()}`,
      role: "assistant",
      display: MessageBubble({ role: "assistant", children: error })
    }

  return response!
}
