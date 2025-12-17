import { Metadata } from "next";
import BlogPageClient from "@/components/blog/blogClientPage";
import { getBlogPosts, getCategories } from "@/lib/blog-service";
import { generateSEOMetadata } from "@/lib/seo-config";

export const metadata: Metadata = generateSEOMetadata({
  title: "Pilates Blog & Wellness Tips",
  description: "Expert Pilates insights, wellness tips, and fitness guidance from Emma's Pilates Studio. Discover beginner techniques, advanced practices, and health benefits of Pilates training.",
  keywords: ["Pilates blog", "Pilates tips", "wellness advice", "fitness guidance", "Pilates techniques", "core strength", "flexibility training", "posture improvement", "Pilates benefits"],
  image: "/pilates/group-standing-up.jpeg",
  path: "/blog",
});

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