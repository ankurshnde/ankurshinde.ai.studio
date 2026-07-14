"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

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

  return (
    <header className="navbar" style={{ position: "relative" }}>
      <div className="wrap nav-wrap">
        {/* Desktop Navbar Links */}
        <div className="nav-links desktop-only">
          <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Ankur
          </Link>
          <Link href="/publications" className={`nav-link ${pathname === "/publications" ? "active" : ""}`}>
            Publications
          </Link>
          <Link href="/articles" className={`nav-link ${pathname === "/articles" || pathname.startsWith("/blog") ? "active" : ""}`}>
            Articles
          </Link>
          <Link href="/connect" className={`nav-link ${pathname === "/connect" ? "active" : ""}`}>
            Connect
          </Link>
        </div>

        {/* Mobile Navbar Header */}
        <div className="mobile-header mobile-only">
          <Link href="/" className="mobile-brand-link" onClick={() => setIsOpen(false)}>
            Ankur
          </Link>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Full Screen Menu Overlay (Always mounted to enable CSS transitions) */}
      <div className={`mobile-menu-overlay mobile-only ${isOpen ? "active" : ""}`}>
        {/* Overlay Header with Brand & Close Button */}
        <div className="mobile-overlay-header">
          <Link href="/" className="mobile-brand-link" onClick={() => setIsOpen(false)}>
            Ankur
          </Link>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsOpen(false)}
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
            onClick={() => setIsOpen(false)}
          >
            Publications
          </Link>
          <Link 
            href="/articles" 
            className={`mobile-menu-item ${pathname === "/articles" || pathname.startsWith("/blog") ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Articles
          </Link>
          <Link 
            href="/connect" 
            className={`mobile-menu-item ${pathname === "/connect" ? "active" : ""}`}
            onClick={() => setIsOpen(false)}
          >
            Connect
          </Link>
        </div>
      </div>
    </header>
  )
}
