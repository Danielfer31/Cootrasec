export type ExperienceTier = 'high' | 'balanced' | 'lite' | 'reduced-motion'

export interface CapabilitySnapshot {
  reducedMotion: boolean
  webgl: boolean
  memoryGb: number | null
  cores: number
  mobile: boolean
}

interface PerformanceSummary {
  averageFps: number
  slowFrames: number
  sampleCount: number
}

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number
}

export function chooseTier(capabilities: CapabilitySnapshot): ExperienceTier {
  if (capabilities.reducedMotion) return 'reduced-motion'
  if (!capabilities.webgl) return 'lite'
  if (capabilities.mobile) return 'balanced'
  if ((capabilities.memoryGb ?? 4) >= 8 && capabilities.cores >= 8) return 'high'
  return 'balanced'
}

export function shouldDowngrade(tier: ExperienceTier, summary: PerformanceSummary) {
  if (tier === 'lite' || tier === 'reduced-motion' || summary.sampleCount === 0) return false
  const slowFrameRatio = summary.slowFrames / summary.sampleCount
  if (tier === 'high') return summary.averageFps < 45 || slowFrameRatio > 0.15
  return summary.averageFps < 28 || slowFrameRatio > 0.25
}

function supportsWebGl(target: Window): boolean {
  try {
    const canvas = target.document.createElement('canvas')
    return Boolean(
      canvas.getContext('webgl2') ??
        canvas.getContext('webgl') ??
        canvas.getContext('experimental-webgl'),
    )
  } catch {
    return false
  }
}

export function detectCapabilities(target: Window = window): CapabilitySnapshot {
  const navigator = target.navigator as NavigatorWithMemory

  return {
    reducedMotion: target.matchMedia('(prefers-reduced-motion: reduce)').matches,
    webgl: supportsWebGl(target),
    memoryGb: navigator.deviceMemory ?? null,
    cores: navigator.hardwareConcurrency || 1,
    mobile: target.matchMedia('(pointer: coarse), (max-width: 800px)').matches,
  }
}
