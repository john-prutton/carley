import { cva } from "class-variance-authority"

import { ClientMessage } from "../types"

const messageBubbleVariants = cva(
  "m-1 w-fit max-w-[80%] rounded-xl border bg-background p-2 px-2 shadow",
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

export function MessageBubble({
  role,
  children
}: {
  role: ClientMessage["role"]
  children: React.ReactNode
}) {
  return <div className={messageBubbleVariants({ role })}>{children}</div>
}
