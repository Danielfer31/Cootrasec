import { describe, expect, it } from 'vitest'
import { summarizeFrames } from './metrics'

describe('summarizeFrames', () => {
  it('summarizes average FPS and slow frames', () => {
    expect(summarizeFrames([16, 16, 17, 50])).toEqual({
      averageFps: 40,
      slowFrames: 1,
      sampleCount: 4,
    })
  })

  it('returns an empty summary without samples', () => {
    expect(summarizeFrames([])).toEqual({
      averageFps: 0,
      slowFrames: 0,
      sampleCount: 0,
    })
  })
})
