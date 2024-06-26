import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { getMutableAIState, streamUI } from "ai/rsc"
import { nanoid } from "nanoid"
import { z } from "zod"

import { LoadingBubbles } from "@/components/chat/loading-bubbles"
import { MessageBubble } from "@/components/chat/message-bubble"
import { MealBreakdown } from "@/components/meals/meal-breakdown"
import { MealHistoryChart } from "@/components/meals/meal-history-chart"
import { getMealsInTimeFrame } from "@/lib/core/application/use-cases/meals/get-meals-in-time-frame"
import { ServerMessage } from "@/lib/core/domain/entities/Chat"
import { mealBreakdownSchema } from "@/lib/core/domain/entities/MealBreakdown"
import { UserEntity } from "@/lib/core/domain/entities/User"
import { IAIService, UserInput } from "@/lib/core/services/IAIService"

import { getCutoffDate, humanizeTimeFrame } from "./util/date-util"
import { getUserMessage } from "./util/get-user-message"
import { getMealTotalsByDate } from "./util/meals"

export const AIService: IAIService = {
  generateAIResponse: async (
    userInput: UserInput,
    userId: UserEntity["id"]
  ) => {
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
                <MealBreakdown mealBreakdown={mealBreakdown.object} />
              </>
            )
          }
        },

        mealHistory: {
          description:
            "View the history of meals that have been analyzed based on a provided time frame.",
          parameters: z.object({
            delta: z
              .number()
              .int()
              .positive()
              .describe("The number of milliseconds to look back in time.")
          }),

          generate: async function* ({ delta }) {
            const cutoff = getCutoffDate(delta)
            const humanTimeFrame = humanizeTimeFrame(cutoff)

            yield (
              <>
                <MessageBubble role="assistant">
                  Calculating meal history since {humanTimeFrame}.
                </MessageBubble>
                <LoadingBubbles />
              </>
            )

            const meals = await getMealsInTimeFrame({ userId, cutoff })

            if (meals.length === 0)
              return (
                <MessageBubble role="assistant">
                  No meals found since {humanTimeFrame}. Try a different time
                  frame.
                </MessageBubble>
              )

            const mealHistoryTotals = getMealTotalsByDate(meals)

            return (
              <>
                <MealHistoryChart
                  cutoffDate={cutoff}
                  mealTotals={mealHistoryTotals}
                />
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
