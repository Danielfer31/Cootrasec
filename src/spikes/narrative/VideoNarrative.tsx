import { useEffect, useRef } from 'react'
import { publicAsset } from '../../assets/publicAsset'

interface VideoNarrativeProps {
  progress: number
  tier: 'desktop' | 'lite'
  onError: () => void
}

export function VideoNarrative({ progress, tier, onError }: VideoNarrativeProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<number | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    frameRef.current = requestAnimationFrame(() => {
      video.currentTime = progress * video.duration
    })

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current)
    }
  }, [progress])

  return (
    <video
      aria-label="Video narrativo sincronizado"
      className="narrative-media"
      muted
      onError={onError}
      playsInline
      preload="auto"
      ref={videoRef}
      src={publicAsset(`/spike-assets/narrative/${tier}/transformation.mp4`)}
    />
  )
}
