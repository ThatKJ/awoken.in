import { NextResponse } from "next/server"
import { verifyAdmin, createSession } from "@/lib/admin/auth"

export async function POST(request: Request) {
  try {
    const { password } = await request.json()

    if (!password || !verifyAdmin(password)) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 })
    }

    await createSession()
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 })
  }
}
