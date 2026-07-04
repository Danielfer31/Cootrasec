import { useRef } from 'react'
import type { ExperienceTier } from '../experience/capabilities'
import { NarrativeAnchors, NarrativeCopy } from './HighNarrative'
import { useScrollProgress } from './useScrollProgress'

type JourneyTier = Exclude<ExperienceTier, 'reduced-motion'>

const officialScenes = [
  {
    id: 'hero',
    asset: '/demo-assets/official/ninos.jpg',
    alt: 'Buses oficiales de Cootrasec estacionados en servicio especial',
    position: 'center 55%',
  },
  {
    id: 'trust',
    asset: '/demo-assets/official/clientes2.jpg',
    alt: 'Buses oficiales de Cootrasec prestando servicio escolar',
    position: 'center 52%',
  },
  {
    id: 'fleet',
    asset: '/demo-assets/official/cartagenab.jpg',
    alt: 'Buses oficiales de Cootrasec prestando servicio en Cartagena',
    position: 'center 58%',
  },
  {
    id: 'reveal',
    asset: '/demo-assets/official/clientes.jpg',
    alt: 'Vehiculo oficial Cootrasec para clientes particulares',
    position: 'center 52%',
  },
] as const

function progressToSceneIndex(progress: number) {
  if (progress >= 0.75) return 3
  if (progress >= 0.5) return 2
  if (progress >= 0.25) return 1
  return 0
}

export function JourneyNarrative({ tier }: { tier: JourneyTier }) {
  const rootRef = useRef<HTMLElement>(null)
  const progress = useScrollProgress(rootRef)
  const isLite = tier === 'lite'
  const activeScene = officialScenes[progressToSceneIndex(progress)]

  return (
    <section
      className={`narrative narrative--journey narrative--journey-${tier}`}
      data-progress={progress.toFixed(3)}
      data-testid="journey-narrative"
      ref={rootRef}
    >
      <NarrativeAnchors />
      <div className="journey-stage">
        <figure
          className="journey-official-frame"
          data-scene={activeScene.id}
          data-testid="journey-bus"
        >
          <img
            alt={activeScene.alt}
            src={activeScene.asset}
            style={{ objectPosition: activeScene.position }}
          />
        </figure>
        {!isLite && (
          <div className="journey-official-strip" aria-hidden="true">
            {officialScenes.map((scene) => (
              <img
                className={scene.id === activeScene.id ? 'is-active' : undefined}
                key={scene.id}
                src={scene.asset}
                style={{ objectPosition: scene.position }}
              />
            ))}
          </div>
        )}
        <div className="journey-route" data-testid="journey-route" aria-hidden="true">
          <span className="journey-route__track" />
          <span className="journey-route__marker" />
          <ol>
            <li>Inicio</li>
            <li>Control</li>
            <li>Flota</li>
            <li>Llegada</li>
          </ol>
        </div>
        <NarrativeCopy activeSceneId={activeScene.id} />
      </div>
    </section>
  )
}
