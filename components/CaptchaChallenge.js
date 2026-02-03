'use client'

import { useState, useEffect, useMemo } from 'react'
import { TamagotchiCharacter } from './TamagotchiSprites'
import Typewriter from './Typewriter'

// The 3 correct images (husband material)
const CORRECT_IMAGES = ['me-1.jpg', 'me-2.jpg', 'me-3.jpg']

// 6 dummy images
const DUMMY_IMAGES = [
  'dummy-1.jpg', 'dummy-2.jpg', 'dummy-3.jpg',
  'dummy-4.jpg', 'dummy-5.jpg', 'dummy-6.jpg',
]

// Shuffle array (seeded for consistency per session)
function shuffleArray(arr) {
  const result = [...arr]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

export default function CaptchaChallenge({ onComplete }) {
  const [showDialogue, setShowDialogue] = useState(true)
  const [showCaptcha, setShowCaptcha] = useState(false)
  const [selected, setSelected] = useState(new Set())
  const [status, setStatus] = useState('idle') // idle | correct | incorrect
  const [gridImages, setGridImages] = useState([])
  const [spriteFrame, setSpriteFrame] = useState('idle')

  // Shuffle images on mount
  useEffect(() => {
    const allImages = [...CORRECT_IMAGES, ...DUMMY_IMAGES]
    setGridImages(shuffleArray(allImages))
  }, [])

  const handleDialogueComplete = () => {
    setTimeout(() => {
      setShowDialogue(false)
      setShowCaptcha(true)
    }, 400)
  }

  const toggleSelect = (img) => {
    if (status !== 'idle') return
    setSelected(prev => {
      const next = new Set(prev)
      if (next.has(img)) {
        next.delete(img)
      } else {
        next.add(img)
      }
      return next
    })
  }

  const handleVerify = () => {
    // Check: all 3 correct selected, nothing else
    const correctSet = new Set(CORRECT_IMAGES)
    const isCorrect =
      selected.size === 3 &&
      [...selected].every(img => correctSet.has(img))

    if (isCorrect) {
      setStatus('correct')
      setSpriteFrame('talking')
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 1800)
    } else {
      setStatus('incorrect')
      // Reset after showing error
      setTimeout(() => {
        setSelected(new Set())
        setStatus('idle')
      }, 1200)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto px-4 flex flex-col items-center gap-5">
      {/* Tamagotchi */}
      <TamagotchiCharacter frame={spriteFrame} size={80} />

      {/* Pre-captcha dialogue */}
      {showDialogue && (
        <div className="textbox w-full rounded-lg px-5 py-4">
          <Typewriter
            text="WAIT! Are you human?"
            speed={55}
            onComplete={handleDialogueComplete}
          />
        </div>
      )}

      {/* CAPTCHA grid */}
      {showCaptcha && (
        <div className="w-full">
          {/* CAPTCHA header */}
          <div className="flex items-center gap-3 mb-3 p-3 bg-white rounded-t-lg border-2 border-gray-300 border-b-0">
            <div className="w-10 h-10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-8 h-8 text-gray-600">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                <path d="M12 2 L12 7 M12 17 L12 22 M2 12 L7 12 M17 12 L22 12" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-700">reCAPTCHA</p>
              <p className="text-xs text-gray-500">by Google</p>
            </div>
          </div>

          <div className="bg-white border-2 border-gray-300 rounded-b-lg p-4">
            {/* Instruction */}
            <p className="text-sm text-gray-700 font-medium mb-3 text-center">
              Select all <strong>husband material</strong>
            </p>

            {/* 3x3 Grid */}
            <div className="grid grid-cols-3 gap-1 mb-3">
              {gridImages.map((img, idx) => {
                const isSelected = selected.has(img)
                const isCorrect = CORRECT_IMAGES.includes(img)
                const showCheck = status === 'correct' && isSelected
                const showX = status === 'incorrect' && isSelected && !isCorrect

                return (
                  <div
                    key={idx}
                    className={`captcha-cell rounded aspect-square relative overflow-hidden ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSelect(img)}
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && toggleSelect(img)}
                  >
                    {/* Image placeholder - will show real image if available */}
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ background: isCorrect ? '#ffe0e0' : '#f0f0f0' }}
                    >
                      <img
                        src={`/captcha/${img}`}
                        alt={`captcha image ${idx + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fall back to .svg placeholder if .jpg not found
                          if (e.target.src.endsWith('.jpg')) {
                            e.target.src = e.target.src.replace('.jpg', '.svg')
                          } else {
                            e.target.style.display = 'none'
                          }
                        }}
                      />
                    </div>

                    {/* Selection overlay */}
                    {isSelected && status === 'idle' && (
                      <div className="absolute inset-0 bg-blue-500 bg-opacity-20 flex items-center justify-center">
                        <div className="w-5 h-5 bg-blue-600 rounded-sm flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Success checkmark */}
                    {showCheck && (
                      <div className="absolute inset-0 bg-green-500 bg-opacity-30 flex items-center justify-center">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    )}

                    {/* Error X */}
                    {showX && (
                      <div className="absolute inset-0 bg-red-500 bg-opacity-30 flex items-center justify-center">
                        <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Verify button */}
            <div className="flex justify-end">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-5 py-2 rounded transition-colors"
                onClick={handleVerify}
                disabled={selected.size === 0}
                style={{ minWidth: 44, minHeight: 44 }}
              >
                Verify
              </button>
            </div>

            {/* Status messages */}
            {status === 'correct' && (
              <p className="text-green-600 text-sm font-semibold mt-2 text-center animate-fade-in">
                ✓ Verification successful
              </p>
            )}
            {status === 'incorrect' && (
              <p className="text-red-500 text-sm font-medium mt-2 text-center animate-fade-in">
                ✗ Try again
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
