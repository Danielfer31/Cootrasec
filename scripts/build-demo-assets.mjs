import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
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

for (let index = 1; index <= 24; index += 1) {
  copyFileSync(
    path.join(root, 'public', 'spike-assets', 'turntable', `frame-${String(index).padStart(3, '0')}.webp`),
    path.join(turntable, `frame-${String(index).padStart(3, '0')}.webp`),
  )
}

function addBox(group, size, position, color, metalness = 0.2, roughness = 0.45) {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(...size),
    new THREE.MeshStandardMaterial({ color, metalness, roughness }),
  )
  mesh.position.set(...position)
  group.add(mesh)
}

const scene = new THREE.Scene()
const bus = new THREE.Group()
addBox(bus, [4.8, 1.55, 1.65], [0, 0.7, 0], '#f4f0e6', 0.35, 0.3)
addBox(bus, [3.4, 0.55, 1.7], [0.35, 1.25, 0], '#15382d', 0.5, 0.25)
for (const x of [-1.55, 1.55]) {
  for (const z of [-0.88, 0.88]) {
    const wheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.46, 0.46, 0.24, 20),
      new THREE.MeshStandardMaterial({ color: '#181c1b', roughness: 0.7 }),
    )
    wheel.position.set(x, 0, z)
    wheel.rotation.x = Math.PI / 2
    bus.add(wheel)
  }
}
scene.add(bus)

globalThis.FileReader = class {
  readAsArrayBuffer(blob) {
    blob.arrayBuffer().then((result) => {
      this.result = result
      this.onloadend?.()
    })
  }
}

const exporter = new GLTFExporter()
const glb = await exporter.parseAsync(scene, { binary: true, onlyVisible: true })
writeFileSync(path.join(showroom, 'paradiso.glb'), Buffer.from(glb))

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
