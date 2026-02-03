'use client'

// 32×32 pixel art sprites rendered as CSS div grids — no canvas, pixel-perfect at any size.
// '#' = black (body)   'o' = white (eyes / mouth)   '.' = transparent
// Every row is exactly 32 characters. Every sprite is exactly 32 rows.

const S = {
  // ─── IDLE ─────────────────────────────────────────────────────────────────
  // Black silhouette with white face / eye interiors. Matched to tamagotchi.png.
  // Head: two ear-bumps + V-notch. Eyes: thick-bordered boxes with pupils.
  // Nose: two center dots. Body: outlined torso with arm-stubs. Feet: two blocks.
  idle: [
    '......######........######......',  //  0  left ear bump
    '......######........######......',  //  1
    '....##########....##########....',  //  2  ears widen
    '....##########....##########....',  //  3
    '....########################....',  //  4  head top (solid black)
    '....########################....',  //  5
    '....########################....',  //  6
    '....########################....',  //  7
    '....##oooooooooooooooooooo##....',  //  8  ← face opens (white interior)
    '....##oooooooooooooooooooo##....',  //  9
    '..##oo######oooooooo######oo##..',  // 10  ← eye-box tops + side cheeks
    '..##oo######oooooooo######oo##..',  // 11
    '..##oo####oo##oooo##oo####oo##..',  // 12  ← eye whites + pupils
    '..##oo####oo##oooo##oo####oo##..',  // 13
    '..##oo####oo##oooo##oo####oo##..',  // 14
    '..##oo####oo##oooo##oo####oo##..',  // 15
    '..##oo######oooooooo######oo##..',  // 16  ← eye-box bottoms
    '..##oo######oooooooo######oo##..',  // 17
    '....##oooooooo####oooooooo##....',  // 18  ← nose (#### = two black dots)
    '....##oooooooo####oooooooo##....',  // 19
    '......####################......',  // 20  chin line (solid)
    '......####################......',  // 21
    '........##oooooooooooo##........',  // 22  body top (outlined)
    '........##oooooooooooo##........',  // 23
    '......##oo##oooooooo##oo##......',  // 24  ← arm-stubs stick out
    '......##oo##oooooooo##oo##......',  // 25
    '......######oooooooo######......',  // 26  body bottom
    '......######oooooooo######......',  // 27
    '..........##oo####oo##..........',  // 28  leg connector
    '..........##oo####oo##..........',  // 29
    '..........####....####..........',  // 30  ← feet
    '..........####....####..........',  // 31
  ],

  // ─── TALKING: chin splits open revealing white mouth gap ───────────────────
  talking: [
    '......######........######......',  //  0
    '......######........######......',  //  1
    '....##########....##########....',  //  2
    '....##########....##########....',  //  3
    '....########################....',  //  4
    '....########################....',  //  5
    '....########################....',  //  6
    '....########################....',  //  7
    '....##oooooooooooooooooooo##....',  //  8
    '....##oooooooooooooooooooo##....',  //  9
    '..##oo######oooooooo######oo##..',  // 10
    '..##oo######oooooooo######oo##..',  // 11
    '..##oo####oo##oooo##oo####oo##..',  // 12
    '..##oo####oo##oooo##oo####oo##..',  // 13
    '..##oo####oo##oooo##oo####oo##..',  // 14
    '..##oo####oo##oooo##oo####oo##..',  // 15
    '..##oo######oooooooo######oo##..',  // 16
    '..##oo######oooooooo######oo##..',  // 17
    '....##oooooooooooooooooooo##....',  // 18  ← nose removed → all white
    '....##oooooooooooooooooooo##....',  // 19
    '......########....########......',  // 20  ← chin split = open mouth
    '......########....########......',  // 21
    '........##oooooooooooo##........',  // 22
    '........##oooooooooooo##........',  // 23
    '......##oo##oooooooo##oo##......',  // 24
    '......##oo##oooooooo##oo##......',  // 25
    '......######oooooooo######......',  // 26
    '......######oooooooo######......',  // 27
    '..........##oo####oo##..........',  // 28
    '..........##oo####oo##..........',  // 29
    '..........####....####..........',  // 30
    '..........####....####..........',  // 31
  ],

  // ─── ARM BEHIND: left arm-stub tucked into body silhouette ─────────────────
  armBehind: [
    '......######........######......',  //  0
    '......######........######......',  //  1
    '....##########....##########....',  //  2
    '....##########....##########....',  //  3
    '....########################....',  //  4
    '....########################....',  //  5
    '....########################....',  //  6
    '....########################....',  //  7
    '....##oooooooooooooooooooo##....',  //  8
    '....##oooooooooooooooooooo##....',  //  9
    '..##oo######oooooooo######oo##..',  // 10
    '..##oo######oooooooo######oo##..',  // 11
    '..##oo####oo##oooo##oo####oo##..',  // 12
    '..##oo####oo##oooo##oo####oo##..',  // 13
    '..##oo####oo##oooo##oo####oo##..',  // 14
    '..##oo####oo##oooo##oo####oo##..',  // 15
    '..##oo######oooooooo######oo##..',  // 16
    '..##oo######oooooooo######oo##..',  // 17
    '....##oooooooo####oooooooo##....',  // 18
    '....##oooooooo####oooooooo##....',  // 19
    '......####################......',  // 20
    '......####################......',  // 21
    '........##oooooooooooo##........',  // 22
    '........##oooooooooooo##........',  // 23
    '......####oooooooo##oo##........',  // 24  ← left arm merged into body
    '......####oooooooo##oo##........',  // 25
    '......######oooooooo######......',  // 26
    '......######oooooooo######......',  // 27
    '..........##oo####oo##..........',  // 28
    '..........##oo####oo##..........',  // 29
    '..........####....####..........',  // 30
    '..........####....####..........',  // 31
  ],

  // ─── ARM EXTENDED: left arm reaches up-left (throwing pose) ───────────────
  armExtended: [
    '......######........######......',  //  0
    '......######........######......',  //  1
    '....##########....##########....',  //  2
    '....##########....##########....',  //  3
    '....########################....',  //  4
    '....########################....',  //  5
    '....########################....',  //  6
    '....########################....',  //  7
    '....##oooooooooooooooooooo##....',  //  8
    '....##oooooooooooooooooooo##....',  //  9
    '..##oo######oooooooo######oo##..',  // 10
    '..##oo######oooooooo######oo##..',  // 11
    '..##oo####oo##oooo##oo####oo##..',  // 12
    '..##oo####oo##oooo##oo####oo##..',  // 13
    '..##oo####oo##oooo##oo####oo##..',  // 14
    '..##oo####oo##oooo##oo####oo##..',  // 15
    '..##oo######oooooooo######oo##..',  // 16
    '..##oo######oooooooo######oo##..',  // 17
    '....##oooooooo####oooooooo##....',  // 18
    '....##oooooooo####oooooooo##....',  // 19
    '......####################......',  // 20
    '......####################......',  // 21
    '....##oo##oooooooooooo##........',  // 22  ← arm extends up-left
    '....##oo##oooooooooooo##........',  // 23
    '..##oo##oo##oooooooo##oo##......',  // 24  ← arm tip reaches further
    '..##oo##oo##oooooooo##oo##......',  // 25
    '......######oooooooo######......',  // 26
    '......######oooooooo######......',  // 27
    '..........##oo####oo##..........',  // 28
    '..........##oo####oo##..........',  // 29
    '..........####....####..........',  // 30
    '..........####....####..........',  // 31
  ],

  // ─── WALK LEFT: feet in stride pose ───────────────────────────────────────
  walkLeft: [
    '......######........######......',  //  0
    '......######........######......',  //  1
    '....##########....##########....',  //  2
    '....##########....##########....',  //  3
    '....########################....',  //  4
    '....########################....',  //  5
    '....########################....',  //  6
    '....########################....',  //  7
    '....##oooooooooooooooooooo##....',  //  8
    '....##oooooooooooooooooooo##....',  //  9
    '..##oo######oooooooo######oo##..',  // 10
    '..##oo######oooooooo######oo##..',  // 11
    '..##oo####oo##oooo##oo####oo##..',  // 12
    '..##oo####oo##oooo##oo####oo##..',  // 13
    '..##oo####oo##oooo##oo####oo##..',  // 14
    '..##oo####oo##oooo##oo####oo##..',  // 15
    '..##oo######oooooooo######oo##..',  // 16
    '..##oo######oooooooo######oo##..',  // 17
    '....##oooooooo####oooooooo##....',  // 18
    '....##oooooooo####oooooooo##....',  // 19
    '......####################......',  // 20
    '......####################......',  // 21
    '........##oooooooooooo##........',  // 22
    '........##oooooooooooo##........',  // 23
    '......##oo##oooooooo##oo##......',  // 24
    '......##oo##oooooooo##oo##......',  // 25
    '......######oooooooo######......',  // 26
    '......######oooooooo######......',  // 27
    '........##oo####..##oo##........',  // 28  ← left leg forward
    '........##oo####..##oo##........',  // 29
    '........####........####........',  // 30  ← feet split wide
    '........####........####........',  // 31
  ],

  // ─── WALK RIGHT: mirrored stride (alternates with walkLeft) ────────────────
  walkRight: [
    '......######........######......',  //  0
    '......######........######......',  //  1
    '....##########....##########....',  //  2
    '....##########....##########....',  //  3
    '....########################....',  //  4
    '....########################....',  //  5
    '....########################....',  //  6
    '....########################....',  //  7
    '....##oooooooooooooooooooo##....',  //  8
    '....##oooooooooooooooooooo##....',  //  9
    '..##oo######oooooooo######oo##..',  // 10
    '..##oo######oooooooo######oo##..',  // 11
    '..##oo####oo##oooo##oo####oo##..',  // 12
    '..##oo####oo##oooo##oo####oo##..',  // 13
    '..##oo####oo##oooo##oo####oo##..',  // 14
    '..##oo####oo##oooo##oo####oo##..',  // 15
    '..##oo######oooooooo######oo##..',  // 16
    '..##oo######oooooooo######oo##..',  // 17
    '....##oooooooo####oooooooo##....',  // 18
    '....##oooooooo####oooooooo##....',  // 19
    '......####################......',  // 20
    '......####################......',  // 21
    '........##oooooooooooo##........',  // 22
    '........##oooooooooooo##........',  // 23
    '......##oo##oooooooo##oo##......',  // 24
    '......##oo##oooooooo##oo##......',  // 25
    '......######oooooooo######......',  // 26
    '......######oooooooo######......',  // 27
    '..........##oo##..####oo##......',  // 28  ← right leg forward
    '..........##oo##..####oo##......',  // 29
    '..........####........####......',  // 30  ← feet split (mirrored)
    '..........####........####......',  // 31
  ],

  // ─── IDLE STANCE: same as idle (used for stationary poses) ─────────────────
  idleStance: [
    '......######........######......',  //  0
    '......######........######......',  //  1
    '....##########....##########....',  //  2
    '....##########....##########....',  //  3
    '....########################....',  //  4
    '....########################....',  //  5
    '....########################....',  //  6
    '....########################....',  //  7
    '....##oooooooooooooooooooo##....',  //  8
    '....##oooooooooooooooooooo##....',  //  9
    '..##oo######oooooooo######oo##..',  // 10
    '..##oo######oooooooo######oo##..',  // 11
    '..##oo####oo##oooo##oo####oo##..',  // 12
    '..##oo####oo##oooo##oo####oo##..',  // 13
    '..##oo####oo##oooo##oo####oo##..',  // 14
    '..##oo####oo##oooo##oo####oo##..',  // 15
    '..##oo######oooooooo######oo##..',  // 16
    '..##oo######oooooooo######oo##..',  // 17
    '....##oooooooo####oooooooo##....',  // 18
    '....##oooooooo####oooooooo##....',  // 19
    '......####################......',  // 20
    '......####################......',  // 21
    '........##oooooooooooo##........',  // 22
    '........##oooooooooooo##........',  // 23
    '......##oo##oooooooo##oo##......',  // 24
    '......##oo##oooooooo##oo##......',  // 25
    '......######oooooooo######......',  // 26
    '......######oooooooo######......',  // 27
    '..........##oo####oo##..........',  // 28
    '..........##oo####oo##..........',  // 29
    '..........####....####..........',  // 30
    '..........####....####..........',  // 31
  ],
}

