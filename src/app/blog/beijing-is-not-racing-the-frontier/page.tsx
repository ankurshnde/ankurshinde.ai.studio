"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"

export default function BeijingIsNotRacingTheFrontierPage() {
  const [activeSection, setActiveSection] = useState("header")
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isFloatingShareVisible, setIsFloatingShareVisible] = useState(false)
  const [copied, setCopied] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const shareOnX = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(document.title)
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
        "layer-1",
        "layer-2",
        "layer-3",
        "layer-4",
        "layer-5",
        "layer-6",
        "add-up",
        "decide",
        "caveats",
        "references",
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
    { label: "L1: SUBSTRATE", id: "layer-1" },
    { label: "L2: COMPUTE", id: "layer-2" },
    { label: "L3: DATA", id: "layer-3" },
    { label: "L4: MODELS", id: "layer-4" },
    { label: "L5: ORCHESTRATION", id: "layer-5" },
    { label: "L6: DISTRIBUTION", id: "layer-6" },
    { label: "SUMMARY", id: "add-up" },
    { label: "DECISION", id: "decide" },
    { label: "CAVEATS", id: "caveats" },
    { label: "REFERENCES", id: "references" },
  ]

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
          </div>

          {/* Group 2: THE SIX LAYERS */}
          <div className="side-index-category">
            <span className="side-index-cat-title">THE SIX LAYERS</span>
            <div 
              className={`side-index-item ${activeSection === "layer-1" ? "active" : ""}`} 
              onClick={() => scrollToSection("layer-1")}
            >
              <span className="index-title">L1: SUBSTRATE</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "layer-2" ? "active" : ""}`} 
              onClick={() => scrollToSection("layer-2")}
            >
              <span className="index-title">L2: COMPUTE</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "layer-3" ? "active" : ""}`} 
              onClick={() => scrollToSection("layer-3")}
            >
              <span className="index-title">L3: DATA</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "layer-4" ? "active" : ""}`} 
              onClick={() => scrollToSection("layer-4")}
            >
              <span className="index-title">L4: MODELS</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "layer-5" ? "active" : ""}`} 
              onClick={() => scrollToSection("layer-5")}
            >
              <span className="index-title">L5: ORCHESTRATION</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "layer-6" ? "active" : ""}`} 
              onClick={() => scrollToSection("layer-6")}
            >
              <span className="index-title">L6: DISTRIBUTION</span>
            </div>
          </div>

          {/* Group 3: CONCLUSIONS */}
          <div className="side-index-category">
            <span className="side-index-cat-title">CONCLUSIONS</span>
            <div 
              className={`side-index-item ${activeSection === "add-up" ? "active" : ""}`} 
              onClick={() => scrollToSection("add-up")}
            >
              <span className="index-title">SUMMARY</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "decide" ? "active" : ""}`} 
              onClick={() => scrollToSection("decide")}
            >
              <span className="index-title">DECISION</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "caveats" ? "active" : ""}`} 
              onClick={() => scrollToSection("caveats")}
            >
              <span className="index-title">CAVEATS</span>
            </div>
            <div 
              className={`side-index-item ${activeSection === "references" ? "active" : ""}`} 
              onClick={() => scrollToSection("references")}
            >
              <span className="index-title">REFERENCES</span>
            </div>
          </div>

          {/* Side Share inside Card */}
          <div className="side-index-footer">
            <span className="side-index-footer-label">SHARE</span>
            <div className="side-index-footer-icons">
              <button onClick={shareOnX} className="article-icon-action" aria-label="Share on X">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              <button onClick={shareOnLinkedIn} className="article-icon-action" aria-label="Share on LinkedIn">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm12.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/></svg>
              </button>
              <div className="copy-tooltip-container">
                <button onClick={copyArticleLink} className="article-icon-action" aria-label="Copy Link">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
                <span className={`copy-tooltip ${copied ? "visible" : ""}`}>Link copied!</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container essay-container">
        <main id="intro" style={{ display: "block" }}>
          <img 
            src="/images/hero.jpg" 
            alt="Beijing is not racing the frontier. It is building a different contest. Anatomy of China's State of AI." 
            className="essay-hero-img" 
            id="header" 
            style={{ marginBottom: "var(--space-md)" }}
          />

          <div className="article-meta-row">
            <div className="meta-column">
              <span className="meta-label">Written by</span>
              <span className="meta-value">Ankur Shinde</span>
            </div>
            <div className="meta-column">
              <span className="meta-label">Published on</span>
              <span className="meta-value">Jun 24, 2026</span>
            </div>
            <div className="meta-icon-container">
              <button onClick={shareOnX} className="article-icon-action" aria-label="Share on X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              <button onClick={shareOnLinkedIn} className="article-icon-action" aria-label="Share on LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm12.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/></svg>
              </button>
              <div className="copy-tooltip-container">
                <button onClick={copyArticleLink} className="article-icon-action" aria-label="Copy Link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
                <span className={`copy-tooltip ${copied ? "visible" : ""}`}>Link copied!</span>
              </div>
            </div>
          </div>

          <hr className="meta-divider" />

          <h1 className="essay-page-title">Beijing is not racing the frontier</h1>

          <div className="essay-content">
            <p>Most media coverage on China's state of AI asks this question: <strong>whether China is ahead or behind?</strong></p>
            <p>An answer usually comes behind - on chips, and then it will argue about how far. By default it assumes that chips and models are only components in the AI Infrastructure.</p>
            <p>Beijing is not running that race, it’s completely building something different: a vertically aligned stack where each layer is complementing the one above it.</p>
            <p>This article maps China's State of AI as per the following framework:</p>
            
            <img 
              src="/images/image_1.png" 
              alt="Anatomy of China's State of AI Framework: Substrate, Compute, Data, Models, Orchestration, Distribution" 
              className="essay-hero-img"
            />

            <p>Six layers, the capital, governance and infrastructure running through each, and the one place where the whole design is exposed.</p>
            <p>China leads at no single layer of the frontier. The best American chips remain materially more powerful per unit. The United States still produces more frontier models and commands roughly twenty-three times the private AI investment. Europe writes the most serious governance. India has built the only population-scale public infrastructure of its kind.</p>
            <p>What China has instead is coherence. <strong>Every layer is being built to make the next layer cheaper and harder to disrupt.</strong></p>
            <p>Beijing is betting that one coordinated stack - where the power, chips, data, models, rails, and distribution all follow the same industrial logic - will out-produce a stack of world-leading but uncoordinated parts.</p>
            <p>There is exactly one place where alignment fails to save the design. That place is advanced chips and high-bandwidth memory, and the rest of this analysis builds toward it.</p>

            <h2 id="layer-1">LAYER ONE: SUBSTRATE</h2>
            <p>China generated nearly 10,000 terawatt-hours of electricity in 2024 - more than double United States output of roughly 4,300 terawatt-hours. <a href="#ref-1" className="citation-link">[1]</a></p>
            
            <img 
              src="/images/image_2.png" 
              alt="Electricity production by source, China chart (1985-2025)" 
              className="essay-hero-img"
            />

            <p>The reason China generates twice the power is mainly because it is building <strong>electricity as infrastructure ahead of demand</strong>, growing generation around six percent a year for a decade, while United States demand stayed roughly flat for twenty years and is only now turning up.</p>
            <p>The price gap follows from the same logic. Chinese industrial power ran at about $0.088 per kilowatt-hour in 2024, against a United States industrial average near $0.19 - roughly 2.2 times cheaper - and well below European prices for energy-intensive industry.</p>
            <p>The grid that carries it is a state duopoly: State Grid covers more than eighty percent of the population, China Southern Power Grid covers the manufacturing belt, and six state generators dominate production.</p>
            <p>The strategic point is simple. <strong>Power is the one input China does not import and cannot be sanctioned out of.</strong> It can build generation and ultra-high-voltage transmission fast, without the permitting fights and public opposition that slow the United States and Europe. The "Eastern Data, Western Computing" megaproject routes compute toward eight western hubs sitting next to cheap renewable power, with cumulative investment past 200 billion yuan.</p>
            <p>But energy is necessary, not sufficient. China can almost certainly out-build everyone on the electron layer. The constraint on its AI ambitions sits one layer up - and no amount of cheap power resolves it.</p>

            <h2 id="layer-2">LAYER TWO: COMPUTE</h2>
            <p>This is the chokepoint of the entire stack, so it deserves the most care.</p>
            <p>China is building a parallel hardware stack that deliberately does not run on Nvidia's CUDA. <a href="#ref-2" className="citation-link">[2]</a> <strong>Huawei's Ascend line is the national champion:</strong> roughly 812,000 Ascend chips shipped in 2025, with a 2026 target near 600,000 units of the <a href="#ref-7">910C</a> and projected AI-processor revenue around $12 billion. <a href="#ref-3" className="citation-link">[3]</a> SMIC, the exclusive foundry, manufactures the 910C on an enhanced seven-nanometer process using deep-ultraviolet lithography, at reported yields of twenty to forty percent.</p>
            <p>The moat here is not performance. A December 2025 Council on Foreign Relations analysis found the best United States chips roughly five times more powerful than Huawei's best - a gap that could widen toward seventeen times by 2027. <a href="#ref-4" className="citation-link">[4]</a> Huawei's own roadmap reportedly shows its 2026 Ascend parts with lower total processing performance than the 910C, which analysts read as evidence that SMIC is struggling to scale advanced dies, not improving on them.</p>
            <p>The real moat is captive demand. A national compute-grid plan worth roughly $295 billion mandates around eighty percent domestic chips - a guaranteed market no private buyer could replicate, and one that lets a less competitive product survive and improve under protection. <strong>China is not trying to sell the best accelerator on the open market. It is trying to guarantee that its own accelerator gets bought, deployed, and iterated regardless of how it benchmarks.</strong></p>
            <p>You can see the same sovereignty-over-efficiency logic in the systems. Huawei's <a href="#ref-6">CloudMatrix 384</a> packs 384 Ascend 910C chips across sixteen racks to reach roughly 300 petaflops of dense BF16 compute - about 1.66 times an Nvidia GB200 NVL72. It gets there using around five times the chips, nearly four times the power, and a reported price near $8 million, <strong>roughly triple the comparable Nvidia system.</strong> That is not a cost-efficient story. It is a "we can build a frontier-class system entirely from parts we control" story, <strong>and the cheap power from layer one is what makes the math survivable.</strong></p>
            <p>Now the chokepoint. The TSMC die-bank that quietly supported Ascend volumes through 2024 and 2025 is exhausted, forcing fully domestic production. And the binding constraint on domestic production is not fab capacity - it is <a href="#ref-5">high-bandwidth memory</a>. <a href="#ref-5" className="citation-link">[5]</a> <a href="#ref-6" className="citation-link">[6]</a> CXMT is projected to make only about two million HBM stacks in 2026. That is enough for somewhere between 250,000 and 300,000 finished Ascend 910C packages. <strong>You can mandate eighty percent domestic chips; you cannot mandate memory you cannot yet manufacture at volume.</strong></p>
            <p>This is the single load-bearing vulnerability in the entire stack. Without extreme-ultraviolet lithography, sub-five-nanometer production at scale is doubtful, and the performance gap at the top of the compute layer may widen before it narrows. <a href="#ref-7" className="citation-link">[7]</a> China is attacking the problem with patient capital - Big Fund III put $47.5 billion toward chokepoints like lithography, tools, and memory - and with software, open-sourcing Huawei's CANN and MindSpore stack by the end of 2026 to chase the four-million-plus developers already inside CUDA. <a href="#ref-8" className="citation-link">[8]</a> <a href="#ref-9" className="citation-link">[9]</a> Whether that closes is the open question on which the whole compounding thesis rests.</p>
            <p>Two numbers tell you when to change your mind: <strong>CXMT's HBM output moving from two million toward five million-plus stacks a year</strong> <a href="#ref-5" className="citation-link">[5]</a>, and <strong>SMIC's large-die yields holding sustainably above fifty percent.</strong> Until both move, the chip layer caps the frontier ambitions of every layer above it.</p>

            <h2 id="layer-3">LAYER THREE: DATA</h2>
            <p>If compute is where China is most exposed, data is where it is most original. This is the layer with no real parallel anywhere.</p>
            <p><strong>China is the only country to have built a national market that treats data as an asset to be listed, priced, and traded.</strong> Data exchanges operate in Shanghai, Beijing, Shenzhen, Guiyang, and Guangzhou; the Shanghai Data Exchange alone listed more than 5,000 data products by 2025. Combined exchange trading was around 87.7 billion yuan in 2022 and is projected to reach 515.6 billion yuan by 2030. <a href="#ref-10" className="citation-link">[10]</a> Public data is typically held by provincial "data groups" - now established in every province except Tibet - that license it to private operators under administrative authorization.</p>
            <p>Read that ownership structure carefully, because it is the whole point. <strong>Data is effectively state-anchored, with usage rights franchised to enterprises.</strong> That is a third model, distinct from American corporate ownership and European individual rights. Governance reflects the same deliberate design: a <a href="#ref-10">National Data Administration</a> handles development and circulation while the Cyberspace Administration of China (CAC) handles security - a clean split between unlocking data value and controlling it.</p>
            <p>The technical expression of this is the "trusted data space," with more than 100 targeted by 2028. <a href="#ref-11" className="citation-link">[11]</a> These architectures <strong>let computation run over data without exposing the underlying records</strong> - provenance, automatic compliance, audit logs - which means the state can put dispersed data silos to work as a tradable factor while keeping surveillance and control intact. That is the bet: <strong>convert fragmented data into national economic input without surrendering oversight.</strong></p>
            <p>For anyone deciding policy, <strong>the contrast matters more than the mechanics.</strong> The European Union treats data as a privacy right - strong protection, no marketplace. The United States leaves it to private markets. India built a consent-based public path through Aadhaar, UPI, ONDC, and the Account Aggregator framework. China is exporting its model through the Digital Silk Road, and the Global South is watching which version to adopt. <strong>This is one of the places where Beijing is, quite literally, writing rules others may inherit.</strong></p>

            <h2 id="layer-4">LAYER FOUR: MODELS</h2>
            <p>Here is where the conventional "China is behind" story most needs correction.</p>
            <p>The model layer is crowded and well-funded: Alibaba's Qwen, backed by a $53 billion three-year plan <a href="#ref-12" className="citation-link">[12]</a>; ByteDance's Doubao; Baidu's ERNIE; Tencent's Hunyuan; and independents including DeepSeek, Moonshot's Kimi, Zhipu, MiniMax, and StepFun. DeepSeek - owned by the hedge fund High-Flyer - is reportedly raising up to $4 billion at a valuation near $50 billion, led by the state National AI Fund. <a href="#ref-13" className="citation-link">[13]</a></p>
            <p>The capital behind these labs is dwarfed by America's. <strong>Stanford's AI Index puts 2024 United States private AI investment at roughly twenty-three times China's - about $285.9 billion against $12.4 billion in the latest reading.</strong> <a href="#ref-13" className="citation-link">[13]</a> The United States also produced 40 notable models in 2024 to China's 15. By the inputs, this is not close.</p>
            <p>By the outputs, it nearly is. Stanford's 2026 Index found the top United States–China model gap narrowed to about 2.7 percent by March 2026. <a href="#ref-14" className="citation-link">[14]</a> On the MMLU benchmark, the American lead shrank from 17.5 points at the end of 2023 to 0.3 points a year later. And <strong>Chinese open-weight models run fifteen to thirty times cheaper than Western peers, with DeepSeek cutting input pricing to fractions of a cent per million tokens.</strong> The consumer price anchor in China is simply zero - Baidu made ERNIE free in April 2025; Doubao has been free since launch - with revenue coming from APIs, cloud bundling, and ads.</p>
            <p>Treat the leaderboard rankings as directional, not precise; benchmarks face contamination and vary by harness. But the direction is unmistakable. China is closing the capability gap fastest exactly where its hardware is weakest - in software and algorithms - and it is winning decisively on cost.</p>
            <p>The governance here reveals the strategy in a single omission. The State Council's "AI Plus" directive, issued in August 2025, sets diffusion targets: more than seventy percent adoption of next-generation smart agents by 2027, more than ninety percent by 2030. <a href="#ref-15" className="citation-link">[15]</a> It says nothing about artificial general intelligence or superintelligence. <strong>China is not framing this as an AGI race. It is framing it as a diffusion-and-application program - get capable-enough, cheap-enough models into everything, as fast as possible.</strong> That is a coherent answer to a chip constraint you cannot immediately solve: if you cannot win at the frontier, win at deployment.</p>
            <p>The contrast with Europe is stark. The EU AI Act's obligations for general-purpose models have applied since August 2025, with enforcement powers and fines reaching three percent of global turnover live from August 2026. Brussels can write the most serious rules in the world. It cannot regulate its way to a model layer.</p>

            <h2 id="layer-5">LAYER FIVE: ORCHESTRATION</h2>
            <p>Now let’s focus on AI-native payments, where the world is writing theory and China is penetrating in their population.</p>
            <p>Ant Group's Alipay launched AI Pay in 2025, then AI Wallet and Token Pay in May 2026. By that month, Alipay AI Pay had surpassed 300 million transactions, including 120 million in a single week in February - the first commercially scaled, AI-native payment rails anywhere. <a href="#ref-16" className="citation-link">[16]</a> <strong>When an autonomous agent buys something, something has to settle the transaction, enforce a spending limit, and carry the trust.</strong> Alipay built the surface where that happens, with partners spanning model labs and consumer brands.</p>
            <p>The governance layer is being privately authored. The "Agentic Commerce Trust Protocol," introduced in January 2026 by Alipay and partners including Taobao and Qwen, is a private-led standard for agent-to-platform transactions, layered on top of the Model Context Protocol. <a href="#ref-17" className="citation-link">[17]</a> Tencent counters with agents built into WeChat.</p>
            <p>The strategic significance is hard to overstate, and it is worth stating in plain terms. <strong>When software executes transactions on a person's behalf, trust in that software becomes the load-bearing problem of the entire agentic economy.</strong> Whoever owns the trusted agentic-payment rail captures the value-settlement layer - the position card networks hold in the West and UPI holds in India, except AI-native and, in China, concentrated in two firms. China is operationalizing the agentic economy first, and it is doing so at the layer where the money moves.</p>

            <h2 id="layer-6">LAYER SIX: DISTRIBUTION</h2>
            <p>The last layer is where the stack meets the public, and China's edge is raw scale.</p>
            <p>Generative-AI users in China reached 515 million in the first half of 2025 - the largest in the world, roughly 36.5 percent adoption, more than doubling in six months <a href="#ref-18" className="citation-link">[18]</a>. Doubao and DeepSeek lead consumer usage; <strong>distribution runs through WeChat, Douyin, and Taobao, each with hundreds of millions of daily users, plus AI-enabled smartphones now exceeding thirty percent of domestic shipments.</strong> Baidu's Apollo Go robotaxis scaled at home and pushed abroad - to Dubai with Uber, to Germany and the United Kingdom with Lyft.</p>
            <p>There is also a softer advantage that compounds quietly. Stanford's Index, citing a 2024 cross-country survey, found 83 percent of Chinese respondents see AI products as more beneficial than harmful, against 39 percent in the United States - roughly a 2.1-times gap. <a href="#ref-13" className="citation-link">[13]</a> <strong>A population that trusts a technology adopts it faster, and adoption is the entire objective of "AI Plus."</strong> Optimism is, in effect, infrastructure.</p>
            <p>The constraint on this layer is external, not internal. The same censorship requirements that satisfy domestic governance limit export appeal in Western markets, and data-residency concerns constrain how far Chinese applications can travel. <strong>The strength is the size of the home market; the weakness is the difficulty of leaving it.</strong></p>

            <h2 id="add-up">WHAT IT ADDS UP TO</h2>
            <p>Lay the six layers side by side and the design becomes legible. <strong>Cheap, state-built power feeds state-directed compute, which draws on a state-organized data market, which supports a state-funded model layer tuned for the lowest-cost diffusion, settled on state-blessed agentic rails, distributed through super-apps into a 515-million-user market - all coordinated by one directive and underwritten by state capital. Each layer subsidizes and de-risks the next.</strong> That is the compounding bet.</p>
            <p>And there is one fault line running through it. Capability gaps at the model layer have nearly closed - about 2.7 percent and shrinking. The gap at the chip layer may widen near-term - roughly five times today, potentially seventeen times by 2027. <strong>China is closing the gap in software faster than in hardware, which means the entire frontier ambition of the stack rests on a single question: can CXMT and SMIC solve high-bandwidth memory and large-die yields at volume?</strong> If they do, the compounding logic closes and the stack becomes self-sustaining. If they do not, the chip layer caps the top of the ambition even as diffusion races ahead underneath it.</p>
            <p>This is why "is China ahead or behind?" is the wrong question. China is behind at the frontier and ahead at diffusion, exposed on silicon and dominant on electrons, original on data governance and dependent on imported lithography - all at once. A single-axis ranking cannot hold that shape.</p>

            <h2 id="decide">FOR THE PEOPLE WHO HAVE TO DECIDE</h2>
            <p>For investors, the read is to separate the durable layers from the contested one. <strong>China's energy, its data-factor market, and its diffusion plays - agentic payments, vertical applications riding super-app distribution - are structurally advantaged and largely insulated from the chip chokepoint.</strong> Frontier-compute self-sufficiency is the contested variable, and the responsible move is to gate exposure on the two metrics that decide it: <strong>HBM output crossing toward five million-plus stacks a year, and SMIC large-die yields holding above fifty percent.</strong> Cross both, and the Ascend supply chain materially de-risks.</p>
            <p>The multipolar gaps worth funding sit outside China entirely. Europe has a thin compute layer - serious capital appetite around Mistral and a sovereign-cloud push, but only around two percent of United States hyperscaler capacity. India has the opposite shape: population-scale public infrastructure and a compute subsidy near one dollar per GPU-hour, constrained by raw compute supply rather than ambition. One needs silicon; the other needs scale. Both are investable for precisely that reason.</p>
            <p>For policymakers, three things follow. Treat grid build-rate as a first-order AI variable, not only a climate one - China's ability to provision power ahead of demand is an industrial input that permitting reform directly affects. <strong>Read export controls as dynamic levers rather than permanent walls; the durable American chokepoints are lithography and high-bandwidth memory, and the durable Chinese chokepoint is refined gallium and rare-earth processing, where China holds around ninety-eight percent of supply, and both sides now wield that leverage tactically.</strong> And study the <a href="https://asiasociety.org/policy-institute/assetizing-trading-franchising-chinas-strategy-building-national-data-economy" target="_blank" rel="noopener noreferrer">data-as-factor architecture as a model</a> to understand and contest, especially for the Global South - because Brussels can regulate, but no one regulates their way to computing supremacy.</p>

            <h2 id="caveats">THE HONEST CAVEATS</h2>
            <p>This is a fast-moving and partly opaque subject, and good analysis says so. Chinese chip pricing, yields, and training-run costs are largely analyst- or leak-based; Huawei and Nvidia publish no data-center chip list prices, so confidence on those figures is genuinely low. Vendor claims - DeepSeek's reported final-run training cost, Huawei's system performance numbers, the model leaderboards - deserve more scrutiny than independently verified anchors like DeepSeek-R1's $294,000 cost published in <em>Nature</em>, or Stanford's investment and capability data. Export-control suspensions are reversible, and regulatory timelines keep shifting. Re-confirm the dates before acting on any of them.</p>
            <p>None of that softens the central conclusion. <strong>China is not trying to win the race everyone else thinks it is running.</strong> It is building AI the way it built high-speed rail and the power grid - as aligned national infrastructure, provisioned ahead of demand, coordinated from the center, and subsidized end to end. Whether that bet pays off comes down to a few million memory stacks and a yield curve on a seven-nanometer line. Everything else is already in place.</p>

            <h2 id="references">REFERENCES</h2>
            <ol className="references-list">
              <li id="ref-1"><a href="https://www.voronoiapp.com/energy/-China-Generated-More-Electricity-in-2024-Than-the-US-EU--India-Combined-5260" target="_blank" rel="noopener noreferrer">China Generated More Electricity in 2024 Than the US, EU, and India Combined</a></li>
              <li id="ref-2"><a href="https://www.reuters.com/world/china/chinese-chipmakers-claim-nearly-half-of-local-market-nvidias-lead-shrinks-idc-2026-04-01/" target="_blank" rel="noopener noreferrer">Chinese chipmakers claim nearly half of local market as Nvidia's lead shrinks</a></li>
              <li id="ref-3"><a href="https://www.tomshardware.com/tech-industry/huawei-expects-12-billion-in-ai-chip-revenue-this-year-as-nvidias-china-market-share-hits-zero" target="_blank" rel="noopener noreferrer">Huawei expects $12 billion in AI chip revenue this year</a></li>
              <li id="ref-4"><a href="https://www.cfr.org/articles/chinas-ai-chip-deficit-why-huawei-cant-catch-nvidia-and-us-export-controls-should-remain" target="_blank" rel="noopener noreferrer">China's AI Chip Deficit: Why Huawei Can't Catch Nvidia</a></li>
              <li id="ref-5"><a href="https://newsletter.semianalysis.com/p/huawei-ascend-production-ramp" target="_blank" rel="noopener noreferrer">SemiAnalysis: Huawei Ascend Production Ramp</a></li>
              <li id="ref-6"><a href="https://wccftech.com/china-new-way-of-breaking-into-nvidias-cuda-moat-isnt-by-building-a-replica/" target="_blank" rel="noopener noreferrer">China's new way of breaking into Nvidia's CUDA moat</a></li>
              <li id="ref-7"><a href="https://www.reuters.com/world/china/how-china-built-its-manhattan-project-rival-west-ai-chips-2025-12-17/" target="_blank" rel="noopener noreferrer">How China built its Manhattan Project rival for AI chips</a></li>
              <li id="ref-8"><a href="https://www.bloomberg.com/news/articles/2025-06-27/china-s-50-billion-chip-fund-switches-tack-to-fight-us-curbs" target="_blank" rel="noopener noreferrer">China's $50 billion chip fund switches tack to fight US curbs</a></li>
              <li id="ref-9"><a href="https://www.reuters.com/technology/china-sets-up-475-bln-state-fund-boost-semiconductor-industry-2024-05-27/" target="_blank" rel="noopener noreferrer">China sets up $47.5 billion state fund to boost semiconductor industry</a></li>
              <li id="ref-10"><a href="https://asiasociety.org/policy-institute/assetizing-trading-franchising-chinas-strategy-building-national-data-economy" target="_blank" rel="noopener noreferrer">Assetizing, Trading, Franchising: China's Strategy for building a National Data Economy</a></li>
              <li id="ref-11"><a href="https://www.scmp.com/news/china/politics/article/3287937/china-aims-more-100-trusted-data-spaces-2028-under-national-action-plan" target="_blank" rel="noopener noreferrer">China aims for more than 100 trusted data spaces by 2028</a></li>
              <li id="ref-12"><a href="https://www.alibabacloud.com/blog/alibaba-to-invest-rmb380-billion-in-ai-and-cloud-infrastructure-over-next-three-years_602007" target="_blank" rel="noopener noreferrer">Alibaba to invest RMB 380 billion in AI and cloud infrastructure</a></li>
              <li id="ref-13"><a href="https://hai.stanford.edu/assets/files/hai_ai-index-report-2024-smaller2.pdf" target="_blank" rel="noopener noreferrer">Stanford HAI AI Index Report 2024</a></li>
              <li id="ref-14"><a href="https://hai.stanford.edu/assets/files/hai_ai-index-report-2026.pdf" target="_blank" rel="noopener noreferrer">Stanford HAI AI Index Report 2026</a></li>
              <li id="ref-15"><a href="https://webiano.digital/china-is-winning-the-ai-deployment-race-while-europe-debates-the-rules/" target="_blank" rel="noopener noreferrer">China is winning the AI deployment race while Europe debates rules</a></li>
              <li id="ref-16"><a href="https://www.businesswire.com/news/home/20260526337824/en/Alipay-Launches-Next-Generation-AI-Payment-Infrastructure-Debuts-AI-Wallet-and-Token-Pay-to-Power-Agentic-Economy" target="_blank" rel="noopener noreferrer">Alipay Launches Next-Generation AI Payment Infrastructure</a></li>
              <li id="ref-17"><a href="https://www.businesswire.com/news/home/20260213770962/en/Alipay-AI-Payment-Exceeds-120-Million-Transactions-in-One-Week-as-Agentic-Commerce-Accelerates-in-China" target="_blank" rel="noopener noreferrer">Alipay AI Payment Exceeds 120 Million Transactions in One Week</a></li>
              <li id="ref-18"><a href="https://www.scmp.com/tech/tech-trends/article/3329667/chinas-generative-ai-user-base-doubles-515-million-6-months" target="_blank" rel="noopener noreferrer">SCMP: China's generative AI user base doubles to 515 million in 6 months</a></li>
            </ol>
          </div>

          <div className="article-bottom-actions">
            <span className="meta-label">Share this article:</span>
            <div className="meta-icon-container">
              <button onClick={shareOnX} className="article-icon-action" aria-label="Share on X">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </button>
              <button onClick={shareOnLinkedIn} className="article-icon-action" aria-label="Share on LinkedIn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm12.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/></svg>
              </button>
              <div className="copy-tooltip-container">
                <button onClick={copyArticleLink} className="article-icon-action" aria-label="Copy Link">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
                </button>
                <span className={`copy-tooltip ${copied ? "visible" : ""}`}>Link copied!</span>
              </div>
            </div>
          </div>

          <Link href="/articles" className="back-link">
            ← Return to Index
          </Link>
        </main>
      </div>

      {/* Floating share bar for mobile/tablet, shown only when scrolling down past header */}
      <div className={`floating-dock-bar ${isFloatingShareVisible ? "visible" : ""}`} id="floating-share">
        <button onClick={shareOnX} className="article-icon-action" aria-label="Share on X">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </button>
        <button onClick={shareOnLinkedIn} className="article-icon-action" aria-label="Share on LinkedIn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" fillRule="evenodd" clipRule="evenodd"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5V5c0-2.761-2.238-5-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm12.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z"/></svg>
        </button>
        <div className="copy-tooltip-container">
          <button onClick={copyArticleLink} className="article-icon-action" aria-label="Copy Link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>
          </button>
          <span className={`copy-tooltip ${copied ? "visible" : ""}`}>Link copied!</span>
        </div>
      </div>
    </>
  )
}
