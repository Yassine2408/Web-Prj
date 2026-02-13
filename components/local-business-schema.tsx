import { siteConfig } from "@/lib/site-config";

export function LocalBusinessSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    image: "https://atlaswebstudio.ma/opengraph-image",
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address,
      addressLocality: "Kenitra",
      addressRegion: "Rabat-Sale-Kenitra",
      postalCode: "14000",
      addressCountry: "MA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "34.2610",
      longitude: "-6.5802",
    },
    openingHours: "Mo-Sa 09:00-19:00",
    areaServed: ["Kenitra", "Rabat", "Casablanca", "Morocco"],
    sameAs: [],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
