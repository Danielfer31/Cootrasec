import { useEffect, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { VehicleId } from '../content/demoContent'
import { vehicleAssets } from './vehicleAssets'

const frameCount = 24

function frameUrl(vehicleId: VehicleId, index: number) {
  return vehicleAssets[vehicleId].turntable.replace('{frame}', String(index + 1).padStart(3, '0'))
}

export function TurntableFallback({ vehicleId }: { vehicleId: VehicleId }) {
  const [frame, setFrame] = useState(0)
  const [dragStart, setDragStart] = useState<number | null>(null)
  const vehicle = vehicleAssets[vehicleId]

  useEffect(() => {
    ;[frame, (frame + 1) % frameCount, (frame + frameCount - 1) % frameCount].forEach((index) => {
      const image = new Image()
      image.src = frameUrl(vehicleId, index)
    })
  }, [frame, vehicleId])

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
      <img alt={`${vehicle.label} en vista 360`} draggable={false} src={frameUrl(vehicleId, frame)} />
      <span>Arrastra o usa las flechas · cuadro {frame + 1}/{frameCount}</span>
    </div>
  )
}
