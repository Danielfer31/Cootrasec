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
    asset: '/demo-assets/official/ninos.jpg',
    alt: 'Buses oficiales de Cootrasec estacionados en servicio especial',
    anchor: '#hero',
    progress: { start: 0, end: 0.25 },
  },
  {
    id: 'trust',
    asset: '/demo-assets/official/clientes2.jpg',
    alt: 'Buses oficiales de Cootrasec prestando servicio escolar',
    anchor: '#trust',
    progress: { start: 0.25, end: 0.5 },
  },
  {
    id: 'fleet',
    asset: '/demo-assets/official/cartagenab.jpg',
    alt: 'Buses oficiales de Cootrasec prestando servicio en Cartagena',
    anchor: '#fleet',
    progress: { start: 0.5, end: 0.75 },
  },
  {
    id: 'reveal',
    asset: '/demo-assets/official/clientes.jpg',
    alt: 'Vehiculo oficial Cootrasec para clientes particulares',
    anchor: '#reveal',
    progress: { start: 0.75, end: 1 },
  },
]
