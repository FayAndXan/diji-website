import { motion, useReducedMotion } from 'framer-motion'

import { ArrowRightIcon } from './icons'

const easing = [0.22, 1, 0.36, 1] as const

export function HeroCopy() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative z-10 max-w-[24rem] pt-[clamp(1.8rem,7vh,4.75rem)] sm:max-w-[25rem]"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: shouldReduceMotion ? 0 : 0.08,
            delayChildren: shouldReduceMotion ? 0 : 0.12,
          },
        },
      }}
    >
      <motion.p
        className="section-kicker"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 12 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easing } },
        }}
      >
        YOUR WORLD. YOUR COMPANION.
      </motion.p>

      <motion.h1
        className="cursor-field-reactive mt-4 w-fit font-brand text-[clamp(1rem,1.45vw,1.42rem)] leading-[0.78] tracking-[0.03em] text-[var(--diji-cream)] sm:mt-5"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.78, ease: easing } },
        }}
      >
        DIJI
      </motion.h1>

      <motion.div
        className="mt-6 space-y-3 sm:mt-7"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: easing } },
        }}
      >
        <p className="cursor-field-reactive font-display text-[0.98rem] uppercase tracking-[0.22em] text-[#efe6cf]/86 sm:text-[1.02rem]">
          Digital companion. Human connection.
        </p>
        <p className="cursor-field-reactive max-w-[21rem] text-[0.98rem] leading-7 text-white/78 sm:text-[1.02rem] sm:leading-7">
          AI companions that understand you. Built to evolve. Designed to stay
          close to your rhythm.
        </p>
      </motion.div>

      <motion.div
        className="mt-7 flex flex-col items-start gap-4 sm:mt-8"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 14 },
          show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: easing } },
        }}
      >
        <a href="#companions" className="diji-button" data-cursor-mode="surface">
          <span>Choose Your Companion</span>
          <ArrowRightIcon className="h-4 w-4" />
        </a>

        <p className="cursor-field-reactive font-display text-[0.82rem] uppercase tracking-[0.24em] text-white/52 sm:text-[0.86rem]">
          Calm daylight sci-fi. Minimal game-inspired motion.
        </p>
      </motion.div>
    </motion.div>
  )
}
