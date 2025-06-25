import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 })
    }

    // In a real app, you would verify the token against your database
    // For demo purposes, we'll accept any token and return a mock email
    const isValidToken = token.length > 10 // Simple validation for demo

    if (!isValidToken) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 })
    }

    // In a real app, you would fetch the user's email from the database
    const email = "user@example.com" // Mock email for demo

    return NextResponse.json({
      valid: true,
      email: email,
    })
  } catch (error) {
    console.error("Error verifying token:", error)
    return NextResponse.json({ error: "Failed to verify token" }, { status: 500 })
  }
}
