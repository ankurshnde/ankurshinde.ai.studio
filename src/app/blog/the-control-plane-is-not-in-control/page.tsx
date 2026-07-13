"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function TheControlPlaneIsNotInControlPage() {
  const [activeSection, setActiveSection] = useState("header")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFloatingShareVisible, setIsFloatingShareVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [highlightsActive, setHighlightsActive] = useState(false)

  const shareOnX = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent("The Control Plane Is Not in Control")
    window.open(`https://x.com/intent/tweet?url=${url}&text=${text}`, "_blank")
  }

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank")
  }

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(err => {
      console.error("Failed to copy link: ", err)
    })
  }

  const scrollToSection = (targetId: string) => {
    const targetEl = document.getElementById(targetId)
    if (targetEl) {
      if (targetId === "header") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      } else {
        const offset = 100
        const elementPosition = targetEl.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - offset
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        })
      }
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0
      setScrollProgress(scrolled)

      // Toggle mobile floating share bar visibility
      if (winScroll > 300) {
        setIsFloatingShareVisible(true)
      } else {
        setIsFloatingShareVisible(false)
      }

      // Scroll Spy for sections
      const sections = [
        "header",
        "islands",
        "challenges",
        "three-futures",
        "finance-hft",
        "closing",
        "author-note",
      ]
      let currentSection = "header"

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 180) {
            currentSection = sectionId
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const progressDots = [
    { label: "INTRO", id: "header" },
    { label: "ISLANDS", id: "islands" },
    { label: "CHALLENGES", id: "challenges" },
    { label: "THREE FUTURES", id: "three-futures" },
    { label: "FINANCE & HFT", id: "finance-hft" },
    { label: "CLOSING", id: "closing" },
    { label: "AUTHOR NOTE", id: "author-note" },
  ]

  // Highlight helper component
  const Highlight = ({ category, children }: { category: "original" | "ai-written" | "ai-improved"; children: React.ReactNode }) => {
    const getBgColor = () => {
      if (!highlightsActive) return "transparent"
      switch (category) {
        case "original": return "#F3EAD8" // light warm sand
        case "ai-written": return "#E9E4F2" // light lavender
        case "ai-improved": return "#E2EFE4" // light mint green
      }
    }

    return (
      <span
        style={{
          backgroundColor: getBgColor(),
          transition: "background-color 0.3s ease",
          padding: "2px 4px",
          borderRadius: "2px",
        }}
      >
        {children}
      </span>
    )
  }

  return (
    <>
      <div style={{ position: "sticky", top: 0, zIndex: 1000, backgroundColor: "var(--background)" }}>
        <Navbar />
      </div>

      {/* Scroll progress bar on top */}
      <div className="scroll-progress-container">
        <div 
          className="scroll-progress-bar" 
          id="progress-bar"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Viewport edge progress dashes for tablet/mobile */}
      <div className="viewport-progress-indicator">
        {progressDots.map(dot => (
          <div
            key={dot.id}
            className={`progress-dot ${activeSection === dot.id ? "active" : ""}`}
            onClick={() => scrollToSection(dot.id)}
            data-target={dot.id}
          />
        ))}
      </div>

      {/* Floating side card on desktop */}
      <div className="side-nav-container">
        <div className="side-index-card">
          {/* Group 1: CONTEXT */}
          <div className="side-index-category">
            <span className="side-index-cat-title">CONTEXT</span>
            <div 
              className={`side-index-item ${activeSection === "header" ? "active" : ""}`} 
              onClick={() => scrollToSection("header")}
            >
              <span className="index-title">INTRO</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "islands" ? "active" : ""}`} 
              onClick={() => scrollToSection("islands")}
            >
              <span className="index-title">ISLANDS</span>
            </div>
          </div>

          {/* Group 2: INTER-AGENT COMMERCE */}
          <div className="side-index-category">
            <span className="side-index-cat-title">INTER-AGENT COMMERCE</span>
            <div 
              className={`side-index-item ${activeSection === "challenges" ? "active" : ""}`} 
              onClick={() => scrollToSection("challenges")}
            >
              <span className="index-title">CHALLENGES</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "three-futures" ? "active" : ""}`} 
              onClick={() => scrollToSection("three-futures")}
            >
              <span className="index-title">THREE FUTURES</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "finance-hft" ? "active" : ""}`} 
              onClick={() => scrollToSection("finance-hft")}
            >
              <span className="index-title">FINANCE & HFT</span>
            </div>
          </div>

          {/* Group 3: OUTLOOK */}
          <div className="side-index-category">
            <span className="side-index-cat-title">OUTLOOK</span>
            <div 
              className={`side-index-item ${activeSection === "closing" ? "active" : ""}`} 
              onClick={() => scrollToSection("closing")}
            >
              <span className="index-title">CLOSING</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "author-note" ? "active" : ""}`} 
              onClick={() => scrollToSection("author-note")}
            >
              <span className="index-title">AUTHOR NOTE</span>
            </div>
          </div>

          {/* Group 4: AUTHORSHIP TOGGLE */}
          <div className="side-index-category" style={{ marginTop: "20px", paddingTop: "16px", borderTop: "1.5px dashed var(--border)" }}>
            <span className="side-index-cat-title">AUTHORSHIP</span>
            <button 
              onClick={() => setHighlightsActive(!highlightsActive)}
              className="highlight-toggle-btn"
              style={{
                width: "100%",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                padding: "8px 12px",
                border: "1.5px solid var(--accent)",
                borderRadius: "4px",
                backgroundColor: highlightsActive ? "var(--accent)" : "transparent",
                color: highlightsActive ? "var(--background)" : "var(--foreground)",
                cursor: "pointer",
                transition: "all 0.2s ease",
                marginBottom: "12px",
                textAlign: "center"
              }}
            >
              {highlightsActive ? "Hide AI Highlights" : "See AI Highlights"}
            </button>
            {highlightsActive && (
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#F3EAD8", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Original</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#E9E4F2", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI-written</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#E2EFE4", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "11px", color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>AI-improved</span>
                </div>
              </div>
            )}
          </div>

          {/* Side Share inside Card */}
          <div className="side-share">
            <span className="side-share-label">SHARE</span>
            <div className="side-share-buttons">
              <button onClick={shareOnX} className="social-share-btn" aria-label="Share on X">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              <button onClick={shareOnLinkedIn} className="social-share-btn" aria-label="Share on LinkedIn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M19H5c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-11 19H5v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </button>
              <div className="copy-tooltip-container">
                <button onClick={copyArticleLink} className="social-share-btn" aria-label="Copy Link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
                <span className={`copy-tooltip ${copied ? "visible" : ""}`}>Link copied!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container essay-container">
        <main id="header" style={{ display: "block" }}>
          <div className="article-meta-row">
            <div className="meta-column">
              <span className="meta-label">Written by</span>
              <span className="meta-value">Ankur Shinde</span>
            </div>
            <div className="meta-column">
              <span className="meta-label">Published on</span>
              <span className="meta-value">Jul 14, 2026</span>
            </div>
            <div className="meta-share-buttons">
              <button onClick={shareOnX} className="social-share-btn" aria-label="Share on X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              <button onClick={shareOnLinkedIn} className="social-share-btn" aria-label="Share on LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19H5c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zm-11 19H5v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </button>
              <div className="copy-tooltip-container">
                <button onClick={copyArticleLink} className="social-share-btn" aria-label="Copy Link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
                <span className={`copy-tooltip ${copied ? "visible" : ""}`}>Link copied!</span>
              </div>
            </div>
          </div>

          <hr className="meta-divider" />

          <h1 className="essay-page-title">The Control Plane Is Not in Control</h1>

          {/* Interactive Author Highlights Legend and Switch for Mobile/Header */}
          <div className="article-highlights-header-toggle" style={{ margin: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", padding: "16px", backgroundColor: "rgba(0,0,0,0.02)", borderRadius: "6px", border: "1px solid var(--border)" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#F3EAD8", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                <span style={{ fontSize: "12px", fontWeight: 500 }}>Original</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#E9E4F2", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                <span style={{ fontSize: "12px", fontWeight: 500 }}>AI-written</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "3px", backgroundColor: "#E2EFE4", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                <span style={{ fontSize: "12px", fontWeight: 500 }}>AI-improved</span>
              </div>
            </div>
            <button 
              onClick={() => setHighlightsActive(!highlightsActive)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                padding: "6px 12px",
                border: "1px solid var(--accent)",
                borderRadius: "4px",
                backgroundColor: highlightsActive ? "var(--accent)" : "transparent",
                color: highlightsActive ? "var(--background)" : "var(--foreground)",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {highlightsActive ? "Hide AI authorship" : "See what was written by AI"}
            </button>
          </div>

          <div className="essay-content">
            <p>
              <strong>Executive Summary:</strong> Enterprise AI leaders (Karp, Srinivas, Nadella) converge on one prescription: enterprises must own their trust boundary, orchestration layer, and learning loop rather than surrender IP to model providers. This article traces what happens after that prescription is followed. First-order effect: firms become intelligence islands, sealed around their positional knowledge. Second-order effect: these islands must still trade — but only outputs can cross, not intelligence, and outputs of agent judgment work are hard to verify, price, and hold accountable. This creates a new research field: agentic trust infrastructure, built on five primitives — identity, authority, recourse, settlement, compliance. Three futures compete to provide it: service orgs (&quot;X for agents&quot;), A2A marketplaces, and open protocols — likely co-existing. Finance already built this stack once, for high-frequency trading; but HFT works inside one jurisdiction, and agents will trade across borders where no single rulebook holds. Conclusion: the reverse information paradox does not disappear — it moves. Whoever owns the window agents trade through owns the next control plane.
            </p>

            <p>Three tech leaders, talking the same point.</p>

            <h2 style={{ fontSize: "1.8rem", margin: "32px 0 16px" }}>
              <Highlight category="original">The control plane (for enterprises) is not in control.</Highlight>
            </h2>

            <p>Here is exact point (TL; DR) from Alex, Aravind &amp; Satya:</p>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px", margin: "20px 0" }}>
              <p>
                <Highlight category="original">
                  <strong>Alex Karp (CNBC Interview):</strong> Enterprises are skeptical about sharing their IP &amp; data w/ model providers which loses the competitive advantage and combination of open source models + application layer (ontology) + compute ( hybrid or sovereign) provides control over frontier model capabilities. Critical deployments require an application layer for safety nets.
                </Highlight>
              </p>
              <p>
                <Highlight category="original">
                  <strong>Aravind Srinivas (CNBC Interview):</strong> LLM is no longer the entire product; the real value lies in the harness and orchestration system. Introduces new metric of &quot;Max token value per watt&quot; as a critical standard for the enterprise focusing on ROI w/ useful results w/ least amount of compute. Advocates sovereignty and control over data by running the open-weight models on the local hardware like Nvidia DGX Spark.
                </Highlight>
              </p>
              <p>
                <Highlight category="original">
                  <strong>Satya Nadella (recent blog, The Reverse Information Paradox):</strong> Enterprises pay for intelligence twice, one w/ money and other w/ IP. The seller learns more about u as u use what u purchased. The solution to this he suggested is 5C: Control. Capability. Choice. Cost. Compound.
                </Highlight>
              </p>
            </div>

            <p>
              <Highlight category="original">
                There is the pattern: Enterprise control planes are shifting from model guardrails to owning the trust boundary (enterprise IP and data), orchestration layer, and learning loop i.e. enterprise knowledge compound over time.
              </Highlight>
            </p>

            <hr className="meta-divider" style={{ margin: "40px 0" }} />

            <h2 style={{ fontSize: "1.8rem", margin: "32px 0 16px" }} id="islands">First-Order Effect: Intelligence Islands</h2>

            <p>
              The first-order effect is: every enterprise follows the 5C and now they have private evals, learning loop, decouple orchestration and hard trust boundaries. Each firm becomes an intelligence island.
            </p>

            <p>
              <Highlight category="ai-written">
                It’s not that every firm will seal everything, general intelligence will stay pooled in frontier models. But every firm will seal what makes it different: pricing, strategy, client data, proprietary workflows. The island is forming but around the positional knowledge.
              </Highlight>
            </p>

            <hr className="meta-divider" style={{ margin: "40px 0" }} />

            <h2 style={{ fontSize: "1.8rem", margin: "32px 0 16px" }} id="challenges">Second-Order Effect: The Seams of Trade</h2>

            <p>
              <Highlight category="ai-improved">
                The second-order effect: these islands still have to trade w/ each other but w/ out sharing the intelligence they sealed in the first order.
              </Highlight>
            </p>

            <p>
              <Highlight category="original">
                <strong>Question: How does Inter-firm communication between agents happen without sharing proprietary knowledge?</strong>
              </Highlight>
            </p>

            <p>
              <Highlight category="ai-written">
                Take a one example, a tata's procurement agent in India negotiating a parts deal w/ Bosch's sales agent in Germany. Neither firm can see inside the other, but the deal must still cross.
              </Highlight>
              {" "}I generated an image from GPT to visualize this:
            </p>

            <figure className="essay-figure">
              <img 
                src="/images/3c1d6912-eb58-4c6f-abaf-0479d3998f9d.png" 
                alt="Two sealed brains. One window. Five questions." 
                className="essay-body-img"
              />
              <figcaption className="essay-figcaption">
                <Highlight category="ai-written">Two sealed brains. One window. Five questions.</Highlight>
              </figcaption>
            </figure>

            <p>
              <Highlight category="original">
                The obvious answer is they will trade outputs, not intelligence.
              </Highlight>
            </p>

            <p>But it comes with its own challenges:</p>
            <ul style={{ listStyleType: "disc", paddingLeft: "24px", margin: "16px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <Highlight category="original">how do we verify the output without leaking the intelligence?</Highlight>
              </li>
              <li>
                <Highlight category="original">will this output reverse engineer to decode the intelligence?</Highlight>
              </li>
              <li>
                <Highlight category="original">how do we price the output of these agents?</Highlight>
              </li>
              <li>
                <Highlight category="original">what will be the standard for these agents to communicate with each other?</Highlight>
              </li>
              <li>
                <Highlight category="original">how do we verify the agent's identity?</Highlight>
              </li>
            </ul>

            <p>
              This opens a new research field for innovation, agentic infrastructure which is exciting for academia and engineers to build new solutions.
            </p>

            <p>
              In the second-order world, verification is cheap for output that is verifiable in the real world. A code that passes a test suite. A calculation that u can re-run. etc. This is a value that will have self-verification.
            </p>

            <hr className="meta-divider" style={{ margin: "40px 0" }} />

            <h2 style={{ fontSize: "1.8rem", margin: "32px 0 16px" }} id="three-futures">Three Contending Futures</h2>

            <p>What agents unlock in this world is three futures:</p>

            <h3 style={{ fontSize: "1.4rem", margin: "28px 0 12px" }} id="future-1">
              <Highlight category="original">Future One: New org that provides the &quot;x for agents&quot;</Highlight>
            </h3>
            <p>
              <Highlight category="original">
                Organizations that provide the services for agents, to communicate efficiently between other organizations. This would be the enterprise-inter networking phase of enterprise AI.
              </Highlight>
            </p>

            <figure className="essay-figure">
              <img 
                src="/images/raskarAgenticCommerceApr2026_page-0011.jpg" 
                alt="Enterprise Internetworking - Slide by Prof. Raskar, MIT Media Lab" 
                className="essay-body-img"
              />
              <figcaption className="essay-figcaption">Above slide from Prof. Raskar from MIT Media Lab communicates this future precisely.</figcaption>
            </figure>

            <h3 style={{ fontSize: "1.4rem", margin: "28px 0 12px" }} id="future-2">
              Future Two: A2A Marketplaces
            </h3>
            <p>
              <Highlight category="original">
                This is the capitalistic perspective of the future that we cannot ignore: private players with deep pockets will try to monetize this layer.
              </Highlight>
            </p>
            <p>
              <Highlight category="original">
                We are talking about moving output. Moving vehicles are monetized by toll tax, thinking it will not be done for agents in this marketplace would be a mistake.
              </Highlight>
            </p>
            <p>
              <Highlight category="ai-written">
                But counterargument for this would be a marketplace that sees every agent transaction between firms is itself a new version of the reverse information paradox.
              </Highlight>
            </p>

            <h3 style={{ fontSize: "1.4rem", margin: "28px 0 12px" }} id="future-3">
              Future Three: Open Protocols and Standards
            </h3>
            <p>
              <Highlight category="original">
                Look at TCP/IP perfect architecture that would ever exist ( my opinion not a fact :) ), no single company owns it, but history says that this future arrives at the last.
              </Highlight>
            </p>
            <p>
              <Highlight category="ai-improved">
                Even if a private player moves fast and builds the marketplace this consensus only forms after the marketplace goes beyond cross-border.
              </Highlight>
            </p>

            <p>
              It's not one future we will see, but the co-existence of all three in some form: decentralized marketplaces, with &quot;X for agents&quot; orgs alongside open protocols.
            </p>

            <hr className="meta-divider" style={{ margin: "40px 0" }} />

            <h2 style={{ fontSize: "1.8rem", margin: "32px 0 16px" }} id="finance-hft">The Trust Stack: Lessons from High-Frequency Trading</h2>

            <p>
              <Highlight category="ai-improved">
                All three futures have to solve the same problem: how do two firms trust each other’s agent without seeing inside each other’s island? The trust infrastructure is needed in all three for agent identity, authority, recourse, settlement and compliance.
              </Highlight>
            </p>

            <p>
              And here is the part that gives me the confidence that this stack is buildable: finance already built it once.
            </p>

            <figure className="essay-figure">
              <img 
                src="/images/raskarAgenticCommerceApr2026_page-0012.jpg" 
                alt="HFT Slide" 
                className="essay-body-img"
              />
              <figcaption className="essay-figcaption">
                Look at this another slide from Prof. Raskar. HFT is a working system{" "}
                <strong>where autonomous software from firms that do not trust each other trades at machine speed, all day, every day.</strong>
              </figcaption>
            </figure>

            <p>
              <Highlight category="ai-written">
                Every trust question I raised above has a working answer in one industry. The stack is not science fiction. It is a rebuild.
              </Highlight>
            </p>

            <p>
              <Highlight category="ai-improved">
                But note what HFT has that agentic commerce does not: one regulator, one rulebook, one settlement system.
              </Highlight>
            </p>
            <p>
              <Highlight category="ai-written">
                HFT works because it lives inside a single jurisdiction's walls. Agents will not. They will trade across borders, an agent in India closing a deal with an agent in Germany, where there is no shared court, no shared rulebook, no shared rail.
              </Highlight>
            </p>
            <p>
              <Highlight category="ai-written">
                That is the open research problem: how does trust infrastructure work when no single rulebook holds? A marketplace can internalize trust inside its walls. It cannot internalize a jurisdiction.
              </Highlight>
            </p>

            <hr className="meta-divider" style={{ margin: "40px 0" }} />

            <h2 style={{ fontSize: "1.8rem", margin: "32px 0 16px" }} id="closing">The Next Control Plane</h2>

            <p>
              <Highlight category="ai-written">
                Which brings us back to where we started: the control plane is not in control.
              </Highlight>
            </p>
            <p>
              <Highlight category="ai-written">
                The 5Cs fix the first problem, protecting ur intelligence from model providers. But the moment ur agents start trading with other firms' agents, a new control plane appears: the window they trade through.
              </Highlight>
            </p>
            <p>
              <Highlight category="ai-written">
                Whoever owns that window, a marketplace, a certifier, a protocol owns the terms of ur trade. Sealing ur island was step one. Deciding who controls ur seams is step two, and most organizations have not started thinking about it.
              </Highlight>
            </p>
            <p>
              <Highlight category="ai-written">
                A few questions worth asking inside ur organization (Claude help me generate the questions):
              </Highlight>
            </p>

            <ol style={{ listStyleType: "decimal", paddingLeft: "24px", margin: "16px 0", display: "flex", flexDirection: "column", gap: "8px" }}>
              <li>
                <Highlight category="ai-written">If our agents transact through a marketplace tomorrow, who owns their track record — us or the platform?</Highlight>
              </li>
              <li>
                <Highlight category="ai-written">Can we verify a counterparty agent's identity and mandate today, or are we trusting a logo?</Highlight>
              </li>
              <li>
                <Highlight category="ai-written">When an agent commits us to something it shouldn't have, who is answerable — and is that written anywhere?</Highlight>
              </li>
              <li>
                <Highlight category="ai-written">If our agents' work crosses a border, whose rules bind the deal?</Highlight>
              </li>
              <li>
                <Highlight category="ai-written">We decoupled from model providers. Are we about to couple to a trust provider instead?</Highlight>
              </li>
            </ol>

            <p>
              <Highlight category="ai-written">
                The reverse information paradox does not disappear. It moves. The firms that saw it coming at the model layer should be the first to see it coming at the trust layer.
              </Highlight>
            </p>

            <hr className="meta-divider" style={{ margin: "40px 0" }} id="author-note" />

            <h2 style={{ fontSize: "1.6rem", margin: "32px 0 16px" }}>A note on how this was written</h2>

            <p>
              The core arguments here are mine, developed through my research and thinking.
            </p>
            <p>
              I used AI (Claude) as a thinking partner — to stress-test the reasoning, sharpen the structure, and add supporting points. Some passages were written by the AI and kept because they said it better; they are marked. Some grammar imperfections are left as they are, to preserve the original voice.
            </p>
            <p>
              The button below shows exactly what was original, what was improved, and what was AI-written.
            </p>

            {/* Main Interactive Authorship Attribution Toggle and Legend */}
            <div className="author-auth-toggle-container" style={{ margin: "40px 0", padding: "24px", border: "1.5px dashed var(--border)", borderRadius: "8px", backgroundColor: "rgba(0,0,0,0.02)", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", marginBottom: "16px", color: "var(--muted)", letterSpacing: "0.05em" }}>
                AUTHORSHIP ATTRIBUTION LEGEND
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "24px", flexWrap: "wrap", marginBottom: "24px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "4px", backgroundColor: "#F3EAD8", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>Original (Ankur's ideas)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "4px", backgroundColor: "#E9E4F2", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>AI-written (Claude)</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ width: "16px", height: "16px", borderRadius: "4px", backgroundColor: "#E2EFE4", display: "inline-block", border: "1px solid rgba(0,0,0,0.08)" }} />
                  <span style={{ fontSize: "13px", fontWeight: 500, color: "var(--foreground)" }}>AI-improved (Refined w/ Claude)</span>
                </div>
              </div>
              <button 
                onClick={() => setHighlightsActive(!highlightsActive)}
                className="highlight-toggle-btn"
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  padding: "10px 20px",
                  border: "1.5px solid var(--accent)",
                  borderRadius: "4px",
                  backgroundColor: highlightsActive ? "var(--accent)" : "transparent",
                  color: highlightsActive ? "var(--background)" : "var(--foreground)",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  outline: "none"
                }}
              >
                {highlightsActive ? "Hide AI authorship" : "See what was written by AI"}
              </button>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
