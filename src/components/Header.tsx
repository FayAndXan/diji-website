import { useEffect, useRef, useState } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { navigation } from '../data/navigation'
import { MenuIcon } from './icons'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const [activeHref, setActiveHref] = useState(window.location.hash || '#home')

  useEffect(() => {
    const updateHash = () => setActiveHref(window.location.hash || '#home')
    window.addEventListener('hashchange', updateHash)
    return () => window.removeEventListener('hashchange', updateHash)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) return
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [isMenuOpen])

  return (
    <motion.header
      className="relative z-20"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
        <a
          href="#home"
          className="ui-text-reactive font-brand text-[0.31rem] leading-none tracking-[0.045em] text-[var(--diji-cream)] transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)] sm:text-[0.35rem] lg:text-[0.39rem] lg:justify-self-start"
          data-cursor-mode="text"
          aria-label="DIJI home"
        >
          DIJI
        </a>

        <nav aria-label="Main navigation" className="hidden items-center justify-center gap-7 lg:justify-self-center lg:gap-8 lg:flex">
          {navigation.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link ui-text-reactive"
              data-cursor-mode="text"
              aria-current={item.href === activeHref ? 'location' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3 lg:justify-self-end">
          <a href="#companions" className="diji-button hidden px-4 py-2 lg:inline-flex">Explore companions</a>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] text-white/74 transition-colors duration-300 hover:border-[var(--diji-border-strong)] hover:text-[var(--diji-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)] lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label={isMenuOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setIsMenuOpen((open) => !open)}
            data-cursor-mode="surface"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {isMenuOpen ? (
          <motion.nav
            id="mobile-navigation"
            aria-label="Mobile navigation"
            className="panel-glass mobile-menu absolute right-0 top-[calc(100%+0.9rem)] w-[min(20rem,92vw)] p-4 lg:hidden"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: shouldReduceMotion ? 1 : 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <div className="grid gap-2">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="ui-text-reactive rounded-[18px] border border-transparent px-4 py-3 font-display text-[0.95rem] uppercase tracking-[0.22em] text-white/78 transition-colors duration-300 hover:border-white/12 hover:bg-white/[0.04] hover:text-[var(--diji-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)]"
                  data-cursor-mode="text"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
