import { generateBusinessJsonLd } from "@/lib/seo-config";

export default function LocalBusinessSchema() {
  const schema = generateBusinessJsonLd();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
