"use client"

import { useUIState } from "ai/rsc"

import { Conversation, Form } from "./components"

export default function Home() {
  const [conversation, setConversation] = useUIState()

  return (
    <div className="flex flex-grow flex-col justify-between overflow-y-hidden">
      <Conversation conversation={conversation} />

      <Form setConversation={setConversation} />
    </div>
  )
}
