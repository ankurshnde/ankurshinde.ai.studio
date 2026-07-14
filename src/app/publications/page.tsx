"use client"

import React, { useState } from "react"
import { Navbar } from "@/components/navbar"

const publications = [
  {
    id: 1,
    year: "2026",
    title: "Agentic Kumbh Mela",
    category: "research",
    href: "https://www.media.mit.edu/publications/ai-agents-for-kumbh-mela/",
    isExternal: true,
  },
  {
    id: 2,
    year: "2026",
    title: "Enterprise AI Agent Ecosystems",
    category: "preprint",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6622601",
    isExternal: true,
  },
]

export default function PublicationsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <>
      <Navbar />

      <div className="wrap" style={{ marginTop: "12px" }}>
        <main style={{ display: "block" }}>
          <div className={`articles-table ${hoveredIndex !== null ? "has-hovered" : ""}`}>
            {publications.map((pub, index) => {
              const isHovered = hoveredIndex === index
              return (
                <a
                  key={pub.id}
                  href={pub.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`article-row ${isHovered ? "hovered" : ""}`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <span className="article-year">{pub.year}</span>
                  <span className="article-title-col">{pub.title}</span>
                  <span className="article-tag">{pub.category}</span>
                </a>
              )
            })}
          </div>
        </main>
      </div>
    </>
  )
}
