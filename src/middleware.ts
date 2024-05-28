import { NextRequest, NextResponse } from "next/server"

import { urlFromBase } from "./lib/utils"

export default async function Middleware(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const currentPath = requestUrl.pathname + requestUrl.search

  const isAuthenticated = (
    await fetch(urlFromBase("/auth/is-authenticated"), {
      headers: {
        cookie: request.headers.get("cookie") || ""
      }
    })
  ).ok

  if (isAuthenticated) return

  return NextResponse.redirect(
    urlFromBase(
      "/auth?" +
        new URLSearchParams({
          redirect: urlFromBase(currentPath).toString()
        }).toString()
    )
  )
}

export const config = {
  matcher: ["/home/:path*"]
}
