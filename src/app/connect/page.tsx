import React from "react"
import { Metadata } from "next"
import { Navbar } from "@/components/navbar"

export const metadata: Metadata = {
  title: "Connect",
}

export default function ConnectPage() {
  return (
    <>
      <Navbar />

      <div className="wrap" style={{ marginTop: "32px" }}>
        <main style={{ display: "block" }}>
          <div className="connect-section" style={{ marginTop: 0 }}>
            <div className="section-label" style={{ justifyContent: "flex-end", marginTop: 0, marginBottom: "var(--space-md)" }}>
              CONNECT
            </div>
            <ul className="connect-list">
              <li>
                <a href="https://x.com/ankurshn" target="_blank" rel="noopener noreferrer">X</a>
              </li>
              <li>
                <a href="mailto:ankurshinde.dev@gmail.com">Email</a>
              </li>
              <li>
                <a href="https://github.com/ankurshnde" target="_blank" rel="noopener noreferrer">GitHub</a>
              </li>
              <li>
                <a href="https://scholar.google.com/citations?user=0z_bDeoAAAAJ&hl=en" target="_blank" rel="noopener noreferrer">Scholar</a>
              </li>
              <li>
                <a href="https://www.youtube.com/@ankurshnde" target="_blank" rel="noopener noreferrer">YouTube</a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/ankurshinde/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </>
  )
}
