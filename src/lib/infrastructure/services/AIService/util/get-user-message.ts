import { CoreUserMessage, ImagePart, TextPart } from "ai"

import { Message } from "../schemas"

/**
 * Get user's different inputs from their message.
 * For now it can only be text and image.
 *
 * @param message
 * @returns
 */
export async function getUserMessage(message: Message) {
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
