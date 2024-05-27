import { ClientMessage } from "../types"

export function Conversation({
  conversation
}: {
  conversation: ClientMessage[]
}) {
  return (
    <div className="-mt-8 space-y-4 overflow-y-scroll pb-4 pt-10">
      {conversation.map((message: ClientMessage) => message.display)}
    </div>
  )
}
