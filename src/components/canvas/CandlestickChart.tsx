'use client'

import { useMemo, useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'
import {
  CHART_TOTAL_CANDLES,
  CHART_MA_PERIOD,
  CHART_CANDLE_WIDTH,
  CHART_CANDLE_STEP,
  CHART_ORIGIN_X,
  CHART_Y_MIN,
  CHART_Y_MAX,
  CHART_VOL_Y_BASE,
  CHART_VOL_Y_MAX,
} from '@/lib/constants'
import { lenisStore } from '@/lib/lenis-store'

// ─── Types ────────────────────────────────────────────────────────────────
type TCandleData = {
  open: number
  high: number
  low: number
  close: number
  volume: number  // normalized 0–1
  isBull: boolean
}

// ─── Seeded Pseudo-Random (Mulberry32) ───────────────────────────────────
function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ─── OHLC Data Generation (deterministic) ───────────────────────────────
function generateOHLCData(): TCandleData[] {
  const rand = mulberry32(42)
  const data: TCandleData[] = []
  let close = 100

  for (let i = 0; i < CHART_TOTAL_CANDLES; i++) {
    const upwardBias = 0.4
    const volatility = 3.5
    const change = (rand() - 0.5 + upwardBias * 0.1) * volatility
    const open = close
    close = Math.max(10, open + change)

    const bodySize = Math.abs(close - open)
    const wickMult = rand() * 1.2 + 0.3
    const high = Math.max(open, close) + rand() * bodySize * wickMult
    const low = Math.min(open, close) - rand() * bodySize * wickMult * 0.6
    const volume = 0.3 + rand() * 0.7

    data.push({ open, high, low, close, volume, isBull: close >= open })
  }
  return data
}

// ─── Price Normalization ─────────────────────────────────────────────────
function makePriceToY(data: TCandleData[]) {
  const allPrices = data.flatMap(d => [d.high, d.low])
  const priceMin = Math.min(...allPrices)
  const priceMax = Math.max(...allPrices)
  const range = priceMax - priceMin
  return (price: number) =>
    CHART_Y_MIN + ((price - priceMin) / range) * (CHART_Y_MAX - CHART_Y_MIN)
}

function candleX(index: number): number {
  return CHART_ORIGIN_X + index * CHART_CANDLE_STEP
}

// ─── Easing ──────────────────────────────────────────────────────────────
function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

// ─── Static Grid Geometry ────────────────────────────────────────────────
function buildGridGeometry(data: TCandleData[], priceToY: (p: number) => number) {
  const vertices: number[] = []
  const xLeft = CHART_ORIGIN_X - 0.5
  const xRight = CHART_ORIGIN_X + CHART_TOTAL_CANDLES * CHART_CANDLE_STEP + 0.5

  // Horizontal price levels (6 lines)
  const levels = 6
  for (let i = 0; i < levels; i++) {
    const y = CHART_Y_MIN + (i / (levels - 1)) * (CHART_Y_MAX - CHART_Y_MIN)
    vertices.push(xLeft, y, -0.1, xRight, y, -0.1)
  }

  // Vertical time markers (every ~10 candles)
  for (let i = 0; i < CHART_TOTAL_CANDLES; i += 10) {
    const x = candleX(i)
    vertices.push(x, CHART_Y_MIN - 0.1, -0.1, x, CHART_Y_MAX + 0.1, -0.1)
  }

  // Volume area separator
  vertices.push(
    xLeft, CHART_VOL_Y_MAX - 0.1, -0.1,
    xRight, CHART_VOL_Y_MAX - 0.1, -0.1
  )

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  return geo
}

// ─── Component ───────────────────────────────────────────────────────────
export function CandlestickChart() {
  const data = useMemo(() => generateOHLCData(), [])
  const priceToY = useMemo(() => makePriceToY(data), [data])
  const gridGeo = useMemo(() => buildGridGeometry(data, priceToY), [data, priceToY])

  // ── Shared Materials ──────────────────────────────────────────────────
  const bullMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#26a69a', roughness: 0.3, metalness: 0.1,
  }), [])
  const bearMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ef5350', roughness: 0.3, metalness: 0.1,
  }), [])
  const volBullMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#26a69a', transparent: true, opacity: 0.35,
  }), [])
  const volBearMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#ef5350', transparent: true, opacity: 0.35,
  }), [])
  const gridMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#363c4e', transparent: true, opacity: 0.5,
  }), [])
  const maMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#f59e0b',
  }), [])

  // ── MA Line Object (primitive) ────────────────────────────────────────
  const maLine = useMemo(() => new THREE.Line(), [])

  // ── Dynamic Wick Buffer (pre-allocated) ───────────────────────────────
  const wickGeo = useMemo(() => {
    const positions = new Float32Array(CHART_TOTAL_CANDLES * 2 * 3)
    const geo = new THREE.BufferGeometry()
    const attr = new THREE.BufferAttribute(positions, 3)
    attr.setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('position', attr)
    geo.setDrawRange(0, 0)
    return geo
  }, [])

  const wickMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#d1d4dc', transparent: true, opacity: 0.7,
  }), [])

  // ── MA Line Buffer ────────────────────────────────────────────────────
  const maGeo = useMemo(() => {
    const positions = new Float32Array(CHART_TOTAL_CANDLES * 3)
    const geo = new THREE.BufferGeometry()
    const attr = new THREE.BufferAttribute(positions, 3)
    attr.setUsage(THREE.DynamicDrawUsage)
    geo.setAttribute('position', attr)
    geo.setDrawRange(0, 0)
    return geo
  }, [])

  // Wire geometry + material onto the line object once
  useEffect(() => {
    maLine.geometry = maGeo
    maLine.material = maMat
  }, [maLine, maGeo, maMat])

  // ── Body and Volume Refs ──────────────────────────────────────────────
  const bodyRefs = useRef<(THREE.Mesh | null)[]>(
    Array(CHART_TOTAL_CANDLES).fill(null)
  )
  const volRefs = useRef<(THREE.Mesh | null)[]>(
    Array(CHART_TOTAL_CANDLES).fill(null)
  )

  // ── Pre-compute candle geometry values ───────────────────────────────
  const candleGeom = useMemo(() => data.map(candle => {
    const openY = priceToY(candle.open)
    const closeY = priceToY(candle.close)
    const bodyH = Math.max(0.04, Math.abs(closeY - openY))
    const bodyYBottom = Math.min(openY, closeY)
    const volH = candle.volume * (CHART_VOL_Y_MAX - CHART_VOL_Y_BASE)
    return { openY, closeY, bodyH, bodyYBottom, volH }
  }), [data, priceToY])

  // ── useFrame: scroll-driven animation ────────────────────────────────
  useFrame(() => {
    if (typeof window === 'undefined') return

    // Read scroll progress from Lenis (authoritative source when Lenis is active)
    // Falls back to native window.scrollY if Lenis hasn't initialised yet
    const lenis = lenisStore.get()
    let progress: number
    if (lenis && lenis.limit > 0) {
      progress = lenis.progress
    } else {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      if (scrollable <= 0) return
      progress = window.scrollY / scrollable
    }
    const rawCount = progress * (CHART_TOTAL_CANDLES + 2)
    const visibleCount = Math.min(Math.floor(rawCount), CHART_TOTAL_CANDLES)
    const fraction = easeOutCubic(rawCount - Math.floor(rawCount))

    // Update candle body visibility + scale
    for (let i = 0; i < CHART_TOTAL_CANDLES; i++) {
      const body = bodyRefs.current[i]
      const vol = volRefs.current[i]
      if (!body || !vol) continue

      if (i < visibleCount) {
        body.visible = true
        body.scale.y = 1
        vol.visible = true
        vol.scale.y = 1
      } else if (i === visibleCount) {
        body.visible = fraction > 0.01
        body.scale.y = fraction
        vol.visible = fraction > 0.01
        vol.scale.y = fraction
      } else {
        body.visible = false
        vol.visible = false
      }
    }

    // Update wick geometry (pre-allocated buffer, no realloc)
    const wickPositions = wickGeo.attributes.position as THREE.BufferAttribute
    const wData = wickPositions.array as Float32Array
    const wickCount = Math.min(visibleCount + (fraction > 0.4 ? 1 : 0), CHART_TOTAL_CANDLES)
    for (let i = 0; i < wickCount; i++) {
      const x = candleX(i)
      const base = i * 6
      wData[base + 0] = x;  wData[base + 1] = priceToY(data[i].low);  wData[base + 2] = 0.02
      wData[base + 3] = x;  wData[base + 4] = priceToY(data[i].high); wData[base + 5] = 0.02
    }
    wickPositions.needsUpdate = true
    wickGeo.setDrawRange(0, wickCount * 2)

    // Update MA line
    const maPositions = maGeo.attributes.position as THREE.BufferAttribute
    const mData = maPositions.array as Float32Array
    let maPoints = 0
    const maEnd = Math.min(visibleCount + 1, CHART_TOTAL_CANDLES)
    for (let i = CHART_MA_PERIOD - 1; i < maEnd; i++) {
      // For the forming candle, use interpolated close
      const sliceEnd = i === visibleCount ? visibleCount : i + 1
      let sum = 0
      for (let j = sliceEnd - CHART_MA_PERIOD; j < sliceEnd; j++) {
        const c = j === visibleCount
          ? data[j].open + (data[j].close - data[j].open) * fraction
          : data[j].close
        sum += c
      }
      const avg = sum / CHART_MA_PERIOD
      const base = maPoints * 3
      mData[base + 0] = candleX(i)
      mData[base + 1] = priceToY(avg)
      mData[base + 2] = 0.05
      maPoints++
    }
    maPositions.needsUpdate = true
    maGeo.setDrawRange(0, maPoints)
  })

  // ── Cleanup materials on unmount ─────────────────────────────────────
  useEffect(() => {
    return () => {
      bullMat.dispose(); bearMat.dispose()
      volBullMat.dispose(); volBearMat.dispose()
      gridMat.dispose(); maMat.dispose(); wickMat.dispose()
      gridGeo.dispose(); wickGeo.dispose(); maGeo.dispose()
      maLine.geometry.dispose()
    }
  }, [bullMat, bearMat, volBullMat, volBearMat, gridMat, maMat, wickMat, gridGeo, wickGeo, maGeo, maLine])

  return (
    <group name="candlestick-chart">

      {/* ── Grid ─────────────────────────────────────────────────────── */}
      <lineSegments geometry={gridGeo} material={gridMat} />

      {/* ── Ticker label ─────────────────────────────────────────────── */}
      <Text
        position={[CHART_ORIGIN_X, CHART_Y_MAX + 0.55, 0]}
        fontSize={0.45}
        color="#d1d4dc"
        anchorX="left"
        anchorY="middle"
      >
        RASHM
      </Text>

      {/* ── Wicks (all in one merged lineSegments) ───────────────────── */}
      <lineSegments geometry={wickGeo} material={wickMat} />

      {/* ── MA Line ──────────────────────────────────────────────────── */}
      <primitive object={maLine} />

      {/* ── Candle Bodies ────────────────────────────────────────────── */}
      {data.map((candle, i) => {
        const { bodyH, bodyYBottom } = candleGeom[i]
        const x = candleX(i)
        return (
          <group key={`body-${i}`} position={[x, bodyYBottom, 0]}>
            <mesh
              ref={el => { bodyRefs.current[i] = el }}
              position={[0, bodyH / 2, 0]}
              visible={false}
            >
              <boxGeometry args={[CHART_CANDLE_WIDTH, bodyH, 0.08]} />
              <primitive object={candle.isBull ? bullMat : bearMat} attach="material" />
            </mesh>
          </group>
        )
      })}

      {/* ── Volume Bars ──────────────────────────────────────────────── */}
      {data.map((candle, i) => {
        const { volH } = candleGeom[i]
        const x = candleX(i)
        return (
          <group key={`vol-${i}`} position={[x, CHART_VOL_Y_BASE, 0]}>
            <mesh
              ref={el => { volRefs.current[i] = el }}
              position={[0, volH / 2, 0]}
              visible={false}
            >
              <boxGeometry args={[CHART_CANDLE_WIDTH, volH, 0.04]} />
              <primitive object={candle.isBull ? volBullMat : volBearMat} attach="material" />
            </mesh>
          </group>
        )
      })}

    </group>
  )
}
