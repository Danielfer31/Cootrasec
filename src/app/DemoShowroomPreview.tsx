import { demoContent } from '../content/demoContent'

export default function DemoShowroomPreview() {
  const vehicle = demoContent.vehicles.find((item) => item.id === 'paradiso')
  if (!vehicle) return null

  return (
    <div className="showroom-preview" aria-label="Vista conceptual del showroom">
      <img
        alt="Vista conceptual temporal del bus premium"
        src="/spike-assets/turntable/frame-001.webp"
      />
      <div className="showroom-preview__features">
        {vehicle.features.map((feature) => <span key={feature}>{feature}</span>)}
      </div>
    </div>
  )
}
