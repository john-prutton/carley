"use client"

import { useUIState } from "ai/rsc"

import { Conversation, Form } from "./components"

export default function Home() {
  const [conversation, setConversation] = useUIState()

  return (
    <div className="mb-2 flex flex-col justify-between overflow-scroll px-2">
      <Conversation conversation={conversation} />

      <Form setConversation={setConversation} />
    </div>
  )
}
