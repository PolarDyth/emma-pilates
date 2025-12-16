import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://emmaspilatesstudio.com'), // Replace with your actual domain
  title: {
    default: "Emma's Pilates Studio | Expert Pilates Instruction for All Ages",
    template: "%s | Emma's Pilates Studio"
  },
  description: "Transform your body and mind with expert Pilates instruction in a welcoming studio environment. Group classes, private sessions, and corporate packages available. Serving ages 30-70 with personalized approach.",
  keywords: ["Pilates", "Pilates Studio", "Group Classes", "Private Sessions", "Fitness", "Wellness", "Core Strength", "Flexibility", "Posture", "Corporate Wellness", "Emma", "Certified Trainer"],
  authors: [{ name: "Emma", url: "https://emmaspilatesstudio.com" }],
  creator: "Emma's Pilates Studio",
  publisher: "Emma's Pilates Studio",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://emmaspilatesstudio.com',
    title: "Emma's Pilates Studio | Expert Pilates Instruction for All Ages",
    description: "Transform your body and mind with expert Pilates instruction. Group classes, private sessions, and corporate packages. 12+ years experience serving ages 30-70.",
    siteName: "Emma's Pilates Studio",
    images: [
      {
        url: '/emma/emma-sunset.jpeg',
        width: 1200,
        height: 630,
        alt: 'Emma performing Pilates exercise at sunset - Expert Pilates Instructor',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Emma's Pilates Studio | Expert Pilates Instruction",
    description: "Transform your body and mind with expert Pilates instruction. Group classes, private sessions, and corporate packages available.",
    images: ['/emma/emma-sunset.jpeg'],
    creator: '@emmaspilates', // Replace with actual Twitter handle
  },
  alternates: {
    canonical: 'https://emmaspilatesstudio.com',
  },
  other: {
    'google-site-verification': 'your-google-verification-code', // Add your verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://emmaspilatesstudio.com" />
      </head>
      <body
        className={`${inter.className} antialiased`}
      >
        <Toaster />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
