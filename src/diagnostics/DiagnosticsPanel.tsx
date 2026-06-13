import type { ExperienceTier } from '../experience/capabilities'
import type { FrameSummary } from './metrics'

export interface DiagnosticsSnapshot extends FrameSummary {
  tier: ExperienceTier
  implementation: string
  assetBytes: number | null
}

interface DiagnosticsPanelProps {
  snapshot: DiagnosticsSnapshot
}

function formatBytes(bytes: number | null) {
  if (bytes === null) return 'Sin medir'
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`
}

function downloadSnapshot(snapshot: DiagnosticsSnapshot) {
  const payload = JSON.stringify(
    { capturedAt: new Date().toISOString(), ...snapshot },
    null,
    2,
  )
  const url = URL.createObjectURL(
    new Blob([payload], { type: 'application/json' }),
  )
  const link = document.createElement('a')
  link.href = url
  link.download = `cootrasec-${snapshot.implementation}-measurement.json`
  link.click()
  URL.revokeObjectURL(url)
}

export function DiagnosticsPanel({ snapshot }: DiagnosticsPanelProps) {
  return (
    <aside aria-label="Diagnóstico del experimento">
      <h2>Diagnóstico</h2>
      <dl>
        <div>
          <dt>Nivel</dt>
          <dd>{snapshot.tier}</dd>
        </div>
        <div>
          <dt>Implementación</dt>
          <dd>{snapshot.implementation}</dd>
        </div>
        <div>
          <dt>Recursos</dt>
          <dd>{formatBytes(snapshot.assetBytes)}</dd>
        </div>
        <div>
          <dt>FPS promedio</dt>
          <dd>{snapshot.averageFps}</dd>
        </div>
        <div>
          <dt>Fotogramas lentos</dt>
          <dd>{snapshot.slowFrames}</dd>
        </div>
      </dl>
      <button type="button" onClick={() => downloadSnapshot(snapshot)}>
        Descargar medición
      </button>
    </aside>
  )
}
