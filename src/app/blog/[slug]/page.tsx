import { Metadata } from "next";
import { client } from "@/sanity/client";
import { getBlogPostBySlug } from "@/lib/blog-service";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/blog/blogPage/blog-post-client";

import { generateSEOMetadata } from "@/lib/seo-config";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const pageParams = await params;
  const post = await getBlogPostBySlug(pageParams.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.excerpt || `${post.title} - Expert Pilates guidance and wellness tips from Emma's Pilates Studio.`,
    keywords: post.tags,
    image: post.mainImage?.asset.url,
    path: `/blog/${pageParams.slug}`,
    type: "article",
  });
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