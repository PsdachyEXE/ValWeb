'use client'

import { useEffect } from 'react'
import { TamagotchiCharacter } from './TamagotchiSprites'

const WALK_DURATION = 2500 // ms before advancing to next stage

export default function WalkingTransition({ onComplete }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (onComplete) onComplete()
    }, WALK_DURATION)

    return () => clearTimeout(timeout)
  }, [onComplete])

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <TamagotchiCharacter frame="idle" size={88} />
    </div>
  )
}
