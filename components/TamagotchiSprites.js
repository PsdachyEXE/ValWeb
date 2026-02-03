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

  // ─── ARM BEHIND: left arm tucked behind body, right arm visible as stub ────
  // Body is same width as idle. Left arm merges flush into the left body edge.
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
    '......####################......',  // 20  chin — same as idle
    '......####################......',  // 21
    '........##oooooooooooo##........',  // 22  body top — same as idle
    '........##oooooooooooo##........',  // 23
    '........##oooooooo##oo##........',  // 24  ← left arm gone, right stub stays
    '........##oooooooo##oo##........',  // 25
    '........######oooo######........',  // 26  body bottom
    '........######oooo######........',  // 27
    '..........##oo####oo##..........',  // 28
    '..........##oo####oo##..........',  // 29
    '..........####....####..........',  // 30
    '..........####....####..........',  // 31
  ],

  // ─── ARM EXTENDED: left arm swings out to the right, reaching forward ──────
  // Arm extends from the right side of the body outward (that's the throwing side).
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
    '......####################......',  // 20  chin — same as idle
    '......####################......',  // 21
    '........##oooooooooooo##........',  // 22  body top — same as idle
    '........##oooooooooooo##........',  // 23
    '......##oo##oooooooo##oo##oo##..',  // 24  ← right arm extends out further
    '......##oo##oooooooo##oo##oo##..',  // 25
    '......######oooooooo######......',  // 26  body bottom — same as idle
    '......######oooooooo######......',  // 27
    '..........##oo####oo##..........',  // 28
    '..........##oo####oo##..........',  // 29
    '..........####....####..........',  // 30
    '..........####....####..........',  // 31
  ],

  // ─── HAPPY: closed ^-^ eyes with a cute smile ──────────────────────────────
  // Eyes are arcs: top pixel row is narrow, bottom row is wide → upward curve
  // Smile: a small curved line below the eyes
  happy: [
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
    '....##oooo####oooo####oooo##....',  // 10  ← eye arc tops (narrow peaks)
    '....##oooo####oooo####oooo##....',  // 11
    '....##oo##oooo##oo##oooo##oo##..',  // 12  ← eye arc widens
    '....##oo##oooo##oo##oooo##oo##..',  // 13
    '....##oo####oo##oo##oo####oo##..',  // 14  ← eye arc bottoms (wide spread)
    '....##oo####oo##oo##oo####oo##..',  // 15
    '....##oooooooooooooooooooo##....',  // 16
    '....##oooooooooooooooooooo##....',  // 17
    '....##oooooo##oo##oo##oooo##....',  // 18  ← smile start (wide)
    '....##oooooooo####oooooooo##....',  // 19  ← smile end (narrow center)
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
// Bomb: 20×21 pixelated round bomb with fuse + spark + shine highlight
// '#' = dark body   'o' = shine (white)   '!' = fuse (brown)   '*' = spark (orange glow)
// '.' = transparent
// ---------------------------------------------------------------------------
const BOMB_SPRITE = [
  '.........*...........',  //  0  spark at fuse tip
  '........!!...........',  //  1  fuse
  '........!!...........',  //  2  fuse
  '........!!...........',  //  3  fuse
  '........!!...........',  //  4  fuse base
  '......########.......',  //  5  bomb top (8 wide)
  '.....##########......',  //  6  (10)
  '....############.....',  //  7  (12)
  '...######oo######....',  //  8  ← shine upper-right (2x2)
  '..########oo######...',  //  9  ← shine
  '..################...',  // 10  widest
  '..################...',  // 11
  '..################...',  // 12
  '..################...',  // 13
  '..################...',  // 14
  '...##############....',  // 15
  '....############.....',  // 16
  '.....##########......',  // 17
  '......########.......',  // 18  bomb bottom
  '.....................',  // 19  empty
  '.....................',  // 20  empty
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
  const cols = BOMB_SPRITE[0] ? BOMB_SPRITE[0].length : 21
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
              // Shine highlight — white
              return <div key={x} style={{ width: pixelW, height: pixelH, backgroundColor: '#ffffff' }} />
            }
            if (px === '!') {
              // Fuse — dark brown
              return <div key={x} style={{ width: pixelW, height: pixelH, backgroundColor: '#5d3a1a' }} />
            }
            if (px === '*') {
              // Spark — orange with glow
              return <div key={x} style={{ width: pixelW, height: pixelH, backgroundColor: '#ff8c00', boxShadow: '0 0 4px 2px #ffcc00' }} />
            }
            return <div key={x} style={{ width: pixelW, height: pixelH }} />
          })}
        </div>
      ))}
    </div>
  )
}

export { S as SPRITES, BOMB_SPRITE }
