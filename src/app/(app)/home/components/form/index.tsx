"use client"

import Image from "next/image"
import { useRef, useState } from "react"

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
  const { continueConversation } = useActions()
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
          <MessageBubble role="user">
            <>
              <p>{userInput.textInput}</p>

              {imgBase64Url && (
                <div className="relative mt-2 aspect-square w-svw max-w-full">
                  <Image
                    src={imgBase64Url}
                    alt="user image"
                    fill
                    className="rounded object-cover"
                  />
                </div>
              )}
            </>
          </MessageBubble>
        )
      }
    ])

    const message = await continueConversation(userInput)

    setImgBase64Url(null)
    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message
    ])
  }

  return (
    <form action={formAction}>
      <FormComponents
        imgBase64Url={imgBase64Url}
        setImgBase64Url={setImgBase64Url}
      />
    </form>
  )
}
