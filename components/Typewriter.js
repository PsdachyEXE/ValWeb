'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

export default function Typewriter({
  text,
  speed = 50,
  onComplete,
  soundUrl = '/sounds/talk.mp3',
  autoStart = true,
}) {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const indexRef = useRef(0)
  const timeoutRef = useRef(null)
  const audioRef = useRef(null)
  const audioCtxRef = useRef(null)

  // Create a short gibberish sound via Web Audio API as fallback
  const playSound = useCallback(() => {
    try {
      if (audioRef.current) {
        audioRef.current.currentTime = 0
        audioRef.current.play().catch(() => {})
        return
      }
      // Fallback: generate a quick blip with Web Audio
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.connect(gain)
      gain.connect(ctx.destination)

      // Random frequency for variety
      osc.frequency.value = 200 + Math.random() * 400
      osc.type = 'square'
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + 0.04)
    } catch (e) {
      // Silent fail - sound is nice-to-have
    }
  }, [])

  useEffect(() => {
    // Try to load the sound file
    try {
      const audio = new Audio(soundUrl)
      audio.preload = 'auto'
      audio.oncanplaythrough = () => {
        audioRef.current = audio
      }
      audio.onerror = () => {
        // Will use Web Audio fallback
      }
    } catch (e) {}

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [soundUrl])

  useEffect(() => {
    if (!autoStart) return
    startTyping()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text, autoStart])

  const startTyping = () => {
    setDisplayedText('')
    indexRef.current = 0
    setIsTyping(true)
    typeNextChar()
  }

  const typeNextChar = () => {
    if (indexRef.current >= text.length) {
      setIsTyping(false)
      if (onComplete) onComplete()
      return
    }

    setDisplayedText(text.slice(0, indexRef.current + 1))
    playSound()
    indexRef.current += 1
    timeoutRef.current = setTimeout(typeNextChar, speed)
  }

  return (
    <span className="pixel-text" style={{ fontSize: '10px', lineHeight: '1.8' }}>
      {displayedText}
      {isTyping && (
        <span className="animate-pulse-slow" style={{ marginLeft: 2 }}>█</span>
      )}
    </span>
  )
}
