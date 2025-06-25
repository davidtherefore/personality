"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

export default function CheckoutPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const { url } = await response.json()

      if (url) {
        window.location.href = url
      } else {
        throw new Error("Failed to create checkout session")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to start checkout. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-muted/50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Complete Your Purchase</CardTitle>
            <CardDescription>You're about to purchase the Professional Assessment for $19.99 CAD</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Summary */}
            <div className="border rounded-lg p-4 bg-muted/50">
              <h3 className="font-semibold mb-3">Order Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span>Professional Assessment</span>
                <span>$19.99 CAD</span>
              </div>
              <div className="border-t pt-2 flex justify-between items-center font-semibold">
                <span>Total</span>
                <span>$19.99 CAD</span>
              </div>
            </div>

            {/* What's Included */}
            <div className="space-y-3">
              <h3 className="font-semibold">What's Included:</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Comprehensive 50-question assessment
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Detailed PDF report with charts and analysis
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Personalized career recommendations
                </li>
                <li className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Secure email delivery of assessment link
                </li>
              </ul>
            </div>

            {/* Checkout Form */}
            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  We'll send your assessment link to this email address
                </p>
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : "Proceed to Payment"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              <p>Secure payment powered by Stripe</p>
              <p>30-day money-back guarantee</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
