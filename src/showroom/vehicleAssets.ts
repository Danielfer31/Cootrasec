import { publicAsset } from '../assets/publicAsset'
import type { VehicleId } from '../content/demoContent'

interface VehicleAsset {
  id: VehicleId
  label: string
  model: string
  turntable: string
  scale: number
  cameraDistance: number
}

export const vehicleIds: VehicleId[] = ['prado', 'sprinter', 'paradiso']

export const vehicleAssets: Record<VehicleId, VehicleAsset> = {
  prado: {
    id: 'prado',
    label: 'Prado ejecutivo',
    model: publicAsset('/demo-assets/showroom/prado.glb'),
    turntable: publicAsset('/demo-assets/turntable/prado/frame-{frame}.webp'),
    scale: 1.15,
    cameraDistance: 6,
  },
  sprinter: {
    id: 'sprinter',
    label: 'Sprinter corporativa',
    model: publicAsset('/demo-assets/showroom/sprinter.glb'),
    turntable: publicAsset('/demo-assets/turntable/sprinter/frame-{frame}.webp'),
    scale: 0.95,
    cameraDistance: 7.5,
  },
  paradiso: {
    id: 'paradiso',
    label: 'Paradiso turismo',
    model: publicAsset('/demo-assets/showroom/paradiso.glb'),
    turntable: publicAsset('/demo-assets/turntable/paradiso/frame-{frame}.webp'),
    scale: 0.8,
    cameraDistance: 9,
  },
}
