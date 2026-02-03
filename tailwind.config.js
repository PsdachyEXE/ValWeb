/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFF8E7',
        pink: {
          light: '#FFB6C1',
          DEFAULT: '#FFC0CB',
          dark: '#F4C2C2',
        },
        rose: '#F4C2C2',
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        elegant: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'wave-1': 'wave1 8s ease-in-out infinite',
        'wave-2': 'wave2 10s ease-in-out infinite',
        'wave-3': 'wave3 12s ease-in-out infinite',
        typewriter: 'typewriter 0.05s steps(1) forwards',
        'bomb-arc': 'bombArc 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards',
        'explosion': 'explosion 0.4s ease-out forwards',
        'shake': 'shake 0.3s ease-out',
        'walk-cycle': 'walkCycle 0.3s steps(1) infinite',
        'slide-left': 'slideLeft 2.5s linear forwards',
        'btn-destroy': 'btnDestroy 0.5s ease-out forwards',
        'pulse-slow': 'pulseSlow 2s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-photo': 'slideInPhoto 0.6s ease-out forwards',
      },
      keyframes: {
        wave1: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(-30px) translateY(15px)' },
        },
        wave2: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '50%': { transform: 'translateX(25px) translateY(-10px)' },
        },
        wave3: {
          '0%, 100%': { transform: 'translateX(0) translateY(0)' },
          '33%': { transform: 'translateX(-15px) translateY(20px)' },
          '66%': { transform: 'translateX(20px) translateY(-5px)' },
        },
        bombArc: {
          '0%': {
            transform: 'translate(0, 0) rotate(0deg)',
            opacity: 1,
          },
          '50%': {
            transform: 'translate(var(--bomb-mid-x), -80px) rotate(180deg)',
            opacity: 1,
          },
          '100%': {
            transform: 'translate(var(--bomb-end-x), var(--bomb-end-y)) rotate(360deg)',
            opacity: 1,
          },
        },
        explosion: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(3)', opacity: 0.8 },
          '100%': { transform: 'scale(5)', opacity: 0 },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%': { transform: 'translateX(-10px)' },
          '40%': { transform: 'translateX(10px)' },
          '60%': { transform: 'translateX(-8px)' },
          '80%': { transform: 'translateX(6px)' },
        },
        walkCycle: {
          '0%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-2px)' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100vw)' },
        },
        btnDestroy: {
          '0%': { transform: 'scale(1)', opacity: 1 },
          '50%': { transform: 'scale(1.2)', opacity: 0.6 },
          '100%': { transform: 'scale(0)', opacity: 0 },
        },
        pulseSlow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        slideInPhoto: {
          '0%': { transform: 'translateX(100%)', opacity: 0 },
          '100%': { transform: 'translateX(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}
