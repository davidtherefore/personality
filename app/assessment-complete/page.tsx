import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle, Mail, FileText } from "lucide-react"
import Link from "next/link"

export default function AssessmentCompletePage() {
  return (
    <div className="min-h-screen bg-muted/50 py-12 px-4">
      <div className="container mx-auto max-w-2xl">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Assessment Complete!</CardTitle>
            <CardDescription>Thank you for completing the Professional Assessment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 text-center">
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3">
                <FileText className="h-5 w-5 text-primary" />
                <span>Your detailed report is being generated</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Mail className="h-5 w-5 text-primary" />
                <span>You'll receive it via email within 5 minutes</span>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-6">
              <h3 className="font-semibold mb-2">What's in your report:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Comprehensive analysis of your responses</li>
                <li>• Visual charts and graphs</li>
                <li>• Personalized career recommendations</li>
                <li>• Strengths and development areas</li>
                <li>• Action plan for professional growth</li>
              </ul>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive your email? Check your spam folder or contact support.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/">Return to Home</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/blog">Read Our Blog</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
