import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { headers } from "next/headers"

/**
 * Lazy Stripe helper – prevents build-time crashes when env vars
 * are unavailable.
 */
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
  }
  return new Stripe(key, { apiVersion: "2024-06-20" })
}

export async function POST(request: NextRequest) {
  // Stripe webhooks are disabled
  return NextResponse.json({ error: "Stripe webhooks are disabled" }, { status: 503 })

  try {
    const stripe = getStripe()

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    if (!webhookSecret) {
      throw new Error("Missing STRIPE_WEBHOOK_SECRET environment variable")
    }

    // Grab raw text & signature
    const body = await request.text()
    const signature = headers().get("stripe-signature")!

    // Verify the event
    let event: Stripe.Event
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error("Webhook signature verification failed:", err)
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
    }

    // Handle the checkout completion
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session
      const email = session.customer_email || session.metadata?.email

      if (email) {
        const token = generateSecureToken()
        await storeUserAssessmentToken(email, token)
        await sendAssessmentEmail(email, token)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 })
  }
}

/* -------------------------------------------------------------------------- */
/*                               Helper functions                             */
/* -------------------------------------------------------------------------- */

function generateSecureToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

async function storeUserAssessmentToken(email: string, token: string) {
  // TODO: Persist to your database
  console.log(`Storing token for ${email}: ${token}`)
}

async function sendAssessmentEmail(email: string, token: string) {
  const assessmentUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/assessment/${token}`
  // TODO: Send real email via your provider
  console.log(`Sending assessment email to ${email}: ${assessmentUrl}`)
}
