import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'

function BusModel() {
  return (
    <group rotation={[0, -0.25, 0]}>
      <mesh castShadow position={[0, 0.7, 0]}>
        <boxGeometry args={[4.8, 1.55, 1.65]} />
        <meshStandardMaterial color="#f4f0e6" metalness={0.35} roughness={0.3} />
      </mesh>
      <mesh position={[0.35, 1.25, 0.84]}>
        <boxGeometry args={[3.35, 0.55, 0.025]} />
        <meshStandardMaterial color="#15382d" metalness={0.7} roughness={0.18} />
      </mesh>
      {[-1.55, 1.55].map((x) =>
        [-0.88, 0.88].map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.46, 0.46, 0.24, 28]} />
            <meshStandardMaterial color="#181c1b" roughness={0.7} />
          </mesh>
        )),
      )}
    </group>
  )
}

export function R3FShowroom() {
  return (
    <div className="showroom-viewport" data-renderer="r3f">
      <Canvas camera={{ position: [7, 4, 7], fov: 38 }} dpr={[1, 1.5]} frameloop="demand" shadows>
        <color attach="background" args={['#0d1c17']} />
        <ambientLight intensity={1.8} />
        <directionalLight castShadow intensity={4} position={[5, 7, 4]} />
        <BusModel />
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
