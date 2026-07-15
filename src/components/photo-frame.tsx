"use client"

import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

export function PhotoFrame() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const cw = 2000
    const ch = cw
    canvas.width = cw
    canvas.height = ch

    let cRect = canvas.getBoundingClientRect()
    let sx = cw / cRect.width
    let sy = ch / cRect.height

    const T = Math.PI * 2
    const m = { x: cw / 2, y: ch / 2, s: 1.5, x2: cw / 2, y2: ch / 2 }

    const xTo = gsap.quickTo(m, "x", { duration: 1, ease: "expo" })
    const yTo = gsap.quickTo(m, "y", { duration: 1, ease: "expo" })
    const sTo = gsap.quickTo(m, "s", { duration: 2, ease: "power2" })

    let boxes: Array<{ x: number; y: number; d: number; s: number }> = []

    const props = {
      img: "/7e615bb7-a451-4fdd-a794-770f2dab21b6.png",
      boxSize: 100, // Slightly smaller grid boxes for higher detail/resolution in halftone dots
      dots: true,
      dotColor: "#C7D8E8", // Beautiful brand accent sky blue for dynamic halftone dots
    }

    ctx.fillStyle = props.dotColor

    const img = new Image()
    img.src = props.img
    let isLoaded = false

    img.onload = () => {
      isLoaded = true
      initImg()
    }

    function initImg() {
      boxes = []
      for (let x = 0; x <= cw; x += props.boxSize) {
        for (let y = 0; y <= ch; y += props.boxSize) {
          boxes.push({ x, y, d: 0, s: 0 })
        }
      }
      gsap.ticker.add(update)
    }

    function update() {
      if (!isLoaded || !ctx || !canvas) return
      const d = Math.hypot(m.x - m.x2, m.y - m.y2)
      sTo(d / cw * 2)
      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, cw, ch)
      boxes.forEach(drawImg)
      if (props.dots) {
        boxes.forEach(drawDots)
      }
    }

    function drawImg(c: { x: number; y: number; d: number; s: number }) {
      if (!ctx) return
      c.d = Math.hypot(c.x - m.x, c.y - m.y)
      c.s = 1 - gsap.utils.clamp(0, 1, c.d / cw / m.s)
      if (c.s < 0.001) return
      let boxScaled = props.boxSize * c.s

      const imgScaleX = img.width / cw
      const imgScaleY = img.height / ch

      const sourceX = (c.x + boxScaled / 2) * imgScaleX
      const sourceY = (c.y + boxScaled / 2) * imgScaleY
      const sourceW = (props.boxSize - boxScaled) * imgScaleX
      const sourceH = (props.boxSize - boxScaled) * imgScaleY

      ctx.drawImage(
        img,
        sourceX,
        sourceY,
        sourceW,
        sourceH,
        c.x,
        c.y,
        props.boxSize,
        props.boxSize
      )
    }

    function drawDots(c: { x: number; y: number; d: number; s: number }) {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(c.x, c.y, props.boxSize * 0.15 * c.s, 0, T)
      ctx.fill()
    }

    const handlePointerMove = (e: PointerEvent) => {
      cRect = canvas.getBoundingClientRect()
      sx = cw / cRect.width
      sy = ch / cRect.height
      m.x2 = (e.clientX - cRect.left) * sx
      m.y2 = (e.clientY - cRect.top) * sy
      xTo(m.x2)
      yTo(m.y2)
    }

    const handleResize = () => {
      cRect = canvas.getBoundingClientRect()
      sx = cw / cRect.width
      sy = ch / cRect.height
    }

    window.addEventListener("resize", handleResize)

    const container = containerRef.current
    if (container) {
      container.addEventListener("pointermove", handlePointerMove)
    }

    return () => {
      window.removeEventListener("resize", handleResize)
      if (container) {
        container.removeEventListener("pointermove", handlePointerMove)
      }
      gsap.ticker.remove(update)
    }
  }, [])

  return (
    <div className="photo-container" ref={containerRef}>
      <div className="technical-frame">
        {/* Architectural Corner Registration Marks */}
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />

        {/* Technical Labels */}
        <div className="crosshair-label top-label">FIG. 1B</div>
        <div className="crosshair-label bottom-label">SCALE 1.0</div>

        {/* The Photo Frame containing Canvas Animation */}
        <div className="photo-frame" style={{ position: "relative" }}>
          <canvas
            ref={canvasRef}
            style={{
              width: "100%",
              height: "100%",
              display: "block",
              backgroundColor: "transparent",
            }}
          />
        </div>
      </div>
    </div>
  )
}
