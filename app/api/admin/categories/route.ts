import { type NextRequest, NextResponse } from "next/server"

const mockCategories = [
  { id: "1", name: "Leadership" },
  { id: "2", name: "Assessment" },
  { id: "3", name: "Workplace Psychology" },
  { id: "4", name: "Technology" },
  { id: "5", name: "Research" },
  { id: "6", name: "Professional Development" },
  { id: "7", name: "Team Dynamics" },
  { id: "8", name: "Neuroscience" },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockCategories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    return NextResponse.json({ message: "Failed to fetch categories" }, { status: 500 })
  }
}
