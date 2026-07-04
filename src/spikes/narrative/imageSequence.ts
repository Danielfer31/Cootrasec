import { publicAsset } from '../../assets/publicAsset'

export type SequenceTier = 'desktop' | 'lite'

export interface PreloadResult {
  loaded: string[]
  failed: string[]
}

type ImageLoader = (url: string, signal: AbortSignal) => Promise<string>

export function progressToFrame(progress: number, frameCount: number) {
  if (frameCount <= 1) return 0
  const clamped = Math.min(1, Math.max(0, progress))
  return Math.min(frameCount - 1, Math.round(clamped * frameCount))
}

export function frameUrl(tier: SequenceTier, index: number) {
  return publicAsset(`/spike-assets/narrative/${tier}/frame-${String(index + 1).padStart(3, '0')}.webp`)
}

function loadImage(url: string, signal: AbortSignal) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image()
    const abort = () => reject(new DOMException('Aborted', 'AbortError'))
    signal.addEventListener('abort', abort, { once: true })
    image.onload = () => {
      signal.removeEventListener('abort', abort)
      resolve(url)
    }
    image.onerror = () => {
      signal.removeEventListener('abort', abort)
      reject(new Error(`Unable to load ${url}`))
    }
    image.src = url
  })
}

export async function preloadFrames(
  urls: string[],
  onProgress: (completed: number, total: number) => void,
  signal: AbortSignal,
  loader: ImageLoader = loadImage,
): Promise<PreloadResult> {
  const loaded: string[] = []
  const failed: string[] = []

  for (const url of urls) {
    if (signal.aborted) break
    try {
      loaded.push(await loader(url, signal))
    } catch {
      failed.push(url)
    }
    onProgress(loaded.length + failed.length, urls.length)
  }

  return { loaded, failed }
}
