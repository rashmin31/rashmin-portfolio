#!/usr/bin/env node
/**
 * Generates dark gradient placeholder PNG images for project cards.
 * Uses only Node.js built-ins (zlib, fs, path) — no npm packages required.
 */

const zlib = require('zlib')
const fs = require('fs')
const path = require('path')

// ─── CRC32 (required by PNG spec) ────────────────────────────────────────────
const CRC_TABLE = (() => {
  const table = new Uint32Array(256)
  for (let i = 0; i < 256; i++) {
    let c = i
    for (let j = 0; j < 8; j++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1)
    }
    table[i] = c
  }
  return table
})()

function crc32(buf) {
  let crc = 0xFFFFFFFF
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8)
  }
  return (crc ^ 0xFFFFFFFF) >>> 0
}

// ─── PNG chunk builder ────────────────────────────────────────────────────────
function buildChunk(type, data) {
  const typeBytes = Buffer.from(type, 'ascii')
  const lenBuf = Buffer.alloc(4)
  lenBuf.writeUInt32BE(data.length, 0)
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBytes, data])), 0)
  return Buffer.concat([lenBuf, typeBytes, data, crcBuf])
}

// ─── PNG generator ────────────────────────────────────────────────────────────
function makePNG(width, height, accentR, accentG, accentB) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])

  // IHDR: width, height, 8-bit depth, RGB color type
  const ihdrData = Buffer.alloc(13)
  ihdrData.writeUInt32BE(width, 0)
  ihdrData.writeUInt32BE(height, 4)
  ihdrData[8] = 8 // bit depth
  ihdrData[9] = 2 // color type: RGB (no alpha)
  // bytes 10-12 = 0: compression=deflate, filter=adaptive, interlace=none

  // Image data: filter byte (None=0) + RGB pixels per row
  // Dark background (#050505) with a soft accent glow in the lower-center
  const rawRows = []
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 3)
    row[0] = 0 // filter: None
    const ty = y / (height - 1) // 0 (top) → 1 (bottom)

    for (let x = 0; x < width; x++) {
      const tx = x / (width - 1) // 0 (left) → 1 (right)

      // Base dark gradient: #050505 at top → #121212 at bottom
      const base = 5 + ty * 13

      // Accent glow: soft radial, centered at (50%, 65%)
      const dy = ty - 0.65
      const dx = tx - 0.50
      const dist = Math.sqrt(dx * dx + dy * dy)
      const glow = Math.max(0, 1 - dist * 2.2) * 60

      const r = Math.min(255, Math.round(base + accentR * (glow / 255)))
      const g = Math.min(255, Math.round(base + accentG * (glow / 255)))
      const b = Math.min(255, Math.round(base + accentB * (glow / 255)))

      const off = 1 + x * 3
      row[off] = r
      row[off + 1] = g
      row[off + 2] = b
    }
    rawRows.push(row)
  }

  const raw = Buffer.concat(rawRows)
  const compressed = zlib.deflateSync(raw, { level: 6 })
  const idat = buildChunk('IDAT', compressed)
  const iend = buildChunk('IEND', Buffer.alloc(0))

  return Buffer.concat([sig, buildChunk('IHDR', ihdrData), idat, iend])
}

// ─── Generate ─────────────────────────────────────────────────────────────────
const OUT_DIR = path.join(__dirname, '..', 'public', 'images')
fs.mkdirSync(OUT_DIR, { recursive: true })

const W = 1200
const H = 630

const images = [
  // name              accentR  accentG  accentB  (matches site palette)
  ['tradeflow.png',    99,      102,     241],  // indigo  #6366f1
  ['devmetrics.png',   16,      185,     129],  // emerald #10b981
  ['finfeed.png',      245,     158,     11],   // amber   #f59e0b
  ['portfolio.png',    139,     92,      246],  // purple  #8b5cf6
]

for (const [name, r, g, b] of images) {
  const png = makePNG(W, H, r, g, b)
  const outPath = path.join(OUT_DIR, name)
  fs.writeFileSync(outPath, png)
  console.log(`✓ ${name}  (${(png.length / 1024).toFixed(0)} KB)`)
}

console.log('\nAll placeholder images generated.')
