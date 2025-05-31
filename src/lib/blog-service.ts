import { client } from "@/sanity/client"
import { BlogPost, BlogPostWithBody, Category } from "@/lib/types/Blog"
import { allBlogPostsQuery, blogPostQuery, allCategoriesQuery, blogPostsByCategoryQuery } from "@/sanity/queries"

// Fetch all blog posts from Sanity
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts: BlogPost[] = await client.fetch(allBlogPostsQuery)
    return posts
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return []
  }
}

// Fetch a single blog post by slug from Sanity
export async function getBlogPostBySlug(slug: string): Promise<BlogPostWithBody | null> {
  try {
    const post: BlogPostWithBody = await client.fetch(blogPostQuery, { slug })
    return post || null
  } catch (error) {
    console.error("Error fetching blog post:", error)
    return null
  }
}

// Fetch all categories from Sanity
export async function getCategories(): Promise<Category[]> {
  try {
    const categories: Category[] = await client.fetch(allCategoriesQuery)
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Fetch blog posts by category
export async function getBlogPostsByCategory(categoryTitle: string): Promise<BlogPost[]> {
  try {
    const posts: BlogPost[] = await client.fetch(blogPostsByCategoryQuery, { category: categoryTitle })
    return posts
  } catch (error) {
    console.error("Error fetching blog posts by category:", error)
    return []
  }
}

// Utility function to format dates
export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
} 