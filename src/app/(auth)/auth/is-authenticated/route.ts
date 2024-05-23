import { NextResponse } from "next/server"

import { withUser } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    await withUser((user) => {})

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
