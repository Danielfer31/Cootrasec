import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import type { VehicleId } from '../content/demoContent'
import { vehicleAssets, vehicleIds } from './vehicleAssets'

interface BusCanvasProps {
  interior: boolean
  morningLight: boolean
  vehicleId: VehicleId
}

function BusModel({ interior, vehicleId }: { interior: boolean; vehicleId: VehicleId }) {
  const vehicle = vehicleAssets[vehicleId]
  const { scene } = useGLTF(vehicle.model)
  return (
    <group rotation={[0, interior ? -1.3 : -0.25, 0]} scale={vehicle.scale}>
      <primitive object={scene} />
    </group>
  )
}

vehicleIds.forEach((vehicleId) => useGLTF.preload(vehicleAssets[vehicleId].model))

export default function BusCanvas({ interior, morningLight, vehicleId }: BusCanvasProps) {
  const cameraDistance = vehicleAssets[vehicleId].cameraDistance

  return (
    <div className="showroom-viewport" data-renderer="r3f">
      <Canvas
        camera={{ position: [cameraDistance, cameraDistance * 0.55, cameraDistance], fov: 38 }}
        dpr={[1, 1.5]}
        frameloop="demand"
        shadows
      >
        <color attach="background" args={[morningLight ? '#173a2e' : '#0d1c17']} />
        <ambientLight intensity={morningLight ? 2.2 : 1.2} />
        <directionalLight castShadow intensity={morningLight ? 4.5 : 2.5} position={[5, 7, 4]} />
        <BusModel interior={interior} vehicleId={vehicleId} />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#102a22" roughness={0.9} />
        </mesh>
        <OrbitControls
          enablePan={false}
          maxDistance={cameraDistance * 1.5}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={cameraDistance * 0.7}
          minPolarAngle={Math.PI / 3.8}
        />
      </Canvas>
    </div>
  )
}
