export interface FrameSummary {
  averageFps: number
  slowFrames: number
  sampleCount: number
}

export function summarizeFrames(samples: number[]): FrameSummary {
  if (samples.length === 0) {
    return { averageFps: 0, slowFrames: 0, sampleCount: 0 }
  }

  const total = samples.reduce((sum, value) => sum + value, 0)
  return {
    averageFps: Math.round(1000 / (total / samples.length)),
    slowFrames: samples.filter((value) => value > 34).length,
    sampleCount: samples.length,
  }
}
