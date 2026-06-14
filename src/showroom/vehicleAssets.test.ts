import { describe, expect, it } from 'vitest'
import { vehicleAssets, vehicleIds } from './vehicleAssets'

describe('vehicleAssets', () => {
  it('defines base-aware model and turntable assets for all showroom vehicles', () => {
    expect(vehicleIds).toEqual(['prado', 'sprinter', 'paradiso'])
    expect(vehicleAssets).toMatchObject({
      prado: {
        id: 'prado',
        label: 'Prado ejecutivo',
        model: '/demo-assets/showroom/prado.glb',
        turntable: '/demo-assets/turntable/prado/frame-{frame}.webp',
      },
      sprinter: {
        id: 'sprinter',
        label: 'Sprinter corporativa',
        model: '/demo-assets/showroom/sprinter.glb',
        turntable: '/demo-assets/turntable/sprinter/frame-{frame}.webp',
      },
      paradiso: {
        id: 'paradiso',
        label: 'Paradiso turismo',
        model: '/demo-assets/showroom/paradiso.glb',
        turntable: '/demo-assets/turntable/paradiso/frame-{frame}.webp',
      },
    })
  })
})
