import { useEffect, useRef } from 'react'

import { useReducedMotion } from 'framer-motion'

type CursorMode = 'text' | 'surface'
type ReactiveMode = CursorMode | 'ambient'
type ReactiveTarget = {
  element: HTMLElement
  mode: ReactiveMode
}

const reactiveSelector = [
  '.cursor-field-reactive',
  '.ui-text-reactive',
  '.diji-button',
  '.companion-card',
  '.user-chip',
  '.footer-lead',
  '.footer-wordmark',
  '.footer-section-label',
  '.section-kicker',
].join(', ')

function resolveTarget(target: EventTarget | null) {
  if (!(target instanceof Element)) {
    return null
  }

  return target.closest<HTMLElement>('[data-cursor-mode], a, button')
}

function resolveMode(target: HTMLElement | null): CursorMode | null {
  if (!target) {
    return null
  }

  const declaredMode = target.dataset.cursorMode

  if (declaredMode === 'surface' || declaredMode === 'text') {
    return declaredMode
  }

  return target.tagName === 'BUTTON' ? 'surface' : 'text'
}

function resolveReactiveMode(target: HTMLElement): ReactiveMode {
  const mode = resolveMode(target)

  if (mode) {
    return mode
  }

  if (
    target.classList.contains('companion-card') ||
    target.classList.contains('diji-button') ||
    target.classList.contains('user-chip')
  ) {
    return 'surface'
  }

  if (
    target.classList.contains('ui-text-reactive') ||
    target.classList.contains('footer-section-label') ||
    target.classList.contains('section-kicker')
  ) {
    return 'text'
  }

  return 'ambient'
}

