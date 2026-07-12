import React from "react"
import { Navbar } from "@/components/navbar"
import { PhotoFrame } from "@/components/photo-frame"
import { ScrambleGreeting } from "@/components/scramble-greeting"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <>
      <Navbar />

      <main>
        <div className="wrap">
          <div className="hero-grid">
            {/* Photo Column */}
            <PhotoFrame />

            {/* Content Column */}
            <div className="hero-content">
              <h1>Ankur Shinde</h1>
              <div className="hero-bio" id="bioText">
                <p>
                  <ScrambleGreeting />! I'm a researcher and engineer working at the intersection of{" "}
                  <strong>agentic and financial infrastructure</strong>.
                </p>
                <p>
                  I'm the Head of Media at{" "}
                  <strong>
                    <a
                      href="http://projectnanda.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bio-link"
                    >
                      Project NANDA
                    </a>
                  </strong>
                  , an initiative for building the open agentic web, started at the{" "}
                  <strong>
                    <a
                      href="https://nanda.mit.edu/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bio-link"
                    >
                      MIT Media Lab
                    </a>
                  </strong>
                  .
                </p>
                <p>
                  I work on <strong>cross-border transactions</strong> between AI agents and the trust
                  systems behind them - the foundation for an open and decentralized marketplace.
                </p>
              </div>
              <div className="action-row">
                {/* LinkedIn Action */}
                <div className="technical-btn-wrap">
                  {/* Architectural Corner Registration Marks */}
                  <div className="btn-corner tl" />
                  <div className="btn-corner tr" />
                  <div className="btn-corner bl" />
                  <div className="btn-corner br" />
                  <a
                    href="https://www.linkedin.com/in/ankurshinde/"
                    className="btn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
