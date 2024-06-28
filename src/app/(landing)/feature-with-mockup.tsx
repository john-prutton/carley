import Image, { StaticImageData } from "next/image"

import { Feature } from "./feature"

export function FeatureWithMockup({
  features,
  mockups
}: {
  features: { icon: string; title: string; description: string }[]
  mockups: [StaticImageData, StaticImageData]
}) {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-8">
        {features.map(({ icon, title, description }) => (
          <Feature
            key={title}
            icon={icon}
            title={title}
            description={description}
          />
        ))}
      </div>

      <div className="relative mx-auto aspect-[calc(1170*1.75)/2532] w-full max-w-96 md:ml-0">
        <div className="absolute z-10 h-full w-[calc(1/1.75*100%)]">
          <Image
            src={mockups[0]}
            alt="Mockups"
            placeholder="blur"
            sizes="300px"
            blurDataURL={mockups[0].blurDataURL}
            fill
            className="overflow-clip rounded-2xl border-8 border-black drop-shadow-2xl"
          />
        </div>

        <div className="absolute h-full w-[calc(1/1.75*100%)] translate-x-3/4">
          <Image
            src={mockups[1]}
            alt="Mockups"
            placeholder="blur"
            sizes="300px"
            blurDataURL={mockups[1].blurDataURL}
            fill
            className="overflow-clip rounded-2xl border-8 border-black drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}
