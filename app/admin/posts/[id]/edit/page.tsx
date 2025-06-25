"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Save, Eye, X } from "lucide-react"
import Link from "next/link"

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  status: "draft" | "published" | "archived"
  authorId: string
  categoryId: string
  tags: string[]
  metaDescription: string
  featuredImageUrl: string
  featuredImageAlt: string
  seoTitle: string
  publishedAt: string | null
  readingTime: number
}

interface Author {
  id: string
  name: string
}

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

export default function EditPostPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [authors, setAuthors] = useState<Author[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [availableTags, setAvailableTags] = useState<Tag[]>([])
  const [newTag, setNewTag] = useState("")

  const [post, setPost] = useState<BlogPost>({
    id: "",
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    status: "draft",
    authorId: "",
    categoryId: "",
    tags: [],
    metaDescription: "",
    featuredImageUrl: "",
    featuredImageAlt: "",
    seoTitle: "",
    publishedAt: null,
    readingTime: 0,
  })

  useEffect(() => {
    if (params.id) {
      fetchPostData()
      fetchMetadata()
    }
  }, [params.id])

  const fetchPostData = async () => {
    try {
      const response = await fetch(`/api/admin/posts/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setPost(data)
      } else {
        toast({
          title: "Error",
          description: "Failed to load post",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load post",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchMetadata = async () => {
    try {
      const [authorsRes, categoriesRes, tagsRes] = await Promise.all([
        fetch("/api/admin/authors"),
        fetch("/api/admin/categories"),
        fetch("/api/admin/tags"),
      ])

      if (authorsRes.ok) setAuthors(await authorsRes.json())
      if (categoriesRes.ok) setCategories(await categoriesRes.json())
      if (tagsRes.ok) setAvailableTags(await tagsRes.json())
    } catch (error) {
      console.error("Failed to fetch metadata:", error)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim()
  }

  const calculateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.ceil(wordCount / wordsPerMinute)
  }

  const handleTitleChange = (title: string) => {
    setPost((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
      seoTitle: title.length > 60 ? title.substring(0, 60) : title,
    }))
  }

  const handleContentChange = (content: string) => {
    setPost((prev) => ({
      ...prev,
      content,
      readingTime: calculateReadingTime(content),
    }))
  }

  const handleAddTag = () => {
    if (newTag && !post.tags.includes(newTag)) {
      setPost((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag],
      }))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setPost((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSave = async (newStatus?: "draft" | "published") => {
    setIsSaving(true)

    try {
      const postData = {
        ...post,
        status: newStatus || post.status,
        publishedAt: newStatus === "published" && !post.publishedAt ? new Date().toISOString() : post.publishedAt,
      }

      const response = await fetch(`/api/admin/posts/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      })

      if (response.ok) {
        toast({
          title: "Success",
          description: `Post ${newStatus === "published" ? "published" : "saved"} successfully`,
        })

        if (newStatus) {
          setPost((prev) => ({ ...prev, status: newStatus }))
        }
      } else {
        throw new Error("Failed to save post")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-muted/50">
      {/* Header */}
      <div className="border-b bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/admin/dashboard">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Edit Post</h1>
                <p className="text-muted-foreground">
                  Status: <Badge variant={post.status === "published" ? "default" : "secondary"}>{post.status}</Badge>
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" asChild>
                <Link href={`/blog/${post.slug}`} target="_blank">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Link>
              </Button>
              <Button variant="outline" onClick={() => handleSave()} disabled={isSaving}>
                <Save className="h-4 w-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={() => handleSave("published")} disabled={isSaving}>
                {post.status === "published" ? "Update" : "Publish"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Post Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={post.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="Enter post title..."
                  />
                </div>

                <div>
                  <Label htmlFor="slug">Slug</Label>
                  <Input
                    id="slug"
                    value={post.slug}
                    onChange={(e) => setPost((prev) => ({ ...prev, slug: e.target.value }))}
                    placeholder="post-url-slug"
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={post.excerpt}
                    onChange={(e) => setPost((prev) => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the post..."
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    value={post.content}
                    onChange={(e) => handleContentChange(e.target.value)}
                    placeholder="Write your post content in Markdown..."
                    rows={20}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground mt-1">Estimated reading time: {post.readingTime} min</p>
                </div>
              </CardContent>
            </Card>

            {/* SEO Settings */}
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your post for search engines</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={post.seoTitle}
                    onChange={(e) => setPost((prev) => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimized title..."
                    maxLength={60}
                  />
                  <p className="text-sm text-muted-foreground">{post.seoTitle.length}/60 characters</p>
                </div>

                <div>
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea
                    id="metaDescription"
                    value={post.metaDescription}
                    onChange={(e) => setPost((prev) => ({ ...prev, metaDescription: e.target.value }))}
                    placeholder="Brief description for search results..."
                    rows={3}
                    maxLength={160}
                  />
                  <p className="text-sm text-muted-foreground">{post.metaDescription.length}/160 characters</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Post Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Post Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="author">Author</Label>
                  <Select
                    value={post.authorId}
                    onValueChange={(value) => setPost((prev) => ({ ...prev, authorId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select author" />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((author) => (
                        <SelectItem key={author.id} value={author.id}>
                          {author.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={post.categoryId}
                    onValueChange={(value) => setPost((prev) => ({ ...prev, categoryId: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={post.status}
                    onValueChange={(value: "draft" | "published" | "archived") =>
                      setPost((prev) => ({ ...prev, status: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Input
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add tag..."
                    onKeyPress={(e) => e.key === "Enter" && handleAddTag()}
                  />
                  <Button size="sm" onClick={handleAddTag}>
                    Add
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  <p>Popular tags:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {availableTags.slice(0, 6).map((tag) => (
                      <Badge
                        key={tag.id}
                        variant="outline"
                        className="cursor-pointer text-xs"
                        onClick={() => {
                          if (!post.tags.includes(tag.name)) {
                            setPost((prev) => ({
                              ...prev,
                              tags: [...prev.tags, tag.name],
                            }))
                          }
                        }}
                      >
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Featured Image */}
            <Card>
              <CardHeader>
                <CardTitle>Featured Image</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="featuredImage">Image URL</Label>
                  <Input
                    id="featuredImage"
                    value={post.featuredImageUrl}
                    onChange={(e) => setPost((prev) => ({ ...prev, featuredImageUrl: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <Label htmlFor="imageAlt">Alt Text</Label>
                  <Input
                    id="imageAlt"
                    value={post.featuredImageAlt}
                    onChange={(e) => setPost((prev) => ({ ...prev, featuredImageAlt: e.target.value }))}
                    placeholder="Describe the image..."
                  />
                </div>

                {post.featuredImageUrl && (
                  <div className="mt-2">
                    <img
                      src={post.featuredImageUrl || "/placeholder.svg"}
                      alt={post.featuredImageAlt}
                      className="w-full h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
