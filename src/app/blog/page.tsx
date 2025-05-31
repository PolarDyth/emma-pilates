import BlogPageClient from "@/components/blog/blogClientPage";
import { getBlogPosts, getCategories } from "@/lib/blog-service";

export default async function BlogPage() {
  // Fetch all posts and categories at build time
  const [allPosts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories()
  ]);

  return <BlogPageClient initialPosts={allPosts} categories={categories} />;
}

// Enable static generation
export const revalidate = 3600; // Revalidate every hour