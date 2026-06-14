import type { ChapterId } from '../content/demoContent'

export interface NarrativeScene {
  id: Extract<ChapterId, 'hero' | 'trust' | 'fleet' | 'reveal'>
  asset: string
  alt: string
  anchor: `#${string}`
  progress: {
    start: number
    end: number
  }
}

export const sceneManifest: NarrativeScene[] = [
  {
    id: 'hero',
    asset: '/demo-assets/narrative/hero.webp',
    alt: 'Vehiculo ejecutivo recorriendo una carretera tropical al amanecer',
    anchor: '#hero',
    progress: { start: 0, end: 0.25 },
  },
  {
    id: 'trust',
    asset: '/demo-assets/narrative/transformation/frame-012.webp',
    alt: 'Reflejos solares acompanando un recorrido empresarial seguro',
    anchor: '#trust',
    progress: { start: 0.25, end: 0.5 },
  },
  {
    id: 'fleet',
    asset: '/demo-assets/narrative/transformation/frame-030.webp',
    alt: 'Transformacion luminosa de la flota ejecutiva',
    anchor: '#fleet',
    progress: { start: 0.5, end: 0.75 },
  },
  {
    id: 'reveal',
    asset: '/demo-assets/narrative/reveal.webp',
    alt: 'Bus premium revelado junto a un paisaje tropical luminoso',
    anchor: '#reveal',
    progress: { start: 0.75, end: 1 },
  },
]
