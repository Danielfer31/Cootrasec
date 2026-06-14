import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js'
import * as THREE from 'three'

const root = fileURLToPath(new URL('../', import.meta.url))
const concepts = path.join(root, '.superpowers', 'visual-assets', 'fase-2-scenes')
const output = path.join(root, 'public', 'demo-assets')
const narrative = path.join(output, 'narrative')
const transformation = path.join(narrative, 'transformation')
const showroom = path.join(output, 'showroom')
const turntable = path.join(output, 'turntable')
const backup = path.join(output, 'backup')
const temp = path.join(output, '.build')

for (const directory of [showroom, turntable]) {
  rmSync(directory, { force: true, recursive: true })
}

for (const directory of [narrative, transformation, showroom, turntable, backup, temp]) {
  mkdirSync(directory, { recursive: true })
}

const ffmpeg = 'ffmpeg'
const commonImageFilter = 'scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080'

function run(args) {
  execFileSync(ffmpeg, ['-hide_banner', '-loglevel', 'error', '-y', ...args], { stdio: 'inherit' })
}

function concept(name) {
  return path.join(concepts, name)
}

function webp(source, destination, quality = 72) {
  run(['-i', source, '-vf', commonImageFilter, '-frames:v', '1', '-c:v', 'libwebp', '-quality', String(quality), destination])
}

const conceptSources = [
  '01-amanecer-prado.png',
  '02-transformacion-flota.png',
  '03-paradiso-sinu.png',
  '05-convoy-final.png',
]

if (conceptSources.every((source) => existsSync(concept(source)))) {
  webp(concept('01-amanecer-prado.png'), path.join(narrative, 'hero.webp'), 70)
  webp(concept('03-paradiso-sinu.png'), path.join(narrative, 'reveal.webp'), 72)
  webp(concept('05-convoy-final.png'), path.join(narrative, 'convoy.webp'), 72)

  const sequenceVideo = path.join(temp, 'transformation-master.mp4')
  run([
    '-loop', '1', '-t', '1.4', '-i', concept('01-amanecer-prado.png'),
    '-loop', '1', '-t', '1.4', '-i', concept('02-transformacion-flota.png'),
    '-loop', '1', '-t', '1.4', '-i', concept('03-paradiso-sinu.png'),
    '-filter_complex',
    `[0:v]${commonImageFilter},zoompan=z='min(zoom+0.0008,1.04)':d=34:s=1920x1080:fps=12[a];` +
    `[1:v]${commonImageFilter},zoompan=z='min(zoom+0.0005,1.03)':d=34:s=1920x1080:fps=12[b];` +
    `[2:v]${commonImageFilter},zoompan=z='min(zoom+0.0003,1.02)':d=34:s=1920x1080:fps=12[c];` +
    `[a][b]xfade=transition=fadeblack:duration=0.65:offset=0.75[ab];` +
    `[ab][c]xfade=transition=fadeblack:duration=0.65:offset=1.65,` +
    `drawbox=x='mod(t*700,2200)-300':y=0:w=170:h=1080:color=0xffd98a@0.16:t=fill[v]`,
    '-map', '[v]', '-t', '4', '-r', '12', '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '25', sequenceVideo,
  ])

  run([
    '-i', sequenceVideo,
    '-vf', 'fps=12',
    '-frames:v', '48',
    '-c:v', 'libwebp',
    '-quality', '52',
    path.join(transformation, 'frame-%03d.webp'),
  ])

  run([
    '-i', sequenceVideo,
    '-an', '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '28', '-movflags', '+faststart',
    path.join(narrative, 'transformation.mp4'),
  ])
} else {
  console.log('Concept sources unavailable; preserving existing narrative assets.')
}

const vehicles = [
  {
    id: 'prado',
    category: 'suv',
    length: 4,
    height: 1.25,
    width: 1.7,
    wheelBase: 2.65,
    wheelRadius: 0.42,
  },
  {
    id: 'sprinter',
    category: 'van',
    length: 5.6,
    height: 2,
    width: 1.85,
    wheelBase: 3.7,
    wheelRadius: 0.45,
  },
  {
    id: 'paradiso',
    category: 'coach',
    length: 7.8,
    height: 2.65,
    width: 2.1,
    wheelBase: 5.1,
    wheelRadius: 0.52,
  },
]

