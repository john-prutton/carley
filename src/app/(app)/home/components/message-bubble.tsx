import { cva } from "class-variance-authority"

import { ClientMessage } from "../types"

const messageBubbleVariants = cva(
  "m-1 w-fit max-w-[80%] space-x-2 rounded-xl border bg-background p-2 px-4 shadow",
  {
    variants: {
      role: {
        user: "ml-auto bg-primary text-primary-foreground",
        assistant: "mr-auto bg-background text-foreground"
      }
    },
    defaultVariants: {
      role: "user"
    }
  }
)

export function MessageBubble({ message }: { message: ClientMessage }) {
  return (
    <div className={messageBubbleVariants({ role: message.role })}>
      {message.display}
    </div>
  )
}
