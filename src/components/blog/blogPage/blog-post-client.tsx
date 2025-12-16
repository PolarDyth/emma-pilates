"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, User, Clock, Facebook, Twitter, Linkedin, Link as LinkIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPostWithBody } from "@/lib/types/Blog"
import { PortableText } from "next-sanity"
import { toast } from "sonner"
import { formatDate } from "@/lib/blog-service"
import AnimatedSection from "@/components/ui/animated-section"

interface BlogPostClientProps {
  post: BlogPostWithBody
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = post.title

  const handleShare = (platform: string) => {
    const urls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    }

    if (urls[platform as keyof typeof urls]) {
      window.open(urls[platform as keyof typeof urls], "_blank", "width=600,height=400")
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    toast.success("Copied to clipboard")
  }

  return (
    <div key={`blog-post-${typeof post.slug === 'string' ? post.slug : post.slug.current}`} className="min-h-screen bg-white">
      {/* Back Navigation */}
      <AnimatedSection>
        <div className="container mx-auto px-4 py-6">
          <Button asChild variant="ghost" className="text-gray-600 hover:text-primary">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </AnimatedSection>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-12 max-w-7xl mx-auto">
          {/* Main Content Area */}
          <div className="flex-1 max-w-4xl">
            <AnimatedSection delay={0.1}>
              {/* Category Badge */}
              {post.category && (
                <Badge className="mb-4 bg-primary text-white">
                  {post.category.title}
                </Badge>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-gray-900">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>By {post.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {post.tags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="text-sm px-3 py-1 bg-gray-50 text-gray-700 border-gray-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </AnimatedSection>

            {/* Featured Image */}
            <AnimatedSection delay={0.2}>
              {post.mainImage && (
                <div className="mb-12">
                  <div className="relative aspect-video bg-gray-100 overflow-hidden rounded-lg">
                    <Image
                      src={post.mainImage?.asset?.url || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                </div>
              )}
            </AnimatedSection>

            {/* Article Content */}
            <AnimatedSection delay={0.3}>
              <div className="prose prose-lg max-w-none mb-12
                prose-headings:text-gray-900 prose-headings:font-bold 
                prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
                prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-8 prose-h2:text-primary
                prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6 
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline 
                prose-strong:text-gray-900 prose-strong:font-semibold
                prose-ul:mb-6 prose-li:mb-2
                prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-blue-50 prose-blockquote:p-4 prose-blockquote:italic">
                <PortableText value={post.body} />
              </div>
            </AnimatedSection>

            {/* Share Section */}
            <AnimatedSection delay={0.4}>
              <div className="border-t pt-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Share this article</h3>
                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare("facebook")}
                    className="flex items-center gap-2 hover:bg-blue-50"
                  >
                    <Facebook className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare("twitter")}
                    className="flex items-center gap-2 hover:bg-blue-50"
                  >
                    <Twitter className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShare("linkedin")}
                    className="flex items-center gap-2 hover:bg-blue-50"
                  >
                    <Linkedin className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2 hover:bg-blue-50"
                  >
                    <LinkIcon className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </AnimatedSection>
          </div>

          {/* Sidebar */}
          <div className="w-80 flex-shrink-0 hidden lg:block">
            <div className="sticky top-8 space-y-8">
              {/* Author Card */}
              <AnimatedSection delay={0.2}>
                {post.author && (
                  <Card className="bg-white border">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                          <Image 
                            src={post.author.image?.asset?.url || "/placeholder.svg"} 
                            alt={post.author.name} 
                            width={64}
                            height={64}
                            className="object-cover w-full h-full" 
                          />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                          <p className="text-sm text-gray-600">{post.author.profession || "Elite Pilates Master Trainer"}</p>
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {post.author.bio ? (
                          <PortableText 
                            value={post.author.bio}
                            components={{
                              block: {
                                normal: ({children}) => <span>{children}</span>,
                              },
                              marks: {
                                strong: ({children}) => <strong>{children}</strong>,
                                em: ({children}) => <em>{children}</em>,
                              },
                            }}
                          />
                        ) : (
                          <span>With over 12 years of experience, {post.author.name} is passionate about helping people transform their bodies and minds through Pilates.</span>
                        )}
                      </div>
                      <Button asChild variant="outline" size="sm" className="w-full">
                        <Link href="/about">Learn More About {post.author.name}</Link>
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </AnimatedSection>

              {/* Quick Links */}
              <AnimatedSection delay={0.3}>
                <Card className="bg-white border">
                  <CardContent className="p-6">
                    <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
                    <nav className="space-y-3">
                      <Link href="/services" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                        Our Classes
                      </Link>
                      <Link href="/schedule" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                        Class Schedule
                      </Link>
                      <Link href="/contact" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                        Contact Emma
                      </Link>
                      <Link href="/gallery" className="block text-sm text-gray-600 hover:text-primary transition-colors">
                        Video Gallery
                      </Link>
                    </nav>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
