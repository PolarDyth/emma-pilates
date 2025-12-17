export const seoConfig = {
  // Base site configuration
  domain: "emmaneilsonpilates.co.uk",
  url: "https://www.emmaneilsonpilates.co.uk/",
  siteName: "Emma's Neilson Pilates",

  // Default metadata
  defaultTitle:
    "Emma's Neilson Pilates | Expert Pilates Instruction for All Ages",
  defaultDescription:
    "Transform your body and mind with expert Pilates instruction in a welcoming studio environment. Group classes, private sessions, and corporate packages available. Serving ages 30-70 with personalized approach.",

  // Keywords
  keywords: [
    "Pilates",
    "Pilates Studio",
    "Group Classes",
    "Private Sessions",
    "Fitness",
    "Wellness",
    "Core Strength",
    "Flexibility",
    "Posture",
    "Corporate Wellness",
    "Emma",
    "Certified Trainer",
    "Elite Trainer",
    "Pilates Instruction",
    "Mind-Body",
    "Rehabilitation",
    "Strength Training",
  ],

  // Social media
  social: {
    facebook: "https://www.facebook.com/emmaneilsonpilates",
    instagram: "https://www.instagram.com/emmaneilsonpilates",
  },

  // Business info
  business: {
    name: "Emma's Neilson Pilates",
    phone: "+44 07789993890", // Add actual phone
    email: "emmaneilsonpilates@pm.me", // Add actual email
    foundingDate: "2020",
    locations: [
      {
        name: "Shoreline Studio",
        address: {
          street: "Bath Street",
          city: "Edinburgh",
          state: "Scotland",
          zip: "EH15 1HD",
          country: "GB",
        },
        geo: {
          latitude: "55.95439660023002",
          longitude: "-3.1115291633370674",
        },
      },
      {
        name: "Portobello Health Hub",
        address: {
          street: "95 Portobello High Street",
          city: "Edinburgh",
          state: "Scotland",
          zip: "EH15 1AW",
          country: "GB",
        },
        geo: {
          latitude: "55.954210875683025",
          longitude: "-3.1166643669509617",
        },
      },
      {
        name: "Kin Collective",
        address: {
          street: "4 Duncan Place",
          city: "Edinburgh",
          state: "Scotland",
          zip: "EH6 8HW",
          country: "GB",
        },
        geo: {
          latitude: "55.97011542744716",
          longitude: "-3.1682072744827345",
        },
      },
    ],
    hours: ["Tu 14:30-19:30", "We 13:00-14:30", "Th 17:00-20:30"],
    priceRange: "$$",
  },

  // Default images
  defaultImages: {
    og: "/emma/emma-sunset.jpeg",
    twitter: "/emma/emma-sunset.jpeg",
    logo: "/emma/emma-sunset.jpeg",
  },
};

// Helper function to generate metadata
export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  path = "",
  type = "website",
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: "website" | "article";
}) {
  const fullTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;
  const fullDescription = description || seoConfig.defaultDescription;
  const fullUrl = `${seoConfig.url}${path}`;
  const ogImage = image || seoConfig.defaultImages.og;

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords
      ? [...seoConfig.keywords, ...keywords]
      : seoConfig.keywords,
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: seoConfig.siteName,
      type,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || seoConfig.defaultTitle,
        },
      ],
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Helper for JSON-LD structured data
export function generateBusinessJsonLd() {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: seoConfig.business.name,
    alternateName: "Emma Pilates",
    description: seoConfig.defaultDescription,
    url: seoConfig.url,
    telephone: seoConfig.business.phone,
    email: seoConfig.business.email,
    foundingDate: seoConfig.business.foundingDate,
    founder: {
      "@type": "Person",
      name: "Emma",
      jobTitle: "Certified Elite Pilates Trainer",
      description:
        "Master trainer with 12+ years experience in Pilates instruction",
    },
    openingHours: seoConfig.business.hours,
    priceRange: seoConfig.business.priceRange,
    image: [
      `${seoConfig.url}/emma/emma-sunset.jpeg`,
      `${seoConfig.url}/pilates/group-standing-up.jpeg`,
    ],
    sameAs: [seoConfig.social.facebook, seoConfig.social.instagram],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Pilates Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Group Pilates Classes",
            description:
              "Small group classes with maximum 8 participants for personalized attention",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Private Pilates Sessions",
            description:
              "One-on-one personalized Pilates instruction tailored to your specific goals",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Wellness Programs",
            description:
              "On-site Pilates classes and wellness programs for workplace health",
          },
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
    },
  };

  if (seoConfig.business.locations && seoConfig.business.locations.length > 1) {
    return seoConfig.business.locations.map((loc, index) => ({
      ...baseSchema,
      "@id": `${seoConfig.url}/#location-${index + 1}`,
      name: loc.name
        ? `${seoConfig.business.name} - ${loc.name}`
        : seoConfig.business.name,
      address: {
        "@type": "PostalAddress",
        streetAddress: loc.address.street,
        addressLocality: loc.address.city,
        addressRegion: loc.address.state,
        postalCode: loc.address.zip,
        addressCountry: loc.address.country,
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: loc.geo.latitude,
        longitude: loc.geo.longitude,
      },
    }));
  }

  const loc = seoConfig.business.locations
    ? seoConfig.business.locations[0]
    : null;

  if (!loc) return baseSchema;

  return {
    ...baseSchema,
    "@id": seoConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: loc.address.street,
      addressLocality: loc.address.city,
      addressRegion: loc.address.state,
      postalCode: loc.address.zip,
      addressCountry: loc.address.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: loc.geo.latitude,
      longitude: loc.geo.longitude,
    },
  };
}
