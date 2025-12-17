import { MetadataRoute } from 'next'
import { getBlogPosts } from '@/lib/blog-service'
import { getClasses } from '@/lib/class-service'
import { seoConfig } from '@/lib/seo-config'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = seoConfig.url
  
  // Get all blog posts
  const posts = await getBlogPosts()
  
  // Get all classes
  const classes = await getClasses()
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/timetable`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ]
  
  // Dynamic blog post pages
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug.current}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  // Dynamic class pages
  const classPages = classes.map((pilatesClass) => ({
    url: `${baseUrl}/services/${pilatesClass.slug.current}`,
    lastModified: new Date(), // Sanity doesn't always give updated at, so we use current date or could fetch _updatedAt
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))
  
  return [...staticPages, ...blogPages, ...classPages]
} 