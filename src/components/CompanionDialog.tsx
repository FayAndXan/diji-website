import { useEffect, useRef } from 'react'

import type { CompanionProfile } from '../data/companions'
import { contactEmail } from '../data/navigation'
import { ArrowRightIcon } from './icons'

export function CompanionDialog({ companion, onClose }: {
  companion: CompanionProfile
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    const previousOverflow = document.body.style.overflow
    dialog?.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [])

  return (
    <dialog
      ref={dialogRef}
      className="companion-dialog"
      aria-labelledby="companion-dialog-title"
      aria-describedby="companion-dialog-description"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) dialogRef.current?.close()
      }}
    >
      <div className="dialog-content p-6 sm:p-9">
        <div className="flex items-center justify-between gap-4">
          <span className="companion-status" data-available={Boolean(companion.website)}>{companion.status}</span>
          <button type="button" className="dialog-close" aria-label="Close companion details" onClick={() => dialogRef.current?.close()}>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m6 6 12 12M6 18 18 6" /></svg>
          </button>
        </div>
        <p className="section-kicker mt-7">{companion.domain}</p>
        <h2 id="companion-dialog-title" className="mt-2 font-display text-5xl uppercase tracking-[0.1em] text-[var(--diji-cream)]">{companion.name}</h2>
        <p id="companion-dialog-description" className="mt-5 text-base leading-7 text-white/85">{companion.detail}</p>
        {companion.features.length > 0 && (
          <ul className="mt-5 grid list-disc gap-3 pl-5 text-sm leading-6 text-white/85">
            {companion.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        )}
        <div className="mt-8 border-t border-white/15 pt-6">
          {companion.website ? (
            <>
              <a href={companion.website} className="diji-button">Visit {companion.name}<ArrowRightIcon className="h-5 w-5" aria-hidden="true" /></a>
              <p className="mt-3 text-sm leading-6 text-white/75">Explore the iPhone beta and account options on Bryan’s website.</p>
            </>
          ) : (
            <>
              <a href={`mailto:${contactEmail}?subject=Jesus%20companion`} className="diji-button">Ask about Jesus<ArrowRightIcon className="h-5 w-5" aria-hidden="true" /></a>
              <p className="mt-3 text-sm leading-6 text-white/75">Not available to use yet. Email Fay with questions.</p>
            </>
          )}
        </div>
      </div>
    </dialog>
  )
}
