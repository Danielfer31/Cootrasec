import { describe, expect, it } from 'vitest'
import { publicAsset } from './publicAsset'

describe('publicAsset', () => {
  it('keeps local public paths rooted at slash', () => {
    expect(publicAsset('/demo-assets/a.webp', '/')).toBe('/demo-assets/a.webp')
  })

  it('prefixes paths with the GitHub Pages base', () => {
    expect(publicAsset('/demo-assets/a.webp', '/Cootrasec/')).toBe('/Cootrasec/demo-assets/a.webp')
  })

  it('accepts paths without a leading slash', () => {
    expect(publicAsset('demo-assets/a.webp', '/Cootrasec')).toBe('/Cootrasec/demo-assets/a.webp')
  })
})
