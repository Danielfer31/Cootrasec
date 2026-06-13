import './Shell.css'

interface LoadingScreenProps {
  essentialReady: boolean
  loaded: number
  onEnter: () => void
  total: number
}

export function LoadingScreen({ essentialReady, loaded, onEnter, total }: LoadingScreenProps) {
  const progress = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0

  return (
    <section className="loading-screen" aria-labelledby="loading-title">
      <div className="loading-reflection" aria-hidden="true" />
      <div className="loading-content">
        <p className="eyebrow">Cootrasec</p>
        <h1 id="loading-title">Preparando el recorrido</h1>
        <p>
          {essentialReady
            ? 'Los recursos esenciales estan listos. El resto continuara cargando durante el viaje.'
            : 'Cargando los recursos esenciales para comenzar.'}
        </p>
        <div
          className="loading-progress"
          role="progressbar"
          aria-label="Progreso de carga"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={progress}
        >
          <span style={{ width: `${progress}%` }} />
        </div>
        <p aria-live="polite">{progress}% listo</p>
        <button disabled={!essentialReady} onClick={onEnter} type="button">
          Entrar a la experiencia
        </button>
      </div>
    </section>
  )
}