export function CursorFx() {
  const fieldRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const coreRef = useRef<HTMLDivElement>(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (typeof window === 'undefined' || shouldReduceMotion) {
      return
    }

    if (!window.matchMedia('(pointer: fine)').matches) {
      return
    }

    const field = fieldRef.current
    const ring = ringRef.current
    const core = coreRef.current

    if (!field || !ring || !core) {
      return
    }

    const body = document.body

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let fieldX = pointerX
    let fieldY = pointerY
    let ringX = pointerX
    let ringY = pointerY
    let coreX = pointerX
    let coreY = pointerY
    let hoverScale = 1
    let pressScale = 1
    let isVisible = false
    let activeTarget: HTMLElement | null = null
    let frameId = 0
    let reactiveTargets: ReactiveTarget[] = []

    body.classList.add('cursor-enabled')

    const clearReactiveTarget = (element: HTMLElement) => {
      element.style.removeProperty('--cursor-pull-x')
      element.style.removeProperty('--cursor-pull-y')
      element.style.removeProperty('--cursor-warp-scale')
      element.style.removeProperty('--cursor-warp-rotate')
    }

    const clearReactiveWarp = () => {
      reactiveTargets.forEach(({ element }) => clearReactiveTarget(element))
    }

    const refreshReactiveTargets = () => {
      const unique = new Set<HTMLElement>()

      reactiveTargets = Array.from(document.querySelectorAll<HTMLElement>(reactiveSelector))
        .filter((element) => {
          if (unique.has(element)) {
            return false
          }

          unique.add(element)
          return true
        })
        .map((element) => ({
          element,
          mode: resolveReactiveMode(element),
        }))
    }

    const clearTargetGlow = (nextTarget: HTMLElement | null) => {
      if (activeTarget && activeTarget !== nextTarget) {
        activeTarget.style.removeProperty('--ui-glow-x')
        activeTarget.style.removeProperty('--ui-glow-y')
      }
      activeTarget = nextTarget
    }

    const setActiveTarget = (target: EventTarget | null) => {
      const nextTarget = resolveTarget(target)
      clearTargetGlow(nextTarget)

      const mode = resolveMode(nextTarget)
      hoverScale = mode === 'surface' ? 1.56 : mode === 'text' ? 1.22 : 1
    }

    const updateGlowPosition = () => {
      if (!activeTarget) {
        return
      }

      const rect = activeTarget.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        return
      }

      const x = ((pointerX - rect.left) / rect.width) * 100
      const y = ((pointerY - rect.top) / rect.height) * 100

      activeTarget.style.setProperty('--ui-glow-x', `${x}%`)
      activeTarget.style.setProperty('--ui-glow-y', `${y}%`)
    }

    const updateReactiveWarp = () => {
      reactiveTargets.forEach(({ element, mode }) => {
        const rect = element.getBoundingClientRect()

        if (!rect.width || !rect.height) {
          clearReactiveTarget(element)
          return
        }

        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        const dx = pointerX - centerX
        const dy = pointerY - centerY
        const distance = Math.hypot(dx, dy)

        const config =
          mode === 'surface'
            ? { radius: 320, pull: 18, scale: 0.034, rotate: 3.2 }
            : mode === 'text'
              ? { radius: 240, pull: 10, scale: 0.016, rotate: 1.9 }
              : { radius: 280, pull: 14, scale: 0.022, rotate: 2.5 }

        if (distance >= config.radius) {
          clearReactiveTarget(element)
          return
        }

        const strength = ((config.radius - distance) / config.radius) ** 2
        const safeDistance = Math.max(distance, 1)
        const pullX = (dx / safeDistance) * config.pull * strength
        const pullY = (dy / safeDistance) * config.pull * strength
        const rotate = ((dx - dy) / config.radius) * config.rotate * strength

        element.style.setProperty('--cursor-pull-x', `${pullX.toFixed(2)}px`)
        element.style.setProperty('--cursor-pull-y', `${pullY.toFixed(2)}px`)
        element.style.setProperty('--cursor-warp-scale', `${(config.scale * strength).toFixed(4)}`)
        element.style.setProperty('--cursor-warp-rotate', `${rotate.toFixed(2)}deg`)
      })
    }

    refreshReactiveTargets()

    const animate = () => {
      fieldX += (pointerX - fieldX) * 0.12
      fieldY += (pointerY - fieldY) * 0.12
      ringX += (pointerX - ringX) * 0.15
      ringY += (pointerY - ringY) * 0.15
      coreX += (pointerX - coreX) * 0.32
      coreY += (pointerY - coreY) * 0.32

      const targetScale = hoverScale * pressScale
      const fieldVelocityX = pointerX - fieldX
      const fieldVelocityY = pointerY - fieldY
      const velocityX = pointerX - ringX
      const velocityY = pointerY - ringY
      const fieldStretchX = Math.min(0.46, Math.abs(fieldVelocityX) / 110)
      const fieldStretchY = Math.min(0.46, Math.abs(fieldVelocityY) / 110)
      const stretchX = Math.min(0.34, Math.abs(velocityX) / 54)
      const stretchY = Math.min(0.34, Math.abs(velocityY) / 54)

      field.style.transform = `translate3d(${fieldX}px, ${fieldY}px, 0) scale(${1.02 + fieldStretchX}, ${1.02 + fieldStretchY * 0.92})`
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${targetScale + stretchX}, ${targetScale - stretchY * 0.4})`
      core.style.transform = `translate3d(${coreX}px, ${coreY}px, 0)`

      if (isVisible) {
        updateReactiveWarp()
      }

      frameId = window.requestAnimationFrame(animate)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
      isVisible = true
      body.classList.add('cursor-visible')
      updateGlowPosition()
    }

    const handlePointerOver = (event: PointerEvent) => {
      setActiveTarget(event.target)
      updateGlowPosition()
    }

    const handlePointerOut = (event: PointerEvent) => {
      const relatedTarget = resolveTarget(event.relatedTarget)

      if (relatedTarget) {
        setActiveTarget(relatedTarget)
        updateGlowPosition()
        return
      }

      clearTargetGlow(null)
      hoverScale = 1
    }

    const handleMouseOut = (event: MouseEvent) => {
      if (!event.relatedTarget) {
        isVisible = false
        body.classList.remove('cursor-visible')
        clearTargetGlow(null)
        clearReactiveWarp()
        hoverScale = 1
      }
    }

    const handlePointerDown = () => {
      pressScale = 0.92
    }

    const handlePointerUp = () => {
      pressScale = 1
    }

    document.addEventListener('pointermove', handlePointerMove)
    document.addEventListener('pointerover', handlePointerOver)
    document.addEventListener('pointerout', handlePointerOut)
    window.addEventListener('mouseout', handleMouseOut)
    window.addEventListener('pointerdown', handlePointerDown)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('resize', refreshReactiveTargets)

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('resize', refreshReactiveTargets)
      clearReactiveWarp()
      clearTargetGlow(null)
      body.classList.remove('cursor-enabled', 'cursor-visible')
    }
  }, [shouldReduceMotion])

  return (
    <>
      <div ref={fieldRef} className="cursor-field" aria-hidden="true" />
      <div ref={ringRef} className="cursor-warp" aria-hidden="true" />
      <div ref={coreRef} className="cursor-core" aria-hidden="true" />
    </>
  )
}
