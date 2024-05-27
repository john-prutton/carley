"use server"

import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { getMutableAIState, streamUI } from "ai/rsc"
import { nanoid } from "nanoid"
import { z } from "zod"

import { MealBreakdown } from "./components/meal-breakdown"
import { mealBreakdownSchema } from "./schema"
import { ClientMessage, ServerMessage } from "./types"

export async function continueConversation(
  input: string
): Promise<ClientMessage> {
  const history = getMutableAIState()

  const result = await streamUI({
    model: openai("gpt-4o"),
    messages: [...history.get(), { role: "user", content: input }],

    text: ({ content, done }) => {
      if (done) {
        history.done((messages: ServerMessage[]) => [
          ...messages,
          { role: "assistant", content }
        ])
      }

      return <div>{content}</div>
    },

    tools: {
      analyzeMeal: {
        description:
          "Analyze a meal from an image to provide a breakdown of the nutritional information.",

        parameters: z.object({
          foodImage: z.any().describe("Image of the user's meal.")
        }),

        generate: async function* ({ foodImage }) {
          yield <div>analyzing meal...</div>

          const mealBreakdown = await generateObject({
            model: openai("gpt-4o"),
            schema: mealBreakdownSchema,
            prompt:
              "Analyze this image of the user's meal. As a personal trainer, identify nutritional information such as calories and macros. Here's the image:" +
              foodImage
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
