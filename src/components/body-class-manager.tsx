"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function BodyClassManager() {
  const pathname = usePathname()

  useEffect(() => {
    if (pathname === "/") {
      document.body.classList.add("home-page")
    } else {
      document.body.classList.remove("home-page")
    }
  }, [pathname])

  return null
}
