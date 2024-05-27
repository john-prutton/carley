"use client"

import { useRef } from "react"

import { useActions } from "ai/rsc"
import { LucidePaperclip, LucideSend } from "lucide-react"
import { nanoid } from "nanoid"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { messageSchema } from "../schema"
import { ClientMessage } from "../types"

export function Form({
  setConversation
}: {
  setConversation: (conversation: any) => void
}) {
  const { continueConversation } = useActions()
  const imgSelectorRef = useRef<HTMLInputElement>(null)

  const formAction = async (formData: FormData) => {
    const userInput = {
      textInput: formData.get("textInput"),
      fileInput: formData.get("fileInput")
    }

    const { success: isValidMessage, error } =
      messageSchema.safeParse(userInput)

    if (!isValidMessage) {
      alert("Invalid message:" + error.message)
      alert(JSON.stringify(userInput))
      return
    }

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      { id: nanoid(), role: "user", display: userInput.textInput }
    ])

    const message = await continueConversation(userInput.textInput)

    setConversation((currentConversation: ClientMessage[]) => [
      ...currentConversation,
      message
    ])
  }

  return (
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
        />
      </>

      <Input name="textInput" type="text" />

      <Button type="submit">
        <LucideSend />
      </Button>
    </form>
  )
}
