import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AssessmentPro - Professional Self-Assessment Platform",
  description:
    "Unlock your professional potential with our comprehensive assessment and detailed PDF report with personalized insights and career recommendations.",
  keywords: ["professional assessment", "career development", "self-assessment", "professional growth"],
  authors: [{ name: "AssessmentPro Team" }],
  openGraph: {
    title: "AssessmentPro - Professional Self-Assessment Platform",
    description: "Unlock your professional potential with our comprehensive assessment and detailed PDF report.",
    type: "website",
    url: "https://assessmentpro.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AssessmentPro - Professional Self-Assessment Platform",
    description: "Unlock your professional potential with our comprehensive assessment.",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
