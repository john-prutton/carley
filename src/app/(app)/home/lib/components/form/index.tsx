"use client"

import Image from "next/image"
import { useRef, useState } from "react"

import { useActions } from "ai/rsc"
import { LucidePaperclip, LucideXCircle } from "lucide-react"
import { nanoid } from "nanoid"

import { MessageBubble } from "@/components/chat/message-bubble"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  ClientMessage,
  userMessageSchema
} from "@/lib/core/domain/entities/Chat"
import { fileToBase64 } from "@/lib/utils/file"

import { Fieldset, SubmitButton } from "./components"

export function Form({
  setConversation
}: {
  setConversation: (conversation: any) => void
}) {
  const { tryContinueConversation } = useActions()

  const imgInputRef = useRef<HTMLInputElement>(null)
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

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
    } = await userMessageSchema.safeParseAsync({
      ...formInput,
      fileInput:
        formInput.fileInput instanceof File &&
        formInput.fileInput.type.startsWith("image/")
          ? await fileToBase64(formInput.fileInput)
          : undefined
    })

    if (!isValidMessage) {
      alert("Invalid message: " + error.issues[0].message)
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

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message
    ])

    resetForm()
  }

  const handleImageOnChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return setImgBase64Url(null)

    const url = Buffer.from(await file.arrayBuffer()).toString("base64")
    setImgBase64Url(`data:image/png;base64,${url}`)
  }

  const clearImage = () => {
    setImgBase64Url(null)
    if (imgInputRef.current) imgInputRef.current.value = ""
  }

  const resetForm = () => {
    clearImage()

    setTimeout(() => {
      if (textAreaRef.current) {
        textAreaRef.current.value = ""
        textAreaRef.current.focus()
      }
    }, 200)
  }

  return (
    <form action={formAction}>
      <Fieldset className="relative flex flex-row items-end gap-2 rounded-t-xl bg-white p-2 drop-shadow-sm">
        {imgBase64Url && (
          <div className="absolute top-0 w-fit -translate-y-full drop-shadow-xl">
            <Image
              src={imgBase64Url}
              alt="preview of user image"
              width={128}
              height={128}
              className="mb-2 rounded"
            />

            <Button
              variant="ghost"
              onClick={clearImage}
              className="group absolute right-0 top-0 "
              size="icon"
            >
              <LucideXCircle className="text-background group-hover:text-foreground" />
            </Button>
          </div>
        )}

        <Button
          variant="ghost"
          type="button"
          className="border"
          onClick={() => imgInputRef.current?.click()}
        >
          <LucidePaperclip />
        </Button>

        <input
          name="fileInput"
          type="file"
          accept="image/*"
          hidden
          ref={imgInputRef}
          onChange={handleImageOnChange}
          onReset={handleImageOnChange}
        />

        <Textarea
          ref={textAreaRef}
          name="textInput"
          rows={1}
          className="max-h-32 min-h-0 resize-none bg-white"
          autoFocus
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault()
              event.currentTarget.value += "\n"
            }
          }}
        />

        <SubmitButton />
      </Fieldset>
    </form>
  )
}
