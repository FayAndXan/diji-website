import { contactEmail, navigation } from '../data/navigation'
import { ArrowRightIcon } from './icons'

const resources = [
  { label: 'Getting started with Bryan', detail: 'Read the guide before your first conversation.', href: 'https://bryan.dijicomp.com/docs.html#getting-started' },
  { label: 'Bryan beta access', detail: 'See what you need and how to get the iPhone beta.', href: 'https://bryan.dijicomp.com/pricing' },
  { label: 'Bryan privacy', detail: 'Read how your information is handled.', href: 'https://bryan.dijicomp.com/privacy' },
]

export function Footer() {
  return (
    <footer className="relative isolate overflow-hidden bg-[linear-gradient(180deg,#041018_0%,#030b10_100%)]">
      <div className="relative z-10 mx-auto max-w-[1540px] px-4 pb-6 pt-8 sm:px-6 md:px-8 lg:px-10 xl:px-14">
        <section id="about" aria-labelledby="about-heading" className="content-section grid gap-6 border-t border-white/15 py-12 sm:py-16 md:grid-cols-[1fr_1.5fr] md:gap-16">
          <div>
            <p className="section-kicker">About DIJI</p>
            <h2 id="about-heading" className="mt-4 font-display text-3xl leading-tight text-[var(--diji-cream)] sm:text-4xl">A companion with a purpose.</h2>
          </div>
          <div className="max-w-xl space-y-4 text-base leading-7 text-white/80">
            <p>DIJI is building personal AI companions for specific parts of everyday life. Start with the one that fits what you want help with.</p>
            <p>Bryan focuses on health and longevity. Jesus is the next companion in development. Each companion’s details explain what it is for and where to get started.</p>
            <a href="#companions" className="footer-link inline-flex min-h-11 items-center gap-2">Explore the companions <ArrowRightIcon className="h-5 w-5" aria-hidden="true" /></a>
          </div>
        </section>

        <section id="resources" aria-labelledby="resources-heading" className="content-section border-t border-white/15 py-12 sm:py-16">
          <p className="section-kicker">Resources</p>
          <h2 id="resources-heading" className="mt-4 font-display text-3xl text-[var(--diji-cream)] sm:text-4xl">Before you begin.</h2>
          <div className="mt-7 grid gap-4 md:grid-cols-3">
            {resources.map((resource) => (
              <a key={resource.href} href={resource.href} className="resource-card group">
                <h3 className="font-display text-xl text-[var(--diji-cream)]">{resource.label}</h3>
                <p className="mt-2 text-sm leading-6 text-white/80">{resource.detail}</p>
                <ArrowRightIcon className="mt-5 h-6 w-6 text-[var(--diji-cream)] transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
            ))}
          </div>
          <div className="mt-9 max-w-3xl">
            <details className="faq-item">
              <summary>Do I need a DIJI account?</summary>
              <p>You can explore DIJI without an account. To use Bryan, visit <a href="https://bryan.dijicomp.com/">Bryan’s website</a> for beta access and account options.</p>
            </details>
            <details className="faq-item">
              <summary>Can I use Jesus yet?</summary>
              <p>Jesus is still in development. Availability and a website link will appear here when it is ready. For questions, email <a href={`mailto:${contactEmail}?subject=Jesus%20companion`}>{contactEmail}</a>.</p>
            </details>
            <details className="faq-item">
              <summary>Where can I ask a question or share feedback?</summary>
              <p>Email Fay at <a href={`mailto:${contactEmail}`}>{contactEmail}</a> for product questions, feedback or partnerships.</p>
            </details>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-heading" className="content-section footer-stage p-6 sm:p-9 lg:p-10">
          <div className="footer-atmosphere" aria-hidden="true" />
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="section-kicker">Contact</p>
              <h2 id="contact-heading" className="mt-3 font-display text-3xl text-[var(--diji-cream)]">Talk to the person building DIJI.</h2>
              <p className="mt-3 max-w-md text-sm leading-6 text-white/80">Questions, feedback or an idea to share? Email Fay.</p>
            </div>
            <a href={`mailto:${contactEmail}`} className="diji-button break-all">{contactEmail}<ArrowRightIcon className="h-5 w-5 shrink-0" aria-hidden="true" /></a>
          </div>
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-5">
          <p className="text-sm text-white/75">© {new Date().getFullYear()} DIJI</p>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-5 gap-y-1">
            {navigation.map((link) => <a key={link.href} href={link.href} className="footer-link inline-flex min-h-11 items-center">{link.label}</a>)}
          </nav>
        </div>
      </div>
    </footer>
  )
}
