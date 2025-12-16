import { Metadata } from "next";
import { client } from "@/sanity/client";
import { getBlogPostBySlug } from "@/lib/blog-service";
import { notFound } from "next/navigation";
import BlogPostClient from "@/components/blog/blogPage/blog-post-client";

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

  const publishedDate = new Date(post.publishedAt).toISOString();

  return {
    title: post.title,
    description: post.excerpt || `${post.title} - Expert Pilates guidance and wellness tips from Emma's Pilates Studio.`,
    keywords: post.tags ? post.tags.join(", ") : ["Pilates", "wellness", "fitness", "health"],
    authors: [{ name: "Emma", url: "https://emmaspilatesstudio.com" }],
    openGraph: {
      title: post.title,
      description: post.excerpt || `Expert Pilates guidance: ${post.title}`,
      type: "article",
      url: `https://emmaspilatesstudio.com/blog/${pageParams.slug}`,
      images: post.mainImage ? [
        {
          url: post.mainImage.asset.url,
          width: 1200,
          height: 630,
          alt: post.mainImage.alt || post.title,
        },
      ] : [
        {
          url: "/pilates/group-standing-up.jpeg",
          width: 1200,
          height: 630,
          alt: `${post.title} - Pilates guidance from Emma's Studio`,
        },
      ],
      publishedTime: publishedDate,
      section: post.category?.title || "Pilates",
      tags: post.tags || ["Pilates", "Wellness"],
    },
    twitter: {
      title: post.title,
      description: post.excerpt || `Expert Pilates guidance: ${post.title}`,
      images: post.mainImage ? [post.mainImage.asset.url] : ["/pilates/group-standing-up.jpeg"],
    },
    alternates: {
      canonical: `https://emmaspilatesstudio.com/blog/${pageParams.slug}`,
    },
    other: {
      "article:published_time": publishedDate,
      "article:author": "Emma",
      "article:section": post.category?.title || "Pilates",
      "article:tag": post.tags?.join(",") || "Pilates,Wellness",
    },
  };
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