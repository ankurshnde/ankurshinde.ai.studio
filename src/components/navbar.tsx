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

  const [btnText, setBtnText] = useState("1111")
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isAnimating) {
      setBtnText(theme === "dark" ? "0000" : "1111")
    }
  }, [theme, isAnimating])

  const triggerScramble = (targetText: string) => {
    setIsAnimating(true)
    const chars = "!<>-_\\/[]{}—=+*^?#"
    const length = 4
    let frame = 0
    const maxFrames = 12

    const interval = setInterval(() => {
      if (frame >= maxFrames) {
        setBtnText(targetText)
        setIsAnimating(false)
        clearInterval(interval)
        return
      }

      let scrambled = ""
      for (let i = 0; i < length; i++) {
        if (Math.random() < frame / maxFrames) {
          scrambled += targetText[i]
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      setBtnText(scrambled)
      frame++
    }, 40)
  }

  const toggleTheme = () => {
    playMechanicalClick()
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    triggerScramble(nextTheme === "dark" ? "0000" : "1111")
  }

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
              title="Switch between Vellum (1111) and Blueprint (0000) views"
            >
              [ {btnText} ]
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
