import { useEffect, useRef } from 'react'

import { useReducedMotion } from 'framer-motion'

type CursorMode = 'text' | 'surface'

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

export function CursorFx() {
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

    const ring = ringRef.current
    const core = coreRef.current

    if (!ring || !core) {
      return
    }

    const body = document.body

    let pointerX = window.innerWidth / 2
    let pointerY = window.innerHeight / 2
    let ringX = pointerX
    let ringY = pointerY
    let coreX = pointerX
    let coreY = pointerY
    let hoverScale = 1
    let pressScale = 1
    let activeTarget: HTMLElement | null = null
    let frameId = 0

    body.classList.add('cursor-enabled')

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

    const animate = () => {
      ringX += (pointerX - ringX) * 0.15
      ringY += (pointerY - ringY) * 0.15
      coreX += (pointerX - coreX) * 0.32
      coreY += (pointerY - coreY) * 0.32

      const targetScale = hoverScale * pressScale
      const velocityX = pointerX - ringX
      const velocityY = pointerY - ringY
      const stretchX = Math.min(0.34, Math.abs(velocityX) / 54)
      const stretchY = Math.min(0.34, Math.abs(velocityY) / 54)

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${targetScale + stretchX}, ${targetScale - stretchY * 0.4})`
      core.style.transform = `translate3d(${coreX}px, ${coreY}px, 0)`

      frameId = window.requestAnimationFrame(animate)
    }

    const handlePointerMove = (event: PointerEvent) => {
      pointerX = event.clientX
      pointerY = event.clientY
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
        body.classList.remove('cursor-visible')
        clearTargetGlow(null)
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

    frameId = window.requestAnimationFrame(animate)

    return () => {
      window.cancelAnimationFrame(frameId)
      document.removeEventListener('pointermove', handlePointerMove)
      document.removeEventListener('pointerover', handlePointerOver)
      document.removeEventListener('pointerout', handlePointerOut)
      window.removeEventListener('mouseout', handleMouseOut)
      window.removeEventListener('pointerdown', handlePointerDown)
      window.removeEventListener('pointerup', handlePointerUp)
      clearTargetGlow(null)
      body.classList.remove('cursor-enabled', 'cursor-visible')
    }
  }, [shouldReduceMotion])

  return (
    <>
      <div ref={ringRef} className="cursor-warp" aria-hidden="true" />
      <div ref={coreRef} className="cursor-core" aria-hidden="true" />
    </>
  )
}
