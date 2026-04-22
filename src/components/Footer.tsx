import { motion, useReducedMotion } from 'framer-motion'

import { ArrowRightIcon, DijiMarkIcon } from './icons'

const menuLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Companions', href: '#companions' },
  { label: 'About', href: '#about' },
  { label: 'Resources', href: '#resources' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'X', href: 'https://x.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
]

const resourceLinks = [
  { label: 'Bryan companion surface', href: '#companions' },
  { label: 'Companion updates', href: 'mailto:fay@dijicomp.com?subject=DIJI%20updates' },
  { label: 'Deployment notes', href: 'mailto:fay@dijicomp.com?subject=DIJI%20deployment' },
]

export function Footer() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <footer className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#041018_0%,#030b10_100%)]">
      <div className="relative z-10 mx-auto max-w-[1540px] px-4 pb-6 pt-4 sm:px-6 sm:pb-8 sm:pt-6 md:px-8 lg:px-10 xl:px-14">
        <motion.section
          id="about"
          className="footer-stage"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="footer-atmosphere" aria-hidden="true" />
          <div className="footer-gridline" aria-hidden="true" />

          <div className="relative z-10 px-5 py-5 sm:px-7 sm:py-7 lg:px-8 lg:py-8">
            <div className="flex items-center justify-between gap-4 border-b border-white/12 pb-4 sm:pb-5">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/14 bg-white/[0.04] text-[var(--diji-cream)] shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_40px_rgba(2,11,18,0.24)] sm:h-[3.25rem] sm:w-[3.25rem]">
                <DijiMarkIcon className="h-7 w-7" />
              </div>
              <p className="font-display text-right text-[0.74rem] uppercase tracking-[0.24em] text-[#f0dfb7]/86 sm:text-[0.88rem] sm:tracking-[0.2em] lg:text-[1rem]">
                Your world. Your companion.
              </p>
            </div>

            <div className="mt-8 grid gap-8 lg:grid-cols-[1.18fr_0.7fr_0.7fr_0.92fr] lg:gap-8">
              <section className="max-w-[23rem]">
                <p className="footer-lead">Companion systems with human gravity.</p>
                <p className="mt-4 text-[1rem] leading-7 text-white/70">
                  Premium interfaces for digital companionship, shaped with restraint,
                  signal, and cinematic calm.
                </p>

                <div id="contact" className="mt-6">
                  <a
                    href="mailto:fay@dijicomp.com"
                    className="diji-button"
                    data-cursor-mode="surface"
                  >
                    <span>Send a message</span>
                    <ArrowRightIcon className="h-4 w-4" />
                  </a>
                </div>
              </section>

              <section>
                <p className="footer-section-label">Menu</p>
                <div className="mt-4 grid gap-2.5">
                  {menuLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="footer-link ui-text-reactive"
                      data-cursor-mode="text"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>

              <section>
                <p className="footer-section-label">Socials</p>
                <div className="mt-4 grid gap-2.5">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="footer-link ui-text-reactive"
                      data-cursor-mode="text"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>

              <section id="resources">
                <p className="footer-section-label">Resources</p>
                <div className="mt-4 grid gap-2.5">
                  {resourceLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      className="footer-link ui-text-reactive"
                      data-cursor-mode="text"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            </div>

            <div className="footer-meta">
              <span>DIJI © 2026</span>
              <span>Rome / Global</span>
              <span>Digital companion network</span>
            </div>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-[-10%] overflow-hidden">
            <div className="footer-wordmark">DIJI</div>
          </div>
        </motion.section>
      </div>
    </footer>
  )
}
