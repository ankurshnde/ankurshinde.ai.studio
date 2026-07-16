import { ARTICLES, ROUTES, SITE } from "@/lib/site"

export const dynamic = "force-static"

/** Plain-text identity card — ideal for curl and simple agents. */
export async function GET() {
  const lines = [
    "ANKUR SHINDE",
    "============",
    "",
    SITE.jobTitle,
    SITE.description,
    "",
    `Website:  ${SITE.url}`,
    `Email:    ${SITE.email}`,
    "",
    "AFFILIATION",
    "-----------",
    "Head of Media, Project NANDA (open agentic web / MIT Media Lab)",
    "https://projectnanda.org/  |  https://nanda.mit.edu/",
    "",
    "PAGES",
    "-----",
    ...ROUTES.map(
      (r) => `- ${r.title}: ${SITE.url}${r.path === "/" ? "" : r.path}`
    ),
    "",
    "ESSAYS ON THIS SITE",
    "------------------",
    ...ARTICLES.map(
      (a) =>
        `- ${a.title}\n  ${SITE.url}${a.path}\n  ${a.description}`
    ),
    "",
    "PROFILES",
    "--------",
    ...SITE.sameAs.map((u) => `- ${u}`),
    "",
    "TOPICS",
    "------",
    SITE.knowsAbout.join(", "),
    "",
    "MACHINE READABLE",
    "----------------",
    `llms.txt:      ${SITE.url}/llms.txt`,
    `llms-full.txt: ${SITE.url}/llms-full.txt`,
    `profile.json:  ${SITE.url}/profile.json`,
    `sitemap.xml:   ${SITE.url}/sitemap.xml`,
    `robots.txt:    ${SITE.url}/robots.txt`,
    "",
  ]

  return new Response(lines.join("\n"), {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "Access-Control-Allow-Origin": "*",
    },
  })
}
