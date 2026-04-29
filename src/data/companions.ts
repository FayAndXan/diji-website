export type CompanionIconKey = 'bryan'

export interface CompanionProfile {
  id: string
  name: string
  icon?: CompanionIconKey
  domain?: string
  mantra: string
  description: string
  detail: string
}

export const companions: CompanionProfile[] = [
  {
    id: 'bryan',
    name: 'Bryan',
    icon: 'bryan',
    domain: 'Health and Longevity',
    mantra: 'Health and Longevity',
    description: 'A companion for health, habits, biomarkers, and long-term vitality.',
    detail: 'Built around daily signals, health context, and longevity routines.',
  },
  {
    id: 'demi',
    name: 'Demi',
    domain: 'Beauty and Skincare',
    mantra: 'Beauty and Skincare',
    description: 'A companion for skin, routines, products, and personal beauty context.',
    detail: 'Designed to remember preferences, progress, and what actually works.',
  },
  {
    id: 'joi',
    name: 'Joi',
    domain: 'Relationship and Friendship',
    mantra: 'Relationship and Friendship',
    description: 'A companion for emotional continuity, connection, and conversation.',
    detail: 'Built for presence, memory, and the relationships that shape your day.',
  },
  {
    id: 'more',
    name: 'More',
    domain: 'More companions coming.',
    mantra: 'More companions coming.',
    description: 'New DIJI companions are being shaped for more areas of life.',
    detail: 'More domains will open as the companion network expands.',
  },
  {
    id: 'next',
    name: 'More',
    domain: 'More companions coming.',
    mantra: 'More companions coming.',
    description: 'Another companion slot is reserved for the DIJI network.',
    detail: 'More domains will open as the companion network expands.',
  },
]
