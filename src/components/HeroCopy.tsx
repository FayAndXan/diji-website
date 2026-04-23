import { motion, useReducedMotion } from 'framer-motion'

import { ArrowRightIcon } from './icons'

const easing = [0.22, 1, 0.36, 1] as const

export function HeroCopy() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative z-10 max-w-[24rem] pt-[clamp(2.8rem,8.8vh,5.45rem)] md:pb-6 lg:pb-8 sm:max-w-[25rem]"
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
      <motion.div
        className="-ml-[0.04rem] flex w-[min(100%,22.8rem)] flex-col gap-6"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.78, ease: easing } },
        }}
      >
        <p className="w-full pl-[0.1rem] font-display text-[0.76rem] uppercase tracking-[0.34em] text-[#efe6cf]/82 sm:text-[0.8rem]">
          Your World. Your Companion.
        </p>
        <h1 className="w-full pt-1 font-brand text-[clamp(1.22rem,1.9vw,1.76rem)] leading-[0.76] tracking-[0.028em] text-[var(--diji-cream)]">
          DIJI
        </h1>
      </motion.div>

      <motion.div
        className="mt-7 space-y-3 sm:mt-7"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: easing } },
        }}
      >
        <p className="font-display text-[0.82rem] uppercase tracking-[0.24em] text-[#efe6cf]/86 sm:text-[0.86rem]">
          Digital Companion. Human Connection.
        </p>
        <p className="max-w-[21rem] text-[0.98rem] leading-7 text-white/78 sm:text-[1.02rem] sm:leading-7">
          AI companions that understand you. Built to evolve. Designed to stay.
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

        <p className="font-display text-[0.82rem] uppercase tracking-[0.24em] text-white/52 sm:text-[0.86rem]">
          Calm daylight sci-fi. Minimal game-inspired motion.
        </p>
      </motion.div>
    </motion.div>
  )
}
