import { lazy, Suspense, useState } from 'react'
import type { VehicleId } from '../content/demoContent'
import { useExperience } from '../experience/ExperienceProvider'
import { showroomHotspots } from './hotspots'
import { selectShowroomVariant } from './showroomVariant'
import { TurntableFallback } from './TurntableFallback'
import { vehicleAssets, vehicleIds } from './vehicleAssets'
import './Showroom.css'

const BusCanvas = lazy(() => import('./BusCanvas'))

export function Showroom() {
  const { capabilities, tier } = useExperience()
  const [activeHotspot, setActiveHotspot] = useState(showroomHotspots[0])
  const [interior, setInterior] = useState(false)
  const [morningLight, setMorningLight] = useState(true)
  const [vehicleId, setVehicleId] = useState<VehicleId>('paradiso')
  const variant = selectShowroomVariant(tier, capabilities.webgl)
  const selectedVehicle = vehicleAssets[vehicleId]

  const transferToQuote = () => {
    window.dispatchEvent(new CustomEvent('cootrasec:select-vehicle', {
      detail: { vehicleId },
    }))
    window.location.hash = 'quote'
  }

  return (
    <div className="showroom-layout">
      <section className="showroom-stage" aria-label="Explorador de vehiculos">
        <div className="showroom-view-controls">
          <div aria-label="Seleccionar vehiculo" className="showroom-vehicle-controls" role="group">
            {vehicleIds.map((id) => (
              <button
                aria-pressed={vehicleId === id}
                key={id}
                onClick={() => setVehicleId(id)}
                type="button"
              >
                {vehicleAssets[id].label}
              </button>
            ))}
          </div>
          <button aria-pressed={!interior} onClick={() => setInterior(false)} type="button">Exterior</button>
          <button aria-pressed={interior} onClick={() => setInterior(true)} type="button">Interior conceptual</button>
          <button aria-pressed={morningLight} onClick={() => setMorningLight((value) => !value)} type="button">
            Luz de manana
          </button>
        </div>
        {variant === 'r3f' ? (
          <Suspense fallback={<div className="showroom-loading">Preparando showroom...</div>}>
            <BusCanvas interior={interior} key={vehicleId} morningLight={morningLight} vehicleId={vehicleId} />
          </Suspense>
        ) : (
          <TurntableFallback key={vehicleId} vehicleId={vehicleId} />
        )}
      </section>
      <aside className="hotspot-panel">
        <p className="eyebrow">Puntos de interes</p>
        <div className="hotspot-controls">
          {showroomHotspots.map((hotspot) => (
            <button
              aria-pressed={activeHotspot.id === hotspot.id}
              key={hotspot.id}
              onClick={() => setActiveHotspot(hotspot)}
              type="button"
            >
              {hotspot.label}
            </button>
          ))}
        </div>
        <article>
          <h3>{activeHotspot.label}</h3>
          <p>{activeHotspot.description}</p>
        </article>
        <a className="button-link button-link--primary" href="#quote" onClick={transferToQuote}>
          Cotizar {selectedVehicle.label}
        </a>
      </aside>
    </div>
  )
}

export default Showroom
