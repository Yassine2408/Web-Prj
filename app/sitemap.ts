import type { MetadataRoute } from "next";

const base = process.env.NEXT_PUBLIC_SITE_URL || "https://web-prj-flame.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/services",
    "/pricing",
    "/work",
    "/blog",
    "/about",
    "/contact",
    "/privacy",
    "/terms",
    "/ar",
    "/ar/services",
    "/ar/pricing",
    "/ar/work",
    "/ar/blog",
    "/ar/about",
    "/ar/contact",
    "/ar/privacy",
    "/ar/terms",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
