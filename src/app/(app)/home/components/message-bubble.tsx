import { cva } from "class-variance-authority"

import { cn } from "@/lib/utils"

import { ClientMessage } from "../types"

const messageBubbleVariants = cva(
  "m-1 w-fit max-w-[80%] rounded-xl border p-2 px-2 shadow",
  {
    variants: {
      role: {
        user: "ml-auto bg-primary text-primary-foreground",
        assistant: "mr-auto bg-white text-foreground"
      }
    },
    defaultVariants: {
      role: "user"
    }
  }
)

export function MessageBubble({
  role,
  children,
  className
}: {
  className?: string
  role: ClientMessage["role"]
  children: React.ReactNode
}) {
  return (
    <div className={cn(messageBubbleVariants({ role }), className)}>
      {children}
    </div>
  )
}
