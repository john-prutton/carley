import Image, { StaticImageData } from "next/image"

export function Feature({
  mockups: [mockup1, mockup2],
  features
}: {
  features: {
    icon: string
    title: string
    description: string
  }[]
  mockups: [StaticImageData, StaticImageData]
}) {
  return (
    <div className="flex flex-col gap-8 md:flex-row">
      <div className="flex flex-col gap-8">
        {features.map(({ icon, title, description }) => (
          <div key={title} className="flex flex-row gap-2">
            <span className="-translate-y-1 text-4xl drop-shadow-xl">
              {icon}
            </span>

            <div className="space-y-4">
              <span className="text-4xl font-semibold">{title}</span>
              <p className="leading-6 text-muted-foreground">{description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mockups */}
      <div className="relative mx-auto aspect-[calc(1170*1.75)/2532] w-full max-w-96">
        <div className="absolute z-10 h-full w-[calc(1/1.75*100%)]">
          <Image
            src={mockup1}
            alt="Mockups"
            placeholder="blur"
            sizes="300px"
            blurDataURL={mockup1.blurDataURL}
            fill
            className="overflow-clip rounded-2xl border-8 border-black drop-shadow-2xl"
          />
        </div>

        <div className="absolute h-full w-[calc(1/1.75*100%)] translate-x-3/4">
          <Image
            src={mockup2}
            alt="Mockups"
            placeholder="blur"
            sizes="300px"
            blurDataURL={mockup2.blurDataURL}
            fill
            className="overflow-clip rounded-2xl border-8 border-black drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}
