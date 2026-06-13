import { demoContent } from '../content/demoContent'

const paradiso = demoContent.vehicles.find((vehicle) => vehicle.id === 'paradiso')
if (!paradiso) throw new Error('Missing Paradiso showroom content')

const positions = {
  capacity: [0.5, 1.2, 0.9],
  comfort: [-0.7, 1.1, 0.9],
  climate: [1.5, 1.6, 0.8],
  luggage: [-1.4, 0.3, 0.9],
  entertainment: [0, 1.7, 0.9],
  safety: [2, 0.7, 0.8],
} as const

export const showroomHotspots = paradiso.hotspots.map((hotspot, index) => ({
  ...hotspot,
  position: positions[hotspot.id as keyof typeof positions],
  turntableFrame: index * 4,
}))
