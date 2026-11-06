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