function turntableFilter(vehicle, index) {
  const phase = ((index - 1) / 24) * Math.PI * 2
  const perspective = 0.72 + Math.abs(Math.cos(phase)) * 0.28
  const bodyWidth = vehicle.category === 'suv' ? 430 : vehicle.category === 'van' ? 560 : 710
  const bodyHeight = vehicle.category === 'suv' ? 125 : vehicle.category === 'van' ? 190 : 235
  const left = Math.round((960 - bodyWidth * perspective) / 2)
  const top = 285 - bodyHeight
  const width = Math.round(bodyWidth * perspective)
  const frontInset = Math.round(Math.abs(Math.sin(phase)) * 42)
  const wheelY = top + bodyHeight - 8
  const wheelRadius = vehicle.category === 'coach' ? 34 : vehicle.category === 'van' ? 30 : 28
  const wheelLeft = Math.round(left + width * 0.22 - wheelRadius)
  const wheelRight = Math.round(left + width * 0.78 - wheelRadius)
  const bodyLeft = left + frontInset
  const bodyWidthVisible = width - frontInset * 2
  const roofInset = vehicle.category === 'suv' ? 0.2 : vehicle.category === 'van' ? 0.12 : 0.06
  const roofHeight = vehicle.category === 'suv' ? Math.round(bodyHeight * 0.55) : Math.round(bodyHeight * 0.78)
  const roofLeft = Math.round(left + width * roofInset)
  const roofWidth = Math.round(width * (1 - roofInset * 1.55))
  const windowLeft = Math.round(left + width * 0.12)
  const windowWidth = Math.round(width * 0.76)
  const windowTop = top + Math.round(bodyHeight * 0.12)
  const windowHeight = Math.round(bodyHeight * 0.3)
  const accentTop = top + Math.round(bodyHeight * 0.68)

  return [
    `drawbox=x=${left - 24}:y=${wheelY + 32}:w=${width + 48}:h=26:color=black@0.28:t=fill`,
    `drawbox=x=${bodyLeft}:y=${top + roofHeight}:w=${bodyWidthVisible}:h=${bodyHeight - roofHeight}:color=0xf4f0e6:t=fill`,
    `drawbox=x=${roofLeft}:y=${top}:w=${roofWidth}:h=${roofHeight + 12}:color=0xf4f0e6:t=fill`,
    `drawbox=x=${windowLeft}:y=${windowTop}:w=${windowWidth}:h=${windowHeight}:color=0x15382d:t=fill`,
    `drawbox=x=${Math.round(left + width * 0.08)}:y=${accentTop}:w=${Math.round(width * 0.84)}:h=${vehicle.category === 'coach' ? 12 : 8}:color=0x237c61:t=fill`,
    `drawbox=x=${wheelLeft}:y=${wheelY - wheelRadius}:w=${wheelRadius * 2}:h=${wheelRadius * 2}:color=0x151a18:t=fill`,
    `drawbox=x=${wheelRight}:y=${wheelY - wheelRadius}:w=${wheelRadius * 2}:h=${wheelRadius * 2}:color=0x151a18:t=fill`,
    `drawbox=x=${wheelLeft + Math.round(wheelRadius * 0.55)}:y=${wheelY - Math.round(wheelRadius * 0.45)}:w=${Math.round(wheelRadius * 0.9)}:h=${Math.round(wheelRadius * 0.9)}:color=0x9b988e:t=fill`,
    `drawbox=x=${wheelRight + Math.round(wheelRadius * 0.55)}:y=${wheelY - Math.round(wheelRadius * 0.45)}:w=${Math.round(wheelRadius * 0.9)}:h=${Math.round(wheelRadius * 0.9)}:color=0x9b988e:t=fill`,
  ].join(',')
}

