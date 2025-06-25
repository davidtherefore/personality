"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Code } from "lucide-react"

interface MarkdownPreviewProps {
  content: string
  title?: string
}

export function MarkdownPreview({ content, title }: MarkdownPreviewProps) {
  const [showPreview, setShowPreview] = useState(false)

  const renderMarkdown = (markdown: string) => {
    // Simple markdown to HTML conversion
    // In production, you'd use a proper markdown parser like remark or marked
    return markdown
      .split("\n")
      .map((line, index) => {
        if (line.startsWith("# ")) {
          return `<h1 key="${index}" class="text-3xl font-bold mt-8 mb-4">${line.slice(2)}</h1>`
        } else if (line.startsWith("## ")) {
          return `<h2 key="${index}" class="text-2xl font-semibold mt-6 mb-3">${line.slice(3)}</h2>`
        } else if (line.startsWith("### ")) {
          return `<h3 key="${index}" class="text-xl font-semibold mt-4 mb-2">${line.slice(4)}</h3>`
        } else if (line.startsWith("- ")) {
          return `<li key="${index}" class="ml-4">${line.slice(2)}</li>`
        } else if (line.trim() === "") {
          return `<br key="${index}" />`
        } else {
          return `<p key="${index}" class="mb-4 leading-relaxed">${line}</p>`
        }
      })
      .join("")
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title || "Preview"}</CardTitle>
          <Button variant="outline" size="sm" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? (
              <>
                <Code className="h-4 w-4 mr-2" />
                Show Markdown
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Preview
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {showPreview ? (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }} />
        ) : (
          <pre className="whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded">{content}</pre>
        )}
      </CardContent>
    </Card>
  )
}
