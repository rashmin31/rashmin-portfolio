'use client'

import { useEffect, useRef } from 'react'
import { gsap, SplitText } from '@/lib/gsap'

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const titleRef = useRef<HTMLParagraphElement>(null)
  const taglineRef = useRef<HTMLParagraphElement>(null)
  const scrollIndicatorRef = useRef<HTMLDivElement>(null)

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

      // 1. Each character flips up from below — fragmented → assembled
      tl.from(split.chars, {
        opacity: 0,
        y: 40,
        rotateX: 90,
        transformPerspective: 800,
        stagger: 0.05,
        ease: 'power3.out',
        duration: 0.8,
      })

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

      // 4. Scroll indicator fades in last
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
      className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
    >
      {/* Name — character-level animation target */}
      <h1
        ref={nameRef}
        className="font-display text-[clamp(1.4rem,9vw,6rem)] font-bold text-text-primary text-center leading-tight"
      >
        Rashmin Bhanderi
      </h1>

      {/* Role title */}
      <p
        ref={titleRef}
        className="font-mono text-xl md:text-2xl text-accent mt-4 text-center"
      >
        Tech Lead &amp; Full Stack Developer
      </p>

      {/* Value proposition tagline */}
      <p
        ref={taglineRef}
        className="font-sans text-base text-text-secondary mt-3 text-center max-w-md px-6"
      >
        I build frontend systems that scale, perform, and leave an impression.
      </p>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-muted tracking-widest uppercase">
          scroll to explore
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
