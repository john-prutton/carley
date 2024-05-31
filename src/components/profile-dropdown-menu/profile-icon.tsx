import { LucideUserRound } from "lucide-react"

import { cn } from "@/lib/utils"

export function ProfileIcon({ className }: { className?: string }) {
  return (
    <LucideUserRound
      className={cn(
        "size-7 rounded-full bg-primary/20 p-1 text-primary",
        className
      )}
    />
  )
}
