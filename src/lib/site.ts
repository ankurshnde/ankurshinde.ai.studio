/** Shared site identity for SEO, AI discovery, and machine-readable endpoints. */

export const SITE_URL = "https://ankurshinde.vercel.app"

export const SITE = {
  name: "Ankur Shinde Studio",
  url: SITE_URL,
  title: "Ankur Shinde | Research, Strategy & Decentralized AI Agent Ecosystems",
  description:
    "Official publications, research preprints, and systems thoughts on decentralized AI agents and digital public infrastructure by Ankur Shinde.",
  author: "Ankur Shinde",
  jobTitle: "Decentralized AI Researcher",
  locale: "en_US",
  twitterHandle: "@ankurshn",
  defaultOgImage: `${SITE_URL}/images/holding_brain.png`,
  email: "ankurshinde.dev@gmail.com",
  sameAs: [
    "https://x.com/ankurshn",
    "https://github.com/ankurshnde",
    "https://www.linkedin.com/in/ankurshinde/",
    "https://ankurshinde.medium.com",
    "https://scholar.google.com/citations?user=0z_bDeoAAAAJ&hl=en",
    "https://www.youtube.com/@ankurshnde",
    "https://papers.ssrn.com/sol3/cf_dev/AbsByAuth.cfm?per_id=6622601",
    "https://www.media.mit.edu/publications/ai-agents-for-kumbh-mela/",
  ],
  knowsAbout: [
    "AI Agents",
    "Decentralized AI",
    "Agentic Ecosystems",
    "Digital Public Infrastructure",
    "NANDA Protocol",
    "Cross-border agent transactions",
    "Agentic trust infrastructure",
    "Complex Systems Architecture",
  ],
} as const

export const ROUTES = [
  { path: "/", title: "Home", description: SITE.description },
  {
    path: "/publications",
    title: "Publications",
    description:
      "Research publications and preprints by Ankur Shinde on AI agents, enterprise ecosystems, and digital public infrastructure.",
  },
  {
    path: "/articles",
    title: "Articles",
    description:
      "Essays and systems writing by Ankur Shinde on decentralized AI agents, trust infrastructure, and agentic strategy.",
  },
  {
    path: "/connect",
    title: "Connect",
    description: "Contact and profiles for Ankur Shinde across X, GitHub, LinkedIn, Scholar, YouTube, and email.",
  },
] as const

export const ARTICLES = [
  {
    path: "/blog/the-control-plane-is-not-in-control",
    title: "The Control Plane Is Not in Control",
    description:
      "Enterprise AI leaders converge on owning trust boundaries and orchestration. This essay traces intelligence islands, inter-agent commerce, and why whoever owns the trade window owns the next control plane.",
    datePublished: "2026-07-14",
    image: `${SITE_URL}/images/holding_brain.png`,
    tags: ["AI agents", "enterprise AI", "trust infrastructure", "agentic commerce"],
  },
  {
    path: "/blog/beijing-is-not-racing-the-frontier",
    title: "Beijing is Not Racing the Frontier",
    description:
      "Strategic analysis of China's AI posture: why Beijing is not simply racing the frontier, and what that means for open agent ecosystems and global infrastructure.",
    datePublished: "2026-06-24",
    image: `${SITE_URL}/images/beijing_is_not_racing_the_frontier.avif`,
    tags: ["China AI", "strategy", "frontier models", "geopolitics"],
  },
] as const

export function absoluteUrl(path: string): string {
  if (path.startsWith("http")) return path
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`
}
