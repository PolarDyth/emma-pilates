import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./client-layout";
import { Toaster } from "@/components/ui/sonner";
import LocalBusinessSchema from "@/components/seo/local-business-schema";
import { seoConfig } from "@/lib/seo-config";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.url),
  title: {
    default: seoConfig.defaultTitle,
    template: `%s | ${seoConfig.siteName}`
  },
  description: seoConfig.defaultDescription,
  keywords: seoConfig.keywords,
  authors: [{ name: "Emma", url: seoConfig.url }],
  creator: seoConfig.siteName,
  publisher: seoConfig.siteName,
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
    locale: 'en_GB',
    url: seoConfig.url,
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    siteName: seoConfig.siteName,
    images: [
      {
        url: seoConfig.defaultImages.og,
        width: 1200,
        height: 630,
        alt: `${seoConfig.siteName} - Expert Pilates Instructor`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.defaultTitle,
    description: seoConfig.defaultDescription,
    images: [seoConfig.defaultImages.twitter],
    creator: '@emmaneilsonpilates', 
  },
  alternates: {
    canonical: seoConfig.url,
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
        <link rel="canonical" href={seoConfig.url} />
      </head>
      <body
        className={`${inter.className} antialiased`}
      >
        <LocalBusinessSchema />
        <Toaster />
        <Analytics />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
