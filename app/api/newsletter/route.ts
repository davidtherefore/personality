import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // In a real app, you would:
    // 1. Store the email in your database
    // 2. Add to your email marketing service (Mailchimp, ConvertKit, etc.)
    // 3. Send a welcome email

    console.log(`Newsletter signup: ${email}`)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error processing newsletter signup:", error)
    return NextResponse.json({ error: "Failed to process signup" }, { status: 500 })
  }
}
