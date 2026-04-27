import { motion, useReducedMotion } from 'framer-motion'

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
  { label: 'DIJI Core', href: '#companions' },
  { label: 'Bryan / Longevity', href: '#companions' },
  { label: 'Anian / Manifestation', href: '#companions' },
  { label: 'Demi / Beauty', href: '#companions' },
  { label: 'Joi / Presence', href: '#companions' },
]

export function Footer() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <footer className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#041018_0%,#030b10_100%)]">
      <div className="relative z-10 mx-auto max-w-[1540px] px-4 pb-4 pt-3 sm:px-6 sm:pb-5 sm:pt-4 md:px-8 lg:px-10 xl:px-14">
        <motion.section
          id="about"
          className="footer-stage diji-surface"
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="footer-atmosphere" aria-hidden="true" />

          <div className="relative z-10 px-5 py-5 sm:px-6 sm:py-5 lg:px-8 lg:py-6">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
              <section>
                <p className="footer-section-label">Menu</p>
                <div className="mt-3 grid gap-2.5">
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
                <div className="mt-3 grid gap-2.5">
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
                <div className="mt-3 grid gap-2.5">
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
          </div>
        </motion.section>
      </div>
    </footer>
  )
}
