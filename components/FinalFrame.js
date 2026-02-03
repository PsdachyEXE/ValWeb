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

// GMT+9:30 offset in minutes
const TZ_OFFSET_MIN = 9 * 60 + 30

// Returns { year, month (0-based), day, hours, minutes, seconds } in GMT+9:30
function nowInTZ() {
  const utcMs = Date.now()
  const local = new Date(utcMs + TZ_OFFSET_MIN * 60000)
  return {
    year: local.getUTCFullYear(),
    month: local.getUTCMonth(),      // 0-based
    day: local.getUTCDate(),
    hours: local.getUTCHours(),
    minutes: local.getUTCMinutes(),
    seconds: local.getUTCSeconds(),
  }
}

// Target: Feb 14 2026 10:00:00 AM GMT+9:30 → expressed as a UTC timestamp
// Feb 14 2026 10:00 ACST = Feb 14 2026 00:30 UTC
const TARGET_UTC_MS = Date.UTC(2026, 1, 14, 0, 30, 0) // month is 0-based

function computeCountdown() {
  const remaining = TARGET_UTC_MS - Date.now()
  if (remaining <= 0) return null // it's time!
  const totalSeconds = Math.floor(remaining / 1000)
  return {
    days:    Math.floor(totalSeconds / 86400),
    hours:   Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  }
}

export default function FinalFrame() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [countdown, setCountdown] = useState(() => computeCountdown())
  const [todayDay, setTodayDay] = useState(() => nowInTZ().day)

  // Slideshow auto-advance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % SLIDESHOW_PHOTOS.length)
    }, SLIDE_DURATION)
    return () => clearInterval(interval)
  }, [])

  // Countdown tick — also refreshes todayDay each second so the calendar
  // highlights the right day even if the page stays open past midnight
  useEffect(() => {
    const tick = () => {
      setCountdown(computeCountdown())
      setTodayDay(nowInTZ().day)
    }
    tick() // immediate first tick
    const interval = setInterval(tick, 1000)
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
          {/* Horizontal strip: all images in a row, container translates left */}
          <div
            style={{
              display: 'flex',
              width: `${SLIDESHOW_PHOTOS.length * 100}%`,
              height: '100%',
              transform: `translateX(-${(currentSlide / SLIDESHOW_PHOTOS.length) * 100}%)`,
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {SLIDESHOW_PHOTOS.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Memory ${i + 1}`}
                style={{ width: `${100 / SLIDESHOW_PHOTOS.length}%`, height: '100%', objectFit: 'cover' }}
                loading={i <= 1 ? 'eager' : 'lazy'}
                onError={(e) => {
                  if (e.target.src.endsWith('.jpg')) {
                    e.target.src = e.target.src.replace('.jpg', '.svg')
                  }
                }}
              />
            ))}
          </div>

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
              const isToday = day === todayDay
              return (
                <div
                  key={day}
                  className={`h-8 flex items-center justify-center text-sm rounded-full transition-colors
                    ${isHighlight
                      ? 'font-bold text-white'
                      : isToday
                        ? 'font-semibold'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  style={
                    isHighlight
                      ? { background: '#e8818f', color: '#fff', fontWeight: 700 }
                      : isToday
                        ? { background: '#FDE2E4', color: '#e8818f', fontWeight: 600 }
                        : {}
                  }
                >
                  {day}
                </div>
              )
            })}
          </div>

          {/* Countdown */}
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid #f0e0e0' }}>
            {countdown ? (
              <div className="flex justify-center gap-3">
                {[
                  { value: countdown.days,    label: 'Days' },
                  { value: countdown.hours,   label: 'Hrs' },
                  { value: countdown.minutes, label: 'Min' },
                  { value: countdown.seconds, label: 'Sec' },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col items-center">
                    <div
                      className="elegant-text text-xl font-bold"
                      style={{ color: '#e8818f', minWidth: 36, textAlign: 'center' }}
                    >
                      {String(value).padStart(2, '0')}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">{label}</div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="elegant-text text-center text-lg font-semibold" style={{ color: '#e8818f' }}>
                It's today! 💕
              </p>
            )}
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
