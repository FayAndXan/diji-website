import { motion, useReducedMotion } from 'framer-motion'

import { ArrowRightIcon } from './icons'

const easing = [0.22, 1, 0.36, 1] as const

export function HeroCopy() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className="relative z-10 max-w-[24rem] pt-[clamp(2.8rem,9vh,5.8rem)] sm:max-w-[25rem]"
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
        className="-ml-[0.08rem] flex w-[min(100%,22.4rem)] flex-col gap-6"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
          show: { opacity: 1, y: 0, transition: { duration: 0.78, ease: easing } },
        }}
      >
        <p className="w-full pl-[0.26rem] font-display text-[0.68rem] uppercase tracking-[0.74em] text-[#efe6cf]/82 sm:text-[0.74rem]">
          Digital Companion
        </p>
        <h1 className="w-full font-brand text-[clamp(0.98rem,1.42vw,1.36rem)] leading-[0.84] tracking-[0.022em] text-[var(--diji-cream)]">
          DIJI
        </h1>
      </motion.div>

      <motion.div
        className="mt-6 space-y-3 sm:mt-6"
        variants={{
          hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: easing } },
        }}
      >
        <p className="max-w-[21rem] text-[0.98rem] leading-7 text-white/78 sm:text-[1.02rem] sm:leading-7">
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

        <p className="font-display text-[0.82rem] uppercase tracking-[0.24em] text-white/52 sm:text-[0.86rem]">
          Calm daylight sci-fi. Minimal game-inspired motion.
        </p>
      </motion.div>
    </motion.div>
  )
}
