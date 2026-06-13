import type { ExperienceTier } from '../experience/capabilities'

export type ShowroomVariant = 'r3f' | '360'

export function selectShowroomVariant(tier: ExperienceTier, webgl: boolean): ShowroomVariant {
  return tier === 'lite' || tier === 'reduced-motion' || !webgl ? '360' : 'r3f'
}
