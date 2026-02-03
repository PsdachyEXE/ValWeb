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

// Possible teleport positions for the No button (as % offsets within the button row)
// Each is [left%, top-offset-px] relative to the button container
const TELEPORT_POSITIONS = [
  { left: '75%', top: '-30px' },
  { left: '10%', top: '20px' },
  { left: '60%', top: '-50px' },
  { left: '5%', top: '-20px' },
  { left: '80%', top: '30px' },
  { left: '25%', top: '-40px' },
  { left: '70%', top: '10px' },
  { left: '15%', top: '-10px' },
]

export default function IntroFrame({ onComplete }) {
  const [messageIndex, setMessageIndex] = useState(0)
  const [showButtons, setShowButtons] = useState(false)
  const [noClickCount, setNoClickCount] = useState(0)
  const [noVisible, setNoVisible] = useState(true)
  const [showBomb, setShowBomb] = useState(false)
  const [bombStyle, setBombStyle] = useState({})
  const [showExplosion, setShowExplosion] = useState(false)
  const [shakeScreen, setShakeScreen] = useState(false)
  const [spriteFrame, setSpriteFrame] = useState('idle')
  const [showHeh, setShowHeh] = useState(false)
  const [showGrrr, setShowGrrr] = useState(false)
  const [noTeleportStyle, setNoTeleportStyle] = useState({})
  const [showHearts, setShowHearts] = useState(false)

  const wrapperRef = useRef(null)
  const charRef = useRef(null)
  const noRef = useRef(null)
  const explosionPosRef = useRef(null) // store explosion position for after No disappears

  const changeSpriteFrame = setSpriteFrame

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

  const handleNoClick = () => {
    const newCount = noClickCount + 1
    setNoClickCount(newCount)

    if (newCount < 4) {
      // Teleport the No button to a random position
      const available = TELEPORT_POSITIONS.filter(
        (p, i) => i !== (noClickCount - 1) // avoid repeating the last position
      )
      const pick = available[Math.floor(Math.random() * available.length)]
      setNoTeleportStyle({ left: pick.left, top: pick.top })
    } else {
      // 4th click: show GRRR!!! then bomb throw
      setShowGrrr(true)
      changeSpriteFrame('armBehind')

      setTimeout(() => {
        changeSpriteFrame('armExtended')
      }, 400)

      // Launch bomb after GRRR has shown
      setTimeout(() => {
        launchBomb()
      }, 700)
    }
  }

  const launchBomb = () => {
    if (!charRef.current || !noRef.current || !wrapperRef.current) {
      // Fallback
      setShowBomb(true)
      setBombStyle({ position: 'absolute', top: -60, left: '60%', transition: 'all 0.8s cubic-bezier(0.25,0.46,0.45,0.94)', pointerEvents: 'none', zIndex: 50 })
      setTimeout(() => triggerExplosion(), 1200)
      return
    }

    const wrapper = wrapperRef.current.getBoundingClientRect()
    const charRect = charRef.current.getBoundingClientRect()
    const noRect = noRef.current.getBoundingClientRect()

    const startX = (charRect.right - wrapper.left) - 10
    const startY = (charRect.top - wrapper.top) + charRect.height / 2
    const endX = (noRect.left + noRect.width / 2) - wrapper.left
    const endY = (noRect.top + noRect.height / 2) - wrapper.top

    // Store explosion position before No button disappears
    explosionPosRef.current = { left: endX - 40, top: endY - 40 }

    setShowBomb(true)
    setBombStyle({
      position: 'absolute',
      left: startX,
      top: startY,
      zIndex: 50,
      transition: 'none',
      pointerEvents: 'none',
    })

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setBombStyle({
          position: 'absolute',
          left: endX - 20,
          top: endY - 20,
          zIndex: 50,
          transition: 'left 0.5s cubic-bezier(0.25,0.46,0.45,0.94), top 0.5s cubic-bezier(0.4,0,0.2,1)',
          pointerEvents: 'none',
        })
      })
    })

    setTimeout(() => triggerExplosion(), 800)
  }

  const triggerExplosion = () => {
    setShowBomb(false)
    setShowExplosion(true)
    setShakeScreen(true)

    setTimeout(() => {
      setNoVisible(false)
      setShowExplosion(false)
    }, 500)

    setTimeout(() => {
      setShakeScreen(false)
    }, 350)

    setTimeout(() => {
      setShowHeh(true)
      setShowGrrr(false)
      changeSpriteFrame('talking')
    }, 700)

    setTimeout(() => {
      changeSpriteFrame('idle')
    }, 1500)
  }

  const handleYesClick = () => {
    setShowHearts(true)
    changeSpriteFrame('happy')
    // Brief pause to enjoy the happy moment, then proceed
    setTimeout(() => {
      if (onComplete) onComplete()
    }, 1200)
  }

  const getExplosionStyle = () => {
    if (explosionPosRef.current) {
      return {
        position: 'absolute',
        left: explosionPosRef.current.left,
        top: explosionPosRef.current.top,
        zIndex: 50,
        pointerEvents: 'none',
      }
    }
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

  // Determine what to show in the textbox
  const getTextboxContent = () => {
    if (showGrrr) {
      return <Typewriter key="grrr" text="GRRR!!!" speed={60} autoStart={true} />
    }
    if (showHeh) {
      return <Typewriter key="heh" text="Heh.." speed={80} autoStart={true} />
    }
    return (
      <Typewriter
        key={messageIndex}
        text={MESSAGES[messageIndex].text}
        speed={50}
        onComplete={handleTypewriterComplete}
      />
    )
  }

  return (
    <div
      className={`w-full max-w-2xl mx-auto px-4 flex flex-col items-center gap-6 relative ${shakeScreen ? 'animate-shake' : ''}`}
      ref={wrapperRef}
    >
      {/* Tamagotchi character — key triggers scale-pop on frame change */}
      <div className="relative" ref={charRef} style={{ width: 96, height: 96 }}>
        <div
          key={spriteFrame}
          className="animate-sprite-pop"
          style={{ width: 96, height: 96 }}
        >
          <TamagotchiCharacter frame={spriteFrame} size={96} />
        </div>

        {/* Floating hearts (shown on Yes click) */}
        {showHearts && <HeartParticles />}
      </div>

      {/* Dialogue textbox */}
      <div className="textbox w-full rounded-lg px-5 py-4 min-h-[80px] flex items-center relative">
        {getTextboxContent()}
      </div>

      {/* Buttons */}
      {showButtons && !showHeh && (
        <div className="flex gap-6 items-center justify-center mt-2 relative" style={{ minHeight: 80 }}>
          <button
            className="fallout-btn fallout-btn-yes px-6 py-3 cursor-pointer hover:brightness-110 active:brightness-90"
            onClick={handleYesClick}
            disabled={showGrrr}
            style={{ fontSize: '11px', opacity: showGrrr ? 0.5 : 1 }}
          >
            Yes
          </button>

          {noVisible && (
            <button
              key={noClickCount}
              ref={noRef}
              className={`fallout-btn fallout-btn-no px-6 py-3 cursor-pointer hover:brightness-110 active:brightness-90${noClickCount > 0 ? ' animate-teleport-pop' : ''}`}
              onClick={handleNoClick}
              style={{
                fontSize: '11px',
                position: noClickCount > 0 ? 'absolute' : 'relative',
                ...noTeleportStyle,
              }}
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

/* Floating pink pixel hearts above the character */
function HeartParticles() {
  // 7 hearts at staggered positions, each floats up and fades
  const hearts = [
    { left: '-30px', delay: '0s', size: 14 },
    { left: '10px',  delay: '0.2s', size: 10 },
    { left: '-50px', delay: '0.4s', size: 18 },
    { left: '30px',  delay: '0.1s', size: 12 },
    { left: '-15px', delay: '0.5s', size: 16 },
    { left: '50px',  delay: '0.3s', size: 10 },
    { left: '-45px', delay: '0.35s', size: 14 },
  ]

  // Pixel heart shape: 5×4 grid
  // '##..##' top row, '######' middle, '.####.' lower, '..##..' tip
  const HEART = [
    [0,1,0,0,1,0],
    [1,1,1,1,1,1],
    [1,1,1,1,1,1],
    [0,1,1,1,1,0],
    [0,0,1,1,0,0],
  ]

  return (
    <div className="absolute" style={{ top: '-10px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 10 }}>
      {hearts.map((h, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: h.left,
            top: 0,
            animation: `heartFloat 1.8s ease-out ${h.delay} forwards`,
          }}
        >
          {HEART.map((row, y) => (
            <div key={y} style={{ display: 'flex' }}>
              {row.map((px, x) => (
                px ? (
                  <div key={x} style={{ width: h.size / 6, height: h.size / 5, backgroundColor: '#ff69b4' }} />
                ) : (
                  <div key={x} style={{ width: h.size / 6, height: h.size / 5 }} />
                )
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

/* Pixel-art explosion burst — hard-edged square blocks, no glow */
function ExplosionParticles() {
  // 24 pixel blocks in a radial pattern. Each is a square with no border-radius.
  // Colors: layered hot palette (white core → yellow → orange → red)
  const COLORS = ['#ffffff', '#ffffff', '#ffee44', '#ffcc00', '#ff8800', '#ff4400', '#ff2200', '#cc1100']
  const particles = Array.from({ length: 24 }, (_, i) => {
    const angle = (i / 24) * 360
    // Alternate distances for a jagged pixel-burst silhouette
    const dist = i % 2 === 0 ? 28 + (i % 6) * 4 : 18 + (i % 5) * 3
    const x = Math.cos((angle * Math.PI) / 180) * dist
    const y = Math.sin((angle * Math.PI) / 180) * dist
    const color = COLORS[i % COLORS.length]
    // Pixel sizes: 4, 6, or 8 px squares
    const size = [6, 8, 4, 6, 8, 4][i % 6]
    return { x, y, color, size }
  })

  // Inner flash: a 5×5 pixel-grid cross shape (white/yellow center)
  const flashPixels = [
    // row, col offsets from center, color
    [0, 0, '#ffffff'], [0, -1, '#ffffff'], [0, 1, '#ffffff'],
    [-1, 0, '#ffffff'], [1, 0, '#ffffff'],
    [0, -2, '#ffee44'], [0, 2, '#ffee44'],
    [-2, 0, '#ffee44'], [2, 0, '#ffee44'],
    [-1, -1, '#ffcc00'], [-1, 1, '#ffcc00'],
    [1, -1, '#ffcc00'], [1, 1, '#ffcc00'],
  ]
  const px = 8 // pixel size for flash grid

  return (
    <div className="relative" style={{ width: 80, height: 80 }}>
      {/* Pixel flash cross — hard squares, scales up then fades */}
      {flashPixels.map((fp, i) => (
        <div
          key={'flash-' + i}
          className="absolute"
          style={{
            left: 40 + fp[1] * px - px / 2,
            top: 40 + fp[0] * px - px / 2,
            width: px,
            height: px,
            backgroundColor: fp[2],
            animation: 'explosion 0.4s ease-out forwards',
            imageRendering: 'pixelated',
          }}
        />
      ))}
      {/* Pixel particles — square blocks flying outward */}
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `explosionParticle 0.5s ease-out forwards`,
            '--tx': `${p.x}px`,
            '--ty': `${p.y}px`,
            transform: 'translate(-50%, -50%)',
            imageRendering: 'pixelated',
          }}
        />
      ))}
    </div>
  )
}
