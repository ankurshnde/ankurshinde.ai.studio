"use client"

import React, { useState, useEffect } from "react"
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
    title: "Beijing is Not Racing the Frontier: Anatomy of China's State of AI",
    category: "ai strategy",
    href: "/blog/beijing-is-not-racing-the-frontier",
    image: "/images/hero.jpg",
    isExternal: false,
  },
  {
    id: 3,
    year: "2026",
    title: "AI + Digital Public Infrastructure: Architecting Intelligence as a Public Utility",
    category: "public utility",
    href: "https://ankurshinde.medium.com/ai-digital-public-infrastructure-architecting-intelligence-as-a-public-utility-0d7cc6245450",
    image: "/images/image_1.png",
    isExternal: true,
  },
  {
    id: 4,
    year: "2025",
    title: "Two Visions, One Future? Situating Project NANDA Within OpenAI’s 5 Levels of AI Progress",
    category: "ai progress",
    href: "https://ankurshinde.medium.com/two-visions-one-future-situating-project-nanda-within-openais-5-levels-of-ai-progress-d839a7c9bef9",
    image: "/images/image_2.png",
    isExternal: true,
  },
  {
    id: 5,
    year: "2025",
    title: "NANDA: The Protocol for Decentralized AI Agent Collaboration",
    category: "decentralized",
    href: "https://ankurshinde.medium.com/nanda-the-protocol-for-decentralized-ai-agent-collaboration-3f9fd9fbae5a",
    image: "/images/raskarAgenticCommerceApr2026_page-0011.jpg",
    isExternal: true,
  },
  {
    id: 6,
    year: "2025",
    title: "Before You Build Another AI Agent, You Need to Read This",
    category: "agent systems",
    href: "https://ankurshinde.medium.com/before-you-build-another-ai-agent-you-need-to-read-this-c91ff0fde18b",
    image: "/images/raskarAgenticCommerceApr2026_page-0012.jpg",
    isExternal: true,
  },
  {
    id: 7,
    year: "2025",
    title: "NANDA Index FAQ: Contextualizing with Linux Foundation’s A2A Agent",
    category: "index faq",
    href: "https://ankurshinde.medium.com/nanda-index-faq-contextualizing-with-linux-foundations-a2a-agent-ff1a0d8fa9ae",
    image: "/images/hero.jpg",
    isExternal: true,
  },
  {
    id: 8,
    year: "2025",
    title: "When AI Can Attack, Only AI Can Defend",
    category: "cybersecurity",
    href: "https://ankurshinde.medium.com/when-ai-can-attack-only-ai-can-defend-5c80ffdb184e",
    image: "/images/holding_brain.png",
    isExternal: true,
  },
]

export default function ArticlesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [windowWidth, setWindowWidth] = useState(1200)

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)
      const handleResize = () => setWindowWidth(window.innerWidth)
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  const isRightHalf = mousePos.x > windowWidth / 2
  const previewLeft = isRightHalf ? mousePos.x - 200 : mousePos.x + 20

  return (
    <>
      <Navbar />

      <div className="wrap" style={{ marginTop: "40px" }} onMouseMove={handleMouseMove}>
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

      {hoveredIndex !== null && articles[hoveredIndex].image && (
        <div
          className="article-hover-preview"
          style={{
            top: mousePos.y + 15,
            left: previewLeft,
          }}
        >
          <img
            src={articles[hoveredIndex].image}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>
      )}
    </>
  )
}
