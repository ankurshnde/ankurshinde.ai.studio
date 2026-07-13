import React from "react"
import { Metadata } from "next"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Articles",
}

export default function ArticlesPage() {
  return (
    <>
      <Navbar />

      <div className="wrap" style={{ marginTop: "32px" }}>
        <main style={{ display: "block" }}>
          <div className="essay-list">
            <div className="essay-item">
              <div className="essay-meta">JULY 14, 2026 · AI TRUST & ORCHESTRATION</div>
              <div className="essay-title-row">
                <Link href="/blog/the-control-plane-is-not-in-control" className="essay-title-link">
                  The Control Plane Is Not in Control
                </Link>
                <span className="redirect-icon" style={{ transform: "none" }}>→</span>
              </div>
              <p className="essay-excerpt">
                Enterprise AI leaders (Karp, Srinivas, Nadella) converge on one prescription: enterprises must own their trust boundary, orchestration layer, and learning loop. This article traces what happens after that prescription is followed, proposing a new research field: agentic trust infrastructure.
              </p>
            </div>

            <div className="essay-item">
              <div className="essay-meta">FEBRUARY 12, 2026 · AI STRATEGY & GEOPOLITICS</div>
              <div className="essay-title-row">
                <Link href="/blog/beijing-is-not-racing-the-frontier" className="essay-title-link">
                  Beijing is Not Racing the Frontier: Anatomy of China's State of AI
                </Link>
                <span className="redirect-icon" style={{ transform: "none" }}>→</span>
              </div>
              <p className="essay-excerpt">China is building a vertically aligned AI stack—from energy and compute to data, models, orchestration, and distribution—designed for deployment coherence rather than frontier performance.</p>
            </div>

            <div className="essay-item">
              <div className="essay-meta">JANUARY 28, 2026 · PUBLIC INFRASTRUCTURE</div>
              <div className="essay-title-row">
                <a href="https://ankurshinde.medium.com/ai-digital-public-infrastructure-architecting-intelligence-as-a-public-utility-0d7cc6245450" target="_blank" rel="noopener noreferrer" className="essay-title-link">
                  AI + Digital Public Infrastructure: Architecting Intelligence as a Public Utility
                </a>
                <span className="redirect-icon">↗</span>
              </div>
              <p className="essay-excerpt">How combining Artificial Intelligence with Digital Public Infrastructure (DPI) can optimize both delivery and decisions at a population scale.</p>
            </div>

            <div className="essay-item">
              <div className="essay-meta">AUGUST 2, 2025 · AI STRATEGY</div>
              <div className="essay-title-row">
                <a href="https://ankurshinde.medium.com/two-visions-one-future-situating-project-nanda-within-openais-5-levels-of-ai-progress-d839a7c9bef9" target="_blank" rel="noopener noreferrer" className="essay-title-link">
                  Two Visions, One Future? Situating Project NANDA Within OpenAI’s 5 Levels of AI Progress
                </a>
                <span className="redirect-icon">↗</span>
              </div>
              <p className="essay-excerpt">Contextualizing decentralized agent networks within major AI progress levels. Analyzing the divergence between centralized labs and open-source coordination layers.</p>
            </div>

            <div className="essay-item">
              <div className="essay-meta">JULY 16, 2025 · DECENTRALIZED INFRASTRUCTURE</div>
              <div className="essay-title-row">
                <a href="https://ankurshinde.medium.com/nanda-the-protocol-for-decentralized-ai-agent-collaboration-3f9fd9fbae5a" target="_blank" rel="noopener noreferrer" className="essay-title-link">
                  NANDA: The Protocol for Decentralized AI Agent Collaboration
                </a>
                <span className="redirect-icon">↗</span>
              </div>
              <p className="essay-excerpt">Proposing a foundational open-source protocol stack for agent identity, trust-based routing, and decentralized economic incentives without centralized gatekeepers.</p>
            </div>

            <div className="essay-item">
              <div className="essay-meta">JULY 8, 2025 · AGENT SYSTEMS</div>
              <div className="essay-title-row">
                <a href="https://ankurshinde.medium.com/before-you-build-another-ai-agent-you-need-to-read-this-c91ff0fde18b" target="_blank" rel="noopener noreferrer" className="essay-title-link">
                  Before You Build Another AI Agent, You Need to Read This
                </a>
                <span className="redirect-icon">↗</span>
              </div>
              <p className="essay-excerpt">Why standalone AI agents are bound to hit integration walls. A guide on transitioning from isolated task execution models to interoperable agent-to-agent architectures.</p>
            </div>

            <div className="essay-item">
              <div className="essay-meta">JULY 4, 2025 · DECENTRALIZED INDEX</div>
              <div className="essay-title-row">
                <a href="https://ankurshinde.medium.com/nanda-index-faq-contextualizing-with-linux-foundations-a2a-agent-ff1a0d8fa9ae" target="_blank" rel="noopener noreferrer" className="essay-title-link">
                  NANDA Index FAQ: Contextualizing with Linux Foundation’s A2A Agent
                </a>
                <span className="redirect-icon">↗</span>
              </div>
              <p className="essay-excerpt">Frequently asked questions about the NANDA Index, detailing how it works alongside protocols like Google's A2A and Anthropic's MCP.</p>
            </div>

            <div className="essay-item">
              <div className="essay-meta">MAY 27, 2025 · CYBERSECURITY</div>
              <div className="essay-title-row">
                <a href="https://ankurshinde.medium.com/when-ai-can-attack-only-ai-can-defend-5c80ffdb184e" target="_blank" rel="noopener noreferrer" className="essay-title-link">
                  When AI Can Attack, Only AI Can Defend
                </a>
                <span className="redirect-icon">↗</span>
              </div>
              <p className="essay-excerpt">Securing an agentic internet. Explaining why traditional human-in-the-loop security architectures fail against coordinated, automated agent attacks.</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
