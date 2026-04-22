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
    id: 'aria',
    name: 'Aria',
    icon: 'aria',
    mantra: 'Empathetic. Insightful. Loyal.',
    description: 'A companion built for emotional nuance and grounded reassurance.',
    detail: 'Best for reflective check-ins, steady encouragement, and human warmth.',
  },
  {
    id: 'nexus',
    name: 'Nexus',
    icon: 'nexus',
    mantra: 'Analytical. Precise. Reliable.',
    description: 'Focused on structure, memory, and making complexity feel clear.',
    detail: 'Best for planning, synthesis, routines, and calm system thinking.',
  },
  {
    id: 'kira',
    name: 'Kira',
    icon: 'kira',
    mantra: 'Adaptive. Curious. Playful.',
    description: 'The bright, responsive presence at the center of the DIJI world.',
    detail: 'Best for exploration, daily rhythm, and a lighter sense of discovery.',
  },
  {
    id: 'valen',
    name: 'Valen',
    icon: 'valen',
    mantra: 'Calm. Steady. Dependable.',
    description: 'A low-drama, high-trust guide for long arcs and consistent care.',
    detail: 'Best for continuity, presence, and a quieter kind of accountability.',
  },
  {
    id: 'zed',
    name: 'Zed',
    icon: 'zed',
    mantra: 'Bold. Independent. Fearless.',
    description: 'A sharper edge for decisive moments and forward momentum.',
    detail: 'Best for momentum, experiments, and moving when hesitation lingers.',
  },
]
