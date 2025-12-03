export const seoConfig = {
  // Base site configuration
  domain: 'emmaspilatesstudio.com',
  url: 'https://emmaspilatesstudio.com',
  siteName: "Emma's Pilates Studio",
  
  // Default metadata
  defaultTitle: "Emma's Pilates Studio | Expert Pilates Instruction for All Ages",
  defaultDescription: "Transform your body and mind with expert Pilates instruction in a welcoming studio environment. Group classes, private sessions, and corporate packages available. Serving ages 30-70 with personalized approach.",
  
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
    "Strength Training"
  ],
  
  // Social media
  social: {
    twitter: '@emmaspilates', // Replace with actual handle
    facebook: 'https://facebook.com/emmaspilatesstudio',
    instagram: 'https://instagram.com/emmaspilatesstudio',
    linkedin: 'https://linkedin.com/in/emma-pilates'
  },
  
  // Business info
  business: {
    name: "Emma's Pilates Studio",
    phone: '+1-XXX-XXX-XXXX', // Add actual phone
    email: 'info@emmaspilatesstudio.com', // Add actual email
    foundingDate: '2012',
    address: {
      street: 'Your Street Address',
      city: 'Your City',
      state: 'Your State',
      zip: 'Your ZIP',
      country: 'US'
    },
    geo: {
      latitude: 'Your Latitude',
      longitude: 'Your Longitude'
    },
    hours: [
      'Mo-Fr 06:00-21:00',
      'Sa 08:00-18:00', 
      'Su 08:00-16:00'
    ],
    priceRange: '$$'
  },
  
  // Default images
  defaultImages: {
    og: '/emma/emma-sunset.jpeg',
    twitter: '/emma/emma-sunset.jpeg',
    logo: '/emma/emma-sunset.jpeg'
  }
};

// Helper function to generate metadata
export function generateSEOMetadata({
  title,
  description,
  keywords,
  image,
  path = '',
  type = 'website'
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  path?: string;
  type?: 'website' | 'article';
}) {
  const fullTitle = title ? `${title} | ${seoConfig.siteName}` : seoConfig.defaultTitle;
  const fullDescription = description || seoConfig.defaultDescription;
  const fullUrl = `${seoConfig.url}${path}`;
  const ogImage = image || seoConfig.defaultImages.og;
  
  return {
    title: fullTitle,
    description: fullDescription,
    keywords: keywords ? [...seoConfig.keywords, ...keywords] : seoConfig.keywords,
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
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [ogImage],
      creator: seoConfig.social.twitter,
    },
    alternates: {
      canonical: fullUrl,
    },
  };
}

// Helper for JSON-LD structured data
export function generateBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HealthAndBeautyBusiness',
    '@id': seoConfig.url,
    name: seoConfig.business.name,
    alternateName: 'Emma Pilates',
    description: seoConfig.defaultDescription,
    url: seoConfig.url,
    telephone: seoConfig.business.phone,
    email: seoConfig.business.email,
    foundingDate: seoConfig.business.foundingDate,
    founder: {
      '@type': 'Person',
      name: 'Emma',
      jobTitle: 'Certified Elite Pilates Trainer',
      description: 'Master trainer with 12+ years experience in Pilates instruction'
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: seoConfig.business.address.street,
      addressLocality: seoConfig.business.address.city,
      addressRegion: seoConfig.business.address.state,
      postalCode: seoConfig.business.address.zip,
      addressCountry: seoConfig.business.address.country
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: seoConfig.business.geo.latitude,
      longitude: seoConfig.business.geo.longitude
    },
    openingHours: seoConfig.business.hours,
    priceRange: seoConfig.business.priceRange,
    image: [
      `${seoConfig.url}/emma/emma-sunset.jpeg`,
      `${seoConfig.url}/pilates/group-standing-up.jpeg`
    ],
    sameAs: [
      seoConfig.social.facebook,
      seoConfig.social.instagram,
      seoConfig.social.linkedin
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Pilates Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Group Pilates Classes',
            description: 'Small group classes with maximum 8 participants for personalized attention'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Private Pilates Sessions',
            description: 'One-on-one personalized Pilates instruction tailored to your specific goals'
          }
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Corporate Wellness Programs',
            description: 'On-site Pilates classes and wellness programs for workplace health'
          }
        }
      ]
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '127'
    }
  };
} 