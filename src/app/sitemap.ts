import { MetadataRoute } from "next"

import { urlFromBase } from "@/lib/utils/url-from-base"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: urlFromBase("/").toString(),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ]
}
