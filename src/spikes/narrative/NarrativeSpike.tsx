import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { frameUrl, preloadFrames, progressToFrame, type SequenceTier } from './imageSequence'
import { VideoNarrative } from './VideoNarrative'
import './NarrativeSpike.css'

type NarrativeMode = 'sequence-desktop' | 'sequence-lite' | 'video' | 'reduced'

const frameCounts: Record<SequenceTier, number> = {
  desktop: 48,
  lite: 16,
}

gsap.registerPlugin(ScrollTrigger)

function modeTier(mode: NarrativeMode): SequenceTier {
  return mode === 'sequence-lite' ? 'lite' : 'desktop'
}

export function NarrativeSpike() {
  const [mode, setMode] = useState<NarrativeMode>('sequence-desktop')
  const [progress, setProgress] = useState(0)
  const [loadProgress, setLoadProgress] = useState(0)
  const [videoFailed, setVideoFailed] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const tier = modeTier(mode)
  const urls = useMemo(
    () => Array.from({ length: frameCounts[tier] }, (_, index) => frameUrl(tier, index)),
    [tier],
  )

  useEffect(() => {
    if (mode === 'reduced') {
      setProgress(1)
      return
    }
    const section = sectionRef.current
    if (!section) return
    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=1800',
      pin: true,
      scrub: 0.35,
      onUpdate: ({ progress: nextProgress }) => setProgress(nextProgress),
    })
    return () => trigger.kill()
  }, [mode])

  useEffect(() => {
    if (!mode.startsWith('sequence')) return
    const controller = new AbortController()
    setLoadProgress(0)
    void preloadFrames(
      urls,
      (completed, total) => setLoadProgress(Math.round((completed / total) * 100)),
      controller.signal,
    )
    return () => controller.abort()
  }, [mode, urls])

  useEffect(() => {
    if (!mode.startsWith('sequence')) return
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')
    if (!canvas || !context) return
    const image = new Image()
    image.onload = () => {
      canvas.width = image.naturalWidth
      canvas.height = image.naturalHeight
      context.drawImage(image, 0, 0)
    }
    image.src = urls[progressToFrame(progress, urls.length)]
  }, [mode, progress, urls])

  const selectMode = (nextMode: NarrativeMode) => {
    setVideoFailed(false)
    setMode(nextMode)
  }

  return (
    <main className="narrative-page">
      <a className="back-link" href="/">Volver al laboratorio</a>
      <header className="narrative-header">
        <p className="eyebrow">Experimento técnico aislado</p>
        <h1>Spike A: narrativa</h1>
        <p>Compara precisión, peso y percepción entre secuencia y video.</p>
        <div className="mode-controls" aria-label="Modo narrativo">
          <button type="button" onClick={() => selectMode('sequence-desktop')}>Secuencia desktop</button>
          <button type="button" onClick={() => selectMode('sequence-lite')}>Secuencia lite</button>
          <button type="button" onClick={() => selectMode('video')}>Video sincronizado</button>
          <button type="button" onClick={() => selectMode('reduced')}>Movimiento reducido</button>
        </div>
      </header>

      <section className={`narrative-stage ${mode === 'reduced' ? 'is-reduced' : ''}`} ref={sectionRef}>
        <div className="media-shell">
          {mode.startsWith('sequence') && (
            <canvas aria-label="Secuencia narrativa" className="narrative-media" ref={canvasRef} />
          )}
          {mode === 'video' && !videoFailed && (
            <VideoNarrative progress={progress} tier={tier} onError={() => setVideoFailed(true)} />
          )}
          {mode === 'reduced' && (
            <img
              alt="Bus conceptual en una carretera tropical"
              className="narrative-media"
              src="/spike-assets/narrative/source.png"
            />
          )}
          {videoFailed && (
            <button type="button" onClick={() => selectMode('sequence-desktop')}>
              Usar secuencia de imágenes
            </button>
          )}
          <div className="scene-copy scene-copy-primary" style={{ opacity: progress < 0.7 ? 1 : 0 }}>
            <p>Una solución para cada equipo.</p>
          </div>
          <div className="scene-copy scene-copy-secondary" style={{ opacity: progress > 0.45 ? 1 : 0 }}>
            <p>De recorridos ejecutivos a grandes movimientos empresariales.</p>
          </div>
          <div className="progress-readout">
            <span>{mode}</span>
            <strong>{mode.startsWith('sequence') ? `${loadProgress}% cargado` : `${Math.round(progress * 100)}%`}</strong>
          </div>
        </div>
      </section>
      <div className="scroll-exit">Fin del experimento narrativo</div>
    </main>
  )
}
