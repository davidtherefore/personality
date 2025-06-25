import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

import { blogPosts } from "@/lib/blog-data"

export default function BlogPage() {
  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = blogPosts.filter((post) => !post.featured)

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
            <Link href="#" className="font-semibold">
              Blog
            </Link>
            <Button asChild>
              <Link href="/checkout">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Professional Development Blog</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and strategies for advancing your professional career
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-12">
            <Badge className="mb-4">Featured Article</Badge>
            <Card className="overflow-hidden">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <Image
                    src={featuredPost.mainImage.src || "/placeholder.svg"}
                    alt={featuredPost.mainImage.alt}
                    width={400}
                    height={300}
                    className="w-full h-48 md:h-full object-cover"
                  />
                </div>
                <div className="md:w-2/3 p-6">
                  <CardHeader className="p-0 mb-4">
                    <div className="flex flex-wrap gap-2 mb-2">
                      {featuredPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl mb-2">{featuredPost.title}</CardTitle>
                    <CardDescription className="text-base">{featuredPost.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex items-center text-sm text-muted-foreground mb-4">
                      <span>{featuredPost.author}</span>
                      <span className="mx-2">•</span>
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{new Date(featuredPost.publishedAt).toLocaleDateString()}</span>
                      <span className="mx-2">•</span>
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{featuredPost.readTime}</span>
                    </div>
                    <Button asChild>
                      <Link href={`/blog/${featuredPost.slug}`}>
                        Read Article <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <Image
                src={post.mainImage.src || "/placeholder.svg"}
                alt={post.mainImage.alt}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <CardHeader>
                <div className="flex flex-wrap gap-2 mb-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <span className="truncate">{post.author}</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{post.readTime}</span>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/${post.slug}`}>
                    Read More <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
