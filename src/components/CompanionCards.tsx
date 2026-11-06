import { motion, useReducedMotion } from 'framer-motion'

import { companions, type CompanionProfile } from '../data/companions'
import { ArrowRightIcon } from './icons'

export function CompanionCards({ onSelect }: { onSelect: (companion: CompanionProfile) => void }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.section
      id="companions"
      aria-labelledby="companions-heading"
      className="relative z-10 pb-4"
      initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.2 }}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 id="companions-heading" className="section-kicker">Companions</h2>
        <p className="text-sm text-white/80">Find out what each companion can do.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
        {companions.map((companion) => (
          <button
            key={companion.id}
            type="button"
            className="companion-card companion-choice group flex h-full flex-col p-5 sm:p-6"
            aria-haspopup="dialog"
            aria-label={`Meet ${companion.name}`}
            onClick={() => onSelect(companion)}
            data-cursor-mode="surface"
          >
            <div className="flex w-full flex-wrap items-center justify-between gap-3">
              <span className="font-display text-xs uppercase tracking-[0.2em] text-white/80">{companion.domain}</span>
              <span className="companion-status" data-available={Boolean(companion.website)}>{companion.status}</span>
            </div>
            <h3 className="mt-6 font-display text-3xl uppercase tracking-[0.12em] text-[var(--diji-cream)]">{companion.name}</h3>
            <p className="mb-5 mt-2 max-w-sm text-[0.98rem] leading-6 text-white/85">{companion.description}</p>
            <span className="mt-auto flex items-center gap-2 font-display text-sm uppercase tracking-[0.16em] text-[var(--diji-cream)]">
              Meet {companion.name}<ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </span>
            <span className="companion-card-orbit" aria-hidden="true" />
          </button>
        ))}
      </div>
    </motion.section>
  )
}
