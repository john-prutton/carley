"use client"

import Image from "next/image"
import { useRef, useState } from "react"

import { useActions } from "ai/rsc"
import { LucidePaperclip, LucideSend, LucideXCircle } from "lucide-react"
import { nanoid } from "nanoid"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { messageSchema } from "../schema"
import { ClientMessage } from "../types"
import { MessageBubble } from "./message-bubble"

export function Form({
  setConversation
}: {
  setConversation: (conversation: any) => void
}) {
  const { continueConversation } = useActions()
  const imgSelectorRef = useRef<HTMLInputElement>(null)
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
              {userInput.textInput}
              {imgBase64Url && (
                <Image
                  src={imgBase64Url}
                  alt="user image"
                  width={128}
                  height={128}
                  className="rounded"
                />
              )}
            </>
          </MessageBubble>
        )
      }
    ])

    const message = await continueConversation(userInput)

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message
    ])
  }

  const handleImageOnChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return setImgBase64Url(null)

    const url = Buffer.from(await file.arrayBuffer()).toString("base64")
    setImgBase64Url(`data:image/png;base64,${url}`)
  }

  return (
    <div>
      {imgBase64Url && (
        <div className="relative w-fit">
          <Image
            src={imgBase64Url}
            alt="preview of user image"
            width={128}
            height={128}
            className="mb-2 rounded"
          />

          <Button
            variant="ghost"
            onClick={() => setImgBase64Url(null)}
            className="absolute right-0 top-0 -translate-y-1/4 translate-x-full"
            size="icon"
          >
            <LucideXCircle />
          </Button>
        </div>
      )}

      <form className="flex flex-row gap-2" action={formAction}>
        <>
          <Button
            variant="outline"
            type="button"
            onClick={() => imgSelectorRef.current?.click()}
          >
            <LucidePaperclip />
          </Button>

          <input
            ref={imgSelectorRef}
            name="fileInput"
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageOnChange}
          />
        </>

        <Input name="textInput" type="text" />

        <Button type="submit">
          <LucideSend />
        </Button>
      </form>
    </div>
  )
}
