"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Brain, Heart, Target, Lightbulb, ChevronLeft, ChevronRight } from "lucide-react"
import { assessmentQuestions, sectionDescriptions, type AssessmentResponse } from "@/lib/assessment-data"

const sectionIcons = {
  thinking: Brain,
  feeling: Heart,
  sensing: Target,
  intuiting: Lightbulb,
}

export default function AssessmentPage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(0)
  const [responses, setResponses] = useState<AssessmentResponse[]>([])
  const [userName, setUserName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const sections = ["thinking", "feeling", "sensing", "intuiting"] as const
  const currentSectionName = sections[currentSection]
  const currentQuestions = assessmentQuestions.filter((q) => q.section === currentSectionName)
  const totalProgress = ((currentSection + 1) / sections.length) * 100

  const getResponse = (questionId: string) => {
    return responses.find((r) => r.questionId === questionId)?.score || 0
  }

  const setResponse = (questionId: string, score: number) => {
    setResponses((prev) => {
      const existing = prev.findIndex((r) => r.questionId === questionId)
      if (existing >= 0) {
        const updated = [...prev]
        updated[existing] = { questionId, score }
        return updated
      }
      return [...prev, { questionId, score }]
    })
  }

  const isSectionComplete = () => {
    return currentQuestions.every((q) => getResponse(q.id) > 0)
  }

  const isAssessmentComplete = () => {
    return assessmentQuestions.every((q) => getResponse(q.id) > 0)
  }

  const handleNext = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentSection > 0) {
      setCurrentSection((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    if (!isAssessmentComplete()) return

    setIsSubmitting(true)

    // Store results in localStorage for the results page
    const assessmentResult = {
      responses,
      userName,
      completionDate: new Date().toISOString(),
    }

    localStorage.setItem("assessmentResult", JSON.stringify(assessmentResult))

    // Navigate to results page
    router.push("/assessment/results")
  }

  const SectionIcon = sectionIcons[currentSectionName]
  const sectionInfo = sectionDescriptions[currentSectionName]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Professional Style Assessment</h1>
          <p className="text-lg text-slate-600 mb-6">
            Discover your unique approach to thinking, decision-making, and problem-solving
          </p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-slate-600 mb-2">
              <span>
                Section {currentSection + 1} of {sections.length}
              </span>
              <span>{Math.round(totalProgress)}% Complete</span>
            </div>
            <Progress value={totalProgress} className="h-3" />
          </div>
        </div>

        {/* User Name Input (only on first section) */}
        {currentSection === 0 && (
          <Card className="mb-6">
            <CardContent className="pt-6">
              <Label htmlFor="userName" className="text-base font-medium">
                Your Name (Optional - for personalized report)
              </Label>
              <Input
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Enter your name"
                className="mt-2"
              />
            </CardContent>
          </Card>
        )}

        {/* Current Section */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className={`p-4 rounded-full bg-${sectionInfo.color}-100`}>
                <SectionIcon className={`h-8 w-8 text-${sectionInfo.color}-600`} />
              </div>
            </div>
            <CardTitle className="text-2xl text-slate-800">{sectionInfo.title}</CardTitle>
            <p className="text-slate-600 mt-2">{sectionInfo.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {currentQuestions.map((question, index) => (
              <div key={question.id} className="p-4 bg-slate-50 rounded-lg">
                <div className="mb-4">
                  <h3 className="font-medium text-slate-800 mb-2">
                    {index + 1}. {question.text}
                  </h3>
                </div>

                <RadioGroup
                  value={getResponse(question.id).toString()}
                  onValueChange={(value) => setResponse(question.id, Number.parseInt(value))}
                  className="flex justify-between"
                >
                  {[1, 2, 3, 4, 5].map((score) => (
                    <div key={score} className="flex flex-col items-center space-y-2">
                      <RadioGroupItem value={score.toString()} id={`${question.id}-${score}`} className="w-5 h-5" />
                      <Label htmlFor={`${question.id}-${score}`} className="text-xs text-center cursor-pointer">
                        {score === 1 && "Strongly\nDisagree"}
                        {score === 2 && "Disagree"}
                        {score === 3 && "Neutral"}
                        {score === 4 && "Agree"}
                        {score === 5 && "Strongly\nAgree"}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentSection === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>

          <div className="flex gap-2">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${index <= currentSection ? "bg-primary-500" : "bg-slate-300"}`}
              />
            ))}
          </div>

          {currentSection < sections.length - 1 ? (
            <Button onClick={handleNext} disabled={!isSectionComplete()} className="flex items-center gap-2">
              Next
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isAssessmentComplete() || isSubmitting}
              className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700"
            >
              {isSubmitting ? "Processing..." : "Complete Assessment"}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
