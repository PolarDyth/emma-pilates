import { seoConfig } from "@/lib/seo-config";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ExerciseGym",
    "name": seoConfig.siteName,
    "image": [
      `${seoConfig.url}/emma/emma-sunset.jpeg`,
      `${seoConfig.url}/emma/emma-black-white.jpeg`
    ],
    "@id": seoConfig.url,
    "url": seoConfig.url,
    "telephone": seoConfig.business.phone,
    "email": seoConfig.business.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": seoConfig.business.address.street,
      "addressLocality": seoConfig.business.address.city,
      "addressRegion": seoConfig.business.address.state,
      "postalCode": seoConfig.business.address.zip,
      "addressCountry": seoConfig.business.address.country
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 55.9533, // Edinburgh coordinates (placeholder)
      "longitude": -3.1883
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday"
        ],
        "opens": "08:30",
        "closes": "20:30"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "09:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      seoConfig.social.facebook,
      seoConfig.social.instagram,
      seoConfig.social.linkedin,
      seoConfig.social.twitter
    ],
    "priceRange": "$$"
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
