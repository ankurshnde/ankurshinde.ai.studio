"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { useTheme } from "next-themes"
import { playMechanicalClick } from "@/lib/audio-effects"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  // Scroll lock & open class helper when mobile menu overlay is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
      document.body.classList.add("open-menu")
    } else {
      document.body.style.overflow = ""
      document.body.classList.remove("open-menu")
    }
    return () => {
      document.body.style.overflow = ""
      document.body.classList.remove("open-menu")
    }
  }, [isOpen])

  // Collapse menu if screen is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 900) {
        setIsOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleLinkClick = () => {
    playMechanicalClick()
    setIsOpen(false)
  }

  const toggleTheme = () => {
    playMechanicalClick()
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const [btnText, setBtnText] = useState("0000")
  const [isBtnHovered, setIsBtnHovered] = useState(false)

  useEffect(() => {
    if (!isBtnHovered) {
      setBtnText(theme === "dark" ? "0001" : "0000")
      return
    }

    // Dynamic bit-shift animation on hover/interaction representing binary system state changes
    const frames = theme === "dark"
      ? ["0001", "0001 << 1", "0010 << 1", "0100 << 1", "1000"]
      : ["0000", "0000 << 1", "0000 << 2", "0000 << 3", "0000"]

    let frameIdx = 0
    const interval = setInterval(() => {
      setBtnText(frames[frameIdx % frames.length])
      frameIdx++
    }, 180)

    return () => clearInterval(interval)
  }, [isBtnHovered, theme])

  return (
    <header className="navbar" style={{ position: "relative" }}>
      <div className="wrap nav-wrap">
        {/* Desktop Navbar Links */}
        <div className="nav-links desktop-only" style={{ display: "flex", alignItems: "center", width: "100%" }}>
          <div style={{ display: "flex", gap: "24px" }}>
            <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`} onClick={handleLinkClick}>
              Ankur
            </Link>
            <Link href="/publications" className={`nav-link ${pathname === "/publications" ? "active" : ""}`} onClick={handleLinkClick}>
              Publications
            </Link>
            <Link href="/articles" className={`nav-link ${pathname === "/articles" || pathname.startsWith("/blog") ? "active" : ""}`} onClick={handleLinkClick}>
              Articles
            </Link>
            <Link href="/connect" className={`nav-link ${pathname === "/connect" ? "active" : ""}`} onClick={handleLinkClick}>
              Connect
            </Link>
          </div>

          {/* Blueprint / Vellum Theme Toggle */}
          {mounted && (
            <button
              onClick={toggleTheme}
              onMouseEnter={() => setIsBtnHovered(true)}
              onMouseLeave={() => setIsBtnHovered(false)}
              className="theme-toggle-btn"
              style={{
                marginLeft: "auto",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-body)",
                fontSize: "11px",
                fontWeight: 600,
                letterSpacing: "0.1em",
                color: "var(--muted)",
                padding: "4px 8px",
                textTransform: "uppercase",
              }}
              title="Switch between Vellum (0000) and Blueprint (0001) views"
            >
              [ BIN // {btnText} ]
            </button>
          )}
        </div>

        {/* Mobile Navbar Header */}
        <div className="mobile-header mobile-only" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
          <Link href="/" className="mobile-brand-link" onClick={handleLinkClick}>
            Ankur
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {mounted && (
              <button
                onClick={toggleTheme}
                onMouseEnter={() => setIsBtnHovered(true)}
                onMouseLeave={() => setIsBtnHovered(false)}
                onTouchStart={() => setIsBtnHovered(true)}
                onTouchEnd={() => setIsBtnHovered(false)}
                className="theme-toggle-btn"
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-body)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--muted)",
                }}
              >
                [{btnText}]
              </button>
            )}
            <button 
              className="mobile-menu-toggle" 
              onClick={() => {
                playMechanicalClick()
                setIsOpen(!isOpen)
              }}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Full Screen Menu Overlay (Always mounted to enable CSS transitions) */}
      <div className={`mobile-menu-overlay mobile-only ${isOpen ? "active" : ""}`}>
        {/* Overlay Header with Brand & Close Button */}
        <div className="mobile-overlay-header">
          <Link href="/" className="mobile-brand-link" onClick={handleLinkClick}>
            Ankur
          </Link>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => {
              playMechanicalClick()
              setIsOpen(false)
            }}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Centered Large Navigation Links */}
        <div className="mobile-menu-content">
          <Link 
            href="/publications" 
            className={`mobile-menu-item ${pathname === "/publications" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Publications
          </Link>
          <Link 
            href="/articles" 
            className={`mobile-menu-item ${pathname === "/articles" || pathname.startsWith("/blog") ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Articles
          </Link>
          <Link 
            href="/connect" 
            className={`mobile-menu-item ${pathname === "/connect" ? "active" : ""}`}
            onClick={handleLinkClick}
          >
            Connect
          </Link>
        </div>
      </div>
    </header>
  )
}
