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

  it('marks the quote experience as conceptual', () => {
    expect(demoContent.quote.notice).toMatch(/demostraci[oó]n conceptual/i)
    expect(demoContent.quote.cta).toBe('Solicitar propuesta')
  })
})
