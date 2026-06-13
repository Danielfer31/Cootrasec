import { lazy, Suspense, useState } from 'react'
import './ShowroomSpike.css'

const R3FShowroom = lazy(() =>
  import('./R3FShowroom').then((module) => ({ default: module.R3FShowroom })),
)
const ThreeShowroom = lazy(() =>
  import('./ThreeShowroom').then((module) => ({ default: module.ThreeShowroom })),
)
const Turntable360 = lazy(() =>
  import('./Turntable360').then((module) => ({ default: module.Turntable360 })),
)

type Implementation = 'r3f' | 'three' | '360'
type HotspotName = 'Capacidad' | 'Climatización' | 'Seguridad'

const hotspots: Record<HotspotName, string> = {
  Capacidad: 'Configuración conceptual para equipos, eventos y recorridos empresariales.',
  Climatización: 'Confort térmico pensado para mantener una experiencia estable durante el viaje.',
  Seguridad: 'Monitoreo conceptual, planeación y acompañamiento operativo durante el recorrido.',
}

interface ShowroomSpikeProps {
  initialImplementation?: Implementation
  forceWebglError?: boolean
}

export function ShowroomSpike({ initialImplementation = '360', forceWebglError = false }: ShowroomSpikeProps) {
  const [implementation, setImplementation] = useState(initialImplementation)
  const [activeHotspot, setActiveHotspot] = useState<HotspotName>('Capacidad')
  const webglError = forceWebglError && implementation !== '360'

  return (
    <main className="showroom-page">
      <a className="back-link" href="/">Volver al laboratorio</a>
      <header className="showroom-header">
        <p className="eyebrow">Experimento técnico aislado</p>
        <h1>Spike B: showroom</h1>
        <p>La misma experiencia comercial implementada con tres tecnologías.</p>
      </header>
      <div className="showroom-layout">
        <section className="showroom-stage">
          <div className="implementation-controls" aria-label="Implementación del showroom">
            <button type="button" onClick={() => setImplementation('r3f')}>R3F</button>
            <button type="button" onClick={() => setImplementation('three')}>Three.js</button>
            <button type="button" onClick={() => setImplementation('360')}>360</button>
          </div>
          {webglError ? (
            <div className="showroom-error">
              <p>WebGL no está disponible para esta variante.</p>
              <button type="button" onClick={() => setImplementation('360')}>Usar vista 360</button>
            </div>
          ) : (
            <Suspense fallback={<div className="showroom-loading">Preparando showroom...</div>}>
              {implementation === 'r3f' && <R3FShowroom />}
              {implementation === 'three' && <ThreeShowroom />}
              {implementation === '360' && <Turntable360 />}
            </Suspense>
          )}
        </section>
        <aside className="hotspot-panel">
          <p className="eyebrow">Puntos de interés</p>
          <div className="hotspot-controls">
            {(Object.keys(hotspots) as HotspotName[]).map((hotspot) => (
              <button
                aria-pressed={activeHotspot === hotspot}
                key={hotspot}
                onClick={() => setActiveHotspot(hotspot)}
                type="button"
              >
                {hotspot}
              </button>
            ))}
          </div>
          <article>
            <h2>{activeHotspot}</h2>
            <p>{hotspots[activeHotspot]}</p>
          </article>
          <dl className="showroom-meta">
            <div><dt>Implementación</dt><dd>{implementation}</dd></div>
            <div><dt>Render en reposo</dt><dd>{implementation === '360' ? 'ninguno' : 'bajo demanda'}</dd></div>
          </dl>
        </aside>
      </div>
    </main>
  )
}