// ---------------------------------------------------------------------------
// Bomb: 19×20 with a lit fuse
// '#' = dark body   'o' = lit fuse spark (rendered orange)   '.' = transparent
// ---------------------------------------------------------------------------
const BOMB_SPRITE = [
  '...................',  //  0
  '...................',  //  1
  '.........o.........',  //  2  fuse spark
  '........###........',  //  3  fuse
  '........###........',  //  4  fuse
  '.......#####.......',  //  5  bomb top
  '......#######......',  //  6
  '.....#########.....',  //  7
  '....###########....',  //  8
  '...#############...',  //  9
  '...#############...',  // 10
  '..###############..',  // 11
  '..###############..',  // 12
  '...#############...',  // 13
  '...#############...',  // 14
  '....###########....',  // 15
  '.....#########.....',  // 16
  '......#######......',  // 17
  '.......#####.......',  // 18
  '...................',  // 19
]

// ---------------------------------------------------------------------------
// Render component — supports '#' (black), 'o' (white), '.' (transparent)
// ---------------------------------------------------------------------------
export function TamagotchiCharacter({ frame = 'idle', size = 96, className = '' }) {
  const sprite = S[frame] || S.idle
  const cols = sprite[0] ? sprite[0].length : 32
  const rows = sprite.length
  const pixelW = size / cols
  const pixelH = size / rows

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: size, height: size, lineHeight: 0 }}
      aria-hidden="true"
    >
      {sprite.map((row, y) => (
        <div key={y} style={{ display: 'flex', height: pixelH }}>
          {Array.from(row).slice(0, cols).map((px, x) => {
            if (px === '#') {
              return <div key={x} style={{ width: pixelW, height: pixelH, backgroundColor: '#1a1a1a' }} />
            }
            if (px === 'o') {
              return <div key={x} style={{ width: pixelW, height: pixelH, backgroundColor: '#ffffff' }} />
            }
            // transparent
            return <div key={x} style={{ width: pixelW, height: pixelH }} />
          })}
        </div>
      ))}
    </div>
  )
}

export function BombSprite({ size = 60, className = '' }) {
  const cols = BOMB_SPRITE[0] ? BOMB_SPRITE[0].length : 19
  const rows = BOMB_SPRITE.length
  const pixelW = size / cols
  const pixelH = size / rows

  return (
    <div
      className={`inline-block ${className}`}
      style={{ width: size, height: size, lineHeight: 0 }}
      aria-hidden="true"
    >
      {BOMB_SPRITE.map((row, y) => (
        <div key={y} style={{ display: 'flex', height: pixelH }}>
          {Array.from(row).slice(0, cols).map((px, x) => {
            if (px === '#') {
              return <div key={x} style={{ width: pixelW, height: pixelH, backgroundColor: '#1a1a1a' }} />
            }
            if (px === 'o') {
              // Lit fuse spark — orange / yellow glow
              return <div key={x} style={{ width: pixelW, height: pixelH, backgroundColor: '#ff8c00', boxShadow: '0 0 3px 1px #ffcc00' }} />
            }
            return <div key={x} style={{ width: pixelW, height: pixelH }} />
          })}
        </div>
      ))}
    </div>
  )
}

export { S as SPRITES, BOMB_SPRITE }
