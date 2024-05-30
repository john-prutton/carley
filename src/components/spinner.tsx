import { LucideLoader2, LucideProps } from "lucide-react"

import { cn } from "@/lib/utils"

export function Spinner({
  className,
  ...props
}: { className?: string } & LucideProps) {
  return <LucideLoader2 {...props} className={cn("animate-spin", className)} />
}
