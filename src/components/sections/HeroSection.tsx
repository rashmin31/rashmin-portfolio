'use client'

import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '@/lib/gsap'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)
  const tickerRef = useRef<HTMLDivElement>(null)
  const ohlcRef = useRef<HTMLDivElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let split: InstanceType<typeof SplitText>

    const ctx = gsap.context(() => {
      // Split name into individual characters for the assembly animation
      split = new SplitText(nameRef.current!, { type: 'chars' })

      const tl = gsap.timeline({
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          toggleActions: 'play none restart none',
        },
      })

      // 0. Terminal ticker bar fades in first
      tl.from(tickerRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: 'power3.out',
      })

      // 1. Each character flips up from below — fragmented → assembled
      tl.from(
        split.chars,
        {
          opacity: 0,
          y: 40,
          rotateX: 90,
          transformPerspective: 800,
          stagger: 0.05,
          ease: 'power3.out',
          duration: 0.8,
        },
        '-=0.1'
      )

      // 2. Title fades up after name completes
      tl.from(
        titleRef.current,
        { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )

      // 3. Tagline fades up after title
      tl.from(
        taglineRef.current,
        { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' },
        '-=0.2'
      )

      // 4. OHLC strip + CTAs fade up together
      tl.from(
        [ohlcRef.current, ctaRef.current],
        { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
        '-=0.1'
      )

      // 5. Scroll indicator fades in last
      tl.from(
        scrollIndicatorRef.current,
        { opacity: 0, y: 10, duration: 0.5, ease: 'power3.out' },
        '-=0.1'
      )
    }, sectionRef)

    return () => {
      split?.revert()
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden px-6"
    >
      {/* ── Terminal ticker header bar ── */}
      <div
        ref={tickerRef}
        className="w-full max-w-2xl mb-8 flex items-center justify-between px-4 py-2 border border-muted/60 rounded font-mono text-xs bg-surface/40 backdrop-blur-sm"
      >
        <div className="flex items-center gap-3">
          <span className="text-text-primary font-bold tracking-wider">RASHM</span>
          <span className="text-[#26a69a]">▲ +247.5%</span>
          <span className="text-muted">since 2017</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#26a69a] animate-pulse" />
          <span className="text-[#26a69a] tracking-widest">AVAILABLE</span>
        </div>
      </div>

      {/* ── Name — character-level animation target ── */}
      <h1
        ref={nameRef}
        className="font-display text-[clamp(1.4rem,9vw,6rem)] font-bold text-text-primary text-center leading-tight"
      >
        Rashmin Bhanderi
      </h1>

      {/* ── Role title ── */}
      <p
        ref={titleRef}
        className="font-mono text-base md:text-xl text-accent mt-3 text-center tracking-widest uppercase"
      >
        Lead Frontend Engineer
      </p>

      {/* ── Tagline ── */}
      <p
        ref={taglineRef}
        className="font-sans text-sm text-text-secondary mt-2 text-center max-w-md"
      >
        Tech Lead &amp; Full Stack Developer
      </p>

      {/* ── OHLC career strip ── */}
      <div
        ref={ohlcRef}
        className="w-full max-w-2xl mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-3 border border-muted/40 rounded font-mono text-xs bg-surface/30 backdrop-blur-sm"
      >
        <span>
          <span className="text-muted">O:</span>{' '}
          <span className="text-text-secondary">2017</span>
        </span>
        <span className="text-muted/40 hidden sm:inline">|</span>
        <span>
          <span className="text-muted">H:</span>{' '}
          <span className="text-[#26a69a]">TECH LEAD</span>
        </span>
        <span className="text-muted/40 hidden sm:inline">|</span>
        <span>
          <span className="text-muted">L:</span>{' '}
          <span className="text-text-secondary">JUNIOR DEV</span>
        </span>
        <span className="text-muted/40 hidden sm:inline">|</span>
        <span>
          <span className="text-muted">C:</span>{' '}
          <span className="text-[#26a69a]">7Y EXP</span>
        </span>
      </div>

      {/* ── CTAs ── */}
      <div ref={ctaRef} className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <a
          href="mailto:rashminbhanderi@gmail.com"
          data-cursor-hover
          className="px-6 py-3 border border-[#26a69a] text-[#26a69a] font-mono text-sm rounded hover:bg-[#26a69a]/10 transition-all duration-200 tracking-wider"
        >
          OPEN POSITION
        </a>
        <a
          href="#about"
          data-cursor-hover
          className="px-6 py-3 border border-muted text-text-secondary font-mono text-sm rounded hover:border-accent hover:text-accent transition-all duration-200 tracking-wider"
        >
          LOAD CHART ↓
        </a>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted tracking-widest uppercase font-mono">
          scroll to load more data
        </span>
        <ChevronDown />
      </div>
    </section>
  )
}

function ChevronDown() {
  return (
    <svg
      className="animate-bounce text-muted"
      width="20"
      height="12"
      viewBox="0 0 20 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 1L10 10L19 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
