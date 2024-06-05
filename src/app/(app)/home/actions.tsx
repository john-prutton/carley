"use server"

import { continueConversation } from "@/use-cases/ai/chat"

import { LoadingBubbles } from "./components/loading-bubbles"
import { MealBreakdown } from "./components/meal-breakdown"
import { MessageBubble } from "./components/message-bubble"
import { Message } from "./schema"
import { ClientMessage } from "./types"

export async function tryContinueConversation(
  userInput: Message
): Promise<ClientMessage> {
  return continueConversation(userInput, {
    Loader: LoadingBubbles,
    MessageBubble,
    MealBreakdown
  })
}
