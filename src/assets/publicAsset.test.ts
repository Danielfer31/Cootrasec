import { describe, expect, it } from 'vitest'
import { publicAsset } from './publicAsset'

describe('publicAsset', () => {
  it('normalizes assets for a root base', () => {
    expect(publicAsset('/assets/vehicle.glb', '/')).toBe('/assets/vehicle.glb')
  })

  it('normalizes assets for a nested base', () => {
    expect(publicAsset('/assets/vehicle.glb', '/cootrasec-demo/')).toBe(
      '/cootrasec-demo/assets/vehicle.glb',
    )
  })
})
