export interface CompanionProfile {
  id: string
  name: string
  domain: string
  status: string
  description: string
  detail: string
  features: string[]
  website?: string
}

export const companions: CompanionProfile[] = [
  {
    id: 'bryan',
    name: 'Bryan',
    domain: 'Health and longevity',
    status: 'iPhone beta',
    description: 'Your goals, labs and daily habits. One personal longevity companion.',
    detail: 'Bryan brings your health history, lab results and supplements together to help you build a plan. Review suggested priorities, follow your routines, and approve changes as new information comes in.',
    features: [
      'Understand lab results in the context of your health history.',
      'Review supplements and build routines around your goals.',
      'Follow your plan with reminders, check-ins and reviews.',
    ],
    website: 'https://bryan.dijicomp.com/',
  },
  {
    id: 'jesus',
    name: 'Jesus',
    domain: 'A new companion',
    status: 'In development',
    description: 'A new DIJI companion is taking shape.',
    detail: 'Jesus is currently in development. We will share more about the companion and how to get started here when it is ready.',
    features: [],
  },
]
