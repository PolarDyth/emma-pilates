import { Metadata } from "next";
import ServicesClientPage from "@/components/services/services-client-page";
import { getClasses } from "@/lib/class-service";
import { generateSEOMetadata } from "@/lib/seo-config";

export const metadata: Metadata = generateSEOMetadata({
  title: "Pilates Classes & Services",
  description: "Explore our range of Pilates classes for all levels. From beginner mat classes to advanced reformer sessions, find the perfect class to transform your body and mind.",
  keywords: ["Pilates classes", "Pilates services", "beginner Pilates", "intermediate Pilates", "advanced Pilates", "mat Pilates", "reformer Pilates", "group classes", "private sessions"],
  image: "/pilates/group-standing-up.jpeg",
  path: "/services",
});

export default async function ServicesPage() {
  // Fetch all classes at build time
  const classes = await getClasses();

  return <ServicesClientPage classes={classes} />;
}

// Enable static generation
export const revalidate = 3600; // Revalidate every hour

