import { cn } from "@/lib/utils"

export function SplashLogo({ className }: { className?: string }) {
  return (
    <div className={cn("w-fit", className)}>
      <span className="text-6xl font-black">Carley</span>
      <span className="-scale-x-100 text-7xl">🍍</span>
    </div>
  )
}
