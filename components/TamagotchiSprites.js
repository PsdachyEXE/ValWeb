'use client'

// Each sprite is a 16x16 grid. '#' = black pixel, '.' = transparent
// Sprites are stored as arrays of strings (each string = one row)

const PIXEL = 4 // each logical pixel renders as 4x4 CSS pixels (total 64x64px)

const SPRITES = {
  idle: [
    '........####....',
    '.......######...',
    '......########..',
    '.....##########.',
    '.....##########.',
    '....############',
    '....############',
    '....############',
    '....############',
    '....############',
    '.....##########.',
    '.....##########.',
    '......########..',
    '.......####.....',
    '........##......',
    '................',
  ],
  talking: [
    '........####....',
    '.......######...',
    '......########..',
    '.....##########.',
    '.....##########.',
    '....############',
    '....############',
    '....############',
    '....############',
    '....####..######',
    '.....##########.',
    '.....##########.',
    '......########..',
    '.......####.....',
    '........##......',
    '................',
  ],
  armBehind: [
    '........####....',
    '.......######...',
    '......########..',
    '.....##########.',
    '.....##########.',
    '....############',
    '....############',
    '...#############',
    '...#############',
    '....############',
    '.....##########.',
    '.....##########.',
    '......########..',
    '.......####.....',
    '........##......',
    '................',
  ],
  armExtended: [
    '........####....',
    '.......######...',
    '......########..',
    '.....##########.',
    '.....##########.',
    '....############',
    '...#############',
    '..##############',
    '....############',
    '....############',
    '.....##########.',
    '.....##########.',
    '......########..',
    '.......####.....',
    '........##......',
    '................',
  ],
  walkLeft: [
    '........####....',
    '.......######...',
    '......########..',
    '.....##########.',
    '.....##########.',
    '....############',
    '....############',
    '....############',
    '....############',
    '....############',
    '.....##########.',
    '.....########...',
    '......######....',
    '.......##....##..',
    '........##...##..',
    '................',
  ],
  walkRight: [
    '........####....',
    '.......######...',
    '......########..',
    '.....##########.',
    '.....##########.',
    '....############',
    '....############',
    '....############',
    '....############',
    '....############',
    '.....##########.',
    '......########...',
    '.......######....',
    '..##...##.......',
    '..##...##.......',
    '................',
  ],
  idleStance: [
    '........####....',
    '.......######...',
    '......########..',
    '.....##########.',
    '.....##########.',
    '....############',
    '....############',
    '....############',
    '....############',
    '....############',
    '.....##########.',
    '.....##########.',
    '......########..',
    '..##..####..##..',
    '..##..####..##..',
    '................',
  ],
}

// Bomb sprite: 16x16
const BOMB_SPRITE = [
  '................',
  '........##......',
  '.......####.....',
  '........##......',
  '.......####.....',
  '......######....',
  '.....########...',
  '.....########...',
  '....##########..',
  '....##########..',
  '.....########...',
  '.....########...',
  '......######....',
  '.......####.....',
  '........##......',
  '................',
]

export function renderSpriteToCanvas(spriteData, pixelSize = PIXEL) {
  // Returns a data URL for the sprite
  const size = 16 * pixelSize
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.imageSmoothingEnabled = false
  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = '#1a1a1a'

  spriteData.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      if (row[x] === '#') {
        ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize)
      }
    }
  })
  return canvas.toDataURL()
}

export function TamagotchiCharacter({ frame = 'idle', size = 64, className = '' }) {
  // Render sprite as a grid of divs for crisp pixel art
  const sprite = SPRITES[frame] || SPRITES.idle
  const pixelSize = size / 16

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {sprite.map((row, y) => (
        <div key={y} style={{ display: 'flex', height: pixelSize }}>
          {Array.from(row).map((px, x) => (
            px === '#' ? (
              <div
                key={x}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: '#1a1a1a',
                }}
              />
            ) : (
              <div key={x} style={{ width: pixelSize, height: pixelSize }} />
            )
          ))}
        </div>
      ))}
    </div>
  )
}

export function BombSprite({ size = 48, className = '' }) {
  const pixelSize = size / 16

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {BOMB_SPRITE.map((row, y) => (
        <div key={y} style={{ display: 'flex', height: pixelSize }}>
          {Array.from(row).map((px, x) => (
            px === '#' ? (
              <div
                key={x}
                style={{
                  width: pixelSize,
                  height: pixelSize,
                  backgroundColor: '#222',
                }}
              />
            ) : (
              <div key={x} style={{ width: pixelSize, height: pixelSize }} />
            )
          ))}
        </div>
      ))}
    </div>
  )
}

export { SPRITES, BOMB_SPRITE }
