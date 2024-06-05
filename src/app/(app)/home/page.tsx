"use client"

import { useUIState } from "ai/rsc"

import { Conversation, Form } from "./lib/components"

export default function Home() {
  const [conversation, setConversation] = useUIState()

  return (
    <div className="mx-auto flex w-svw max-w-4xl flex-grow flex-col justify-between overflow-y-hidden">
      <Conversation conversation={conversation} />

      <Form setConversation={setConversation} />
    </div>
  )
}
