"use client"

import { useState } from "react"

import { useActions, useUIState } from "ai/rsc"
import { nanoid } from "nanoid"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { Conversation } from "./components"
import { ClientMessage } from "./types"

export default function Home() {
  const [input, setInput] = useState<string>("")
  const [conversation, setConversation] = useUIState()
  const { continueConversation } = useActions()

  return (
    <div>
      <Conversation conversation={conversation} />

      <form
        onSubmit={async (e) => {
          e.preventDefault()
          setInput("")
          setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            { id: nanoid(), role: "user", display: input }
          ])

          const message = await continueConversation(input)

          setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            message
          ])
        }}
      >
        <Input
          type="text"
          value={input}
          onChange={(event) => {
            setInput(event.target.value)
          }}
        />
        <Button>Send Message</Button>
      </form>
    </div>
  )
}
