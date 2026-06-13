import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

function createBus() {
  const bus = new THREE.Group()
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(4.8, 1.55, 1.65),
    new THREE.MeshStandardMaterial({ color: '#f4f0e6', metalness: 0.35, roughness: 0.3 }),
  )
  body.position.y = 0.7
  bus.add(body)
  const windowBand = new THREE.Mesh(
    new THREE.BoxGeometry(3.35, 0.55, 0.025),
    new THREE.MeshStandardMaterial({ color: '#15382d', metalness: 0.7, roughness: 0.18 }),
  )
  windowBand.position.set(0.35, 1.25, 0.84)
  bus.add(windowBand)

  for (const x of [-1.55, 1.55]) {
    for (const z of [-0.88, 0.88]) {
      const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(0.46, 0.46, 0.24, 28),
        new THREE.MeshStandardMaterial({ color: '#181c1b', roughness: 0.7 }),
      )
      wheel.position.set(x, 0, z)
      wheel.rotation.x = Math.PI / 2
      bus.add(wheel)
    }
  }
  bus.rotation.y = -0.25
  return bus
}

export function ThreeShowroom() {
  const hostRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return
    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#0d1c17')
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.set(7, 4, 7)
    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.shadowMap.enabled = true
    host.append(renderer.domElement)
    scene.add(new THREE.AmbientLight('#ffffff', 1.8))
    const light = new THREE.DirectionalLight('#ffffff', 4)
    light.position.set(5, 7, 4)
    scene.add(light)
    scene.add(createBus())
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(30, 30),
      new THREE.MeshStandardMaterial({ color: '#102a22', roughness: 0.9 }),
    )
    ground.rotation.x = -Math.PI / 2
    ground.position.y = -0.48
    scene.add(ground)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.enablePan = false
    controls.minDistance = 6
    controls.maxDistance = 12
    controls.minPolarAngle = Math.PI / 3.8
    controls.maxPolarAngle = Math.PI / 2.05
    let animationFrame: number | null = null
    const render = () => {
      animationFrame = null
      controls.update()
      renderer.render(scene, camera)
    }
    const requestRender = () => {
      if (animationFrame === null) animationFrame = requestAnimationFrame(render)
    }
    const resize = () => {
      const { clientWidth, clientHeight } = host
      renderer.setSize(clientWidth, clientHeight, false)
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      requestRender()
    }
    controls.addEventListener('change', requestRender)
    window.addEventListener('resize', resize)
    resize()

    return () => {
      if (animationFrame !== null) cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      controls.removeEventListener('change', requestRender)
      controls.dispose()
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return
        object.geometry.dispose()
        const materials = Array.isArray(object.material) ? object.material : [object.material]
        materials.forEach((material) => material.dispose())
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="showroom-viewport" data-renderer="three" ref={hostRef} />
}
