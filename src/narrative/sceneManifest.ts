import { publicAsset } from '../assets/publicAsset'
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
    asset: publicAsset('/demo-assets/photography/executive.webp'),
    alt: 'Vehículo ejecutivo marfil recorriendo una carretera tropical',
    anchor: '#hero',
    progress: { start: 0, end: 0.25 },
  },
  {
    id: 'trust',
    asset: publicAsset('/demo-assets/photography/corporate.webp'),
    alt: 'Vehículo corporativo marfil preparado para un traslado empresarial',
    anchor: '#trust',
    progress: { start: 0.25, end: 0.5 },
  },
  {
    id: 'fleet',
    asset: publicAsset('/demo-assets/photography/convoy.webp'),
    alt: 'Convoy de vehículos marfil recorriendo una carretera tropical',
    anchor: '#fleet',
    progress: { start: 0.5, end: 0.75 },
  },
  {
    id: 'reveal',
    asset: publicAsset('/demo-assets/photography/tourism.webp'),
    alt: 'Bus de turismo marfil recorriendo un paisaje tropical',
    anchor: '#reveal',
    progress: { start: 0.75, end: 1 },
  },
]
