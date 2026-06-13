import { describe, expect, it } from 'vitest'
import { chooseTier } from './capabilities'

describe('chooseTier', () => {
  it('prioritizes reduced motion', () => {
    expect(
      chooseTier({
        reducedMotion: true,
        webgl: true,
        memoryGb: 16,
        cores: 8,
        mobile: false,
      }),
    ).toBe('reduced-motion')
  })

  it('uses lite without WebGL', () => {
    expect(
      chooseTier({
        reducedMotion: false,
        webgl: false,
        memoryGb: 8,
        cores: 8,
        mobile: false,
      }),
    ).toBe('lite')
  })

  it('uses high for a capable desktop', () => {
    expect(
      chooseTier({
        reducedMotion: false,
        webgl: true,
        memoryGb: 8,
        cores: 8,
        mobile: false,
      }),
    ).toBe('high')
  })

  it('uses balanced for a capable phone', () => {
    expect(
      chooseTier({
        reducedMotion: false,
        webgl: true,
        memoryGb: 8,
        cores: 8,
        mobile: true,
      }),
    ).toBe('balanced')
  })
})
