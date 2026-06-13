import { useEffect, useRef } from 'react'
import { shouldDowngrade } from './capabilities'
import { useExperience } from './ExperienceProvider'

interface PerformanceMonitorProps {
  active?: boolean
  sampleSize?: number
}

export function PerformanceMonitor({ active = true, sampleSize = 90 }: PerformanceMonitorProps) {
  const { downgrade, experienceRevision, tier } = useExperience()
  const downgradedRevision = useRef<number | null>(null)

  useEffect(() => {
    if (!active || tier === 'lite' || tier === 'reduced-motion') return
    const intervals: number[] = []
    let previous: number | null = null
    let frame = 0

    const sample = (timestamp: number) => {
      if (previous !== null) intervals.push(timestamp - previous)
      previous = timestamp

      if (intervals.length >= sampleSize) {
        const averageInterval = intervals.reduce((total, value) => total + value, 0) / intervals.length
        const summary = {
          averageFps: 1000 / averageInterval,
          slowFrames: intervals.filter((value) => value > 34).length,
          sampleCount: intervals.length,
        }
        if (
          downgradedRevision.current !== experienceRevision &&
          shouldDowngrade(tier, summary)
        ) {
          downgradedRevision.current = experienceRevision
          downgrade()
          return
        }
        intervals.length = 0
      }

      frame = requestAnimationFrame(sample)
    }

    frame = requestAnimationFrame(sample)
    return () => cancelAnimationFrame(frame)
  }, [active, downgrade, experienceRevision, sampleSize, tier])

  return null
}
