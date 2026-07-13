import { cookies } from "next/headers"

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "Awoken.in@2026"
const COOKIE_NAME = "awoken_admin_session"
const SESSION_DURATION = 60 * 60 * 24 // 24 hours

export function verifyAdmin(password: string): boolean {
  return password === ADMIN_PASSWORD
}

export async function createSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(COOKIE_NAME, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_DURATION,
    path: "/admin",
  })
}

export async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get(COOKIE_NAME)?.value === "authenticated"
}

export async function destroySession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(COOKIE_NAME)
}
