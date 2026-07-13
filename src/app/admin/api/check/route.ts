import { NextResponse } from "next/server"
import { checkSession } from "@/lib/admin/auth"

export async function GET() {
  const authenticated = await checkSession()
  if (!authenticated) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
  return NextResponse.json({ authenticated: true })
}
