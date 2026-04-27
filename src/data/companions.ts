export type CompanionIconKey =
  | 'aria'
  | 'nexus'
  | 'kira'
  | 'valen'
  | 'zed'

export interface CompanionProfile {
  id: string
  name: string
  icon: CompanionIconKey
  mantra: string
  description: string
  detail: string
}

export const companions: CompanionProfile[] = [
  {
    id: 'diji-core',
    name: 'DIJI Core',
    icon: 'nexus',
    mantra: 'Runtime. Memory. Isolation.',
    description: 'The operating layer behind every DIJI companion.',
    detail: 'Private workspaces, channels, rules, tools, memory, and lifecycle management.',
  },
  {
    id: 'bryan',
    name: 'Bryan',
    icon: 'zed',
    mantra: 'Health. Sleep. Biomarkers.',
    description: 'A longevity companion that notices health patterns over time.',
    detail: 'Meals, sleep, training, mood, supplements, blood work, and proactive nudges.',
  },
  {
    id: 'anian',
    name: 'Anian',
    icon: 'valen',
    mantra: 'Manifestation. Ritual. Evidence.',
    description: 'A memory-powered manifestation companion for personal growth.',
    detail: 'Resistance detection, vision cards, evidence vaults, and technique-led practice.',
  },
  {
    id: 'demi',
    name: 'Demi',
    icon: 'aria',
    mantra: 'Skin. Color. Routine.',
    description: 'A beauty companion with honest taste and deep analysis.',
    detail: 'Skincare, undertone, facial analysis, product search, makeup, and hair.',
  },
  {
    id: 'joi',
    name: 'Joi',
    icon: 'kira',
    mantra: 'Presence. Consent. Trust.',
    description: 'A relationship companion built for emotional continuity.',
    detail: 'Messaging-first intimacy, memory, world-state, voice, media, and boundaries.',
  },
]
