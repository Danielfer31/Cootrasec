import { describe, expect, it } from 'vitest'
import { sceneManifest } from './sceneManifest'

describe('sceneManifest', () => {
  it('describes every scene with its required narrative contract', () => {
    expect(sceneManifest.map((scene) => scene.id)).toEqual([
      'hero',
      'trust',
      'fleet',
      'reveal',
    ])

    for (const scene of sceneManifest) {
      expect(scene.asset).toBeTruthy()
      expect(scene.alt).toBeTruthy()
      expect(scene.anchor).toBe(`#${scene.id}`)
      expect(scene.progress.start).toBeGreaterThanOrEqual(0)
      expect(scene.progress.end).toBeLessThanOrEqual(1)
      expect(scene.progress.end).toBeGreaterThan(scene.progress.start)
    }
  })

  it('keeps high-tier progress ranges continuous and ending at one', () => {
    expect(sceneManifest[0].progress.start).toBe(0)

    sceneManifest.slice(1).forEach((scene, index) => {
      expect(scene.progress.start).toBe(sceneManifest[index].progress.end)
    })

    expect(sceneManifest.at(-1)?.progress.end).toBe(1)
  })

  it('maps the narrative scenes to the demo photography', () => {
    expect(sceneManifest.map((scene) => scene.asset)).toEqual([
      '/demo-assets/photography/executive.webp',
      '/demo-assets/photography/corporate.webp',
      '/demo-assets/photography/convoy.webp',
      '/demo-assets/photography/tourism.webp',
    ])
  })
})
