import type { MetadataRoute } from "next"
import { ARTICLES, ROUTES, SITE_URL } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const pages: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${SITE_URL}${route.path === "/" ? "" : route.path}`,
    lastModified: now,
    changeFrequency: route.path === "/" ? "weekly" : "monthly",
    priority: route.path === "/" ? 1 : 0.8,
  }))

  const articles: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${SITE_URL}${article.path}`,
    lastModified: new Date(article.datePublished),
    changeFrequency: "monthly",
    priority: 0.9,
  }))

  // Machine-readable discovery endpoints
  const discovery: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/llms.txt`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/profile.json`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]

  return [...pages, ...articles, ...discovery]
}
