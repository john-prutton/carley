"use client"

import { ClientMessage } from "../types"

export function Conversation({
  conversation
}: {
  conversation: ClientMessage[]
}) {
  return (
    <div>
      {conversation.map((message: ClientMessage) => (
        <div key={message.id}>
          {message.role}: {message.display}
        </div>
      ))}
    </div>
  )
}