for (const vehicle of vehicles) {
  const vehicleTurntable = path.join(turntable, vehicle.id)
  mkdirSync(vehicleTurntable, { recursive: true })
  for (let index = 1; index <= 24; index += 1) {
    const frame = String(index).padStart(3, '0')
    run([
      '-f', 'lavfi', '-i', 'color=c=0x0d1c17:s=960x540',
      '-vf', turntableFilter(vehicle, index),
      '-frames:v', '1', '-c:v', 'libwebp', '-quality', '58',
      path.join(vehicleTurntable, `frame-${frame}.webp`),
    ])
  }
}

function addBox(group, size, position, color, metalness = 0.2, roughness = 0.45) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(...size),
    new THREE.MeshStandardMaterial({ color, metalness, roughness }),
  )
  mesh.position.set(...position)
  group.add(mesh)
}

function createVehicleScene(vehicle) {
  const scene = new THREE.Scene()
  const model = new THREE.Group()
  const bodyY = vehicle.wheelRadius + vehicle.height * 0.42
  addBox(model, [vehicle.length, vehicle.height * 0.62, vehicle.width], [0, bodyY, 0], '#f4f0e6', 0.35, 0.3)

  if (vehicle.category === 'suv') {
    addBox(model, [vehicle.length * 0.56, vehicle.height * 0.42, vehicle.width * 0.94], [0.2, bodyY + vehicle.height * 0.45, 0], '#15382d', 0.5, 0.25)
    addBox(model, [vehicle.length * 0.28, vehicle.height * 0.18, vehicle.width * 0.98], [-vehicle.length * 0.35, bodyY + vehicle.height * 0.22, 0], '#f4f0e6', 0.35, 0.3)
  } else {
    addBox(model, [vehicle.length * 0.82, vehicle.height * 0.38, vehicle.width * 1.01], [vehicle.length * 0.04, bodyY + vehicle.height * 0.42, 0], '#15382d', 0.5, 0.25)
  }
  addBox(model, [vehicle.length * 0.88, vehicle.height * 0.07, vehicle.width * 1.02], [0, bodyY - vehicle.height * 0.12, 0], '#237c61', 0.25, 0.35)

  for (const x of [-vehicle.wheelBase / 2, vehicle.wheelBase / 2]) {
    for (const z of [-vehicle.width / 2 - 0.02, vehicle.width / 2 + 0.02]) {
    const wheel = new THREE.Mesh(
        new THREE.CylinderGeometry(vehicle.wheelRadius, vehicle.wheelRadius, 0.22, 16),
      new THREE.MeshStandardMaterial({ color: '#181c1b', roughness: 0.7 }),
    )
      wheel.position.set(x, vehicle.wheelRadius, z)
    wheel.rotation.x = Math.PI / 2
      model.add(wheel)
    }
  }
  scene.add(model)
  return scene
}

globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result
      this.onloadend?.()
    })
  }
}

const exporter = new GLTFExporter()
for (const vehicle of vehicles) {
  const glb = await exporter.parseAsync(createVehicleScene(vehicle), { binary: true, onlyVisible: true })
  writeFileSync(path.join(showroom, `${vehicle.id}.glb`), Buffer.from(glb))
}

const concat = path.join(temp, 'backup.txt')
const stills = [
  path.join(narrative, 'hero.webp'),
  path.join(narrative, 'reveal.webp'),
  path.join(narrative, 'convoy.webp'),
]
writeFileSync(
  concat,
  Array.from({ length: 8 }, () => stills)
    .flat()
    .map((file) => `file '${file.replaceAll('\\', '/')}'\nduration 5`)
    .join('\n') + `\nfile '${stills.at(-1).replaceAll('\\', '/')}'\n`,
)
run([
  '-f', 'concat', '-safe', '0', '-i', concat,
  '-vf', `${commonImageFilter},fps=24`,
  '-t', '120', '-an', '-c:v', 'libx264', '-crf', '30', '-pix_fmt', 'yuv420p', '-movflags', '+faststart',
  path.join(backup, 'cootrasec-demo-backup.mp4'),
])

rmSync(temp, { force: true, recursive: true })
console.log('Demo assets generated.')
