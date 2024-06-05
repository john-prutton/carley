// "use server"

import "server-only"

import { openai } from "@ai-sdk/openai"
import { CoreUserMessage, generateObject, ImagePart, TextPart } from "ai"
import { getMutableAIState, streamUI } from "ai/rsc"
import { nanoid } from "nanoid"
import { z } from "zod"

import { MealBreakdown, mealBreakdownSchema, Message } from "./schemas"

interface ServerMessage {
  role: "user" | "assistant"
  content: string
}

interface ClientMessage {
  id: string
  role: "user" | "assistant"
  display: React.ReactNode
}

async function getUserMessage(message: Message) {
  // get the text and image parts from the user input
  const textPart: TextPart | undefined = message.textInput
    ? {
        type: "text",
        text: message.textInput
      }
    : undefined
  const imagePart: ImagePart | undefined = message.fileInput
    ? {
        type: "image",
        image: await message.fileInput.arrayBuffer()
      }
    : undefined

  const userMessage: CoreUserMessage = {
    role: "user",
    content: [
      ...(textPart ? [textPart] : []),
      ...(imagePart ? [imagePart] : [])
    ]
  }

  return userMessage
}

export async function continueConversation(
  userInput: Message,
  {
    MessageBubble = (props) => JSON.stringify(props),
    Loader = (props) => JSON.stringify(props),
    MealBreakdown = (props) => JSON.stringify(props)
  }: {
    Loader?: React.FC<{}>
    MessageBubble?: React.FC<{
      role: "assistant" | "user"
      children: React.ReactNode
    }>
    MealBreakdown?: React.FC<{ mealBreakdown: MealBreakdown }>
  }
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
          yield <Loader />

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
    role: "assistant",
    display: result.value
  }
}
