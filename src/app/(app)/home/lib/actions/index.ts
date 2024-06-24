"use server"

import { MessageBubble } from "@/components/chat/message-bubble"
import { continueConversation } from "@/lib/core/application/use-cases/ai/chat"
import { ClientMessage, UserMessage } from "@/lib/core/domain/entities/Chat"
import { withUser } from "@/lib/utils/auth"
import { base64ToFile } from "@/lib/utils/file"

export async function tryContinueConversation(
  userInput: UserMessage
): Promise<ClientMessage> {
  try {
    const input = {
      fileInput: !userInput.fileInput
        ? undefined
        : await base64ToFile(userInput.fileInput, "file.png").arrayBuffer(),
      textInput: userInput.textInput
    }

    const userId = await withUser((u) => u.id)
    const { response, error } = await continueConversation({
      userInput: input,
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
