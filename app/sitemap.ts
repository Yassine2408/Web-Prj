import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://web-prj-flame.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/ar",
    "/ar/services",
    "/ar/pricing",
    "/ar/work",
    "/ar/blog",
    "/ar/about",
    "/ar/contact",
    "/ar/privacy",
    "/ar/terms",
    "/fr",
    "/fr/services",
    "/fr/pricing",
    "/fr/work",
    "/fr/blog",
    "/fr/about",
    "/fr/contact",
    "/fr/privacy",
    "/fr/terms",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly",
    priority: route === "/ar" ? 1 : 0.8,
  }));
}
