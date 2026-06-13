import { describe, expect, it } from 'vitest'
import { chooseTier, shouldDowngrade } from './capabilities'

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

describe('shouldDowngrade', () => {
  it('downgrades high when average FPS is below 45', () => {
    expect(shouldDowngrade('high', { averageFps: 44, slowFrames: 2, sampleCount: 120 })).toBe(true)
  })

  it('keeps balanced when it sustains at least 28 FPS', () => {
    expect(shouldDowngrade('balanced', { averageFps: 30, slowFrames: 5, sampleCount: 120 })).toBe(false)
  })

  it('never automatically downgrades lite or reduced motion', () => {
    const summary = { averageFps: 10, slowFrames: 120, sampleCount: 120 }
    expect(shouldDowngrade('lite', summary)).toBe(false)
    expect(shouldDowngrade('reduced-motion', summary)).toBe(false)
  })
})
