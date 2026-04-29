import type { ReactNode, SVGProps } from 'react'

import type { CompanionIconKey } from '../data/companions'

type IconProps = SVGProps<SVGSVGElement>

function createBaseIcon(children: ReactNode, props: IconProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {children}
    </svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return createBaseIcon(
    <>
      <path d="M11 24h20" strokeWidth="1.8" />
      <path d="m25 17 7 7-7 7" strokeWidth="1.8" />
    </>,
    props,
  )
}

export function ChevronIcon({
  direction = 'right',
  ...props
}: IconProps & { direction?: 'left' | 'right' }) {
  const transform = direction === 'left' ? 'rotate(180 24 24)' : undefined

  return createBaseIcon(
    <path d="m19 14 10 10-10 10" strokeWidth="1.8" transform={transform} />,
    props,
  )
}

export function ExpandCornersIcon(props: IconProps) {
  return createBaseIcon(
    <>
      <path d="M14 20v-6h6" strokeWidth="1.7" />
      <path d="M34 28v6h-6" strokeWidth="1.7" />
      <path d="m20 14-6 6" strokeWidth="1.7" />
      <path d="m28 34 6-6" strokeWidth="1.7" />
    </>,
    props,
  )
}

export function ProfileIcon(props: IconProps) {
  return createBaseIcon(
    <>
      <circle cx="24" cy="18" r="6" strokeWidth="1.6" />
      <path d="M13 35c2.8-5.3 6.7-8 11-8s8.2 2.7 11 8" strokeWidth="1.6" />
    </>,
    props,
  )
}

export function MenuIcon(props: IconProps) {
  return createBaseIcon(
    <>
      <path d="M12 17h24" strokeWidth="1.8" />
      <path d="M12 24h18" strokeWidth="1.8" />
      <path d="M12 31h24" strokeWidth="1.8" />
    </>,
    props,
  )
}

export function SparkIcon(props: IconProps) {
  return createBaseIcon(
    <path
      d="m24 9 2.6 8.4L35 20l-8.4 2.6L24 31l-2.6-8.4L13 20l8.4-2.6Z"
      strokeWidth="1.4"
    />,
    props,
  )
}

export function LockIcon(props: IconProps) {
  return createBaseIcon(
    <>
      <path d="M17 23h14v12H17z" strokeWidth="1.6" />
      <path d="M20 23v-3.4a4 4 0 0 1 8 0V23" strokeWidth="1.6" />
    </>,
    props,
  )
}

export function PulseIcon(props: IconProps) {
  return createBaseIcon(
    <path d="M8 26h8l4-8 8 15 4-7h8" strokeWidth="1.8" />,
    props,
  )
}

export function DijiMarkIcon(props: IconProps) {
  return createBaseIcon(
    <>
      <circle cx="24" cy="24" r="18" strokeWidth="1.7" />
      <path d="M19 16h7.5a8 8 0 1 1 0 16H19" strokeWidth="1.7" />
      <path d="M18 24h13" strokeWidth="1.7" />
    </>,
    props,
  )
}

function BryanFingerprintIcon(props: IconProps) {
  return createBaseIcon(
    <>
      <path d="M13.7 15.6c0-9.7 20.6-9.7 20.6 0" strokeWidth="2.1" />
      <path d="M15.9 16.2c0-8.1 16.3-8.1 16.3 1.3" strokeWidth="2.1" />
      <path d="M18.1 19.4c0-7.3 11.8-7.3 11.8 1.6" strokeWidth="2.1" />
      <path d="M29.9 21c0 5.8-2.9 10.4-7.2 12.4" strokeWidth="2.1" />
      <path d="M19.8 21.4c0-5.5 8.6-5.5 8.6 1.3" strokeWidth="2.1" />
      <path d="M28.4 22.7c0 4.3-2.6 7.9-6.5 9.7" strokeWidth="2.1" />
      <path d="M21.3 23.5c0-3.9 5.7-3.9 5.7 1.1" strokeWidth="2.1" />
      <path d="M27 24.6c0 3.3-2.1 5.9-5.1 7.1" strokeWidth="2.1" />
      <path d="M22.5 25.6c0-2.6 3-2.6 3 0.6" strokeWidth="2.1" />
      <path d="M25.5 26.2c0 1.8-1.1 3.2-2.3 3.9" strokeWidth="2.1" />
    </>,
    props,
  )
}

export function CompanionGlyph({
  icon,
  ...props
}: IconProps & { icon: CompanionIconKey }) {
  if (icon === 'bryan') return <BryanFingerprintIcon {...props} />

  return null
}
