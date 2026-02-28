'use client'

import { useEffect, useRef } from 'react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { gsap } from '@/lib/gsap'

type Props = {
  isOpen: boolean
  onClose: () => void
}

export function SchedulerModal({ isOpen, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)

  // ── Configure Cal.com dark theme once ────────────────────────────────────
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        styles: {
          branding: { brandColor: '#2962ff' },
        },
        hideEventTypeDetails: false,
      })
    })()
  }, [])

  // ── Open animation + keyboard + scroll lock ───────────────────────────────
  useEffect(() => {
    if (!isOpen) return

    // Lock body scroll + signal cursor to hide
    document.body.style.overflow = 'hidden'
    document.body.setAttribute('data-modal', 'open')

    // Animate in
    const tl = gsap.timeline()
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.25, ease: 'power2.out' }
    )
    tl.fromTo(
      panelRef.current,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.3, ease: 'power3.out' },
      '-=0.1'
    )

    // Escape key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      document.body.removeAttribute('data-modal')
      window.removeEventListener('keydown', handleKeyDown)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  // ── Animated close ────────────────────────────────────────────────────────
  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 20,
      duration: 0.2,
      ease: 'power2.in',
    })
    tl.to(
      overlayRef.current,
      { opacity: 0, duration: 0.2, ease: 'power2.in' },
      '-=0.1'
    )
  }

  if (!isOpen) return null

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}
    >
      <div
        ref={panelRef}
        className="relative w-full max-w-3xl h-[90vh] bg-surface border border-muted rounded-2xl overflow-hidden flex flex-col"
      >
        {/* ── Close button ── */}
        <button
          onClick={handleClose}
          aria-label="Close scheduler"
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center text-text-secondary hover:text-accent transition-colors text-xl leading-none bg-surface/80 backdrop-blur-sm rounded-full border border-muted/40"
        >
          ×
        </button>

        {/* ── Cal.com embed ── */}
        {/* PLACEHOLDER: Replace 'your-cal-username/quick-chat' with your actual Cal.com link */}
        <Cal
          calLink="rashminbhanderi"
          style={{ width: '100%', height: '100%', minHeight: '600px' }}
          config={{ layout: 'month_view' }}
        />
      </div>
    </div>
  )
}
