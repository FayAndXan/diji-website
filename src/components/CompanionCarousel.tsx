import { startTransition, useEffect, useEffectEvent, useRef, useState } from 'react'

import { motion, useReducedMotion } from 'framer-motion'

import { companions } from '../data/companions'
import { ChevronIcon, LockIcon } from './icons'

const slideEase = [0.22, 1, 0.36, 1] as const

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

function getWrappedOffset(index: number, selectedIndex: number, length: number) {
  let offset = index - selectedIndex

  if (offset > length / 2) {
    offset -= length
  } else if (offset < -length / 2) {
    offset += length
  }

  return offset
}

function getCardPosition(offset: number, viewportWidth: number) {
  const near = clamp(viewportWidth * 0.16, 118, 236)
  const far = clamp(viewportWidth * 0.32, 224, 474)

  if (offset === -2) return -far
  if (offset === -1) return -near
  if (offset === 1) return near
  if (offset === 2) return far

  return 0
}

function getCardSizeClass(viewportWidth: number) {
  if (viewportWidth < 640) return 'w-[9.15rem]'
  if (viewportWidth < 1024) return 'w-[13.4rem]'

  return 'w-[14.4rem]'
}

export function CompanionCarousel() {
  const [selectedIndex, setSelectedIndex] = useState(2)
  const [isPaused, setIsPaused] = useState(false)
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1440 : window.innerWidth,
  )
  const shouldReduceMotion = useReducedMotion()
  const previousSelectedIndexRef = useRef(selectedIndex)

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth)

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    previousSelectedIndexRef.current = selectedIndex
  }, [selectedIndex])

  const cycleSelection = useEffectEvent((direction: 1 | -1) => {
    startTransition(() => {
      setSelectedIndex(
        (current) => (current + direction + companions.length) % companions.length,
      )
    })
  })

  const selectCompanion = (index: number) => {
    startTransition(() => {
      setSelectedIndex(index)
    })
  }

  const shiftCompanion = (direction: 1 | -1) => {
    startTransition(() => {
      setSelectedIndex(
        (current) => (current + direction + companions.length) % companions.length,
      )
    })
  }

  useEffect(() => {
    if (shouldReduceMotion) {
      return
    }

    const timer = window.setInterval(() => {
      if (!isPaused) {
        cycleSelection(1)
      }
    }, 5200)

    return () => window.clearInterval(timer)
  }, [isPaused, shouldReduceMotion])

  const cardWidthClass = getCardSizeClass(viewportWidth)
  const previousSelectedIndex = previousSelectedIndexRef.current

  return (
    <motion.section
      id="companions"
      className="relative z-10 pb-2"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay: shouldReduceMotion ? 0 : 0.24 }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false)
        }
      }}
    >
      <div className="mb-4 flex items-center justify-between gap-4 sm:mb-5">
        <p className="section-kicker">// Companions</p>

        <div className="flex items-center gap-3 font-display text-[0.86rem] uppercase tracking-[0.22em] text-white/66 sm:text-[0.92rem]">
          <span>{String(selectedIndex + 1).padStart(2, '0')}</span>
          <span className="h-px w-10 rounded-full bg-white/18 sm:w-14" />
          <span>{String(companions.length).padStart(2, '0')}</span>

          <div className="ml-1 flex items-center gap-2">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/12 bg-white/[0.04] text-white/76 transition-colors duration-300 hover:border-[var(--diji-border-strong)] hover:text-[var(--diji-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)] sm:h-11 sm:w-11"
              aria-label="Select previous companion"
              onClick={() => shiftCompanion(-1)}
              data-cursor-mode="surface"
            >
              <ChevronIcon direction="left" className="h-4 w-4" />
            </button>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[16px] border border-white/12 bg-white/[0.04] text-white/76 transition-colors duration-300 hover:border-[var(--diji-border-strong)] hover:text-[var(--diji-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)] sm:h-11 sm:w-11"
              aria-label="Select next companion"
              onClick={() => shiftCompanion(1)}
              data-cursor-mode="surface"
            >
              <ChevronIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="relative h-[14rem] overflow-hidden sm:h-[14.8rem] lg:h-[15.5rem]">
        <div className="absolute inset-x-0 top-0 flex justify-center">
          <div className="relative w-[min(100%,1180px)]">
            {companions.map((companion, index) => {
              const offset = getWrappedOffset(index, selectedIndex, companions.length)
              const previousOffset = getWrappedOffset(
                index,
                previousSelectedIndex,
                companions.length,
              )
              const isSelected = offset === 0
              const depth = Math.abs(offset)
              const jumpedAcross = Math.abs(previousOffset - offset) > 2
              const opacity = isSelected ? 1 : depth === 1 ? 0.66 : 0.28
              const scale = isSelected ? 1 : depth === 1 ? 0.935 : 0.85

              return (
                <motion.button
                  key={companion.id}
                  type="button"
                  className={`companion-card absolute left-1/2 top-[3.6rem] min-h-[8.25rem] -translate-x-1/2 px-3 py-3 sm:top-[3.85rem] sm:min-h-[11rem] sm:px-5 sm:py-4 lg:top-[4.05rem] ${cardWidthClass}`}
                  initial={false}
                  data-selected={isSelected || undefined}
                  style={{ zIndex: 20 - depth }}
                  animate={{
                    x: getCardPosition(offset, viewportWidth),
                    y: 0,
                    scale,
                    opacity,
                  }}
                  transition={
                    jumpedAcross
                      ? {
                          x: { duration: 0.01, ease: 'linear' },
                          y: { duration: 0.01, ease: 'linear' },
                          scale: { duration: 0.52, ease: slideEase },
                          opacity: { duration: 0.22, ease: 'easeOut' },
                        }
                      : {
                          x: { type: 'spring', stiffness: 170, damping: 23, mass: 0.84 },
                          y: { duration: 0.01, ease: 'linear' },
                          scale: {
                            type: 'spring',
                            stiffness: 160,
                            damping: 22,
                            mass: 0.82,
                          },
                          opacity: { duration: 0.24, ease: 'easeOut' },
                        }
                  }
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: isSelected ? 1.015 : scale + 0.02,
                        }
                  }
                  aria-pressed={isSelected}
                  aria-label={`Select ${companion.name}`}
                  onClick={() => selectCompanion(index)}
                  data-cursor-mode="surface"
                >
                  <div className="flex items-start justify-between">
                    <span className="h-6 w-6 sm:h-8 sm:w-8" aria-hidden="true" />
                    <LockIcon className="h-3.5 w-3.5 text-white/48 sm:h-4 sm:w-4" />
                  </div>

                  <div className="mt-4 space-y-2 text-center sm:mt-5 sm:space-y-3">
                    <h3
                      className={`font-display text-[1.18rem] uppercase tracking-[0.14em] text-[var(--diji-cream)] sm:text-[1.7rem] ${
                        companion.id === 'joi' ? 'tracking-[0.2em]' : ''
                      }`}
                    >
                      {companion.name}
                    </h3>
                    <p className="font-body text-[0.69rem] leading-5 text-white/72 sm:text-[0.92rem] sm:leading-6">
                      {companion.domain ?? companion.mantra}
                    </p>
                  </div>

                  <span className="companion-card-orbit" aria-hidden="true" />
                </motion.button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="mt-[0.2rem] flex items-center justify-center gap-2 sm:mt-[0.4rem] lg:mt-[0.55rem]">
        {companions.map((companion, index) => (
          <button
            key={companion.id}
            type="button"
            className="group inline-flex h-8 w-8 items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)]"
            aria-label={`Go to ${companion.name}`}
            onClick={() => selectCompanion(index)}
            data-cursor-mode="surface"
          >
            <span
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === selectedIndex
                  ? 'w-7 bg-[var(--diji-cream)] shadow-[0_0_14px_rgba(243,232,207,0.6)]'
                  : 'w-1.5 bg-white/30 group-hover:bg-white/55'
              }`}
            />
          </button>
        ))}
      </div>
    </motion.section>
  )
}
