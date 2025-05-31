import { client } from "@/sanity/client";
import { getBlogPostBySlug } from "@/lib/blog-service";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/blog/blogPage/blog-post-client";

interface BlogPostPageProps {
  params: { slug: string };
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "blogPost"].slug.current`);
  
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const pageParams = await params;
  const post = await getBlogPostBySlug(pageParams.slug);

  if (!post) {
    notFound();
  }

  return (
    <article>
      <BlogPostClient post={post} />
    </article>
  );
}

// Enable static generation
export const revalidate = 3600; // Revalidate every hour