import { type NextRequest, NextResponse } from "next/server"

const mockTags = [
  { id: "1", name: "Neuroscience" },
  { id: "2", name: "AI" },
  { id: "3", name: "Remote Work" },
  { id: "4", name: "Emotional Intelligence" },
  { id: "5", name: "Team Dynamics" },
  { id: "6", name: "Stress Management" },
  { id: "7", name: "Decision Making" },
  { id: "8", name: "Professional Development" },
  { id: "9", name: "Leadership Assessment" },
  { id: "10", name: "Workplace Trends" },
  { id: "11", name: "Psychology" },
  { id: "12", name: "Innovation" },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockTags)
  } catch (error) {
    console.error("Error fetching tags:", error)
    return NextResponse.json({ message: "Failed to fetch tags" }, { status: 500 })
  }
}
