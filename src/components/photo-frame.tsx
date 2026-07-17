"use client"

import React from "react"

export function PhotoFrame() {
  return (
    <div className="photo-container">
      <div className="technical-frame">
        {/* Architectural Corner Registration Marks */}
        <div className="corner tl" />
        <div className="corner tr" />
        <div className="corner bl" />
        <div className="corner br" />

        {/* Technical Labels */}
        <div className="crosshair-label top-label">FIG. 1B</div>
        <div className="crosshair-label bottom-label">SCALE 1.0</div>

        {/* The Photo Frame containing cross-fading base and hover images */}
        <div className="photo-frame" style={{ position: "relative" }}>
          <img
            src="/7e615bb7-a451-4fdd-a794-770f2dab21b6.png"
            alt="Ankur Shinde"
            className="base-img"
          />
          <img
            src="/ankur_stippled.png"
            alt="Ankur Shinde Hover State"
            className="hover-img"
          />
        </div>
      </div>
    </div>
  )
}
