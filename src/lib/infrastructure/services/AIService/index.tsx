import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { getMutableAIState, streamUI } from "ai/rsc"
import { nanoid } from "nanoid"
import { z } from "zod"

import { LoadingBubbles, MessageBubble } from "@/components/chat"
import { MealBreakdown } from "@/components/meal-breakdown"
import { ServerMessage } from "@/lib/core/domain/entities/Chat"
import { IAIService, UserInput } from "@/lib/core/services/IAIService"

import { mealBreakdownSchema } from "./schemas"
import { getUserMessage } from "./util"

export const AIService: IAIService = {
  generateAIResponse: async (userInput: UserInput) => {
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

            return (
              <>
                <MessageBubble role="assistant">
                  I&apos;ve analyzed your meal and here&apos;s the breakdown.
                </MessageBubble>
                <MealBreakdown mealBreakdown={mealBreakdown.object} />
              </>
            )
          }
        }
      }
    })

    return {
      id: nanoid(),
      role: "assistant" as const,
      display: result.value
    }
  }
}
