export function Feature({
  title,
  description,
  icon
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="flex flex-row gap-2">
      <span className="text-4xl drop-shadow-xl [@media_(max-width:_350px)]:text-3xl">
        {icon}
      </span>

      <div className="space-y-4">
        <span className="text-4xl font-semibold [@media_(max-width:_350px)]:text-3xl">
          {title}
        </span>
        <p className="leading-6 text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
