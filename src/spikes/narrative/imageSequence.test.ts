import { describe, expect, it, vi } from 'vitest'
import { preloadFrames, progressToFrame } from './imageSequence'

describe('progressToFrame', () => {
  it('clamps progress and returns a zero-based frame', () => {
    expect(progressToFrame(-1, 48)).toBe(0)
    expect(progressToFrame(0.5, 48)).toBe(24)
    expect(progressToFrame(2, 48)).toBe(47)
  })
})

describe('preloadFrames', () => {
  it('reports successful and failed frame URLs', async () => {
    const result = await preloadFrames(
      ['frame-1.webp', 'missing.webp'],
      vi.fn(),
      new AbortController().signal,
      async (url) => {
        if (url === 'missing.webp') throw new Error('missing')
        return url
      },
    )

    expect(result).toEqual({
      loaded: ['frame-1.webp'],
      failed: ['missing.webp'],
    })
  })
})
