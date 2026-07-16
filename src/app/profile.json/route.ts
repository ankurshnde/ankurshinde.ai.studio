import { ARTICLES, ROUTES, SITE } from "@/lib/site"

export const dynamic = "force-static"

/** Machine-readable Person + WebSite profile for AI tools and curl. */
export async function GET() {
  const body = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${SITE.url}/#person`,
        name: SITE.author,
        url: SITE.url,
        email: SITE.email,
        jobTitle: SITE.jobTitle,
        description: SITE.description,
        sameAs: SITE.sameAs,
        knowsAbout: SITE.knowsAbout,
        worksFor: {
          "@type": "Organization",
          name: "Project NANDA",
          url: "https://projectnanda.org/",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE.url}/#website`,
        name: SITE.name,
        url: SITE.url,
        description: SITE.description,
        inLanguage: "en-US",
        publisher: { "@id": `${SITE.url}/#person` },
        author: { "@id": `${SITE.url}/#person` },
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE.url}/#profile`,
        url: SITE.url,
        name: SITE.title,
        about: { "@id": `${SITE.url}/#person` },
        mainEntity: { "@id": `${SITE.url}/#person` },
      },
    ],
    pages: ROUTES.map((r) => ({
      url: `${SITE.url}${r.path === "/" ? "" : r.path}`,
      title: r.title,
      description: r.description,
    })),
    articles: ARTICLES.map((a) => ({
      url: `${SITE.url}${a.path}`,
      title: a.title,
      description: a.description,
      datePublished: a.datePublished,
      image: a.image,
      tags: a.tags,
    })),
    discovery: {
      llms: `${SITE.url}/llms.txt`,
      llmsFull: `${SITE.url}/llms-full.txt`,
      sitemap: `${SITE.url}/sitemap.xml`,
      robots: `${SITE.url}/robots.txt`,
    },
  }

  return new Response(JSON.stringify(body, null, 2), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
