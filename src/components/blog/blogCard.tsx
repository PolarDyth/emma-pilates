import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BlogPost } from "@/lib/types/Blog"
import { formatDate } from "@/lib/blog-service"

interface BlogCardProps {
  post: BlogPost
}

export default function BlogCard({ post }: BlogCardProps) {
  const imageUrl = post.mainImage?.asset?.url || "/placeholder.svg"
  const slug = typeof post.slug === 'string' ? post.slug : post.slug.current

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group bg-white border h-full">
      <Link href={`/blog/${slug}`}>
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
          <Image
            src={imageUrl}
            alt={post.mainImage?.alt || post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            unoptimized
          />
          
          {post.category && (
            <Badge className="absolute top-6 left-6 bg-primary text-white text-sm px-3 py-1">
              {post.category.title}
            </Badge>
          )}
        </div>
      </Link>

      <CardHeader className="pb-4 pt-6 px-6">
        <Link href={`/blog/${slug}`}>
          <h3 className="text-2xl font-bold line-clamp-2 group-hover:text-primary transition-colors duration-200 leading-tight">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="pt-0 px-6 pb-6">
        <p className="text-gray-600 line-clamp-3 mb-6 leading-relaxed text-lg">{post.excerpt}</p>

        {/* Tags Section */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge 
                key={index} 
                variant="outline" 
                className="text-sm px-3 py-1 bg-gray-50 text-gray-700 border-gray-200"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge 
                variant="outline" 
                className="text-sm px-3 py-1 bg-gray-50 text-gray-700 border-gray-200"
              >
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
          <div className="flex items-center gap-6">
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
        </div>

        <div className="pt-4 border-t border-gray-100">
          <Link href={`/blog/${slug}`} className="inline-flex items-center text-primary hover:text-primary/80 font-semibold text-lg transition-colors">
            Read more →
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
