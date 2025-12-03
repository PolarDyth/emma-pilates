import { Metadata } from "next";
import { client } from "@/sanity/client";
import { getClassBySlug } from "@/lib/class-service";
import { notFound } from "next/navigation";
import ClassDetailClient from "@/components/services/class-detail-client";
import { getLevelDisplay } from "@/lib/types/Class";

interface ClassPageProps {
  params: Promise<{ slug: string }>;
}

// Generate dynamic metadata for each class
export async function generateMetadata({ params }: ClassPageProps): Promise<Metadata> {
  const pageParams = await params;
  const pilatesClass = await getClassBySlug(pageParams.slug);

  if (!pilatesClass) {
    return {
      title: "Class Not Found",
      description: "The requested Pilates class could not be found.",
    };
  }

  const description = pilatesClass.description 
    || `${pilatesClass.title} - ${getLevelDisplay(pilatesClass.level)} level Pilates class at Emma's Pilates Studio. Duration: ${pilatesClass.duration} minutes.`;

  return {
    title: `${pilatesClass.title} | Pilates Classes`,
    description,
    keywords: [
      pilatesClass.title,
      "Pilates class",
      getLevelDisplay(pilatesClass.level),
      pilatesClass.category?.title || "Pilates",
      ...(pilatesClass.benefits || []),
    ],
    openGraph: {
      title: `${pilatesClass.title} | Emma's Pilates Studio`,
      description,
      type: "website",
      url: `https://emmaspilatesstudio.com/services/${pageParams.slug}`,
      images: pilatesClass.image ? [
        {
          url: pilatesClass.image.asset.url,
          width: 1200,
          height: 630,
          alt: pilatesClass.image.alt || pilatesClass.title,
        },
      ] : [
        {
          url: "/pilates/group-standing-up.jpeg",
          width: 1200,
          height: 630,
          alt: `${pilatesClass.title} - Pilates class at Emma's Studio`,
        },
      ],
    },
    twitter: {
      title: `${pilatesClass.title} | Emma's Pilates Studio`,
      description,
      images: pilatesClass.image ? [pilatesClass.image.asset.url] : ["/pilates/group-standing-up.jpeg"],
    },
    alternates: {
      canonical: `https://emmaspilatesstudio.com/services/${pageParams.slug}`,
    },
  };
}

// Generate static paths for all classes
export async function generateStaticParams() {
  const slugs = await client.fetch(`*[_type == "class"].slug.current`);
  
  return slugs.map((slug: string) => ({
    slug,
  }));
}

export default async function ClassPage({ params }: ClassPageProps) {
  const pageParams = await params;
  const pilatesClass = await getClassBySlug(pageParams.slug);

  if (!pilatesClass) {
    notFound();
  }

  return <ClassDetailClient pilatesClass={pilatesClass} />;
}

// Enable static generation
export const revalidate = 3600; // Revalidate every hour

