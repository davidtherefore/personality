import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { blogPosts } from "@/lib/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            AssessmentPro
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/" className="text-muted-foreground hover:text-foreground">
              Home
            </Link>
            <Link href="/blog" className="text-muted-foreground hover:text-foreground">
              Blog
            </Link>
            <Button asChild>
              <Link href="/checkout">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <article className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Back Button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <div className="flex items-center text-muted-foreground mb-6">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <Clock className="h-4 w-4 mr-1" />
            <span>{post.readTime}</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8">
          <Image
            src={post.mainImage.src || "/placeholder.svg"}
            alt={post.mainImage.alt}
            width={800}
            height={400}
            className="w-full h-64 md:h-96 object-cover rounded-lg"
          />
          {post.mainImage.caption && (
            <p className="text-sm text-muted-foreground mt-2 text-center italic">{post.mainImage.caption}</p>
          )}
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.split("\n\n").map((paragraph, index) => {
            if (paragraph.startsWith("# ")) {
              return (
                <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                  {paragraph.slice(2)}
                </h1>
              )
            } else if (paragraph.startsWith("## ")) {
              return (
                <h2 key={index} className="text-2xl font-semibold mt-6 mb-3">
                  {paragraph.slice(3)}
                </h2>
              )
            } else if (paragraph.startsWith("### ")) {
              return (
                <h3 key={index} className="text-xl font-semibold mt-4 mb-2">
                  {paragraph.slice(4)}
                </h3>
              )
            } else if (paragraph.startsWith("**") && paragraph.endsWith("**")) {
              return (
                <h4 key={index} className="text-lg font-semibold mt-3 mb-2">
                  {paragraph.slice(2, -2)}
                </h4>
              )
            } else if (paragraph.startsWith("- ")) {
              const listItems = paragraph.split("\n").filter((line) => line.startsWith("- "))
              return (
                <ul key={index} className="list-disc ml-6 mb-4">
                  {listItems.map((item, itemIndex) => (
                    <li key={itemIndex} className="mb-1">
                      {item.slice(2)}
                    </li>
                  ))}
                </ul>
              )
            } else if (paragraph.trim() === "") {
              return <br key={index} />
            } else {
              return (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              )
            }
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-12 p-6 bg-muted/50 rounded-lg text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Discover Your Professional Strengths?</h3>
          <p className="text-muted-foreground mb-4">
            Take our comprehensive assessment and get a detailed report with personalized insights.
          </p>
          <Button asChild>
            <Link href="/checkout">Start Your Assessment - $19.99 CAD</Link>
          </Button>
        </div>
      </article>
    </div>
  )
}
