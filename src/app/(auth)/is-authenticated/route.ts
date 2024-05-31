import { NextResponse } from "next/server"

import { withUser } from "@/lib/auth/helpers"

export async function GET(_request: Request) {
  try {
    await withUser((_user) => {})

    return NextResponse.json({ authenticated: true })
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}
