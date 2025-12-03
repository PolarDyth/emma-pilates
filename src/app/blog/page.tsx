import { Metadata } from "next";
import BlogPageClient from "@/components/blog/blogClientPage";
import { getBlogPosts, getCategories } from "@/lib/blog-service";

export const metadata: Metadata = {
  title: "Pilates Blog & Wellness Tips",
  description: "Expert Pilates insights, wellness tips, and fitness guidance from Emma's Pilates Studio. Discover beginner techniques, advanced practices, and health benefits of Pilates training.",
  keywords: ["Pilates blog", "Pilates tips", "wellness advice", "fitness guidance", "Pilates techniques", "core strength", "flexibility training", "posture improvement", "Pilates benefits"],
  openGraph: {
    title: "Pilates Blog & Wellness Tips | Emma's Pilates Studio",
    description: "Expert Pilates insights and wellness tips. Learn techniques, discover benefits, and get professional guidance for your Pilates journey.",
    images: [
      {
        url: "/pilates/group-standing-up.jpeg",
        width: 1200,
        height: 630,
        alt: "Pilates group class - Professional Pilates instruction and guidance",
      },
    ],
  },
  twitter: {
    title: "Pilates Blog & Wellness Tips | Emma's Pilates Studio",
    description: "Expert Pilates insights and wellness tips. Learn techniques, discover benefits, and get professional guidance.",
    images: ["/pilates/group-standing-up.jpeg"],
  },
};

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