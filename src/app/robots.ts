import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"

/** Explicitly allow search engines and major AI crawlers. */
export default function robots(): MetadataRoute.Robots {
  const allowAll = {
    allow: "/",
  }

  return {
    rules: [
      { userAgent: "*", ...allowAll },
      // OpenAI
      { userAgent: "GPTBot", ...allowAll },
      { userAgent: "ChatGPT-User", ...allowAll },
      { userAgent: "OAI-SearchBot", ...allowAll },
      // Anthropic
      { userAgent: "anthropic-ai", ...allowAll },
      { userAgent: "ClaudeBot", ...allowAll },
      { userAgent: "Claude-Web", ...allowAll },
      // Google AI / Gemini training & grounding
      { userAgent: "Google-Extended", ...allowAll },
      { userAgent: "Googlebot", ...allowAll },
      // xAI / Grok
      { userAgent: "Grok", ...allowAll },
      { userAgent: "xAI", ...allowAll },
      // Others commonly used by AI tools
      { userAgent: "PerplexityBot", ...allowAll },
      { userAgent: "Applebot-Extended", ...allowAll },
      { userAgent: "Bytespider", ...allowAll },
      { userAgent: "CCBot", ...allowAll },
      { userAgent: "meta-externalagent", ...allowAll },
      { userAgent: "FacebookBot", ...allowAll },
      { userAgent: "cohere-ai", ...allowAll },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
