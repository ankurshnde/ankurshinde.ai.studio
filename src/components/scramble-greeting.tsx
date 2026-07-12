"use client"

import React, { useEffect, useRef, useState } from "react"

const hellos = [
  "Hello",         // English
  "नमस्कार",       // Marathi
  "नमस्ते",        // Hindi
  "કેમ છો",        // Gujarati
  "你好",          // Chinese
  
  // All other unique languages (filtered length <= 8)
  "Hallo", "Barev", "Kamisaki", "Salam", "Kaixo", "Вітаю",
  "হ্যালো", "Zdravo", "ဟယ်လို", "Hola", "Kamusta", "Moni", "Ahoj",
  "Hej", "Dia dhuit", "Ola", "Γεια", "Bonjou", "Aloha", "שלום",
  "Nyob zoo", "Szia", "Halló", "Ndewo", "Halo", "Ciao", "Salama",
  "Bongu", "Hei", "Akkam", "سلام", "Cześć", "Olá", "Bună", "Привет", "Talofa",
  "Thobela", "Dumela", "Jambo", "Hallå",
  "Ia Orana", "Lí-hó", "வணக்கம்", "สวัสดี", "Avuxeni", "Merhaba", "Привіт",
  "Salom", "Xin chào", "Helo", "Molo", "Bon die", "Bon dia", "A", "Aiya", "Kaltxì"
].filter(word => word.length <= 8)

export function ScrambleGreeting() {
  const containerRef = useRef<HTMLSpanElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const isHoveredRef = useRef(false)
  const counterRef = useRef(0)

  useEffect(() => {
    isHoveredRef.current = isHovered
  }, [isHovered])

  useEffect(() => {
    let frameRequest: number
    let frame = 0
    let queue: Array<{ from: string; to: string; start: number; end: number; char: string }> = []
    let resolvePromise: () => void

    const chars = '!<>-_\\/[]{}—=+*^?#________'
    const randomChar = () => chars[Math.floor(Math.random() * chars.length)]

    const update = () => {
      let output = ""
      let complete = 0
      for (let i = 0; i < queue.length; i++) {
        let { from, to, start, end, char } = queue[i]
        if (frame >= end) {
          complete++
          output += to
        } else if (frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = randomChar()
            queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = output
      }
      if (complete === queue.length) {
        if (resolvePromise) resolvePromise()
      } else {
        frameRequest = requestAnimationFrame(update)
        frame++
      }
    }

    const startScramble = (newText: string) => {
      const oldText = containerRef.current?.innerText || ""
      const length = Math.max(oldText.length, newText.length)
      queue = []
      for (let i = 0; i < length; i++) {
        const start = Math.floor(Math.random() * 15)
        const end = start + Math.floor(Math.random() * 15)
        queue.push({
          from: oldText[i] || "",
          to: newText[i] || "",
          start,
          end,
          char: "",
        })
      }
      cancelAnimationFrame(frameRequest)
      frame = 0
      update()
      return new Promise<void>((resolve) => {
        resolvePromise = resolve
      })
    }

    // Interval function to cycle greetings
    const cycle = async () => {
      if (!isHoveredRef.current) {
        counterRef.current = (counterRef.current + 1) % hellos.length
        const nextHello = hellos[counterRef.current]
        await startScramble(nextHello)
      }
    }

    // Start auto cycle loop every 2.0s
    const interval = setInterval(cycle, 2000)

    // Run first compile
    startScramble("Hello")

    return () => {
      clearInterval(interval)
      cancelAnimationFrame(frameRequest)
    }
  }, [])

  return (
    <span className="scramble-wrapper">
      <span
        id="scrambleHello"
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Hello
      </span>
    </span>
  )
}
