'use client'

export default function WaveBackground({ subtle = false }) {
  const opacity = subtle ? 0.2 : 0.35
  const blur = subtle ? 100 : 80

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Base cream background */}
      <div className="absolute inset-0" style={{ background: '#FFF8E7' }} />

      {/* Animated wave blobs */}
      <div
        className="wave-blob animate-wave-1"
        style={{
          width: 500,
          height: 500,
          background: '#FFB6C1',
          top: '-10%',
          left: '-5%',
          opacity,
          filter: `blur(${blur}px)`,
        }}
      />
      <div
        className="wave-blob animate-wave-2"
        style={{
          width: 400,
          height: 400,
          background: '#FFC0CB',
          top: '20%',
          right: '-10%',
          opacity,
          filter: `blur(${blur}px)`,
        }}
      />
      <div
        className="wave-blob animate-wave-3"
        style={{
          width: 350,
          height: 350,
          background: '#F4C2C2',
          bottom: '10%',
          left: '20%',
          opacity: opacity * 0.8,
          filter: `blur(${blur}px)`,
        }}
      />
      <div
        className="wave-blob animate-wave-1"
        style={{
          width: 300,
          height: 300,
          background: '#FFB6C1',
          bottom: '-5%',
          right: '15%',
          opacity: opacity * 0.6,
          filter: `blur(${blur + 20}px)`,
          animationDelay: '2s',
        }}
      />
      <div
        className="wave-blob animate-wave-2"
        style={{
          width: 250,
          height: 250,
          background: '#FFC0CB',
          top: '60%',
          left: '-8%',
          opacity: opacity * 0.7,
          filter: `blur(${blur}px)`,
          animationDelay: '4s',
        }}
      />
    </div>
  )
}
