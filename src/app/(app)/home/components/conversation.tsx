import { useEffect, useRef } from "react"

import { ClientMessage } from "../types"

export function Conversation({
  conversation
}: {
  conversation: ClientMessage[]
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  })
  return (
    <div
      ref={scrollRef}
      className="-mt-8 space-y-4 overflow-y-scroll px-2 pb-4 pt-10"
    >
      {conversation.map((message: ClientMessage) => message.display)}
    </div>
  )
}
