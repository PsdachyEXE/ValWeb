'use client'

import { useState, useEffect } from 'react'
import { TamagotchiCharacter } from './TamagotchiSprites'

const WALK_DURATION = 2500 // ms total

export default function WalkingTransition({ onComplete }) {
  const [progress, setProgress] = useState(0) // 0 to 1

  useEffect(() => {
    const startTime = Date.now()

    // Animate progress for scene movement
    const animFrame = () => {
      const elapsed = Date.now() - startTime
      const p = Math.min(elapsed / WALK_DURATION, 1)
      setProgress(p)

      if (p < 1) {
        requestAnimationFrame(animFrame)
      }
    }
    requestAnimationFrame(animFrame)

    // Call onComplete when done
    const timeout = setTimeout(() => {
      if (onComplete) onComplete()
    }, WALK_DURATION)

    return () => {
      clearTimeout(timeout)
    }
  }, [onComplete])

  // Tamagotchi walks from left side toward right
  // Scene slides left (simulating forward movement)
  const tpiX = 10 + progress * 40 // character moves right across viewport (10% -> 50%)

  return (
    <div className="w-full h-screen relative overflow-hidden">
      {/* Ground line */}
      <div
        className="absolute bottom-1/3 left-0 right-0 h-px bg-pink-light opacity-40"
        style={{ background: '#FFB6C1' }}
      />

      {/* Background scenery sliding left */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translateX(${-progress * 60}%)`,
          transition: 'none',
        }}
      >
        {/* Simple landscape dots / shapes */}
        <div className="absolute rounded-full opacity-20" style={{ width: 120, height: 120, background: '#FFB6C1', top: '15%', left: '20%' }} />
        <div className="absolute rounded-full opacity-15" style={{ width: 80, height: 80, background: '#FFC0CB', top: '25%', left: '65%' }} />
        <div className="absolute rounded-full opacity-10" style={{ width: 60, height: 60, background: '#F4C2C2', top: '40%', left: '45%' }} />
        <div className="absolute rounded-full opacity-20" style={{ width: 100, height: 100, background: '#FFB6C1', top: '10%', left: '85%' }} />
        <div className="absolute rounded-full opacity-15" style={{ width: 90, height: 90, background: '#FFC0CB', top: '30%', left: '110%' }} />
      </div>

      {/* Tamagotchi character */}
      <div
        className="absolute"
        style={{
          left: `${tpiX}%`,
          top: '50%',
          transform: 'translate(-50%, -120%)',
          transition: 'none',
        }}
      >
        <TamagotchiCharacter frame="idle" size={88} />
      </div>

      {/* Ground shadow */}
      <div
        className="absolute rounded-full opacity-10"
        style={{
          width: 60,
          height: 12,
          background: '#000',
          left: `${tpiX}%`,
          top: 'calc(50% + 12px)',
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  )
}
