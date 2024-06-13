import { LucideCamera } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function FAQ({ className }: { className?: string }) {
  return (
    <Card className={className}>
      <CardHeader className="flex flex-row items-center gap-4">
        <LucideCamera className="size-12 stroke-primary" />
        <CardTitle>Analyze a Photo</CardTitle>
      </CardHeader>
      <CardContent>
        Take a photo of your meal and I&apos;ll analyze it! Feel free to write
        down any notes about the meal, such as the ingredients you used, or if
        you shared it with someone. This will all be taken into account.
      </CardContent>
    </Card>
  )
}
