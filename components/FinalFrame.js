'use client'

import { useState, useEffect } from 'react'

// Place your real photos as photo-1.jpg through photo-10.jpg in /public/slideshow/
// Placeholders are .svg; real photos should be .jpg/.png
const SLIDESHOW_PHOTOS = Array.from({ length: 10 }, (_, i) => `/slideshow/photo-${i + 1}.jpg`)
const SLIDE_DURATION = 2000 // 2 seconds per photo

// February 2026 calendar data
const FEB_2026 = {
  year: 2026,
  month: 'February',
  // Feb 1 2026 = Sunday = 0
  daysInMonth: 28,
  highlightDay: 14,
}

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function FinalFrame() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slideFading, setSlideFading] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideFading(true)
      setTimeout(() => {
        setCurrentSlide(prev => (prev + 1) % SLIDESHOW_PHOTOS.length)
        setSlideFading(false)
      }, 300)
    }, SLIDE_DURATION)

    return () => clearInterval(interval)
  }, [])

  // Feb 1, 2026 is Sunday = index 0 (0=Sunday)
  const startDayIndex = 0

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 flex flex-col items-center gap-10 animate-fade-in">

      {/* Photo Slideshow */}
      <div className="w-full">
        <div
          className="relative mx-auto rounded-2xl overflow-hidden shadow-lg"
          style={{ maxWidth: 800, aspectRatio: '16/9', background: '#222' }}
        >
          {SLIDESHOW_PHOTOS.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Memory ${i + 1}`}
              className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              style={{ opacity: i === currentSlide ? 1 : 0 }}
              loading={i <= 1 ? 'eager' : 'lazy'}
              onError={(e) => {
                // Fall back to .svg placeholder if .jpg not found
                if (e.target.src.endsWith('.jpg')) {
                  e.target.src = e.target.src.replace('.jpg', '.svg')
                }
              }}
            />
          ))}

          {/* Slide indicators */}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 z-10">
            {SLIDESHOW_PHOTOS.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full transition-colors duration-300"
                style={{
                  background: i === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-16 h-px" style={{ background: '#F4C2C2' }} />

      {/* Date Information Section */}
      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-10">

        {/* Visual Calendar */}
        <div className="bg-white rounded-2xl shadow-md p-6" style={{ minWidth: 260 }}>
          {/* Calendar header */}
          <div className="text-center mb-4">
            <h3 className="elegant-text text-xl font-semibold text-gray-800">
              {FEB_2026.month} {FEB_2026.year}
            </h3>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-gray-400 py-1">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells before the 1st */}
            {Array.from({ length: startDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-8" />
            ))}

            {/* Days */}
            {Array.from({ length: FEB_2026.daysInMonth }, (_, i) => {
              const day = i + 1
              const isHighlight = day === FEB_2026.highlightDay
              return (
                <div
                  key={day}
                  className={`h-8 flex items-center justify-center text-sm rounded-full transition-colors
                    ${isHighlight
                      ? 'font-bold text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  style={isHighlight ? { background: '#e8818f', color: '#fff', fontWeight: 700 } : {}}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>

        {/* Text Date Details */}
        <div className="flex flex-col items-center gap-3 text-center bg-white bg-opacity-70 rounded-2xl px-8 py-6">
          <div>
            <p className="elegant-text text-2xl font-semibold text-gray-800">
              Valentine's Day
            </p>
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="elegant-text text-lg text-gray-600">
              February 14th, 2026
            </p>
            <p className="elegant-text text-lg text-gray-600">
              10:00 AM
            </p>
            <p className="elegant-text text-lg font-semibold" style={{ color: '#e8818f' }}>
              Parap Markets, Darwin
            </p>
          </div>

          {/* Small heart decoration */}
          <div className="mt-2">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 28C16 28 4 20 4 13C4 9.13 7.13 6 11 6C13.2 6 15.1 7.1 16 8.8C16.9 7.1 18.8 6 21 6C24.87 6 28 9.13 28 13C28 20 16 28 16 28Z"
                fill="#FFB6C1"
                stroke="#F4C2C2"
                strokeWidth="1"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
