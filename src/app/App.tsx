type SpikeName = 'narrative' | 'showroom' | 'adaptive'

const spikes: Record<SpikeName, { label: string; description: string }> = {
  narrative: {
    label: 'Spike A: narrativa',
    description: 'Comparar secuencia de imágenes y video sincronizado por scroll.',
  },
  showroom: {
    label: 'Spike B: showroom',
    description: 'Comparar R3F, Three.js directo y una vista 360.',
  },
  adaptive: {
    label: 'Spike C: calidad adaptable',
    description: 'Validar detección, cambio y limpieza de niveles de experiencia.',
  },
}

function selectedSpike(): SpikeName | null {
  const value = new URLSearchParams(window.location.search).get('spike')
  return value === 'narrative' || value === 'showroom' || value === 'adaptive'
    ? value
    : null
}

function SpikePlaceholder({ name }: { name: SpikeName }) {
  const spike = spikes[name]

  return (
    <main className="spike-screen">
      <a className="back-link" href="/">Volver al laboratorio</a>
      <p className="eyebrow">Experimento técnico aislado</p>
      <h1>{spike.label}</h1>
      <p>{spike.description}</p>
      <div className="placeholder">
        Este espacio recibirá la implementación y sus mediciones.
      </div>
    </main>
  )
}

function LaboratoryHome() {
  return (
    <main>
      <header className="hero">
        <p className="eyebrow">Cootrasec · laboratorio técnico</p>
        <h1>Decidir antes de construir.</h1>
        <p>
          Estos experimentos validan rendimiento, interacción y degradación.
          No representan la demo final.
        </p>
      </header>
      <section className="spike-grid" aria-label="Spikes disponibles">
        {(Object.entries(spikes) as [SpikeName, (typeof spikes)[SpikeName]][]).map(
          ([name, spike]) => (
            <a className="spike-card" href={`/?spike=${name}`} key={name}>
              <span>{spike.label}</span>
              <p>{spike.description}</p>
              <strong>Abrir experimento</strong>
            </a>
          ),
        )}
      </section>
    </main>
  )
}

export default function App() {
  const spike = selectedSpike()
  if (spike === 'narrative') return <NarrativeSpike />
  return spike ? <SpikePlaceholder name={spike} /> : <LaboratoryHome />
}
import { NarrativeSpike } from '../spikes/narrative/NarrativeSpike'
