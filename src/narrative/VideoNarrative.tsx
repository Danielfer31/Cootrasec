import { useEffect, useRef, useState } from 'react'
import { publicAsset } from '../assets/publicAsset'
import { NarrativeAnchors, NarrativeCopy, NarrativeProgress, NarrativeRoute } from './HighNarrative'

export function VideoNarrative() {
  const rootRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<number | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const update = () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        const root = rootRef.current
        const video = videoRef.current
        if (!root) return
        const rect = root.getBoundingClientRect()
        const distance = Math.max(1, root.offsetHeight - window.innerHeight)
        const progress = Math.min(1, Math.max(0, -rect.top / distance))
        root.style.setProperty('--narrative-progress', String(progress))
        if (video && Number.isFinite(video.duration)) video.currentTime = progress * video.duration
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [])

  return (
    <section className="narrative narrative--video" data-testid="narrative-video" ref={rootRef}>
      <NarrativeAnchors />
      <div className="narrative-stage">
        {failed ? (
          <img
            alt="Bus premium recorriendo un paisaje tropical"
            className="narrative-media"
            src={publicAsset('/spike-assets/narrative/source.png')}
          />
        ) : (
          <video
            aria-label="Viaje luminoso sincronizado"
            className="narrative-media"
            muted
            onError={() => setFailed(true)}
            poster={publicAsset('/demo-assets/narrative/hero.webp')}
            playsInline
            preload="metadata"
            ref={videoRef}
            src={publicAsset('/demo-assets/narrative/transformation.mp4')}
          />
        )}
        <NarrativeCopy />
        <NarrativeRoute />
        <NarrativeProgress label={failed ? 'Imagen de respaldo' : 'Video sincronizado'} />
      </div>
    </section>
  )
}
