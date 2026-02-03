'use client'

import { useState, useRef, useCallback } from 'react'
import { TamagotchiCharacter, BombSprite } from './TamagotchiSprites'
import Typewriter from './Typewriter'

const MESSAGES = [
  { text: 'Hello traveller... its nice to see a.. familiar face..', wait: 1000 },
  { text: 'I have an important message for you!', wait: 1000 },
  { text: 'The lord of the kingdom has announced a request be sent out...', wait: 1000 },
  { text: 'He asks... Will you be my valentine?', wait: null },
]

export default function IntroFrame({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [showButtons, setShowButtons] = useState(false)
  const [noClicked, setNoClicked] = useState(false)
  const [noVisible, setNoVisible] = useState(true)
  const [showBomb, setShowBomb] = useState(false)
  const [bombStyle, setBombStyle] = useState({})
  const [showExplosion, setShowExplosion] = useState(false)
  const [shakeScreen, setShakeScreen] = useState(false)
  const [spriteFrame, setSpriteFrame] = useState('idle')
  const [showHeh, setShowHeh] = useState(false)

  const wrapperRef = useRef(null)
  const charRef = useRef(null)
  const noRef = useRef(null)

  const advanceMessage = useCallback(() => {
    setMessageIndex(prev => {
      const next = prev + 1
      if (next >= MESSAGES.length) {
        setTimeout(() => setShowButtons(true), 600)
        return prev
      }
      return next
    })
  }, [])

  const handleTypewriterComplete = () => {
    const msg = MESSAGES[messageIndex]
    if (msg.wait) {
      setTimeout(advanceMessage, msg.wait)
    }
    if (messageIndex === MESSAGES.length - 1) {
      setTimeout(() => setShowButtons(true), 600)
    }
  }

  // Compute bomb arc using positions of character and No button
  const handleNoClick = () => {
    if (noClicked) return
    setNoClicked(true)
    setSpriteFrame('armBehind')

    setTimeout(() => {
      setSpriteFrame('armExtended')
    }, 300)

    // Calculate positions for bomb arc
    setTimeout(() => {
      if (!charRef.current || !noRef.current || !wrapperRef.current) {
        // Fallback if refs not available
        setShowBomb(true)
        setBombStyle({ top: -60, left: '60%', transition: 'all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)' })
        setTimeout(() => triggerExplosion(), 1200)
        return
      }

      const wrapper = wrapperRef.current.getBoundingClientRect()
      const charRect = charRef.current.getBoundingClientRect()
      const noRect = noRef.current.getBoundingClientRect()

      // Start: right side of character, middle height
      const startX = (charRect.right - wrapper.left) - 10
      const startY = (charRect.top - wrapper.top) + charRect.height / 2

      // End: center of No button
      const endX = (noRect.left + noRect.width / 2) - wrapper.left
      const endY = (noRect.top + noRect.height / 2) - wrapper.top

      // Show bomb at start position
      setShowBomb(true)
      setBombStyle({
        position: 'absolute',
        left: startX,
        top: startY,
        zIndex: 50,
        transition: 'none',
        pointerEvents: 'none',
      })

      // Next frame: animate to end position via arc
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setBombStyle({
            position: 'absolute',
            left: endX - 20, // center the 40px bomb
            top: endY - 20,
            zIndex: 50,
            transition: 'left 0.5s cubic-bezier(0.25,0.46,0.45,0.94), top 0.5s cubic-bezier(0.4,0,0.2,1)',
            pointerEvents: 'none',
          })
        })
      })

      setTimeout(() => triggerExplosion(), 800)
    }, 500)
  }

  const triggerExplosion = () => {
    setShowBomb(false)
    setShowExplosion(true)
    setShakeScreen(true)

    // Hide No button
    setTimeout(() => {
      setNoVisible(false)
      setShowExplosion(false)
    }, 500)

    setTimeout(() => {
      setShakeScreen(false)
    }, 350)

    // Show "Heh.."
    setTimeout(() => {
      setShowHeh(true)
      setSpriteFrame('talking')
    }, 700)

    setTimeout(() => {
      setSpriteFrame('idle')
    }, 1500)
  }

  const handleYesClick = () => {
    if (onComplete) onComplete()
  }

  // Get explosion position (where No button was)
  const getExplosionStyle = () => {
    if (noRef.current && wrapperRef.current) {
      const wrapper = wrapperRef.current.getBoundingClientRect()
      const noRect = noRef.current.getBoundingClientRect()
      return {
        position: 'absolute',
        left: (noRect.left + noRect.width / 2) - wrapper.left - 40,
        top: (noRect.top + noRect.height / 2) - wrapper.top - 40,
        zIndex: 50,
        pointerEvents: 'none',
      }
    }
    return { position: 'absolute', right: 0, top: '-20px', zIndex: 50, pointerEvents: 'none' }
  }

  return (
    <div
      className={`w-full max-w-2xl mx-auto px-4 flex flex-col items-center gap-6 relative ${shakeScreen ? 'animate-shake' : ''}`}
      ref={wrapperRef}
    >
      {/* Tamagotchi character */}
      <div className="relative" ref={charRef}>
        <TamagotchiCharacter frame={spriteFrame} size={96} />
      </div>

      {/* Dialogue textbox */}
      <div className="textbox w-full rounded-lg px-5 py-4 min-h-[80px] flex items-center relative">
        {!showHeh ? (
          <Typewriter
            key={messageIndex}
            text={MESSAGES[messageIndex].text}
            speed={50}
            onComplete={handleTypewriterComplete}
          />
        ) : (
          <Typewriter
            key="heh"
            text="Heh.."
            speed={80}
            autoStart={true}
          />
        )}
      </div>

      {/* Buttons */}
      {showButtons && !showHeh && (
        <div className="flex gap-6 items-center justify-center mt-2">
          <button
            className="fallout-btn fallout-btn-yes px-6 py-3 cursor-pointer hover:brightness-110 active:brightness-90"
            onClick={handleYesClick}
            style={{ fontSize: '11px' }}
          >
            Yes
          </button>

          {noVisible && (
            <button
              ref={noRef}
              className="fallout-btn fallout-btn-no px-6 py-3 cursor-pointer hover:brightness-110 active:brightness-90"
              onClick={handleNoClick}
              disabled={noClicked}
              style={{ fontSize: '11px', opacity: noClicked ? 0.7 : 1 }}
            >
              No
            </button>
          )}
        </div>
      )}

      {/* After explosion: only Yes button with pulse */}
      {showHeh && (
        <div className="flex justify-center mt-2">
          <button
            className="fallout-btn fallout-btn-yes px-8 py-3 cursor-pointer hover:brightness-110 active:brightness-90 animate-pulse-slow"
            onClick={handleYesClick}
            style={{ fontSize: '12px' }}
          >
            Yes
          </button>
        </div>
      )}

      {/* Bomb (absolutely positioned, animated via JS) */}
      {showBomb && (
        <div style={bombStyle}>
          <BombSprite size={40} />
        </div>
      )}

      {/* Explosion overlay */}
      {showExplosion && (
        <div style={getExplosionStyle()}>
          <ExplosionParticles />
        </div>
      )}
    </div>
  )
}

/* Explosion particle burst */
function ExplosionParticles() {
  const particles = Array.from({ length: 14 }, (_, i) => {
    const angle = (i / 14) * 360
    const dist = 25 + (i * 3)
    const x = Math.cos((angle * Math.PI) / 180) * dist
    const y = Math.sin((angle * Math.PI) / 180) * dist
    const colors = ['#FF4444', '#FF8800', '#FFCC00', '#FF6600', '#FFF', '#FF2200']
    const color = colors[i % colors.length]
    const size = 4 + (i % 4) * 3
    return { x, y, color, size }
  })

  return (
    <div className="relative" style={{ width: 80, height: 80 }}>
      {/* Flash */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background: 'radial-gradient(circle, #fff 0%, #ffcc00 40%, #ff6600 70%, transparent 100%)',
          animation: 'explosion 0.4s ease-out forwards',
          boxShadow: '0 0 40px 15px rgba(255,200,0,0.7)',
        }}
      />
      {/* Particles */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: '50%',
            top: '50%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size + 2}px ${p.color}`,
            animation: `explosionParticle 0.5s ease-out forwards`,
            '--tx': `${p.x}px`,
            '--ty': `${p.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        />
      ))}
    </div>
  )
}
