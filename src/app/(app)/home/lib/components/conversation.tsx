import { useEffect, useRef } from "react"

import { ScrollArea } from "@/components/ui/scroll-area"
import { ClientMessage } from "@/lib/core/domain/entities/Chat"

import { Hints } from "./hints"

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

  if (conversation.length === 0)
    return (
      <div className="grid flex-grow place-content-center">
        <Hints className="mx-auto w-full max-w-[96%]" />
      </div>
    )

  return (
    <ScrollArea ref={scrollRef} className="px-2">
      <div className="space-y-4 py-4">
        {conversation.map((message: ClientMessage) => message.display)}
      </div>
    </ScrollArea>
  )
}
