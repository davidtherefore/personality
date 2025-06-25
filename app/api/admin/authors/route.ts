import { type NextRequest, NextResponse } from "next/server"

const mockAuthors = [
  { id: "1", name: "Dr. Sarah Chen" },
  { id: "2", name: "Michael Rodriguez" },
  { id: "3", name: "Dr. Amanda Foster" },
  { id: "4", name: "Dr. James Liu" },
  { id: "5", name: "Dr. Patricia Williams" },
  { id: "6", name: "Dr. Kevin Zhang" },
  { id: "7", name: "Dr. Rachel Thompson" },
  { id: "8", name: "Dr. Marcus Johnson" },
  { id: "9", name: "Dr. Elena Rodriguez" },
]

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(mockAuthors)
  } catch (error) {
    console.error("Error fetching authors:", error)
    return NextResponse.json({ message: "Failed to fetch authors" }, { status: 500 })
  }
}
