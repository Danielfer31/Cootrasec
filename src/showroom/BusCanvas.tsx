import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { publicAsset } from '../assets/publicAsset'

interface BusCanvasProps {
  interior: boolean
  morningLight: boolean
}

function BusModel({ interior }: { interior: boolean }) {
  const { scene } = useGLTF(busModelPath)
  return (
    <group rotation={[0, interior ? -1.3 : -0.25, 0]}>
      <primitive object={scene} />
    </group>
  )
}

const busModelPath = publicAsset('/demo-assets/showroom/paradiso.glb')

useGLTF.preload(busModelPath)

export default function BusCanvas({ interior, morningLight }: BusCanvasProps) {
  return (
    <div className="showroom-viewport" data-renderer="r3f">
      <Canvas camera={{ position: [7, 4, 7], fov: 38 }} dpr={[1, 1.5]} frameloop="demand" shadows>
        <color attach="background" args={[morningLight ? '#173a2e' : '#0d1c17']} />
        <ambientLight intensity={morningLight ? 2.2 : 1.2} />
        <directionalLight castShadow intensity={morningLight ? 4.5 : 2.5} position={[5, 7, 4]} />
        <BusModel interior={interior} />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.48, 0]}>
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial color="#102a22" roughness={0.9} />
        </mesh>
        <OrbitControls
          enablePan={false}
          maxDistance={12}
          maxPolarAngle={Math.PI / 2.05}
          minDistance={6}
          minPolarAngle={Math.PI / 3.8}
        />
      </Canvas>
    </div>
  )
}
