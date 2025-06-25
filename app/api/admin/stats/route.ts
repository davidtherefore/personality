import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    // In production, you would calculate these from your database
    const stats = {
      totalPosts: 15,
      publishedPosts: 10,
      draftPosts: 5,
      totalViews: 25430,
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error("Error fetching stats:", error)
    return NextResponse.json({ message: "Failed to fetch stats" }, { status: 500 })
  }
}
