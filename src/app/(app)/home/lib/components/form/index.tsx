"use client"

import Image from "next/image"
import { useState } from "react"

import { useActions } from "ai/rsc"
import { nanoid } from "nanoid"

import { messageSchema } from "../../schema"
import { ClientMessage } from "../../types"
import { MessageBubble } from "../message-bubble"
import { FormComponents } from "./form-components"

export function Form({
  setConversation
}: {
  setConversation: (conversation: any) => void
}) {
  const { tryContinueConversation } = useActions()
  const [imgBase64Url, setImgBase64Url] = useState<string | null>(null)

  const formAction = async (formData: FormData) => {
    const formInput = {
      textInput: formData.get("textInput"),
      fileInput: formData.get("fileInput")
    }

    const {
      success: isValidMessage,
      error,
      data: userInput
    } = messageSchema.safeParse(formInput)

    if (!isValidMessage) {
      alert("Invalid message:" + error.message)
      alert(JSON.stringify(userInput))
      return
    }

    const userMessage = { id: nanoid(), role: "user" }
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      {
        ...userMessage,
        display: (
          <>
            {userInput.textInput && (
              <MessageBubble role="user">
                <p>{userInput.textInput}</p>
              </MessageBubble>
            )}

            {imgBase64Url && (
              <MessageBubble
                role="user"
                className="relative aspect-square w-svw max-w-48 overflow-clip bg-transparent"
              >
                <Image
                  src={imgBase64Url}
                  alt="user image"
                  fill
                  className="object-cover"
                />
              </MessageBubble>
            )}
          </>
        )
      }
    ])

    const message = await tryContinueConversation(userInput)

    setImgBase64Url(null)
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message
    ])
  }

  return (
    <form
      action={formAction}
      className="rounded-t-xl bg-white p-2 drop-shadow-sm"
    >
      <FormComponents
        imgBase64Url={imgBase64Url}
        setImgBase64Url={setImgBase64Url}
      />
    </form>
  )
}
