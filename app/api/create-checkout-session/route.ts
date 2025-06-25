import { type NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) {
    throw new Error("Missing STRIPE_SECRET_KEY environment variable")
  }
  return new Stripe(key, { apiVersion: "2024-06-20" })
}

export async function POST(request: NextRequest) {
  try {
    // Payment functionality is currently disabled. The assessment is now free!
    return NextResponse.json(
      { error: "Payment functionality is currently disabled. The assessment is now free!" },
      { status: 503 },
    )

    const stripe = getStripe()
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "cad",
            product_data: {
              name: "Professional Assessment",
              description: "Comprehensive professional assessment with detailed PDF report",
            },
            unit_amount: 1999, // $19.99 CAD in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout`,
      customer_email: email,
      metadata: {
        email: email,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error("Error creating checkout session:", error)
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 })
  }
}
