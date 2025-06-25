import { type NextRequest, NextResponse } from "next/server"

// Mock data - in production, this would come from your database
const mockPosts = [
  {
    id: "1",
    title: "The Neuroscience Revolution in Leadership Assessment",
    status: "published",
    author: "Dr. Sarah Chen",
    publishedAt: "2025-01-15",
    views: 1250,
    category: "Leadership",
    slug: "neuroscience-leadership-assessment-2025",
  },
  {
    id: "2",
    title: "Personality Assessment in the Workplace: 5 Transformative Trends",
    status: "published",
    author: "Michael Rodriguez",
    publishedAt: "2025-01-12",
    views: 890,
    category: "Assessment",
    slug: "personality-assessment-workplace-trends-2025",
  },
  {
    id: "3",
    title: "Emotional Intelligence as the New Leadership Currency",
    status: "draft",
    author: "Dr. Amanda Foster",
    publishedAt: null,
    views: 0,
    category: "Leadership",
    slug: "emotional-intelligence-leadership-2025",
  },
]

export async function GET(request: NextRequest) {
  try {
    // In production, you would query your database here
    return NextResponse.json(mockPosts)
  } catch (error) {
    console.error("Error fetching posts:", error)
    return NextResponse.json({ message: "Failed to fetch posts" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const postData = await request.json()

    // In production, you would save to your database here
    const newPost = {
      id: Date.now().toString(),
      ...postData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      views: 0,
    }

    console.log("Creating new post:", newPost)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    console.error("Error creating post:", error)
    return NextResponse.json({ message: "Failed to create post" }, { status: 500 })
  }
}
