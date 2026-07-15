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
    image: "/images/kumbh.png",
    isExternal: true,
  },
  {
    id: 2,
    year: "2026",
    title: "Enterprise AI Agent Ecosystems",
    category: "preprint",
    href: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6622601",
    image: "/images/enterprise_ai_ecosystem.avif",
    isExternal: true,
  },
]

export default function PublicationsPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [windowWidth, setWindowWidth] = useState(0)

  React.useEffect(() => {
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
  const previewLeft = isRightHalf ? mousePos.x - 160 : mousePos.x + 20

  const hoveredArticle = hoveredIndex !== null ? publications[hoveredIndex] : null
  const showPreview = hoveredArticle && hoveredArticle.image

  return (
    <>
      <Navbar />

      <div className="wrap" style={{ marginTop: "12px" }} onMouseMove={handleMouseMove}>
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

      {showPreview && (
        <div
          className="article-hover-preview"
          style={{
            position: "fixed",
            top: mousePos.y + 15,
            left: previewLeft,
          }}
        >
          <img src={hoveredArticle.image} alt="" />
        </div>
      )}
    </>
  )
}
