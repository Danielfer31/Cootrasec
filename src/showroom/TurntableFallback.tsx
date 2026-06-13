import { useEffect, useState, type KeyboardEvent, type PointerEvent } from 'react'

const frameCount = 24

function frameUrl(index: number) {
  return `/spike-assets/turntable/frame-${String(index + 1).padStart(3, '0')}.webp`
}

export function TurntableFallback() {
  const [frame, setFrame] = useState(0)
  const [dragStart, setDragStart] = useState<number | null>(null)

  useEffect(() => {
    ;[frame, (frame + 1) % frameCount, (frame + frameCount - 1) % frameCount].forEach((index) => {
      const image = new Image()
      image.src = frameUrl(index)
    })
  }, [frame])

  const move = (delta: number) => {
    setFrame((current) => (current + delta + frameCount) % frameCount)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowLeft') move(-1)
    if (event.key === 'ArrowRight') move(1)
  }

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (dragStart === null || Math.abs(event.clientX - dragStart) < 18) return
    move(event.clientX > dragStart ? -1 : 1)
    setDragStart(event.clientX)
  }

  return (
    <div
      aria-label="Vista 360 del bus"
      className="showroom-viewport turntable"
      data-renderer="360"
      onKeyDown={onKeyDown}
      onPointerDown={(event) => setDragStart(event.clientX)}
      onPointerLeave={() => setDragStart(null)}
      onPointerMove={onPointerMove}
      onPointerUp={() => setDragStart(null)}
      role="application"
      tabIndex={0}
    >
      <img alt="Bus premium en vista 360" draggable={false} src={frameUrl(frame)} />
      <span>Arrastra o usa las flechas · cuadro {frame + 1}/{frameCount}</span>
    </div>
  )
}
