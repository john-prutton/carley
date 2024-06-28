import type { MetadataRoute } from "next"

import { urlFromBase } from "@/lib/utils/url-from-base"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: ["/home/", "/auth/"]
      }
    ],
    sitemap: urlFromBase("/sitemap.xml").toString(),
    host: urlFromBase("/").toString()
  }
}
