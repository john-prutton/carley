"use server"

import { MessageBubble } from "@/components/chat/message-bubble"
import { continueConversation } from "@/lib/core/application/use-cases/ai/chat"
import { ClientMessage, UserMessage } from "@/lib/core/domain/entities/Chat"
import { withUser } from "@/lib/utils/auth"

export async function tryContinueConversation(
  userInput: UserMessage
): Promise<ClientMessage> {
  try {
    const userId = await withUser((u) => u.id)
    const { response, error } = await continueConversation({
      userInput,
      userId
    })
    if (error) throw new Error(error)

    return response!
  } catch (error) {
    return {
      id: `error@${Date.now()}`,
      role: "assistant",
      display: MessageBubble({ role: "assistant", children: `${error}` })
    }
  }
}
