"use server"

import { MessageBubble } from "@/components/chat/message-bubble"
import { continueConversation } from "@/lib/core/application/use-cases/ai/chat"
import { ClientMessage } from "@/lib/core/domain/entities/Chat"
import { Message } from "@/lib/infrastructure/services/AIService/schemas"

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
