import type { ReactNode, SVGProps } from 'react'

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
