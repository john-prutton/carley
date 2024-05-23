import { NextRequest, NextResponse } from "next/server"

export default async function Middleware(request: NextRequest) {
  const redirectUrl = request.url

  const isAuthenticated = (
    await fetch(new URL("/auth/is-authenticated", redirectUrl), {
      headers: {
        cookie: request.headers.get("cookie") || ""
      }
    })
  ).ok

  if (isAuthenticated) return

  return NextResponse.redirect(
    new URL(
      "/auth?" + new URLSearchParams({ redirect: redirectUrl }).toString(),
      redirectUrl
    )
  )
}

export const config = {
  matcher: ["/home/:path*"]
}
