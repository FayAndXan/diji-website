import { useState } from 'react'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

import { ExpandCornersIcon, MenuIcon, ProfileIcon } from './icons'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Companions', href: '#companions' },
  { label: 'About', href: '#about' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
]

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.header
      className="relative z-20"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4">
        <a
          href="#home"
          className="ui-text-reactive font-brand text-[0.31rem] leading-none tracking-[0.045em] text-[var(--diji-cream)] transition-opacity duration-300 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)] sm:text-[0.35rem] lg:text-[0.39rem]"
          data-cursor-mode="text"
          aria-label="DIJI home"
        >
          DIJI
        </a>

        <nav className="hidden items-center justify-center gap-7 md:flex lg:gap-8">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="nav-link ui-text-reactive"
              data-cursor-mode="text"
              aria-current={item.label === 'Home' ? 'page' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-2 sm:gap-3">
          <button
            type="button"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] text-white/72 transition-colors duration-300 hover:border-[var(--diji-border-strong)] hover:text-[var(--diji-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)] md:inline-flex"
            aria-label="Expand DIJI world"
            data-cursor-mode="surface"
          >
            <ExpandCornersIcon className="h-4 w-4" />
          </button>

          <div className="user-chip hidden md:inline-flex">
            <ProfileIcon className="h-4 w-4 text-[var(--diji-cream)]" />
            <span>USER_047</span>
            <span className="h-2 w-2 rounded-full bg-[#9dd7a8] shadow-[0_0_14px_rgba(157,215,168,0.8)]" />
          </div>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.045] text-white/74 transition-colors duration-300 hover:border-[var(--diji-border-strong)] hover:text-[var(--diji-cream)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(243,232,207,0.52)] md:hidden"
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
            className="panel-glass absolute right-0 top-[calc(100%+0.9rem)] w-[min(20rem,92vw)] p-4 md:hidden"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            <div className="mb-4 flex items-center justify-between rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-3">
              <div>
                <p className="font-display text-[0.7rem] uppercase tracking-[0.34em] text-white/52">
                  ACTIVE PROFILE
                </p>
                <p className="mt-1 font-display text-[0.96rem] uppercase tracking-[0.18em] text-[var(--diji-cream)]">
                  USER_047
                </p>
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-[#9dd7a8] shadow-[0_0_14px_rgba(157,215,168,0.8)]" />
            </div>

            <div className="grid gap-2">
              {navItems.map((item) => (
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
