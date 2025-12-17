import { Metadata } from "next";
import AboutHome from "@/components/home/about";
import Contact from "@/components/home/contact";
import Hero from "@/components/home/hero";
import Pilates from "@/components/home/pilates";
import Services from "@/components/home/services";
import Testimonials from "@/components/home/testimonials";
import Timetable from "@/components/home/timetable";
import AnimatedSection from "@/components/ui/animated-section";
import { getClasses } from "@/lib/class-service";
import { getSchedules } from "@/lib/schedule-service";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Emma's Pilates Studio - Transform your body and mind with expert Pilates instruction. Offering group classes, private sessions, and corporate wellness programs for all ages and abilities.",
  keywords: ["Pilates classes", "Pilates studio", "fitness", "wellness", "core strength", "flexibility", "posture improvement", "group classes", "private training"],
  openGraph: {
    title: "Emma's Pilates Studio | Transform Your Body & Mind",
    description: "Expert Pilates instruction with 12+ years experience. Small group classes, private sessions, and corporate wellness programs. Perfect for ages 30-70.",
    images: [
      {
        url: "/emma/emma-sunset.jpeg",
        width: 1200,
        height: 630,
        alt: "Emma performing Pilates exercise at sunset - Expert Pilates instruction",
      },
    ],
  },
  twitter: {
    title: "Emma's Pilates Studio | Transform Your Body & Mind",
    description: "Expert Pilates instruction with 12+ years experience. Small group classes, private sessions, and corporate wellness programs.",
    images: ["/emma/emma-sunset.jpeg"],
  },
};

export default async function Page() {
  // Fetch the first 3 classes for the homepage
  const allClasses = await getClasses();
  const featuredClasses = allClasses.slice(0, 3);
  
  // Fetch schedules for the timetable
  const schedules = await getSchedules();

  return (
    <div className="flex min-h-screen flex-col">
      <Hero />
      <AnimatedSection delay={0.1}>
        <AboutHome />
      </AnimatedSection>
      <Pilates />
      <AnimatedSection delay={0.1}>
        <Services classes={featuredClasses} />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Timetable schedules={schedules} />
      </AnimatedSection>
      <AnimatedSection delay={0.1}>
        <Contact />
      </AnimatedSection>
      <AnimatedSection delay={0.2}>
        <Testimonials />
      </AnimatedSection>
    </div>
  );
}

// Enable static generation with revalidation
export const revalidate = 3600; // Revalidate every hour
