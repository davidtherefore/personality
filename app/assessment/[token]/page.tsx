"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"
import { useParams, useRouter } from "next/navigation"

interface Question {
  id: string
  text: string
  type: "multiple_choice" | "likert"
  options: string[]
  category: string
}

const sampleQuestions: Question[] = [
  {
    id: "1",
    text: "How would you rate your current job satisfaction?",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "Job Satisfaction",
  },
  {
    id: "2",
    text: "Which best describes your preferred work environment?",
    type: "multiple_choice",
    options: ["Remote", "Office", "Hybrid", "Flexible"],
    category: "Work Preferences",
  },
  {
    id: "3",
    text: "I feel confident in my ability to lead a team",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "Leadership",
  },
  {
    id: "4",
    text: "What motivates you most in your career?",
    type: "multiple_choice",
    options: ["Financial Growth", "Personal Development", "Work-Life Balance", "Recognition", "Impact"],
    category: "Motivation",
  },
  {
    id: "5",
    text: "I am comfortable with taking calculated risks",
    type: "likert",
    options: ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"],
    category: "Risk Taking",
  },
]

export default function AssessmentPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isValidToken, setIsValidToken] = useState(false)
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    // Verify token and get user info
    const verifyToken = async () => {
      try {
        const response = await fetch(`/api/verify-assessment-token`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: params.token }),
        })

        if (response.ok) {
          const data = await response.json()
          setIsValidToken(true)
          setUserEmail(data.email)
        } else {
          toast({
            title: "Invalid Access",
            description: "This assessment link is invalid or has expired.",
            variant: "destructive",
          })
          router.push("/")
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to verify access. Please try again.",
          variant: "destructive",
        })
        router.push("/")
      }
    }

    if (params.token) {
      verifyToken()
    }
  }, [params.token, router, toast])

  const handleAnswer = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }))
  }

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)

    try {
      const response = await fetch("/api/submit-assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: params.token,
          answers,
          email: userEmail,
        }),
      })

      if (response.ok) {
        toast({
          title: "Assessment Submitted!",
          description: "Your report is being generated and will be emailed to you shortly.",
        })
        router.push("/assessment-complete")
      } else {
        throw new Error("Failed to submit assessment")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit assessment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!isValidToken) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Verifying Access...</h1>
          <p className="text-muted-foreground">Please wait while we verify your assessment link.</p>
        </div>
      </div>
    )
  }

  const currentQ = sampleQuestions[currentQuestion]
  const progress = ((currentQuestion + 1) / sampleQuestions.length) * 100
  const isLastQuestion = currentQuestion === sampleQuestions.length - 1
  const hasAnswer = answers[currentQ.id]

  return (
    <div className="min-h-screen bg-muted/50 py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Professional Assessment</h1>
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {sampleQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">{currentQ.text}</CardTitle>
            <CardDescription>Category: {currentQ.category}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <RadioGroup value={answers[currentQ.id] || ""} onValueChange={(value) => handleAnswer(currentQ.id, value)}>
              {currentQ.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem value={option} id={`${currentQ.id}-${index}`} />
                  <Label htmlFor={`${currentQ.id}-${index}`} className="flex-1 cursor-pointer">
                    {option}
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handlePrevious} disabled={currentQuestion === 0}>
                Previous
              </Button>

              {isLastQuestion ? (
                <Button onClick={handleSubmit} disabled={!hasAnswer || isLoading}>
                  {isLoading ? "Submitting..." : "Submit Assessment"}
                </Button>
              ) : (
                <Button onClick={handleNext} disabled={!hasAnswer}>
                  Next
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
