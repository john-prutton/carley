"use server"

import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { getMutableAIState, streamUI } from "ai/rsc"
import { nanoid } from "nanoid"
import { z } from "zod"

import { LoadingBubbles } from "./components/loading-bubbles"
import { MealBreakdown } from "./components/meal-breakdown"
import { MessageBubble } from "./components/message-bubble"
import { mealBreakdownSchema, Message } from "./schema"
import { ClientMessage, ServerMessage } from "./types"
import { getUserMessage } from "./util"

export async function continueConversation(
  userInput: Message
): Promise<ClientMessage> {
  const history = getMutableAIState()

  const userMessage = await getUserMessage(userInput)

  const result = await streamUI({
    model: openai("gpt-4o"),

    messages: [...history.get(), userMessage],

    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content }
        ])
      }

      return <MessageBubble role="assistant">{content}</MessageBubble>
    },

    tools: {
      analyzeMeal: {
        description:
          "Analyze a meal from an image to provide a breakdown of the nutritional information.",

        parameters: z.object({}),

        generate: async function* () {
          yield <LoadingBubbles />

          const mealBreakdown = await generateObject({
            model: openai("gpt-4o"),
            schema: mealBreakdownSchema,
            messages: [
              {
                role: "system",
                content:
                  "Analyze this image of the user's meal. As a personal trainer, identify nutritional information such as calories and macros. Here's the image:"
              },
              userMessage
            ]
          })

          return <MealBreakdown mealBreakdown={mealBreakdown.object} />
        }
      }
    }
  })

  return {
    id: nanoid(),
    role: "assistant",
    display: result.value
  }
}
