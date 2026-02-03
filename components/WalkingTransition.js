'use client'

import { useEffect, useMemo } from 'react'
import { TamagotchiCharacter } from './TamagotchiSprites'

const WALK_DURATION = 2500 // ms before advancing to next stage
const CONFETTI_COUNT = 40

// Seeded pseudo-random so SSR and client match (avoids hydration mismatch)
function seededRand(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function generateConfetti() {
  const rand = seededRand(42)
  const pieces = []
  const pinks = ['#ff69b4', '#FFB6C1', '#ff85c2']
  const whites = ['#ffffff', '#fff0f3']

  for (let i = 0; i < CONFETTI_COUNT; i++) {
    const isLeft = i < CONFETTI_COUNT / 2
    // Spread from each corner: 0–35% from edge
    const x = isLeft
      ? rand() * 35
      : 65 + rand() * 35
    const color = rand() < 0.5
      ? pinks[Math.floor(rand() * pinks.length)]
      : whites[Math.floor(rand() * whites.length)]
    const delay = rand() * 1.2 // 0–1.2s stagger
    const duration = 1.8 + rand() * 1.2 // 1.8–3.0s fall
    const size = 4 + Math.floor(rand() * 5) // 4–8px squares
    const rotEnd = (rand() - 0.5) * 720 // ±360deg rotation
    const driftX = (rand() - 0.5) * 60 // ±30px horizontal drift

    pieces.push({ x, color, delay, duration, size, rotEnd, driftX })
  }
  return pieces
}

function Confetti() {
  const pieces = useMemo(() => generateConfetti(), [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {pieces.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: '-10px',
            left: `calc(${p.x}% + ${p.driftX}px)`,
            width: p.size,
            height: p.size,
            background: p.color,
            '--rot': `${p.rotEnd}deg`,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
    </div>
  )
}

export default function WalkingTransition({ onComplete, showConfetti }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onComplete) onComplete()
    }, WALK_DURATION)

    return () => clearTimeout(timeout)
  }, [onComplete])

  return (
    <div className="relative w-full h-screen flex items-center justify-center">
      {showConfetti && <Confetti />}
      <TamagotchiCharacter frame="idle" size={88} />
    </div>
  )
}
