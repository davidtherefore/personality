"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function PaymentSuccessPage() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to free assessment since payment is disabled
    router.push("/assessment")
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Assessment is Now Free!</h1>
        <p className="text-muted-foreground">Redirecting you to the assessment...</p>
      </div>
    </div>
  )
}
