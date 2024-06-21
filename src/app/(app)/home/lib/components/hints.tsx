import { LucideAreaChart, LucideCamera, LucideProps } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils/cn"

export function Hints({ className }: { className?: string }) {
  return (
    <div className={cn("space-y-4", className)}>
      <HintCard
        icon={LucideCamera}
        title="Analyze a Photo"
        content="Take a photo of your meal and I'll analyze it! Feel free to write down any notes about the meal, such as the ingredients you used, or if you shared it with someone. This will all be taken into account."
      />

      <HintCard
        icon={LucideAreaChart}
        title="View Meal History"
        content="View a history of the meals you've analyzed within a time frame. You can see a breakdown of the nutritional information for each meal."
      />
    </div>
  )
}

function HintCard({
  icon: Icon,
  title,
  content
}: {
  icon: React.FC<LucideProps>
  title: string
  content: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Icon className="size-12 stroke-primary" />
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent>{content}</CardContent>
    </Card>
  )
}
