import { NextResponse } from "next/server"

import { AuthService } from "@/lib/infrastructure/services"

export async function GET(request: Request) {
  const sessionId = AuthService.readSessionCookie(
    request.headers.get("cookie") || ""
  )
  const isAuthenticated =
    sessionId && !!(await AuthService.validateSession(sessionId)).user
  return NextResponse.json({}, { status: isAuthenticated ? 200 : 401 })
}
