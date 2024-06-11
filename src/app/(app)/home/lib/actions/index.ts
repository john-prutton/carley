"use server"

import { MessageBubble } from "@/components/chat/message-bubble"
import { continueConversation } from "@/lib/core/application/use-cases/ai/chat"
import { ClientMessage, UserMessage } from "@/lib/core/domain/entities/Chat"

export async function tryContinueConversation(
  userInput: UserMessage
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
