import type { MetadataRoute } from "next";

const base = "https://atlaswebstudio.ma";

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
