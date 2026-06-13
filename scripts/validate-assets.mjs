import { readFile, stat } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const manifestPath = path.join(projectRoot, 'public', 'demo-assets', 'manifest.json')
const manifest = JSON.parse(await readFile(manifestPath, 'utf8'))

function filesFor(resource) {
  if (!resource.frames) return [resource.path]

  return Array.from({ length: resource.frames }, (_, index) =>
    resource.path.replace('{frame}', String(index + 1).padStart(3, '0')),
  )
}

function localPath(assetPath) {
  return path.join(projectRoot, 'public', assetPath.replace(/^[/\\]+/, ''))
}

function formatBytes(bytes) {
  return new Intl.NumberFormat('en-US').format(bytes)
}

let failed = false

for (const [groupName, resources] of Object.entries(manifest)) {
  for (const [resourceName, resource] of Object.entries(resources)) {
    const files = filesFor(resource)
    const missing = []
    let totalBytes = 0

    for (const assetPath of files) {
      try {
        totalBytes += (await stat(localPath(assetPath))).size
      } catch (error) {
        if (error?.code !== 'ENOENT') throw error
        missing.push(assetPath)
      }
    }

    const label = `${groupName}.${resourceName}`
    if (missing.length > 0) {
      failed = true
      console.log(`MISSING ${label}: ${missing.length}/${files.length} files`)
      for (const assetPath of missing) console.log(`  - ${assetPath}`)
    } else if (totalBytes > resource.maxBytes) {
      failed = true
      console.log(
        `OVER BUDGET ${label}: ${formatBytes(totalBytes)} bytes > ${formatBytes(resource.maxBytes)} bytes`,
      )
    } else {
      console.log(
        `PASS ${label}: ${formatBytes(totalBytes)} bytes <= ${formatBytes(resource.maxBytes)} bytes`,
      )
    }
  }
}

if (failed) {
  console.error('Production asset validation failed.')
  process.exitCode = 1
} else {
  console.log('All production assets pass.')
}
