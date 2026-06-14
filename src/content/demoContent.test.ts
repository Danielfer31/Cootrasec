import { describe, expect, it } from 'vitest'
import { demoContent } from './demoContent'

describe('demoContent', () => {
  it('contains every commercial chapter and quote vehicle', () => {
    expect(demoContent.chapters.map((chapter) => chapter.id)).toEqual([
      'hero',
      'trust',
      'fleet',
      'reveal',
      'showroom',
      'quote',
      'closing',
    ])
    expect(demoContent.vehicles.map((vehicle) => vehicle.id)).toEqual([
      'prado',
      'sprinter',
      'paradiso',
    ])
  })

  it('discloses the demo without describing vehicle content as conceptual', () => {
    expect(demoContent.quote.notice).toMatch(/demo/i)
    expect(demoContent.quote.cta).toBe('Solicitar propuesta')

    const vehicleCopy = demoContent.vehicles
      .flatMap((vehicle) => [
        vehicle.description,
        ...vehicle.features,
        ...vehicle.hotspots.map((hotspot) => hotspot.description),
      ])
      .join(' ')

    expect(vehicleCopy).not.toMatch(/conceptual/i)
  })
})
