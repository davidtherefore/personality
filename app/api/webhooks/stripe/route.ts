import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get("stripe-signature")!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const email = session.customer_email || session.metadata?.email

      if (email) {
        // Generate a secure token for the assessment
        const token = generateSecureToken()

        // Store the user and token in database (you would implement this)
        await storeUserAssessmentToken(email, token)

        // Send email with assessment link
        await sendAssessmentEmail(email, token)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

function generateSecureToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

async function storeUserAssessmentToken(email: string, token: string) {
  // In a real app, you would store this in your database
  // For now, we'll just log it
  console.log(`Storing token for ${email}: ${token}`)
}

async function sendAssessmentEmail(email: string, token: string) {
  // In a real app, you would use an email service like Resend, SendGrid, etc.
  // For now, we'll just log it
  console.log(`Sending assessment email to ${email} with token: ${token}`)

  const assessmentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/assessment/${token}`

  // Email content would be sent here
  console.log(`Assessment URL: ${assessmentUrl}`)
}
