let audioCtx: AudioContext | null = null

export function playMechanicalClick() {
  if (typeof window === "undefined") return

  try {
    if (!audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext
      audioCtx = new AudioCtxClass()
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume()
    }

    const now = audioCtx.currentTime

    // 1. A short metallic pop (triangle wave) representing mechanical relay switch
    const osc = audioCtx.createOscillator()
    const gainNode = audioCtx.createGain()

    osc.type = "triangle"
    osc.frequency.setValueAtTime(750, now)
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.06)

    gainNode.gain.setValueAtTime(0.08, now)
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.06)

    osc.connect(gainNode)
    gainNode.connect(audioCtx.destination)

    // 2. A crisp bandpass noise burst representing physical contact of stylus or switch
    const bufferSize = audioCtx.sampleRate * 0.025 // 25ms duration
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1
    }

    const noise = audioCtx.createBufferSource()
    noise.buffer = buffer

    const filter = audioCtx.createBiquadFilter()
    filter.type = "bandpass"
    filter.frequency.value = 2200
    filter.Q.value = 6

    const noiseGain = audioCtx.createGain()
    noiseGain.gain.setValueAtTime(0.06, now)
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.025)

    noise.connect(filter)
    filter.connect(noiseGain)
    noiseGain.connect(audioCtx.destination)

    osc.start(now)
    osc.stop(now + 0.06)

    noise.start(now)
    noise.stop(now + 0.025)
  } catch (error) {
    console.warn("Failed to synthesize audio click:", error)
  }
}
