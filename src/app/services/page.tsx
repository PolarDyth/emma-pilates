import { Metadata } from "next";
import ServicesClientPage from "@/components/services/services-client-page";
import { getClasses } from "@/lib/class-service";

export const metadata: Metadata = {
  title: "Pilates Classes & Services | Emma's Pilates Studio",
  description: "Explore our range of Pilates classes for all levels. From beginner mat classes to advanced reformer sessions, find the perfect class to transform your body and mind.",
  keywords: ["Pilates classes", "Pilates services", "beginner Pilates", "intermediate Pilates", "advanced Pilates", "mat Pilates", "reformer Pilates", "group classes", "private sessions"],
  openGraph: {
    title: "Pilates Classes & Services | Emma's Pilates Studio",
    description: "Discover our range of Pilates classes for every body and fitness level. Transform your health with expert instruction.",
    images: [
      {
        url: "/pilates/group-standing-up.jpeg",
        width: 1200,
        height: 630,
        alt: "Pilates group class - Professional Pilates instruction",
      },
    ],
  },
  twitter: {
    title: "Pilates Classes & Services | Emma's Pilates Studio",
    description: "Discover our range of Pilates classes for every body and fitness level.",
    images: ["/pilates/group-standing-up.jpeg"],
  },
};

export default async function ServicesPage() {
  // Fetch all classes at build time
  const classes = await getClasses();

  return <ServicesClientPage classes={classes} />;
}

// Enable static generation
export const revalidate = 3600; // Revalidate every hour

