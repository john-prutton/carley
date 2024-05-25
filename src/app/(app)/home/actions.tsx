"use server"

import { openai } from "@ai-sdk/openai"
import { generateObject } from "ai"
import { getMutableAIState, streamUI } from "ai/rsc"
import { nanoid } from "nanoid"
import { z } from "zod"

import { JokeComponent } from "./joke-component"
import { jokeSchema } from "./schema"
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
      tellAJoke: {
        description: "Tell a joke",
        parameters: z.object({
          location: z.string().describe("the users location")
        }),
        generate: async function* ({ location }) {
          yield <div>loading...</div>
          const joke = await generateObject({
            model: openai("gpt-4o"),
            schema: jokeSchema,
            prompt:
              "Generate a joke that incorporates the following location:" +
              location
          })
          return <JokeComponent joke={joke.object} />
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
