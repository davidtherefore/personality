"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Brain, Heart, Target, Lightbulb, Download, RotateCcw } from "lucide-react"
import {
  assessmentQuestions,
  sectionDescriptions,
  type AssessmentResult,
  type SectionScore,
} from "@/lib/assessment-data"
import Link from "next/link"

const sectionIcons = {
  thinking: Brain,
  feeling: Heart,
  sensing: Target,
  intuiting: Lightbulb,
}

export default function ResultsPage() {
  const [result, setResult] = useState<AssessmentResult | null>(null)
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false)

  useEffect(() => {
    const storedResult = localStorage.getItem("assessmentResult")
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult)
      const processedResult = processAssessmentResult(parsedResult)
      setResult(processedResult)
    }
  }, [])

  const processAssessmentResult = (rawResult: any): AssessmentResult => {
    const sectionTotals = {
      thinking: 0,
      feeling: 0,
      sensing: 0,
      intuiting: 0,
    }

    // Calculate section totals
    rawResult.responses.forEach((response: any) => {
      const question = assessmentQuestions.find((q) => q.id === response.questionId)
      if (question) {
        sectionTotals[question.section] += response.score
      }
    })

    // Calculate percentages and create section scores
    const maxPossibleScore = 75 // 15 questions × 5 points each
    const sectionScores: SectionScore[] = Object.entries(sectionTotals).map(([section, score]) => ({
      section,
      score,
      percentage: Math.round((score / maxPossibleScore) * 100),
    }))

    // Determine dominant style
    const dominantSection = sectionScores.reduce((prev, current) => (prev.score > current.score ? prev : current))

    return {
      ...rawResult,
      sectionScores,
      dominantStyle: dominantSection.section,
    }
  }

  const handleGeneratePDF = async () => {
    if (!result) return

    setIsGeneratingPDF(true)
    try {
      const response = await fetch("/api/generate-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      })

      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.style.display = "none"
        a.href = url
        a.download = `assessment-report-${new Date().toISOString().split("T")[0]}.pdf`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    } catch (error) {
      console.error("Error generating PDF:", error)
    } finally {
      setIsGeneratingPDF(false)
    }
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-slate-600 mb-4">No assessment results found.</p>
            <Link href="/assessment">
              <Button>Take Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  const dominantSectionInfo = sectionDescriptions[result.dominantStyle as keyof typeof sectionDescriptions]
  const DominantIcon = sectionIcons[result.dominantStyle as keyof typeof sectionIcons]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">Your Assessment Results</h1>
          {result.userName && <p className="text-xl text-slate-600 mb-2">Hello, {result.userName}!</p>}
          <p className="text-slate-600">Completed on {new Date(result.completionDate).toLocaleDateString()}</p>
        </div>

        {/* Dominant Style Card */}
        <Card className="mb-8 border-2 border-primary-200 bg-gradient-to-r from-primary-50 to-secondary-50">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className={`p-6 rounded-full bg-${dominantSectionInfo.color}-100`}>
                <DominantIcon className={`h-12 w-12 text-${dominantSectionInfo.color}-600`} />
              </div>
            </div>
            <CardTitle className="text-3xl text-slate-800">Your Dominant Style: {dominantSectionInfo.title}</CardTitle>
            <p className="text-lg text-slate-600 mt-2">{dominantSectionInfo.description}</p>
          </CardHeader>
        </Card>

        {/* Section Scores */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {result.sectionScores.map((sectionScore) => {
            const sectionInfo = sectionDescriptions[sectionScore.section as keyof typeof sectionDescriptions]
            const SectionIcon = sectionIcons[sectionScore.section as keyof typeof sectionIcons]
            const isDominant = sectionScore.section === result.dominantStyle

            return (
              <Card key={sectionScore.section} className={isDominant ? "ring-2 ring-primary-300" : ""}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-full bg-${sectionInfo.color}-100`}>
                      <SectionIcon className={`h-6 w-6 text-${sectionInfo.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{sectionInfo.title}</CardTitle>
                      {isDominant && <span className="text-sm text-primary-600 font-medium">Dominant Style</span>}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Score: {sectionScore.score}/75</span>
                      <span>{sectionScore.percentage}%</span>
                    </div>
                    <Progress value={sectionScore.percentage} className="h-3" />
                    <p className="text-sm text-slate-600">{sectionInfo.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Interpretation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Your Style Interpretation</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">What This Means for You:</h3>
              <p className="text-slate-700 leading-relaxed">
                As someone with a dominant {dominantSectionInfo.title.toLowerCase()} style, you naturally approach
                challenges and decisions through this lens. This means you likely excel in situations that require{" "}
                {dominantSectionInfo.description.toLowerCase()}.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Leveraging Your Strengths:</h3>
              <ul className="list-disc list-inside text-slate-700 space-y-1">
                {result.dominantStyle === "thinking" && (
                  <>
                    <li>Lead analytical projects and data-driven initiatives</li>
                    <li>Serve as the logical voice in team discussions</li>
                    <li>Develop systematic processes and frameworks</li>
                  </>
                )}
                {result.dominantStyle === "feeling" && (
                  <>
                    <li>Champion team building and collaborative initiatives</li>
                    <li>Mediate conflicts and build consensus</li>
                    <li>Focus on employee development and engagement</li>
                  </>
                )}
                {result.dominantStyle === "sensing" && (
                  <>
                    <li>Excel in project management and execution</li>
                    <li>Ensure quality control and attention to detail</li>
                    <li>Implement practical solutions to immediate problems</li>
                  </>
                )}
                {result.dominantStyle === "intuiting" && (
                  <>
                    <li>Drive innovation and creative problem-solving</li>
                    <li>Lead strategic planning and visioning sessions</li>
                    <li>Identify emerging opportunities and trends</li>
                  </>
                )}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-2">Areas for Development:</h3>
              <p className="text-slate-700">
                Consider developing skills in your lower-scoring areas to become a more well-rounded professional. This
                doesn't mean changing your natural style, but rather expanding your toolkit for different situations.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handleGeneratePDF}
            disabled={isGeneratingPDF}
            className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700"
          >
            <Download className="h-4 w-4" />
            {isGeneratingPDF ? "Generating PDF..." : "Download Full Report"}
          </Button>

          <Link href="/assessment">
            <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
              <RotateCcw className="h-4 w-4" />
              Retake Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
