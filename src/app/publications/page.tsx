import React from "react"
import { Metadata } from "next"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Publications",
}

export default function PublicationsPage() {
  return (
    <>
      <Navbar />

      <div className="wrap" style={{ marginTop: "32px" }}>
        <main style={{ display: "block" }}>
          <div className="essay-list">
            <div className="essay-item">
              <div className="essay-meta">FEBRUARY 2026 · MIT MEDIA LAB</div>
              <div className="essay-title-row">
                <a href="https://www.media.mit.edu/publications/ai-agents-for-kumbh-mela/" target="_blank" rel="noopener noreferrer" className="essay-title-link">
                  A Proposal for Agentic Management at Nashik Kumbh Mela 2027
                </a>
                <span className="redirect-icon">↗</span>
              </div>
              <p className="essay-excerpt">Proposing an “Agentic Kumbh” framework assigning registered pilgrims a personal voice-first AI agent—Kumbh Doot—running across phones, IVR, and kiosks to orchestrate access services (housing, identity, payments) and experience services.</p>
            </div>

            <div className="essay-item">
              <div className="essay-meta">APRIL 2026 · SSRN PREPRINT</div>
              <div className="essay-title-row">
                <a href="https://papers.ssrn.com/sol3/papers.cfm?abstract_id=6622601" target="_blank" rel="noopener noreferrer" className="essay-title-link">
                  Enterprise AI Agent Ecosystems: Architecture, Economics, and the Composition Gap
                </a>
                <span className="redirect-icon">↗</span>
              </div>
              <p className="essay-excerpt">Analyzing AI agent deployments and economic layers to identify the composition gap: the need for a Trust-Aware Ranking System (TARS) to compose identity, reputation, and fitness into real-time agent selection.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
