import { useState } from 'react'
import { publicAsset } from '../../assets/publicAsset'
import type { ExperienceTier } from '../../experience/capabilities'
import { useExperience } from '../../experience/ExperienceProvider'
import './AdaptiveSpike.css'

const tierLabels: Record<ExperienceTier, string> = {
  high: 'High',
  balanced: 'Balanced',
  lite: 'Lite',
  'reduced-motion': 'Reduced motion',
}

export function AdaptiveSpike() {
  const { detectedTier, downgrade, experienceRevision, setTier, tier } = useExperience()
  const [webglFailure, setWebglFailure] = useState(false)

  const simulateWebglFailure = () => {
    setWebglFailure(true)
    setTier('lite')
  }

  return (
    <main className="adaptive-page">
      <a className="back-link" href={import.meta.env.BASE_URL}>Volver al laboratorio</a>
      <header className="adaptive-header">
        <p className="eyebrow">Experimento técnico aislado</p>
        <h1>Spike C: calidad adaptable</h1>
        <p>Prueba cambios de nivel sin romper la narrativa ni duplicar runtimes.</p>
      </header>

      <section className="adaptive-controls" aria-label="Nivel de experiencia">
        {(Object.keys(tierLabels) as ExperienceTier[]).map((candidate) => (
          <button
            aria-pressed={tier === candidate}
            key={candidate}
            onClick={() => {
              setWebglFailure(false)
              setTier(candidate)
            }}
            type="button"
          >
            {tierLabels[candidate]}
          </button>
        ))}
        <button type="button" onClick={downgrade}>Simular bajo rendimiento</button>
        <button type="button" onClick={simulateWebglFailure}>Simular fallo WebGL</button>
      </section>

      <section className="adaptive-status">
        <div>
          <span>Nivel detectado</span>
          <strong>{detectedTier}</strong>
        </div>
        <div>
          <span>Nivel activo</span>
          <strong>Nivel activo: {tier}</strong>
        </div>
        <div>
          <span>Recreaciones limpias</span>
          <strong>{experienceRevision}</strong>
        </div>
      </section>

      <section className={`adaptive-runtime tier-${tier}`} key={experienceRevision}>
        <article className="adaptive-representative narrative-representative">
          <img alt="" src={publicAsset('/spike-assets/narrative/lite/frame-008.webp')} />
          <div>
            <p className="eyebrow">Narrativa representativa</p>
            <h2>{tier === 'reduced-motion' ? 'Contenido lineal y estable' : 'Movimiento ajustado al dispositivo'}</h2>
            <p>Narrativas activas: 1</p>
          </div>
        </article>
        <article className="adaptive-representative showroom-representative">
          <img alt="" src={publicAsset('/spike-assets/turntable/frame-001.webp')} />
          <div>
            <p className="eyebrow">Showroom representativo</p>
            <h2>{tier === 'lite' || webglFailure ? 'Fallback 360 activo' : 'Showroom WebGL bajo demanda'}</h2>
            <p>Showrooms activos: 1</p>
          </div>
        </article>
      </section>
    </main>
  )
}
