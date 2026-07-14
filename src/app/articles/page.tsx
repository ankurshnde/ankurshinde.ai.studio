"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

const articles = [
  {
    id: 1,
    year: "2026",
    title: "The Control Plane Is Not in Control",
    category: "ai trust",
    href: "/blog/the-control-plane-is-not-in-control",
    image: "/images/holding_brain.png",
    isExternal: false,
  },
  {
    id: 2,
    year: "2026",
    title: "Beijing is Not Racing the Frontier",
    category: "ai strategy",
    href: "/blog/beijing-is-not-racing-the-frontier",
    image: "/images/hero.jpg",
    isExternal: false,
  },
  {
    id: 3,
    year: "2026",
    title: "AI + Digital Public Infrastructure",
    category: "public utility",
    href: "https://ankurshinde.medium.com/ai-digital-public-infrastructure-architecting-intelligence-as-a-public-utility-0d7cc6245450",
    isExternal: true,
  },
  {
    id: 4,
    year: "2025",
    title: "Two Visions, One Future",
    category: "ai progress",
    href: "https://ankurshinde.medium.com/two-visions-one-future-situating-project-nanda-within-openais-5-levels-of-ai-progress-d839a7c9bef9",
    isExternal: true,
  },
  {
    id: 5,
    year: "2025",
    title: "NANDA Protocol",
    category: "decentralized",
    href: "https://ankurshinde.medium.com/nanda-the-protocol-for-decentralized-ai-agent-collaboration-3f9fd9fbae5a",
    isExternal: true,
  },
  {
    id: 6,
    year: "2025",
    title: "Before You Build Another AI Agent",
    category: "agent systems",
    href: "https://ankurshinde.medium.com/before-you-build-another-ai-agent-you-need-to-read-this-c91ff0fde18b",
    isExternal: true,
  },
  {
    id: 7,
    year: "2025",
    title: "NANDA Index FAQ",
    category: "index faq",
    href: "https://ankurshinde.medium.com/nanda-index-faq-contextualizing-with-linux-foundations-a2a-agent-ff1a0d8fa9ae",
    isExternal: true,
  },
  {
    id: 8,
    year: "2025",
    title: "When AI Can Attack, Only AI Can Defend",
    category: "cybersecurity",
    href: "https://ankurshinde.medium.com/when-ai-can-attack-only-ai-can-defend-5c80ffdb184e",
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

      {/* Fixed-position preview image */}
      <div className={`article-hover-preview ${showPreview ? "visible" : ""}`}>
        {showPreview && (
          <img
            src={hoveredArticle.image}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        )}
      </div>
    </>
  )
}
