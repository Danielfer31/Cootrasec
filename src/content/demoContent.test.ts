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

  it('maps each vehicle to accurate demo photography', () => {
    expect(demoContent.vehicles.map(({ image, imageAlt }) => ({ image, imageAlt }))).toEqual([
      {
        image: '/demo-assets/photography/executive.webp',
        imageAlt: 'Vehículo ejecutivo marfil en una carretera tropical',
      },
      {
        image: '/demo-assets/photography/corporate.webp',
        imageAlt: 'Vehículo corporativo marfil preparado para un traslado empresarial',
      },
      {
        image: '/demo-assets/photography/tourism.webp',
        imageAlt: 'Bus de turismo marfil recorriendo un paisaje tropical',
      },
    ])
  })
})
