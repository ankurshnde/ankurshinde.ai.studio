"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

const articles = [
  {
    id: 1,
    year: "2026",
    title: "The Control Plane Is Not in Control",
    category: "trust",
    href: "/blog/the-control-plane-is-not-in-control",
    image: "/images/holding_brain.png",
    isExternal: false,
  },
  {
    id: 2,
    year: "2026",
    title: "Beijing is Not Racing the Frontier",
    category: "strategy",
    href: "/blog/beijing-is-not-racing-the-frontier",
    image: "/images/beijing_is_not_racing_the_frontier.avif",
    isExternal: false,
  },
  {
    id: 3,
    year: "2026",
    title: "AI + Digital Public Infrastructure",
    category: "utility",
    href: "https://ankurshinde.medium.com/ai-digital-public-infrastructure-architecting-intelligence-as-a-public-utility-0d7cc6245450",
    image: "/images/ai_dpi.avif",
    isExternal: true,
  },
  {
    id: 4,
    year: "2025",
    title: "Two Visions, One Future",
    category: "progress",
    href: "https://ankurshinde.medium.com/two-visions-one-future-situating-project-nanda-within-openais-5-levels-of-ai-progress-d839a7c9bef9",
    image: "/images/two_visions_one_future.avif",
    isExternal: true,
  },
  {
    id: 5,
    year: "2025",
    title: "NANDA Protocol",
    category: "decentralized",
    href: "https://ankurshinde.medium.com/nanda-the-protocol-for-decentralized-ai-agent-collaboration-3f9fd9fbae5a",
    image: "/images/nanda_protocol.avif",
    isExternal: true,
  },
  {
    id: 6,
    year: "2025",
    title: "Before You Build Another AI Agent",
    category: "systems",
    href: "https://ankurshinde.medium.com/before-you-build-another-ai-agent-you-need-to-read-this-c91ff0fde18b",
    image: "/images/before_building_another_ai_agent.avif",
    isExternal: true,
  },
  {
    id: 7,
    year: "2025",
    title: "NANDA Index FAQ",
    category: "faq",
    href: "https://ankurshinde.medium.com/nanda-index-faq-contextualizing-with-linux-foundations-a2a-agent-ff1a0d8fa9ae",
    image: "/images/nanda_index_faq.avif",
    isExternal: true,
  },
  {
    id: 8,
    year: "2025",
    title: "When AI Can Attack, Only AI Can Defend",
    category: "cybersecurity",
    href: "https://ankurshinde.medium.com/when-ai-can-attack-only-ai-can-defend-5c80ffdb184e",
    image: "/images/ai_can_attack_ai_can_defend.avif",
    isExternal: true,
  },
]

export default function ArticlesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const hoveredArticle = hoveredIndex !== null ? articles[hoveredIndex] : null
  const showPreview = hoveredArticle && hoveredArticle.image

  return (
    <>
      <Navbar />

      <div className="wrap" style={{ marginTop: "12px" }}>
        <main style={{ display: "block" }}>
          <div className={`articles-table ${hoveredIndex !== null ? "has-hovered" : ""}`}>
            {articles.map((article, index) => {
              const isHovered = hoveredIndex === index
              const content = (
                <>
                  <span className="article-year">{article.year}</span>
                  <span className="article-title-col">{article.title}</span>
                  <span className="article-tag">{article.category}</span>
                  {article.image && (
                    <span className="article-row-preview">
                      <img src={article.image} alt="" />
                    </span>
                  )}
                </>
              )

              if (article.isExternal) {
                return (
                  <a
                    key={article.id}
                    href={article.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`article-row ${isHovered ? "hovered" : ""}`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {content}
                  </a>
                )
              }

              return (
                <Link
                  key={article.id}
                  href={article.href}
                  className={`article-row ${isHovered ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  {content}
                </Link>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}
